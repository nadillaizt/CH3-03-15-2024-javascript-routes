const express = require("express");
const fs = require("fs");

// read file JSON
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/dummy_data.json`)
);

const getCustomersData = (req, res, next) => {
  res.status(200).json({
    status: "succes",
    totaldata: customers.length,
    requestAt: req.requestTime,
    data: {
      customers,
    },
  });
};

// mengambil data
const getCustomersDataById = (req, res, next) => {
  const id = req.params.id;

  // menggunakan array method utk membantu menemukan spesifik data
  const customer = customers.find((cust) => cust._id === id);

  // shortcut memanggil objek
  // cont (id, name, date) = req.params;
  // console.log(id);

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
};

// update data
const updateCustomers = (req, res) => {
  const id = req.params.id;

  // 1.melakukan pencarian data
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  // 2. ada gak datanya
  if (!customer) {
    return res.status(404).JSON({
      status: "fail",
      message: `custommer dengan ID : ${id} gak ada`,
    });
  }

  // 3. kalau ada, berarti update datanya sesuai reques body dari user
  // object assign = menggabungkan object or spread operator

  customers[customerIndex] = { ...customers[customerIndex], ...req.body };

  // 4. melakukan update di dokumennya
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(200).json({
        status: "succes",
        message: "berhasil",
        data: {
          customer: customer[customerIndex],
          customer,
        },
      });
    }
  );
};

// menghapus data
const deletedata = (req, res) => {
  const id = req.params.id;
  // 1.melakukan pencarian data
  const customer = customers.find((cust) => cust._id === id);
  const customerIndex = customers.findIndex((cust) => cust._id === id);

  // 2. ada gak datanya
  if (!customer) {
    return res.status(404).JSON({
      status: "fail",
      message: `Id : ${id} tidak ditemukan`,
    });
  }

  // 3. kalau ada, berarti delete datanya sesuai reques body dari user
  // object assign = menggabungkan object or spread operator

  // customers[customerIndex] = {...customers[customerIndex], ...req.body}
  customers.splice(customerIndex, 1);

  // 4. melakukan update di dokumennya
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(200).json({
        status: "succes",
        message: "data delete",
      });
    }
  );
};

// menambahkan data
const createCustomers = (req, res) => {
  const newCustomer = req.body;
  customers.push(req.body);
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          customers: newCustomer,
        },
      });
    }
  );

  res.send("oke udah");
};

module.exports = {
  getCustomersData,
  getCustomersData,
  getCustomersDataById,
  createCustomers,
  deletedata,
};
