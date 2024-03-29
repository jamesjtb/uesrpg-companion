const DatabaseRepository = require('../../lib/db');
const playerCharacterRepo = new DatabaseRepository('playercharacter');

const ipcActions = require('../../../src/shared/ipc-actions');
module.exports = {
    write: async (pc, mainWindow) => {
        const result = await playerCharacterRepo.write(pc);
        mainWindow.webContents.send(ipcActions.PCS.ON_UPDATE);
        return result;
    },
    get: async payload => await playerCharacterRepo.read(payload.filter, payload.sort),
    getOne: async (_id) => (await playerCharacterRepo.read({_id}))[0],
    delete: async (_id, mainWindow) => {
        const result = await playerCharacterRepo.delete(_id);
        mainWindow.webContents.send(ipcActions.PCS.ON_UPDATE);
        return result;
    },
}