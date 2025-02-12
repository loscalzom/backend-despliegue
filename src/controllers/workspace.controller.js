import WorkspaceRepository from "../repository/workspaces.repository.js";
import UserRepository from "../repository/user.repository.js";
import { ServerError } from "../utils/errors.util.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const { name } = req.body
        const user_id = Number(req.user.id); // Convertimos a número

        if (isNaN(user_id)) {
            return res.status(400).json({ ok: false, message: "Invalid user ID" })
        }

        const new_workspace = await WorkspaceRepository.createWorkspace({ name, id: user_id })

        res.status(201).json({
            ok: true,
            message: "Workspace created",
            data: { new_workspace }
        })
    } catch (error) {
        console.error("❌ Error en createWorkspaceController:", error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

export const inviteUserToWorkspaceController = async (req, res) => {
    try {
        const user_id = Number(req.user.id)
        const workspace_id = Number(req.params.workspace_id)
        const { email } = req.body

        if (isNaN(user_id) || isNaN(workspace_id)) {
            return res.status(400).json({ ok: false, message: "Invalid user or workspace ID" })
        }

        const user_invited = await UserRepository.findUserByEmail(email)
        if (!user_invited) {
            throw new ServerError("User not found", 404)
        }

        const workspace_modified = await WorkspaceRepository.addMemberToWorkspace(workspace_id, user_id, user_invited._id)
        res.status(201).json({
            ok: true,
            message: "User invited successfully",
            data: { workspace_selected: workspace_modified }
        })
    } catch (error) {
        console.error("❌ Error en inviteUserToWorkspaceController:", error)
        return res.status(error.status || 500).json({
            ok: false,
            message: error.message || "Internal server error",
        })
    }
}

export const getWorkspacesController = async (req, res) => {
    try {
        const user_id = Number(req.user.id)

        if (isNaN(user_id)) {
            return res.status(400).json({ ok: false, message: "Invalid user ID" })
        }

        const workspaces = await WorkspaceRepository.getAllWorkspacesByMemberId(user_id)

        res.status(200).json({
            ok: true,
            message: "Workspaces",
            data: { workspaces }
        })
    } catch (error) {
        console.error("❌ Error en getWorkspacesController:", error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

export const getWorkspaceByIdController = async (req, res) => {
    try {
        const workspace_id = Number(req.params.workspace_id)

        if (isNaN(workspace_id)) {
            return res.status(400).json({ ok: false, message: "Invalid workspace ID" })
        }

        const workspace = await WorkspaceRepository.getWorkspaceById(workspace_id)

        if (!workspace) {
            return res.status(404).json({ ok: false, message: "Workspace not found" })
        }

        res.status(200).json({ ok: true, data: workspace })
    } catch (error) {
        console.error("❌ Error en getWorkspaceByIdController:", error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}

export const getChannelsByWorkspaceIdAndUserIdController = async (req, res) => {
    try {
        const workspace_id = Number(req.params.workspace_id)
        const user_id = Number(req.user.id)

        if (isNaN(workspace_id) || isNaN(user_id)) {
            return res.status(400).json({ ok: false, message: "Invalid workspace or user ID" })
        }

        const channels = await WorkspaceRepository.getChannelsByWorkspaceIdAndUserId(workspace_id, user_id)

        res.status(200).json({
            ok: true,
            message: channels.length === 0
                ? "No hay canales disponibles para este usuario en el workspace."
                : "Canales del workspace",
            data: channels
        })
    } catch (error) {
        console.error("❌ Error en getChannelsByWorkspaceIdAndUserIdController:", error)
        return res.status(500).json({ ok: false, message: "Internal server error" })
    }
}
