import pool from "../config/mysql.config.js";
import Workspace from "../models/Workspace.model.js";
import { ServerError } from "../utils/errors.util.js";

class WorkspaceRepository {
   

    constructor() {
        console.log('WorkspaceRepository instanciado');
    }



    async createWorkspace ({name, id }){
        const queryInsertWorkspace = `INSERT INTO workspaces (name, owner) VALUES (?, ?)`

        console.log("ID",id , "Type", typeof id)
        const [result] = await pool.execute(queryInsertWorkspace, [name, id])

        

        const queryInsertMember = `INSERT INTO workspace_members (workspace_id, user_id) VALUES (?, ?)`
        await pool.execute(queryInsertMember, [result.insertId, id])

        return {_id: result.insertId, name, owner: id}
    }
    
    async findWorkspaceById (workspace_id) {
        const querySelectWorkspace = `SELECT * FROM workspaces 
        WHERE _id = ?`
        const [result] = await pool.execute(querySelectWorkspace, [workspace_id])

        console.log("Workspace encontrado:", result[0])
        return result[0] || null
    }

    async addMemberToWorkspace (workspace_id, user_id, user_invited_id){
        const workspace = await this.findWorkspaceById(workspace_id)
        if(!workspace){
            throw new ServerError('Workspace not found', 404)
        }

    


        if(String(workspace.owner) !== String(user_id)){
            throw new ServerError('User is not the owner', 403)
        }   
        const queryExistingMember = `
            SELECT * FROM workspace_members
            WHERE workspace_id = ? AND user_id = ?
        `
        const [members_found] = await pool.execute(queryExistingMember, [workspace_id, user_invited_id])
        if(members_found.length > 0){
            throw new ServerError('User already is a member', 400)
        }

        const insertMemberQuery = `INSERT INTO workspace_members (workspace_id, user_id) VALUES (?, ?)`

        await pool.execute(insertMemberQuery, [workspace_id, user_invited_id])
        
        return workspace
    }

    async getAllWorkspacesByMemberId(user_id){
        const selectWorkspacesQuery = `
        SELECT
            workspaces._id AS workspace_id,
            workspaces.name AS workspace_name,
            USERS.username AS owner_username,
            USERS.email AS owner_email
        FROM workspaces
        JOIN USERS ON workspaces.owner = USERS._id
        JOIN workspace_members ON workspace_members.workspace_id = workspaces._id
        WHERE workspace_members.user_id = ?
        `
        const [workspaces] = await pool.execute(selectWorkspacesQuery, [user_id])
        
        const workspacesAdapted = workspaces.map((workspace) => {
            return {
                _id: workspace.workspace_id,
                name: workspace.workspace_name,
                owner: {
                    username: workspace.owner_username,
                    email: workspace.owner_email,
                    channels: []
                }
            }
        })
        return workspacesAdapted
    }
    async isUserMemberOfWorkspace (user_id, workspace_id){
        //Consultar la DB a la tabla workspace_members y traiga el registro que tenga user_id y workspace_id
        const query = `SELECT * FROM workspace_members WHERE user_id = ? AND workspace_id = ?`
        const [result] = await pool.execute(query, [user_id, workspace_id])
        return Boolean(result.length)
    }
    async getWorkspaceByOwnerId(owner_id) {
        const querySelectWorkspace = `
            SELECT * FROM workspaces WHERE owner = ?
        `;
        const [result] = await pool.execute(querySelectWorkspace, [owner_id]);
        console.log("Workspace encontrado por owner:", result[0]);
        return result[0] || null;
    }
    async getWorkspaceById(workspace_id) {
        console.log("🟢 getWorkspaceById se está ejecutando con ID:", workspace_id);
    
        const querySelectWorkspace = `SELECT * FROM workspaces WHERE _id = ?`;
        console.log("📝 Ejecutando consulta SQL:", querySelectWorkspace, "con ID:", workspace_id);
    
        try {
            const [result] = await pool.execute(querySelectWorkspace, [workspace_id]);
            console.log("📌 Resultado de la consulta:", result);
    
            return result[0] || null;
        } catch (error) {
            console.error("❌ Error en la consulta SQL:", error);
            throw new Error("Error al obtener el workspace desde la base de datos");
        }
    }


    async getChannelsByWorkspaceIdAndUserId(workspace_id, user_id) {
        const querySelectChannels = `
            SELECT c._id AS channel_id, c.name AS channel_name
            FROM channels c
            JOIN workspace_members wm ON wm.workspace_id = c.workspace_id
            WHERE wm.user_id = ? AND c.workspace_id = ?
        `;

        const [channels] = await pool.execute(querySelectChannels, [user_id, workspace_id]);
        console.log("📌 Canales obtenidos del backend:", channels);

        // Si no se encuentran canales, retornamos un arreglo vacío
        return channels || [];
    }
    async getWorkspaceByUserId(user_id) {
        const querySelectWorkspace = `
            SELECT workspaces._id AS workspace_id, workspaces.name AS workspace_name
            FROM workspaces
            JOIN workspace_members ON workspace_members.workspace_id = workspaces._id
            WHERE workspace_members.user_id = ?
        `;
        const [result] = await pool.execute(querySelectWorkspace, [user_id]);
        return result[0] || null;
    }

}
/* result = {
    workspace_id: 1,
    workspace_name: 'workspace 1',
    owner_username: 'user 1',
    owner_email: 'QzH8G@example.com',
    workspace_members: []
}
 */

export default new WorkspaceRepository()