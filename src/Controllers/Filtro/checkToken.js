const jwt = require('jsonwebtoken');
const knex = require('../../connection');
const secret = require('../config');

const checkToken = async (req, res, next) => {

    const { authorization } = req.headers;

    if (authorization === "Bearer") {
        return res.status(400).json({message: 'Token não informado.'});
    } else {

        try {
            
            const token = authorization.split(" ")[1];
            const { id } = jwt.verify(token, secret);
    
            
            
            if (!id) {
                return res.status(400).json({mensagem: 'Token inválido.'});
            
            } else {
                
                const findUser = await knex('usuarios').where({id});
               
                findUser.length > 0 ?
                    next() :
                    res.status(404).json({
                    message: "Usuário não encontrado"
                });
            };
        
        } catch (error) {
            res.status(400).json(error);
        };
    };
};

module.exports = checkToken;