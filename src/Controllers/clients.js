const knex = require('../connection');
const yup = require('yup')
const jwt = require('jsonwebtoken')
const secret = require('./config')

// const registerClient = async(req, res) => {
    
//     console.log('ok1')
//     const schema = yup.object().shape({
//         nome: yup.string().required("O nome precisa ser informado."),
//         email: yup.string().email().required("O E-mail precisa ser informado."),
//         cpf: yup.number().min(11).required("O cpf precisa ser informado."),
//         telefone: yup.number().min(10).required("O Telefone precisa ser informado."),
//         endereco: yup.string(),
//         complemento: yup.string(),
//         cep: yup.number(),
//         bairro: yup.string(),
//         cidade: yup.string(),
//         estado_UF: yup.string()
//     });

//     try {

//         await schema.validate(req.body)
        
//         const clientData = {
//             nome: nome,
//             email: email,
//             cpf: cpf,
//             telefone: telefone,
//             endereco_id: null
//         }
//         const verificacaoDeEmailDeCliente = await knex('clientes').where('email', email).debug();
        
//         if (verificacaoDeEmailDeCliente.length > 0) {
//             res.status(400).json({mensagem: "E-mail já cadastrado no banco de dados"});
//         } else {
//             const clientRegistered = await knex('clientes').insert(clientData).debug();
//             res.status(200).json(clientRegistered);

//         }

//         const { 
//             nome, 
//             email, 
//             cpf, 
//             telefone, 
//             endereco: logradouro, 
//             complemento, 
//             cep, 
//             bairro, 
//             cidade, 
//             UF 
//         } = req.body;
        
//         // ) 
//         if ( logradouro || complemento || cep || bairro || cidade || UF ){
//             const search = []
//             const addresData = {
//                 logradouro: logradouro?logradouro:null,
//                 complemento: complemento?complemento:null,
//                 cep: cep?cep:null,
//                 bairro: bairro?bairro:null,
//                 cidade: cidade?cidade:null,
//                 estado: UF?UF:null
//             };
//             if (logradouro) {
//                 return search.push('logradouro');
//             } else if (complemento) {
//                 return search.push('complemento');
//             } else if (cep) {
//                 return search.push('cep');
//             } else if (bairro) {
//                 return search.push('bairro');
//             }  else if (cep) {
//                 return search.push('cidade');
//             } else if (UF) {
//                 return search.push('UF');
//             }

//             const insertAddres = await knex('enderecos').insert(addresData).debug();
//             const searchAddresID = await knex('enderecos').where(`${search[0]}`, )
//             res.status(200).json(insertAddres);

//         } 

//     } catch (error) {
//         res.status(400).json(error.message);
//     }

// }

// const editClient = async(req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

// module.exports = { 
//     registerClient,
//     editClient,
// }