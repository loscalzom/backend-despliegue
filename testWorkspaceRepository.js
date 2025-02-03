import WorkspaceRepository from './src/repository/workspace.repository.js';

async function testGetWorkspaceById() {
    try {
        const workspace = await WorkspaceRepository.getWorkspaceById(1); // Reemplaza 1 con un ID válido
        console.log('Workspace encontrado:', workspace);
    } catch (error) {
        console.error('Error al obtener el workspace:', error);
    }
}

testGetWorkspaceById();