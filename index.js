const ballance = document.querySelector(".ballance.value");
const totalIncomes = document.querySelector(".totalInc");
const totalExpenses = document.querySelector(".totalExp");
const incomesList = document.querySelector("#incomes");
const expensesList = document.querySelector("#expenses");

const incomeAdd = document.querySelector("#addInc");
const incomeTitle = document.querySelector("#income-title");
const incomeAmt = document.querySelector("#income-amt");
const expenseAdd = document.querySelector("#addExp");
const expenseTitle = document.querySelector("#expense-title");
const expenseAmt = document.querySelector("#expense-amt");

var incomes = [];
var expenses = [];

incomeAdd.addEventListener("click", () => {
  const newIncome = {
    type: "income",
    title: incomeTitle.value,
    value: parseInt(incomeAmt.value),
    id: Math.random(),
  };
  incomes.length = 0;
  incomes.push(newIncome);
  renderIncomes();
});

expenseAdd.addEventListener("click", () => {
  const newExpense = {
    type: "expense",
    title: expenseTitle.value,
    value: parseInt(expenseAmt.value),
    id: Math.random(),
  };

  expenses.length = 0;
  expenses.push(newExpense);
  renderExpenses();

  console.log(expenseAdd);
});

const renderIncomes = () => {
  // incomesList.innerHTML = "";
  incomes.forEach((income) => createElement(income));
  console.log(incomes);
};
const renderExpenses = () => {
  // expensesList.innerHTML = "";
  expenses.forEach((expense) => createElement(expense));
};

const createElement = (item) => {
  const li = document.createElement("li");
  li.id = item.id;
  const p = document.createElement("p");
  p.innerText = `${item.title} :  ${item.value} PLN`;
  const deletBtn = document.createElement("button");
  deletBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deletBtn.id = "btn_delete";
  // incomes.length = 0;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.id = "btn_edit";
  li.appendChild(p);
  li.appendChild(deletBtn);
  li.appendChild(editBtn);

  if (item.type === "income") {
    incomesList.appendChild(li);
  } else {
    expensesList.appendChild(li);
  }
};

//   editBtn.addEventListener("click", () => {
//     editItem(item);

//   deletBtn.addEventListener("click", () => {
//     deleteItem(item);
//   });
// };

// var add = incomes.reduce(function (previousValue, currentValue) {
//   return { value: previousValue.value + currentValue.value };
// });

// incomes.map((item) => item.value).reduce((prev, next) => prev + next);

// }
// incomes.reduce((accumulator, object) => {
//   return accumulator + object.value;
// // }, 0);

// const sum = incomes.reduce((acc, 0) => acc + parseInt(newIncome.value), 0);

let sum = 0;

incomes.forEach((element) => {
  sum += parseInt(element.value);
});

console.log(sum);

// reset.addEventListener("click", () => {
//   var incomes = [];
//   var expenses = [];
//   renderIncomes();
//   renderExpenses();
// });
// module.export = totalIncomes;

// const calculateTotal("incomes");
// totalExpenses = calculateTotal("expenses");
// ballance = Math.abs(calculateBalance(incomes, expenses));
// balance.innerHTML = "{balance}";
// totalInccomes.innerHTML = "{totalInc}";
// totalExppenses.innerHTML = "{totalExp}";

//   clearElement([expensesList, incomesList]);
// }

// function calculateBalance(totalInc, totalExp) {
//   return totalInc - totalExp;
// }

// {

// function deleteOrEdit(event) {
//   const targetBtn = event.target;

//   const entry = targetBtn.parentNode;

// if (targetBtn.id == DELETE) {
//   deleteEntry(entry);
// } else if (targetBtn.id == EDIT) {
//   editEntry(entry);
// }
// }

// function deleteEntry(entry) {
//   ENTRY_LIST.splice(entry.id, 1);

//   clearElement([expenseList, incomeList]);

// function clearElement(elements) {
//   elements.forEach((element) => {
//     element.innerHTML = "";
//   });
// }

// function calculateTotal(type, list) {
//   let sum = 0;

//   list.forEach((entry) => {
//     if (entry.type == type) {
//       sum += entry.amount;
//     }
//   });

//   return sum;
// }

// function calculateBalance(totalInc, totalExp) {
//   return totalInc - totalExp;
// }

// buttonEdit.addEventListener("click", () => {
//   editItem(element);
// });

// buttonDelete.addEventListener("click", () => {
//   deleteItem(element);
// // });

// // console.log(listItem);

// // module.export = createElement;

// // const editItem = (element) => {
// //   console.log(element);
// // };

// // const deleteItem = (element) => {
// //   console.log(element);
// //   inputInc.forEach((item) => console.log(item.id === element.id));
// // };

// // export default listInc;

// // const totalInc = () [
// //     {title:

// //     }
// // ]

// // const budgetSum = () => {

// //       const totalInc = income.find((item) => item.code === selectedValue);
// //       const totalExp = expenses.find((item) => item.code === selectedValue);
// //       result.value = (totalInc.value - totalExp.value).toFixed(2);
// //     }
// //     .catch((err) => console.log(err));
// // const listInc = document.querySelector("newItem");
// // const addInc = document.querySelector("addInc");
// // const income = document.createElement("income");

// // const totalInc = [];
// // const totalExp = []
