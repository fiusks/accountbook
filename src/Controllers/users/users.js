const knex = require('../../connection');
const yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../config');
const e = require('express');

//Support Functions VVV
const verifyEditUserMandatoryData = async (body) => {
    
    const schema = yup.object().shape({
        nome: yup.string().required('Nome precisa ser informado.'),
        email: yup.string().email('E-mail precisa possuir formato válido.').required('E-mail precisa ser informado.')
    })

    return await schema.validate(body)
}
// /\/\/\
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

        const createNewUser = await knex('usuarios').insert(newUser).debug();

        return res.status(200).json({
            sucess: 'Novo Usuario Cadastrado',
            novoUsuario: createNewUser
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const login = async (req, res) => {
    const {email, senha} = req.body;
    const schema = yup.object().shape({
        email: yup.string().email().required("E-mail precisa ser Informado."),
        senha: yup.string().required("Senha precisa ser informada.")
    });
    try {
        await schema.validate(req.body);
        const findUserEmail = await knex('usuarios').where({email});

        if (findUserEmail.length === 0) {
            return res.status(404).json({message: `E-mail não encontrado.`});
        }

        const foundUser = findUserEmail[0];
        const checkPassword = await bcrypt.compare(senha, foundUser.senha);

        
        
        if (!checkPassword) {
            return res.status(401).json({email: `Senha incorreta.`});
        }
        
        const {senha:_, ...userData} = foundUser;
        
        const token = jwt.sign(
            userData, 
            secret,
            {expiresIn: '1d'}
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
    
    const { nome, email, novaSenha, cpf, telefone } = req.body;
    
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const { id, nome: nomeBD, email: emailBD, cpf: cpfBD, telefone: telefoneBD } = jwt.verify(token, secret);
    
    
    try {
        const userEditData = {};
        
        await verifyEditUserMandatoryData(req.body)
        nome === nomeBD?"":userEditData.nome = nome;
        
        if (email !== emailBD && email) {
            
            const verificacaoNovoEmail = await 
            knex('usuarios')
            .where({
                email
            });

            if (verificacaoNovoEmail.length > 0) {

                return res.status(400).json({
                    email: ['E-mail já cadastrado.']
                });

            } else {

                userEditData.email = email;
            }
        }
        if (cpf !== cpfBD && cpf) {
            
            const verificacaoNovoCPF = await 
            knex('usuarios')
            .where({
                cpf
            });

            if (verificacaoNovoCPF.length > 0) {
                
                return res.status(400).json({
                    cpf: ['CPF já cadastrado.']
                });
            };

            userEditData.cpf = cpf;
        };

        if (telefone !== telefoneBD && telefone) {
            
            userEditData.telefone = telefone;
        };
        
        if (novaSenha) {
            
            const novaSenhaEncriptada = await 
            bcrypt.hash(novaSenha, 10);

            userEditData.senha = novaSenhaEncriptada;
        };
        
        const usuarioAtualizado = await 
        knex('usuarios')
        .where({
             id 
            })
        .update(userEditData);

        if (!usuarioAtualizado) {
            return res.status(400).json({
                userEdit: ["Usuário não cadastrado"]
            });
        };

        return res.status(200).json({
            sucess: ["Usuário Editado com sucesso"]
        });

    } catch (error) {
        return res.status(400).json(error.message);
    };
}

module.exports = {
    verifyEmail,
    registerUser,
    login,
    editUser
};