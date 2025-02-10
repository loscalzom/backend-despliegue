import User from "../models/User.model.js";
import Workspace from "../models/Workspace.model.js";
import WorkspaceRepository from "../repository/workspaces.repository.js";
import UserRepository from "../repository/user.repository.js";
import { ServerError } from "../utils/errors.util.js";

console.log("✅ Métodos disponibles en WorkspaceRepository:", Object.keys(WorkspaceRepository));
console.log("✅ WorkspaceRepository cargado:", WorkspaceRepository);

export const createWorkspaceController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.user;

        const new_workspace = await WorkspaceRepository.createWorkspace({ name, id });

        res.json({
            ok: true,
            message: "Workspace created",
            status: 201,
            data: {
                new_workspace
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            message: "Internal server error",
            status: 500,
        });
    }
};

export const inviteUserToWorkspaceController = async (req, res) => {
    try {
        const { id } = req.user;
        const { workspace_id } = req.params;
        const { email } = req.body;

        const user_invited = await UserRepository.findUserByEmail(email);
        if (!user_invited) {
            throw new ServerError("User not found", 404);
        }
        const workspace_modified = await WorkspaceRepository.addMemberToWorkspace(workspace_id, id, user_invited._id);
        return res.json({
            ok: true,
            status: 201,
            message: "User invited successfully",
            data: {
                workspace_selected: workspace_modified
            }
        });
    } catch (error) {
        console.error(error);
        if (error.status) {
            return res.json({
                ok: false,
                message: error.message,
                status: error.status
            });
        }
        return res.json({
            ok: false,
            message: "Internal server error",
            status: 500,
        });
    }
};

export const getWorkspacesController = async (req, res) => {
    try {
        console.log(req.user);
        const { id } = req.user;

        const workspaces = await WorkspaceRepository.getAllWorkspacesByMemberId(id);

        res.json({
            status: 200,
            ok: true,
            message: "Workspaces",
            data: {
                workspaces
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            message: "Internal server error",
            status: 500,
        });
    }
};

export const getWorkspaceByIdController = async (req, res) => {
    console.log("📢 getWorkspaceByIdController se está ejecutando");
    try {
        const { workspace_id } = req.params;
        console.log("Workspace ID recibido:", workspace_id);

        console.log(WorkspaceRepository);

        const workspace = await WorkspaceRepository.getWorkspaceById(workspace_id);

        if (!workspace) {
            return res.status(404).json({ ok: false, message: "Workspace no encontrado" });
        }

        res.json({ ok: true, status: 200, data: workspace });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }
};

// NUEVA FUNCIÓN: Obtener canales de un workspace donde el usuario es miembro
export const getChannelsByWorkspaceIdAndUserIdController = async (req, res) => {
    try {
        const { workspace_id } = req.params;
        const { id: user_id } = req.user;

        console.log("🟢 Buscando canales para Workspace:", workspace_id, "y User:", user_id);

        const channels = await WorkspaceRepository.getChannelsByWorkspaceIdAndUserId(workspace_id, user_id);

        if (channels.length === 0) {
            return res.status(200).json({
                ok: true,
                message: "No hay canales disponibles para este usuario en el workspace.",
                data: []
            });
        }

        res.status(200).json({
            ok: true,
            message: "Canales del workspace",
            data: channels
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
            status: 500,
        });
    }
};
