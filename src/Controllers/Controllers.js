
const connection = require('../connection');

const test = async (req,res) => {
    const {rows} = await connection.query('select * from usuarios');
    res.json({ mensagem: '(hml) deu tudo certo!', rows});
}


module.exports = {
    test,

}