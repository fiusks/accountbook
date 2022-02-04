
const knex = require('../connection');

const test = async (req,res) => {
    const teste = await knex('usuarios');
    res.json({ mensagem: '(hml) deu tudo certo!', teste});
}


module.exports = {
    test,

}