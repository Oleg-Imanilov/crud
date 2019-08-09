const path = require('path');
const Datastore = require('nedb');

const _db = {};
module.exports =  (basePath = './data') => (table) => {
    if (!_db[table]) {
        _db[table] = new Datastore({ filename: path.resolve(basePath, table), autoload: true });
    }
    return _db[table];
}
