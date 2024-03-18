const fs = require("fs");

// read file json nya
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/dummy.json`)
);

const getCustomers = (req, res, next) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    requestAt: req.requestTime,
    data: {
      customers,
    },
  });
};

const getCustomerById = (req, res, next) => {
  const id = req.params.id;

  // menggunakan array method utk membantu menemukan spesifik data
  const customer = customers.find((cust) => cust._id === id);

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
};

const updateCustomer = (req, res) => {
  console.log("MASUK EDIT GAK");
  const id = req.params.id;

  // 1. melakukan pencarian data yg sesuai parameter id nya
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  console.log(customer);
  console.log(customerIndex);
  console.log(!customer);

  // 2. ada gak data customer nya
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: `customer dengan ID : ${id} gak ada`,
    });
  }

  // 3. kalau ada, berarti update data nya sesuai request body dari client/user
  // object assign = menggabungkan objek OR spread operator
  customers[customerIndex] = { ...customers[customerIndex], ...req.body };

  console.log(customers[customerIndex]);

  // 4. melakukan update di dokumen json nya
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil update data",
      });
    }
  );
};

const deleteCustomer = (req, res) => {
  const id = req.params.id;

  // 1. melakukan pencarian data yg sesuai parameter id nya
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  // 2. ada gak data customer nya
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: `customer dengan ID : ${id} gak ada`,
    });
  }

  // 3. kalau ada, berarti delete data nya
  customers.splice(customerIndex, 1);

  // 4. melakukan update di dokumen json nya
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
      });
    }
  );
};

const createCustomer = (req, res) => {
  console.log(req.body);

  const newCustomer = req.body;

  customers.push(newCustomer);

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          customer: newCustomer,
        },
      });
    }
  );
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};