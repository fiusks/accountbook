const knex = require('../connection');
const yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('./config')
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
const registerUser = async (req, res) => {
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
const login = async (req, res) => {
    const {email, senha} = req.body;
    const schema = yup.object().shape({
        email: yup.string().email().required("E-mail is required to Login"),
        senha: yup.string().required("Password is required to Login")
    });
    try {
        await schema.validate(req.body);
        const findUserEmail = await knex('usuarios').where('email', email).debug();

        if (findUserEmail.length === 0) {
            return res.status(404).json({message: `User with E-mail ${email}, not found.`});
        }

        const foundUser = findUserEmail[0];
        const checkPassword = await bcrypt.compare(senha, foundUser.senha);
        console.log(checkPassword)
        if (!checkPassword) {
            return res.status(401).json({message: `Password doesn't check with E-mail ${email}.`});
        }
        
        const {senha:_, ...userData} = foundUser;
        
        const token = jwt.sign(
            userData, 
            secret,
            {expiresIn: '1h'}
        ); 
        

        return res.status(200).json({
            message: 'Login efetuado com sucesso',
            token: token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    verifyEmail,
    registerUser,
    login

}