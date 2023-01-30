const ballance = document.querySelector("#ballance");
const ballancePositive = document.querySelector("#ballance-positive");
const ballanceZero = document.querySelector("#ballance-zero");
const totalIncomes = document.querySelector(".totalInc");
const totalExpenses = document.querySelector(".totalExp");
const incomesList = document.querySelector("#incomes");
const expensesList = document.querySelector("#expenses");
const warningInc = document.querySelector("#warning-income");
const warningExp = document.querySelector("#warning-expense");
const warningBlnc = document.querySelector("#warning-ballance");

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

const totalBallance = () => {
  if (incomesSum - expensesSum < 0) {
    ballancePositive.classList.add("hidden");
    warningBlnc.classList.remove("hidden");
    ballance.classList.add("negative");
    ballance.classList.remove("inplus");
    ballanceZero.classList.add("hidden");
  } else if (incomesSum - expensesSum > 0) {
    ballanceZero.classList.add("hidden");
    warningBlnc.classList.add("hidden");
    ballancePositive.classList.remove("hidden");
    ballance.classList.remove("negative");
    ballance.classList.add("inplus");
  } else if (incomesSum - expensesSum === 0) {
    ballanceZero.classList.remove("hidden");
    warningBlnc.classList.add("hidden");
    ballancePositive.classList.add("hidden");
  }
};

totalBallance();

const preventMinus = (e) => {
  if (/[-]/.test(e.key)) {
    e.preventDefault();
  }
};

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

const addNewIncomes = (e) => {
  e.preventDefault();
  if (!incomeTitle.value || incomeAmt.value <= 0) {
    warningInc.classList.remove("hidden");
    setTimeout(() => {
      warningInc.classList.add("hidden");
    }, 3000);
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
};
const addNewExpenses = (e) => {
  e.preventDefault();
  if (!expenseTitle.value || expenseAmt.value <= 0) {
    warningExp.classList.remove("hidden");
    setTimeout(() => {
      warningExp.classList.add("hidden");
    }, 3000);
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
};

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
  cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
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
    // valueParagraph.type = number;
    onkeydown = preventMinus;
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

  const discardChanges = (e, itemType) => {
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
  };

  const updateArray = (li, arr) => {
    const editedIndex = arr.findIndex(
      (element) => String(element.id) === String(li.id)
    );

    arr[editedIndex].title = titleParagraph.innerText;
    arr[editedIndex].value = valueParagraph.innerText;
  };

  const saveChanges = (e, itemType) => {
    const li = e.target.closest("li");
    const ul = e.target.closest("ul");
    e.preventDefault();
    const editedItem =
      itemType === "income"
        ? incomesArr.find((element) => String(element.id) === String(li.id))
        : expensesArr.find((element) => String(element.id) === String(li.id));

    console.log("valueParagraph.value", valueParagraph.innerText);
    console.log(
      "Number(valueParagraph.value)",
      Number(valueParagraph.innerText)
    );

    if (
      !editedItem.title === titleParagraph.innerText ||
      editedItem.value === valueParagraph.innerText ||
      item.title.length == 0
    ) {
      discardChanges();
    } else if (
      Number(valueParagraph.innerText) <= 0 ||
      isNaN(Number(valueParagraph.innerText))
    ) {
      const warningPOP = document.createElement("div");
      warningPOP.innerText =
        "Wprowadź zmiany, Wartość nie może być pusta bądź ujemna";
      warningPOP.classList.add("warning");
      ul.classList.add("ul_warn");
      li.appendChild(warningPOP);
      setTimeout(() => {
        li.removeChild(warningPOP);
        ul.classList.remove("ul_warn");
      }, 4000);
      discardChanges();
    } else {
      if (itemType === "income") {
        updateArray(li, incomesArr);
        renderIncomes();
        sumIncomes();
        totalBallance();
      } else {
        updateArray(li, expensesArr);
        renderExpenses();
        sumExpenses();
        totalBallance();
      }
    }
    console.log(editedItem.title.length);
    console.log(editedItem.value);
  };
};

const deleteItem = (e, itemType) => {
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
};

const editItem = (e, itemType) => {
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
};

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
