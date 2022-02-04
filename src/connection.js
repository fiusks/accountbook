const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-157-15-228.compute-1.amazonaws.com',
        user: 'xlaqwvpmmvponh',
        password: '7b936a02f55596666a2f791e1e6558c0d36aa31173bc77196748ef27ede56045',
        database: 'dddom8q67sbv5j'
    }
})

module.exports = knex;