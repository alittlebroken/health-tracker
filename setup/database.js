/* Import the DB connection object */
const db = require('../src/db/database');

/**
 * List of all the DDL for creating the tables
 */
const tableDDL = [
    {
        name: 'users',
        tblStmt: `
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                display_name VARCHAR(120) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(120) NOT NULL,
                verified BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true,
                last_seen TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                edited_at TIMESTAMP
            );            
        `,
        seqStmt: `
            CREATE SEQUENCE IF NOT EXISTS seq_users START 1 OWNED BY users.id;    
        `,
        fKeyStmt: []
    },
];

/**
 * Seed data for each table
 */
const seedData = [
    {
        table: 'users',
        columns: 'display_name, email, password',
        data: [
            { display_name: 'Administrator', email: 'admin@localhost', password: 'makemesecure' }
        ],
    },
];

/**
 * Does the table exist within the database
 */
const findTable = async (tableName) => {

    if(!tableName) return;

    try {

        const result = await db.query(`
            SELECT  table_name FROM information_schema.tables WHERE table_name = $1;   
        `, [tableName]);

        if(Array.isArray(result.rows) && result.rows.length > 0){

            return true;

        } else {

            return false;

        }

    } catch(err) {
        console.error(err.message);
        return;
    }

};

/**
 * Truncates the passed in table if it exists
 */
const truncateTable = async (tableName) => {

    if(!tableName) return;

    try{

        if(await findTable(tableName)){

            const numRows = await db.query(`
                SELECT COUNT(id) FROM ${tableName}; 
            `);

            if(numRows && numRows?.length > 0) {
                await db.query(`
                    TRUNCATE TABLE ${tableName};
                `);

                console.log(`The table [${tableName}] table has been truncated.`);
            } else {
                console.log(`The table [${tableName}] table has now rows. Skipping truncate.`);
            }

        } else {
            console.log(`The table [${tableName}] table does not exist. Skipping truncate.`);
        }

    } catch (err) {
        console.error(err.message);
        return;
    }

};

/** 
 * Drops the specifed table if it exists
 */
const dropTable = async (tableName) => {

    if(!tableName) return;

    try{

        await db.query(`
            DROP TABLE IF EXISTS ${tableName};   
        `);  

        console.log(`The table [${tableName}] has been dropped.`);


    } catch (err) {

        console.error(err);
        return;

    }

};

/**
 * Creates a table in the DB
 */
const createTable = async (ddlString, tableName) => {

    if(!tableName) return;

    try {

        await db.query(ddlString);

        console.log(`The table [${tableName}] has been created.`);


    } catch (err) {
        console.error(`Table: ${tableName}, Error: ${err.message}`);
        return;
    }

};

/**
 * Tears down any existing DB that might be around - DO NOT run in production if the 
 * database has already been setup, as this will remove all data
 */
const teardown = async () => {

    console.log('-----------------------------------');
    console.log('TEARDOWN')
    console.log('-----------------------------------');

    // users
    try{

        await truncateTable('users');

        await dropTable('users');

    } catch(err) {
        console.log(err.message);
        return;
    }

};

/**
 * Creates the initial empty database sturcture
 */
const setup = async () => {

    console.log('-----------------------------------');
    console.log('SETUP')
    console.log('-----------------------------------');

    try{

       /* Create each of the tables in the correct order */
       for(let i = 0; i < tableDDL.length; i++){
            await createTable(tableDDL[i].tblStmt, tableDDL[i].name);

            /** add the sequences */
            await db.query(tableDDL[i].seqStmt);
       }
      
    } catch(err) {
        console.error(err.message);
        return;
    }


};

/**
 * Seeds the DB with inital data
 */
const seed = async () => {

    console.log('-----------------------------------');
    console.log('SEED')
    console.log('-----------------------------------');

    try{

        let result;

       /* Insert the seed data in the correct order */
       for(let i = 0; i < seedData.length; i++){
            
            /* Build up the statement */
            let stmt = `INSERT INTO ${seedData[i].table} (${seedData[i].columns}) VALUES `;

            for(let x = 0; x < seedData[i].data.length; x++){
                stmt += '(';
                
                let index = 0;
                for (let value in seedData[i].data[x]){

                    /* Dont append a comma to the string if it's the last element */
                    let seedLength = Object.keys(seedData[i].data[x]).length - 1;
                    
                    if(index !== seedLength){
                        /* Determine if we need to encase the value in quotes as it's a string */
                        if(typeof seedData[i].data[x][value] === "string"){
                            stmt += `'${seedData[i].data[x][value]}',`;
                        } else {
                            stmt += `${seedData[i].data[x][value]},`;
                        }
                    } else {
                        /* Determine if we need to encase the value in quotes as it's a string */
                        if(typeof seedData[i].data[x][value] === "string"){
                            stmt += `'${seedData[i].data[x][value]}'`;
                        } else {
                            stmt += `${seedData[i].data[x][value]}`;
                        }
                    }

                    index++;

                }
                
                /* Have we reached the end of the data to be inserted? if so don't append a comman to the end */
                if(x === (seedData[i].data.length - 1)){
                    stmt += ')';
                } else {
                    stmt += '),';
                }

            }

            /* Finally execute the statement */
            result = await db.query(stmt);
            
            if(result?.rowCount > 0){
                console.log(`The table [${seedData[i].table}] has been seeded with ${result.rowCount} records.`);
            }

       }
      
    } catch(err) {
        console.error(err.message);
        return;
    }


};

/* execute the database creation scripts */
(async () => {

    console.log('-----------------------------------');
    console.log(`Health Tracker v1 schema setup`);
    console.log('-----------------------------------');
    console.warn('Only run this once in production and never against an established project.');
    console.warn('It will remove any and all existing data and database structure.');
    console.warn('You have been warned.');
    console.log();

    await teardown();
    console.log();
    await setup();
    console.log();
    await seed();
    console.log();
})();