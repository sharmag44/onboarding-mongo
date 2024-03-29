'use strict';
exports.update = (entitiesToUpdate, existingModel) => { //both comming as object
    for (var key in entitiesToUpdate) {
        if (entitiesToUpdate[key] || typeof entitiesToUpdate[key] === 'boolean')
            existingModel[key] = entitiesToUpdate[key]; //change if exist otherwise add in it
    }
    return existingModel;
};
exports.updateEmpty = (entitiesToUpdate, existingModel) => {
    for (var key in entitiesToUpdate) {
        if (entitiesToUpdate[key] || typeof entitiesToUpdate[key] == "" || typeof entitiesToUpdate[key] === 'boolean')
            existingModel[key] = entitiesToUpdate[key]; //change if exist otherwise add in it
    }
    return existingModel;
};
