const addInc =  document.querySelector("#addInc");
const addExp = document.querySelector("#addExp");
const inputInc = document.createElement("income");
const inputExp = document.createElement("expenses");
const result = document.querySelector(".result");

const getCurrencies = () => {
    fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
        const allRates = data[0].rates
    allRates.forEach(({code,currency}) => {
        const option = document.createElement("option");
        option.value = code;
        option.innerText = `${code} (${currency})`;
        select.appendChild(option);
    })
    
    currencySelect.appendChild(select)
})
    .catch((err) => console.log(err));
    
};
const getValueData = () => {
    const selectedValue = select.value;
    fetch(url)
      .then((responce) => responce.json())
      .then((data) => {
        const rateCurrency = data[0].rates;
        const exMid = rateCurrency.find((item) => item.code === selectedValue);
        console.log(exMid);
        result.value = (input.value * exMid.mid).toFixed(2);
      })
      .catch((err) => console.log(err));
  };
getCurrencies();
button.addEventListener("click", getValueData);
select.addEventListener("click", getValueData);
