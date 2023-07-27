const db = require("../db");

module.exports.getAllEmployees = async () => {
  const [record] = await db.query("SELECT * FROM employee_info");
  return record;
};

module.exports.getEmployeeById = async (id) => {
  const [records] = await db.query(
    "SELECT * FROM employee_info WHERE emp_id = ?",
    [id]
  );
  return records;
};

module.exports.deleteEmployeeById = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE  FROM employee_info WHERE emp_id = ?",
    [id]
  );
  return affectedRows;
};

module.exports.addEmployee = async (obj) => {
  console.log(obj.emp_name);
  console.log(obj.emp_mobile);
  const [{ affectedRows }] = await db.query(
    "INSERT INTO employee_info (`emp_name`,`emp_mobile`) VALUES (?,?)",
    [obj.emp_name, obj.emp_mobile]
  );
  return affectedRows;
};
