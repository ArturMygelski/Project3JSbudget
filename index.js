const ballance = document.querySelector("#ballance");
const ballanceP = document.querySelector("#ballance-positive");
const totalIncomes = document.querySelector(".totalInc");
const totalExpenses = document.querySelector(".totalExp");
const incomesList = document.querySelector("#incomes");
const expensesList = document.querySelector("#expenses");
const warningI = document.querySelector("#warning-income");
const warningE = document.querySelector("#warning-expense");
const warningB = document.querySelector("#warning-ballance");

const incomeAdd = document.querySelector("#addInc");
const incomeTitle = document.querySelector("#income-title");
const incomeAmt = document.querySelector("#income-amt");
const expenseAdd = document.querySelector("#addExp");
const expenseTitle = document.querySelector("#expense-title");
const expenseAmt = document.querySelector("#expense-amt");
const resetBtn = document.querySelector("#reset");

let incomesArr = [];
let expensesArr = [];

let incomesSum = 0;
let expensesSum = 0;

let editedItem = null;

function totalBallance() {
  if (incomesSum - expensesSum < 0) {
    ballanceP.classList.add("hidden");
    warningB.classList.remove("hidden");
    ballance.classList.add("negative");
    ballance.classList.remove("inplus");
  } else {
    warningB.classList.add("hidden");
    ballanceP.classList.remove("hidden");
    ballance.classList.remove("negative");
    ballance.classList.add("inplus");
  }
  console.log(ballance.value);
}

const sumIncomes = () => {
  incomesSum = incomesArr.reduce((prevValue, currentValue) => {
    return prevValue + parseInt(currentValue.value);
  }, 0);
  totalIncomes.innerHTML = incomesSum;
  ballance.innerHTML = incomesSum - expensesSum;
};
const sumExpenses = () => {
  expensesSum = expensesArr.reduce((prevValue, currentValue) => {
    return prevValue + parseInt(currentValue.value);
  }, 0);
  console.log(expensesArr);
  totalExpenses.innerHTML = expensesSum;
  ballance.innerHTML = incomesSum - expensesSum;
};

function updateIncomes(e) {
  e.preventDefault();
  if (!incomeAmt.value || incomeAmt.value < 0) {
    warningI.classList.remove("hidden");
    setTimeout(() => {
      warningI.classList.add("hidden");
    }, 1500);
    document.getElementById("income-amt").value = "";
  } else {
    const newIncome = {
      type: "income",
      title: incomeTitle.value,
      value: parseInt(incomeAmt.value),
      id: Math.random(),
    };
    incomesArr.push(newIncome);
    sumIncomes();
    totalBallance();
    renderIncomes();
    document.getElementById("income-amt").value = "";
    document.getElementById("income-title").value = "";
    console.log(incomesSum - expensesSum);
  }
}
function updateExpenses(e) {
  e.preventDefault();
  if (!expenseAmt.value || expenseAmt.value < 0) {
    warningE.classList.remove("hidden");
    setTimeout(() => {
      warningE.classList.add("hidden");
    }, 1500);
    document.getElementById("expense-amt").value = "";
  } else {
    const newExpense = {
      type: "expense",
      title: expenseTitle.value,
      value: parseInt(expenseAmt.value),
      id: Math.random(),
    };

    expensesArr.push(newExpense);
    sumExpenses();
    renderExpenses();
    totalBallance();
    document.getElementById("expense-amt").value = "";
    document.getElementById("expense-title").value = "";
    console.log(incomesSum - expensesSum);
  }
}

incomeAdd.addEventListener("click", updateIncomes);
expenseAdd.addEventListener("click", updateExpenses);

const renderIncomes = () => {
  incomesList.innerHTML = "";
  incomesArr.forEach((income) => createElement(income));
};
const renderExpenses = () => {
  expensesList.innerHTML = "";
  expensesArr.forEach((expense) => createElement(expense));
};

const createElement = (item) => {
  const li = document.createElement("li");
  li.id = item.id;
  const p = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteItem);
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.id = "btn_delete";
  p.innerText = `${item.title} :  ${item.value} PLN`;

  const editBtn = document.createElement("button");
  editBtn.addEventListener("click", editIncomes);
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.id = "btn_edit";
  buttonContainer.appendChild(deleteBtn);
  buttonContainer.appendChild(editBtn);
  li.appendChild(p);
  li.appendChild(buttonContainer);

  if (item.type === "income") {
    incomesList.appendChild(li);
  } else {
    expensesList.appendChild(li);
  }

  // deleteBtn.addEventListener("click", (e) => {
  //   let targetId = e.target.parentNode.parentNode.parentNode.id;
  //   incomesArr.getElementById.targetId((item) => item.remove());
  //   e.target.parentNode.parentNode.parentNode.remove();
  //   sumIncomes();
  // });
};

// const deleteItem = (index) => {
//   const { incomesArr } = this.state;
//   this.setState({
//     incomesArr: incomesArr.filter((element, i) => {
//       return i !== index;
//     }),
//   });
// metoda 2
function deleteItem(e) {
  const li = e.target.closest("li");
  const id = li.id;
  incomesArr = incomesArr.filter(
    (element) => String(element.id) !== String(id)
  );
  console.log("id", id);
  console.log("incomesArr", incomesArr);
  li.remove();
  sumIncomes();
}

function editIncomes(e) {
  const li = e.target.closest("li");
  const id = li.id;

  editItem = incomesArr.find((element) => String(element.id) === String(id));

  incomeTitle.value = editItem.title;
  editedItem = id;
}

//   let id = e.target.id;
//   let title = item[id].title;
//   let value = item[id].value;
//   incomesArr.splice(id, 1);
//   updateIncomes();
//   item.title = title;
//   item.value = value;
// }

// editBtn.addEventListener("click", () => {
//   let targetID = e.target.parentNode.parentNode.parentNode.id;
//   editItem(item);

const resetAll = () => {
  incomesArr = [];
  expensesArr = [];

  incomesSum = 0;
  expensesSum = 0;
};

resetBtn.addEventListener("click", () => {
  resetAll();
  sumIncomes();
  sumExpenses();
  totalBallance();
  const listRemove = document.querySelectorAll("ul li");
  listRemove.forEach((item) => item.remove());
});
