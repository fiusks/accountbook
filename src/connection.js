// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'xlaqwvpmmvponh',
//     host: 'ec2-54-157-15-228.compute-1.amazonaws.com',
//     database: 'dddom8q67sbv5j',
//     password: '7b936a02f55596666a2f791e1e6558c0d36aa31173bc77196748ef27ede56045',
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

// const query = (text, param) => {
//     return pool.query(text, param);
// }


// module.exports = {
//     query
// }

const knex = require('knex')({
    client: 'pg',
    version: '^8.7.1',
    connection: {
        host: 'ec2-54-157-15-228.compute-1.amazonaws.com',
        port: 5432,
        user: 'xlaqwvpmmvponh',
        password: '7b936a02f55596666a2f791e1e6558c0d36aa31173bc77196748ef27ede56045',
        database: 'dddom8q67sbv5j',
        ssl: { 
                  rejectUnauthorized: false 
             }
    }
})

module.exports = knex;