const loginSchema = require("./loginSchema");
const newUserSchema = require("./newUserSchema");
const clientSchema = require("./clientSchema");
const { billsSchema, searchBillSchema } = require("./billsSchema");

const validateForm = async (req, res, next) => {
  try {
    if (Object.keys(req.body)[0] === "user") {
      await newUserSchema.validate(req.body.user, {
        abortEarly: false,
      });

      next();
    }

    if (Object.keys(req.body)[0] === "login") {
      await loginSchema.validate(req.body.login, {
        abortEarly: false,
      });
      next();
    }
    if (Object.keys(req.body)[0] === "client") {
      await clientSchema.validate(req.body.client, {
        abortEarly: false,
      });
      next();
    }
    if (Object.keys(req.body)[0] === "bill") {
      await billsSchema.validate(req.body.bill, {
        abortEarly: false,
      });
      next();
    }
    if (Object.keys(req.body)[0] === "filterBill") {
      await searchBillSchema.validate(req.body.filterBill, {
        abortEarly: false,
      });
      next();
    }
  } catch (error) {
    const errorList = {};
    error.inner.forEach((errorField) => {
      errorList[errorField.path] = errorField.errors[0];
    });
    if (errorList) {
      const errorMsg = { [Object.keys(req.body)[0]]: errorList };
      return res.status(400).json(errorMsg);
    }
    return res.status(404).json(error.message);
  }
};

module.exports = validateForm;
