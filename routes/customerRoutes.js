const express = require("express");
const fs = require('fs')

const router = express.Router();

const customerController = require("../controllers/customerController")

router.route("/").get(customerController.getCustomersData).post(customerController.createCustomers);
router
  .route("/:id")
  .get(customerController.getCustomersData)
  .patch(customerController.getCustomersDataById)
  .delete(customerController.deletedata);

module.exports = router;
