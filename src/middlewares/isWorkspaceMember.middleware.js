import WorkspaceRepository from "../repository/workspaces.repository.js";

const isWorkspaceMemberMiddleware = async (req, res, next) => {
    try {
        const { id } = req.user;  // El id del usuario está en el payload del token o en el request
        const { workspace_id } = req.params;  // El workspace_id está en los parámetros de la URL

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

        // Si todo está bien, pasamos al siguiente middleware o controlador
        req.workspace_selected = workspace_selected;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
};

export default isWorkspaceMemberMiddleware;
