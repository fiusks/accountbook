const knex = require('../connection');
const jwt = require('jsonwebtoken')
const secret = require('./config')

const checkLogin = async (req, res) => {

    const { authorization } = req.headers;

    if (authorization === "Bearer") {
        return res.status(400).json({
            token: 'Token não informado.'
        });

    } else {
        try {
            
            const token = authorization.split(" ")[1]
            const { id, nome, email, cpf, telefone } = jwt.verify(token, secret);
    
            const userData = {
                id: id,
                nome: nome,
                email: email,
                cpf: cpf,
                telefone: telefone
            };
            
            if (!email) {
                return res.status(400).json({token: 'Token inválido.'});
            
            } else {
                
                const findUser = await knex('usuarios').where({ id });
                
                findUser.length > 0?
                    res.status(200).json({
                        validToken: true,
                        dados_do_usuario: userData
                    }):
                    res.status(404).json({
                        message: "Usuário não encontrado"
                    });
            }
        
            
            
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

}


module.exports = {
    checkLogin,
}