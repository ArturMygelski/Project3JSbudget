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
  totalExpenses.innerHTML = expensesSum;
  ballance.innerHTML = incomesSum - expensesSum;
};

function addNewIncomes(e) {
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
  }
}
function addNewExpenses(e) {
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
  }
}

incomeAdd.addEventListener("click", addNewIncomes);
expenseAdd.addEventListener("click", addNewExpenses);

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
  const titleParagraph = document.createElement("span");
  const valueParagraph = document.createElement("span");
  const currencyParagraph = document.createElement("span");
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  titleParagraph.innerText = `${item.title}`;
  valueParagraph.innerText = `${item.value}`;
  currencyParagraph.innerText = `PLN`;
  li.appendChild(titleParagraph);
  li.appendChild(valueParagraph);
  li.appendChild(currencyParagraph);
  li.appendChild(buttonContainer);

  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", (event) => deleteItem(event, item.type));
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.id = "btn_delete";

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  saveBtn.id = "btn_save";
  saveBtn.addEventListener("click", (event) => saveChanges(event, item.type));

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "anuluj";
  cancelBtn.id = "btn_cancel";
  cancelBtn.addEventListener("click", (event) =>
    discardChanges(event, item.type)
  );

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.id = "btn_edit";

  buttonContainer.appendChild(deleteBtn);
  buttonContainer.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    currencyParagraph.style.display = "none";
    titleParagraph.contentEditable = "true";
    titleParagraph.classList.add("editLi");
    valueParagraph.contentEditable = "true";
    valueParagraph.classList.add("editLi");
  });

  () => {
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    titleParagraph.contentEditable = "true";
    valueParagraph.contentEditable = "true";
  };

  if (item.type === "income") {
    incomesList.appendChild(li);
  } else {
    expensesList.appendChild(li);
  }

  function discardChanges(e, itemType) {
    const li = e.target.closest("li");
    const editedItem =
      itemType === "income"
        ? incomesArr.find((element) => String(element.id) === String(li.id))
        : expensesArr.find((element) => String(element.id) === String(li.id));
    editBtn.style.display = "flex";
    deleteBtn.style.display = "flex";
    currencyParagraph.style.display = "flex";
    titleParagraph.contentEditable = "false";
    titleParagraph.innerText = editedItem.title;
    valueParagraph.contentEditable = "false";
    valueParagraph.innerText = editedItem.value;
    li.removeChild(saveBtn);
    li.removeChild(cancelBtn);
    titleParagraph.classList.remove("editLi");
    valueParagraph.classList.remove("editLi");
  }

  const _updateArray = (li, arr) => {
    const editedIndex = arr.findIndex(
      (element) => String(element.id) === String(li.id)
    );

    arr[editedIndex].title = titleParagraph.innerText;
    arr[editedIndex].value = valueParagraph.innerText;
  };

  function saveChanges(e, itemType) {
    const li = e.target.closest("li");

    if (itemType === "income") {
      _updateArray(li, incomesArr);
      renderIncomes();
      sumIncomes();
      totalBallance();
    } else {
      _updateArray(li, expensesArr);
      renderExpenses();
      sumExpenses();
      totalBallance();
    }
  }
};

function deleteItem(e, itemType) {
  const li = e.target.closest("li");
  const id = li.id;

  if (itemType === "income") {
    incomesArr = incomesArr.filter(
      (element) => String(element.id) !== String(id)
    );
    renderIncomes();
    sumIncomes();
  } else {
    expensesArr = expensesArr.filter(
      (element) => String(element.id) !== String(id)
    );
    renderExpenses();
    sumExpenses();
    totalBallance();
  }
}

function editItem(e, itemType) {
  const li = e.target.closest("li");
  const id = li.id;
  if (itemType === "income") {
    editBtn.addEventListener("click", () =>
      editIncomes(titleParagraph, valueParagraph)
    );
    incomesList.appendChild(li);
    renderIncomes();
    sumIncomes();
  } else {
    editBtn.addEventListener("click", () =>
      editExpenses(titleParagraph, valueParagraph)
    );
    expensesList.appendChild(li);
    renderExpenses();
    sumExpenses();
  }
}

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
