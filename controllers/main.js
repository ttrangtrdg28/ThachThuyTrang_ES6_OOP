import { Customer } from "../models/customer.js";
import { Employee } from "../models/employee.js";
import { Student } from "../models/student.js";
import { ListPerson } from "../services/listPerson.js";

window.onload = () => {
  getLocalStorage();
  renderTable();
};

const listPerson = new ListPerson();

const getEle = (id) => document.getElementById(id);
const getQuery = (selector) => document.querySelector(selector);
var numberFormat = new Intl.NumberFormat("VN-vn");

getQuery(".form-control#mediumScore").disabled = true;
getQuery(".form-control#totalSalary").disabled = true;

const setLocalStorage = () => {
  const stringtify = JSON.stringify(listPerson.listPerson);

  localStorage.setItem("listPerson", stringtify);
};

const getLocalStorage = () => {
  const stringtify = localStorage.getItem("listPerson");

  if (stringtify) {
    listPerson.listPerson = JSON.parse(stringtify);
  }
};

const showHideInput = (type) => {
  if (type === "student") {
    getQuery(".form-group.math").style.display = "block";
    getQuery(".form-group.physics").style.display = "block";
    getQuery(".form-group.chemistry").style.display = "block";
    getQuery(".form-group.mediumScore").style.display = "block";
    getQuery(".form-group.workingDays").style.display = "none";
    getQuery(".form-group.salaryPerDay").style.display = "none";
    getQuery(".form-group.totalSalary").style.display = "none";
    getQuery(".form-group.company").style.display = "none";
    getQuery(".form-group.invoiceValue").style.display = "none";
    getQuery(".form-group.evaluate").style.display = "none";
    getEle("calculate").style.display = "block";
    getEle("calculate").innerHTML = "Average Score";
    getEle("addPerson").innerHTML = "Save and Average Score";
  } else if (type === "employee") {
    getQuery(".form-group.math").style.display = "none";
    getQuery(".form-group.physics").style.display = "none";
    getQuery(".form-group.chemistry").style.display = "none";
    getQuery(".form-group.mediumScore").style.display = "none";
    getQuery(".form-group.workingDays").style.display = "block";
    getQuery(".form-group.salaryPerDay").style.display = "block";
    getQuery(".form-group.totalSalary").style.display = "block";
    getQuery(".form-group.company").style.display = "none";
    getQuery(".form-group.invoiceValue").style.display = "none";
    getQuery(".form-group.evaluate").style.display = "none";
    getEle("calculate").style.display = "block";
    getEle("calculate").innerHTML = "Payroll";
    getEle("addPerson").innerHTML = "Save and Payroll";
  } else if (type === "customer") {
    getQuery(".form-group.math").style.display = "none";
    getQuery(".form-group.physics").style.display = "none";
    getQuery(".form-group.chemistry").style.display = "none";
    getQuery(".form-group.mediumScore").style.display = "none";
    getQuery(".form-group.workingDays").style.display = "none";
    getQuery(".form-group.salaryPerDay").style.display = "none";
    getQuery(".form-group.totalSalary").style.display = "none";
    getQuery(".form-group.company").style.display = "block";
    getQuery(".form-group.invoiceValue").style.display = "block";
    getQuery(".form-group.evaluate").style.display = "block";
    getEle("calculate").style.display = "none";
    getEle("addPerson").innerHTML = "Save";
  }
};

const renderTable = (data = listPerson.listPerson) => {
  const person = data.reduce((total, element, index, array) => {
    const {
      id,
      name,
      address,
      email,
      type,
      math,
      physics,
      chemistry,
      workingDays,
      salaryPerDay,
    } = element;

    let mediumScore =
      (parseFloat(math) + parseFloat(physics) + parseFloat(chemistry)) / 3;
    let totalSalary = workingDays * salaryPerDay;

    total += `<tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${id}</td>
                <td>${email}</td>
                <td>${type}</td>
                <td align="right">${
                  type === "student" ? mediumScore.toFixed(2) : "-"
                }</td>
                <td align="right">${
                  type === "employee" ? numberFormat.format(totalSalary) : "-"
                }</td>
                <td align="center">
                  <button 
                    onclick="openUpdateModal('${id}')"
                    data-toggle="modal"
                    data-target="#modalPerson"
                    class="btn btn-info"
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button 
                    class="btn btn-danger" 
                    onclick="detele('${id}')"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>`;

    return total;
  }, "");
  getEle("tblPerson").innerHTML = person;
};

const getStudentValues = () => {
  const id = getEle("id").value;
  const name = getEle("name").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const type = getEle("type").value;
  const math = getEle("math").value;
  const physics = getEle("physics").value;
  const chemistry = getEle("chemistry").value;

  const student = new Student(
    name,
    address,
    id,
    email,
    type,
    math,
    physics,
    chemistry
  );

  return student;
};

const getEmployeeValues = () => {
  const id = getEle("id").value;
  const name = getEle("name").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const type = getEle("type").value;
  const workingDays = getEle("workingDays").value;
  const salaryPerDay = getEle("salaryPerDay").value;
  console.log(salaryPerDay);

  const employee = new Employee(
    name,
    address,
    id,
    email,
    type,
    workingDays,
    salaryPerDay
  );

  return employee;
};

getEle("createNew").onclick = () => {
  getEle("modalPersonLabel").innerHTML = "Create new person";
  getEle("updatePerson").style.display = "none";
  getEle("addPerson").style.display = "block";
  getEle("type").disabled = false;
  getEle("id").value = "";
  getEle("name").value = "";
  getEle("address").value = "";
  getEle("email").value = "";
  getEle("type").selectedIndex = 0;
  getEle("math").value = "";
  getEle("physics").value = "";
  getEle("chemistry").value = "";
  getEle("workingDays").value = "";
  getEle("salaryPerDay").value = "";
  getEle("company").value = "";
  getEle("invoiceValue").value = "";
  getEle("evaluate").value = "";
};

getEle("type").onchange = () => {
  const type = getEle("type").value;
  showHideInput(type);
};

//1) Thêm người dùng vào danh sách
getEle("addPerson").onclick = () => {
  const id = getEle("id").value;
  const name = getEle("name").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const type = getEle("type").value;

  let newPerson;
  if (type === "student") {
    const math = getEle("math").value;
    const physics = getEle("physics").value;
    const chemistry = getEle("chemistry").value;

    newPerson = new Student(
      name,
      address,
      id,
      email,
      type,
      math,
      physics,
      chemistry
    );
  } else if (type === "employee") {
    const workingDays = getEle("workingDays").value;
    const salaryPerDay = getEle("salaryPerDay").value;

    newPerson = new Employee(
      name,
      address,
      id,
      email,
      type,
      workingDays,
      salaryPerDay
    );
  } else if (type === "customer") {
    const company = getEle("company").value;
    const invoiceValue = getEle("invoiceValue").value;
    const evaluate = getEle("evaluate").value;

    newPerson = new Customer(
      name,
      address,
      id,
      email,
      type,
      company,
      invoiceValue,
      evaluate
    );
  }

  console.log(newPerson);
  listPerson.add(newPerson);

  setLocalStorage();
  renderTable();
  getEle("close").click();
};

//2) Xóa 1 người dùng khỏi danh sách theo mã
window.detele = (id) => {
  listPerson.delete(id);

  setLocalStorage();
  renderTable();
};

window.openUpdateModal = (idPerson) => {
  getEle("updatePerson").style.display = "block";
  getEle("addPerson").style.display = "none";
  getEle("type").disabled = true;

  const person = listPerson.findById(idPerson);

  const {
    name,
    address,
    id,
    email,
    type,
    math,
    physics,
    chemistry,
    workingDays,
    salaryPerDay,
    company,
    invoiceValue,
    evaluate,
  } = person;

  getEle("modalPersonLabel").innerHTML = "Update User";
  showHideInput(type);

  getEle("type").value = type;
  getEle("id").value = id;
  getEle("name").value = name;
  getEle("address").value = address;
  getEle("email").value = email;
  getEle("math").value = math;
  getEle("physics").value = physics;
  getEle("chemistry").value = chemistry;
  getEle("workingDays").value = workingDays;
  getEle("salaryPerDay").value = salaryPerDay;
  getEle("company").value = company;
  getEle("invoiceValue").value = invoiceValue;
  getEle("evaluate").value = evaluate;

  const student = getStudentValues();
  getEle("mediumScore").value = student.mediumScore().toFixed(2);

  const employee = getEmployeeValues();
  getEle("totalSalary").value = numberFormat.format(employee.totalSalary());
};

//3) Cập nhật thông tin người dùng
getEle("updatePerson").onclick = (person) => {
  const id = getEle("id").value;
  const name = getEle("name").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const type = getEle("type").value;

  if (type === "student") {
    const math = getEle("math").value;
    const physics = getEle("physics").value;
    const chemistry = getEle("chemistry").value;

    person = new Student(
      name,
      address,
      id,
      email,
      type,
      math,
      physics,
      chemistry
    );
  } else if (type === "employee") {
    const workingDays = getEle("workingDays").value;
    const salaryPerDay = getEle("salaryPerDay").value;

    person = new Employee(
      name,
      address,
      id,
      email,
      type,
      workingDays,
      salaryPerDay
    );
  } else if (type === "customer") {
    const company = getEle("company").value;
    const invoiceValue = getEle("invoiceValue").value;
    const evaluate = getEle("evaluate").value;

    person = new Customer(
      name,
      address,
      id,
      email,
      type,
      company,
      invoiceValue,
      evaluate
    );
  }

  listPerson.update(person);

  setLocalStorage();
  renderTable();
  getEle("close").click();
};

//4) Sắp xếp danh sách theo thứ tự họ tên
getEle("sortByName").onclick = () => {
  const arr = listPerson.listPerson;
  arr.sort((a, b) => a.name.localeCompare(b.name));

  renderTable(arr);
};

//5) Lọc danh sách người dùng theo loại người dùng
getEle("searchType").onchange = () => {
  const type = getEle("searchType").value;

  const dataSearch = listPerson.filterByType(type);
  // console.log(dataSearch);
  renderTable(dataSearch);
};

getEle("calculate").onclick = () => {
  //6) Người dùng học viên sẽ có tính năng tính điểm trung bình
  const student = getStudentValues();
  getEle("mediumScore").value = student.mediumScore().toFixed(2);

  //7) Người dùng Giảng viên sẽ có tính năng tính lương
  const employee = getEmployeeValues();
  getEle("totalSalary").value = numberFormat.format(employee.totalSalary());
};
