const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

if (process.platform === 'win32') {
    // Windows
    oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_6' });
} else if (process.platform === 'darwin' || process.platform === 'linux' ) {
    // macOS and linux
    oracledb.initOracleClient({ libDir: process.env.HOME + '/bin/instantclient_21_8' });
} 
// else on other platforms like Linux the system library search path MUST always be
// set before Node.js is started, for example with ldconfig or LD_LIBRARY_PATH.

async function initialize() {
    const pool = await oracledb.createPool(dbConfig.hrPool);
}

async function close() {
    await oracledb.getPool().close();
}

function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;

        try {
            conn = await oracledb.getConnection();

            const result = await conn.execute(statement, binds, opts);

            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
}

module.exports = {
    initialize,
    close,
    simpleExecute
}