import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { 
    createWorkspaceController, 
    getWorkspacesController, 
    inviteUserToWorkspaceController, 
    getWorkspaceByIdController,
    getChannelsByWorkspaceIdAndUserIdController
} from '../controllers/workspace.controller.js';

const workspaceRouter = express.Router()

workspaceRouter.post("/", authMiddleware, createWorkspaceController)
workspaceRouter.post('/:workspace_id/invite', authMiddleware, inviteUserToWorkspaceController)
workspaceRouter.get('/', authMiddleware, getWorkspacesController)
workspaceRouter.get('/:workspace_id', authMiddleware, getWorkspaceByIdController)
workspaceRouter.get('/:workspace_id/channels', authMiddleware, getChannelsByWorkspaceIdAndUserIdController)

export default workspaceRouter;
