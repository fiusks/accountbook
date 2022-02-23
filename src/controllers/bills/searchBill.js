const knex = require("../../database/connection");
const { searchBillSchema } = require("../../validation/billsSchema");

const searchBill = async (req, res) => {
  await searchBillSchema.validate(req.body.bill);
  try {
    const { params, category } = req.body.bill;

    if (category === "searchById") {
      const response = await knex("bills").where({ id: params });

      if (response.length === 0) {
        return res.status(404).json({ message: "Bill not found" });
      }
      return res.status(200).json(response);
    } else {
      const response = await knex("bills").where({ name: params });
      if (response.length === 0) {
        return res.status(404).json({ message: "Bill not found" });
      }
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = searchBill;
