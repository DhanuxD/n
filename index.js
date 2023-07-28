console.log("Application start");
const express = require("express"),
  app = express();
const bodyParser = require("body-parser");

require("express-async-errors");

const db = require("./db");
const PORT = 3000;
const employeeRouter = require("./controllers/employee.controller");

//middleware
app.use("/api/employees", employeeRouter);
app.use(express.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!..");
});

db.query("SELECT * FROM employee_info")
  .then(() => {
    console.log("Database Connection Success!");
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed. \n" + err);
  });
