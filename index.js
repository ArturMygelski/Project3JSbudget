const ballance = document.querySelector(".ballance.value");
const totalInccomes = document.querySelector("totalInc");
const totalExppenses = document.querySelector("totalExp");
const income = document.querySelector("income");
const expense = document.querySelector("expense");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");

const incomeAdd = document.querySelector(".addInc");
const incomeTitle = document.querySelector("income-title");
const incomeAmt = document.querySelector(".income-amt");
const expenseAdd = document.querySelector(".addExp");
const expenseTitle = document.querySelector("expense-title");
const expenseAmt = document.querySelector(".expense-amt");

let ENTRY_LIST;
let balance = 0,
  incomes = 0,
  expenses = 0;
const DELETE = "Usuń",
  EDIT = "Edytuj";

addInc.addEventListener("click", () => {
  let income = {
    type: "income",
    title: incomeTitle,
    value: parseInt(incomeAmt.value),
  };
  ENTRY_LIST.push(income);
  updateUI();
  clearInput([incomeTitle, incomeAmt]);
});
addInc.addEventListener("click", () => {
  let expense = {
    type: "expense",
    title: expenseTitle,
    value: parseInt(expenseAmt.value),
  };
  ENTRY_LIST.push(expense);
  updateUI();
  clearInput([expenseTitle, expenseAmt]);
});

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);

function deleteOrEdit(event) {
  const targetBtn = event.target;

  const entry = targetBtn.parentNode;

  if (targetBtn.id == DELETE) {
    deleteEntry(entry);
  } else if (targetBtn.id == EDIT) {
    editEntry(entry);
  }
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1);

  updateUI();
}

function editEntry(entry) {
  console.log(entry);
  let ENTRY = ENTRY_LIST[entry.id];

  if (ENTRY.type == "income") {
    incomeAmount.value = ENTRY.amount;
    incomeTitle.value = ENTRY.title;
  } else if (ENTRY.type == "expense") {
    expenseAmount.value = ENTRY.amount;
    expenseTitle.value = ENTRY.title;
  }

  deleteEntry(entry);
}

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("expense", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));
  balance.innerHTML = "${balance}";
  totalInccomes.innerHTML = "${totalInc}";
  otalExppenses.innerHTML = "${totalExp}";

  clearElement([expenseList, incomeList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }
    showEntry(entry.type, entry.title, entry.amount, index);
  });

  localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id) {
  const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

  const position = "afterbegin";

  list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });

  return sum;
}

function calculateBalance(totalInc, totalExp) {
  return totalInc - totalExp;
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

// const totalInc = [];
// const totalExp = [];

// const income = (title, amount) => {
//   let listContent = document.createElement("div");
//   listContent.classList.add("lis-content", "flex-space");
//   listContent.appendChild(listContent);
//   listContent.innerHTML = `<p class="income">${incomeName}</p><p class="amount">${incomeValue}</p>`;
//   let buttonEdit = document.createElement("button");
//   buttonEdit.addEventListener("click", () => {
//     modifyElement(buttonEdit, true);
//   });
//   let buttonDelete = document.createElement("button");
//   buttonDelete.addEventListener("click", () => {
//     modifyElement(buttonDelete);
//   });
//   listContent.appendChild(buttonEdit);
//   listContent.appendChild(buttonDelete);
//   document.getElementById("list").appendChild(listContent);
// };

// addInc.addEventListener("click", () => {
//   const income = {
//     income.id = element.id;
//     income.value = document.getElementById("incomeAmt")[]0.value;
//     income.appendChild(title);

//     return income;
//   }};
//   module.export = addInc;
// )

// addInc.addEventListener("click", (e) => {
//   const income = document.createElement("income");
//   income.id = element.id;
//   income.value = document.getElementById("incomeAmt")[0].value;
//   const buttonEdit = document.createElement("button");
//   buttonEdit.innerText = "Edytuj";
//   const buttonDelete = document.createElement("button");
//   buttonDelete.innerText = "Usuń";
//   income.appendChild(id);
//   income.appendChild(value);
//   income.appendChild(buttonEdit);
//   income.appendChild(buttonDelete);
//   return income;
// });
// module.export = incomeAdd;

// expenseAdd.addEventListener("click", () => {
//   const expense = document.createElement("expense");
//   expense.id = element.id;
//   expense.value = element.value;
//   const buttonEdit = document.createElement("button");
//   buttonEdit.innerText = "Edytuj";
//   const buttonDelete = document.createElement("button");
//   buttonDelete.innerText = "Usuń";
//   expense.appendChild(title);
//   expense.appendChild(amount);
//   expense.appendChild(buttonEdit);
//   expense.appendChild(buttonDelete);
//   return expense;
// });
// module.export = expenseAdd;

// buttonEdit.addEventListener("click", () => {
//   editItem(element);
// });

// buttonDelete.addEventListener("click", () => {
//   deleteItem(element);
// });

// console.log(listItem);

// module.export = createElement;

// const editItem = (element) => {
//   console.log(element);
// };

// const deleteItem = (element) => {
//   console.log(element);
//   inputInc.forEach((item) => console.log(item.id === element.id));
// };

// export default listInc;

// const totalInc = () [
//     {title:

//     }
// ]

// const budgetSum = () => {

//       const totalInc = income.find((item) => item.code === selectedValue);
//       const totalExp = expenses.find((item) => item.code === selectedValue);
//       result.value = (totalInc.value - totalExp.value).toFixed(2);
//     }
//     .catch((err) => console.log(err));
// const listInc = document.querySelector("newItem");
// const addInc = document.querySelector("addInc");
// const income = document.createElement("income");

// const totalInc = [];
// const totalExp = [];
