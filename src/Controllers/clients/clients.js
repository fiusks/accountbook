const knex = require('../../connection');
const yup = require('yup')
const jwt = require('jsonwebtoken')
const secret = require('../config')

//Support Functions VVV
const registerAddresId = async ( [logradouro, complemento, cep, bairro, cidade, estado] ) => {

    const addresObject = {
        
        logradouro: logradouro?logradouro:null,
        complemento: complemento?complemento:null,
        cep: cep?cep:null,
        bairro: bairro?bairro:null,
        cidade: cidade?cidade:null,
        estado: estado?estado:null
    };
    
    const lastValueAddresIndex = await knex('enderecos');
    addresObject.id = ++lastValueAddresIndex.length;

    const insertAddres = await knex('enderecos').insert(addresObject);

    return addresObject.id
};

const schemaForClient = async (body) => {
    const schema = yup.object().shape({
        nome: yup.string().required("O nome precisa ser informado."),
        email: yup.string().email().required("O E-mail precisa ser informado."),
        cpf: yup.number().required("O cpf precisa ser informado."),
        telefone: yup.number().required("O Telefone precisa ser informado."),
        endereco: yup.string(),
        complemento: yup.string(),
        cep: yup.string(),
        bairro: yup.string(),
        cidade: yup.string(),
        UF: yup.string()
    });

    

    return await schema.validate(body);
}

//Support FUnctions /\/\/\

const registerClient = async(req, res) => {
    
    const { 
        nome, 
        email, 
        cpf, 
        telefone, 
        endereco: logradouro, 
        complemento, 
        cep, 
        bairro, 
        cidade, 
        UF: estado 
    } = req.body;    

    try {

        await schemaForClient(req.body);
        
        const clientData = {
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            endereco_id: null
        }
        const verificacaoEmailCliente = await knex('clientes').where({ email });
        const verificacaoCPFCliente = await knex('clientes').where({ cpf });
        
        if (verificacaoEmailCliente.length > 0) {

            return res.status(400).json({
                email: `E-mail já cadastrado.`
            });

        } else if (verificacaoCPFCliente.length > 0) {
            return res.status(400).json({
                cpf: 'CPF já cadastrado.'
            })

        } else {
            const clientRegistered = await knex('clientes').insert(clientData);
        }
        
        if ( logradouro ||  complemento || cep || bairro || cidade || estado ) {
            
            const addresId = await 
            registerAddresId( [logradouro, complemento, cep, bairro, cidade, estado] );

            const updateClientAddres = await 
                knex('clientes')
                .where({ email })
                .update({endereco_id:addresId});
            
            if (!updateClientAddres) {
                return res.status(400).json({
                    enderecoCompleto: "Endereço não Cadastrado."
                });
            }
        }
        const foundClient = await knex('clientes').where({ email }).first();

        res.status(200).json({
            sucess: "Cliente Cadastrado Com sucesso",
            New_Client: foundClient
        })
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const editClient = async(req, res) => {
    
    try {
        
    } catch (error) {
        
    }
}

const editAddres = async(req, res) => {

}

module.exports = { 
    registerClient,
    editClient,
    editAddres
}