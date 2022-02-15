const knex = require("../../database/connection");

const verifyEmail =  async (req, res) => {

    const { email } = req.params.email;

    if (email) {
        const emailCheck = await knex('users').where({email}).first();

        emailCheck? res.status(200).json({success: "E-mail disponível"}) : res.status(400).json({success: "NOT"});
    } else {
        res.status(400).json({user: {email: "E-mail não informado"}})
    }
}

module.exports = verifyEmail;