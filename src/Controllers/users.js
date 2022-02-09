const knex = require('../connection');
const yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('./config')

const verifyEmail = async (req,res) => {
    const email = req.query.email
    if (!email) {
        const retornarUsuarios = await knex('usuarios');
        return res.status(200).json(retornarUsuarios) //TEMPORARIO PARA TESTES
    }
    
    const verifyEmailOnDataBase  = await knex('usuarios').where('email', email);
    
    

    res.status(200).json(verifyEmailOnDataBase.length)
    
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
            message: 'Ok New User Registered',
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
        const findUserEmail = await knex('usuarios').where('email', email);

        if (findUserEmail.length === 0) {
            return res.status(404).json({message: `User with E-mail ${email}, not found.`});
        }

        const foundUser = findUserEmail[0];
        const checkPassword = await bcrypt.compare(senha, foundUser.senha);
        
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
            token: token,
            dados_do_usuario: userData  //Forma de passar os dados do usuário para o front sem mais uma requisição
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editUser = async(req, res) => {
    const { nome, email, novaSenha, confirmarSenha, cpf, telefone } = req.body;
    const { id } = req

    if (novaSenha) {
        if (novaSenha !== confirmarSenha) {
            return res.status().json("New password and confirm password must be the same.")
        }
        const schema = yup.object().shape({
            nome: yup.string().required("Name is required to edit a user."),
            email: yup.string().email().required("E-mail is required to edit a user."),
            novaSenha: yup.string().required("Password is required to edit a user."),
            confirmarSenha: yup.string().required("Password is required to edit a user.")
        });
    } else {
        const schema = yup.object().shape({
            nome: yup.string().required("Name is required to edit a user."),
            email: yup.string().email().required("E-mail is required to edit a user.")
        });
    }

    try {
        await schema.validate(req.body);

        const senha = '';

        novaSenha ? senha = await bcrypt.hash(novaSenha, 10) : '';

        if (email !== req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where('email', email);

            if (emailUsuarioExiste.length > 0) {
                return res.status(400).json('The email is already in use.')
            }
        }

        const usuarioAtualizado = await knex('usuarios').where('id', id).update({
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            telefone: telefone
        });

        if (!usuarioAtualizado) {
            return res.status(400).json('The user has not been updated.');
        }

        return res.status(200).json('The user has been successfully updated.');
    } catch (error) {
        return res.status(400).json(error.message);
    };
}

module.exports = {
    verifyEmail,
    registerUser,
    login,
    editUser
}