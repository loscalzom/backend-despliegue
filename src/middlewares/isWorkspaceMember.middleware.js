import WorkspaceRepository from "../repository/workspaces.repository.js";

const isWorkspaceMemberMiddleware = async (req, res, next) => {
    try {
        const { id } = req.user;  // ID del usuario extraído del payload del token
        const { workspace_id } = req.params;  // workspace_id extraído de los parámetros de la URL

        // Verificar si el workspace existe
        const workspace_selected = await WorkspaceRepository.findWorkspaceById(workspace_id);
        if (!workspace_selected) {
            return res.status(404).json({
                ok: false,
                message: "Workspace not found"
            });
        }

        // Verificar si el usuario es miembro del workspace
        const isMember = await WorkspaceRepository.isUserMemberOfWorkspace(id, workspace_id);
        if (!isMember) {
            return res.status(403).json({
                ok: false,
                message: 'You are not a member of this workspace'
            });
        }

        // Si todo está bien, se adjunta el workspace encontrado al objeto `req` y se llama a `next()`
        req.workspace_selected = workspace_selected;
        next();  // Llamamos al siguiente middleware o controlador
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
};

export default isWorkspaceMemberMiddleware;
