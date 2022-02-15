const knex = require("../../database/connection");

const verifyEmail =  async (req, res) => {

    const { email } = req.query;

    if (email) {
        const emailCheck = await knex('users').where({email}).first();
        emailCheck? res.status(200).json({success: "E-mail disponível"}):res.status(400).json({success: "NOT"});
    } 
}

module.exports = verifyEmail;