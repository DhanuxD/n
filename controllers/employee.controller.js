const express = require("express"),
  router = express.Router();

bodyParser = require("body-parser");
const db = require("../db");
const service = require("../services/employee.service");
//const { getAllEmployees } = require("../services/employee.service");

//http://localhost:3000/api/employees
router.get("/", async (req, res) => {
  const employees = await service.getAllEmployees();
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const employee = await service.getEmployeeById(req.params.id);
  if (employee.length == 0) {
    res.status(404).json(`no record with given id${req.params.id}`);
  } else {
    res.send(employee);
  }
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteEmployeeById(req.params.id);
  if (affectedRows == 0) {
    res
      .status(404)
      .json(`Already deleted this user by this ${req.params.id} id`);
  } else {
    res.send(`Deleted success this user by this ${req.params.id} id`);
  }
});

router.post("/", async (req, res) => {
  await service.addEmployee(req.body);
  res.status(201).send("Created successfully.");
});
module.exports = router;
