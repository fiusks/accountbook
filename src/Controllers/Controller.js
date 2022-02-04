const knex = require('../connection');
const yup = require('yup')
const bcrypt = require('bcrypt')
const verifyEmail = async (req,res) => {
    const email = req.query.email
    if (!email) {
        const teste2 = await knex('usuarios');
        return res.status(200).json(teste2)
    }
    
    const teste  = await knex('usuarios').where('email', email);
    
    teste.length === 0 ? 
        res.status(200).json({message: 'Ok e-mail is good.'}) : 
        res.status(400).json({message: 'E-mail already exists in database.'});
    
}
const registerUser = async(req, res) => {
    const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        senha: yup.string().required()
    })
    try {
        await schema.validate(req.body)
        const {nome, email, senha} = req.body
        const encryptedPassword = await bcrypt.hash(senha, 10);
        const newUser = {
            nome: nome,
            email: email,
            senha: encryptedPassword 
        }
        const createNewUser = await knex('usuarios').insert(newUser)
        return res.status(200).json({
            message: 'Ok ok ok',
            retornado: createNewUser
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    verifyEmail,
    registerUser,

}