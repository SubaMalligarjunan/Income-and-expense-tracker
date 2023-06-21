const balance = document.querySelector("#balance");

const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");

/*
const dummyData = [
    { id: 1, description: "Flower", amount: -20},
    { id: 2, description: "Salary", amount: 35000},
    { id: 3, description: "Book", amount: +10}, 
    { id: 4, description: "Camera", amount: -150},
    { id: 5, description: "Petrol", amount: -250},
];
let transactions=dummyData;
*/

const localStorageTrans= JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];



function loadTransactionDetails(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onClick="removeTrans(${transaction.id})">x</button>
    `;
    document.getElementById("trans").appendChild(item);
    console.log(transaction);
  }
  function removeTrans(id){
    //console.log(id);
    if(confirm("Are you sure want to delete the transaction?")){
        transactions=transactions.filter((transaction)=>transaction.id !==id);
        config();
        updateAmount();
        updateLocalStorage();

    }
    else{
        return;
    }
  }
  function updateAmount() {
    const amounts = transactions.map((transaction) => transaction.amount);
    console.log(amounts);
    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);
    document.getElementById("balance").innerHTML = `₹ ${total}`;

    const income = amounts.filter((item)=> item > 0).reduce((acc , item) => (acc += item) , 0).toFixed(2);
    console.log(income);
    document.getElementById("inc-amt").innerHTML = `₹ ${income}`;

    const expense = amounts.filter((item)=> item < 0).reduce((acc , item) => (acc += item) , 0).toFixed(2);
    console.log(expense);
    document.getElementById("exp-amt").innerHTML = `₹ ${Math.abs(expense)}`;
  }
  
function config(){
    document.getElementById("trans").innerHTML = "";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}
function addTransaction(e){
  
  e.preventDefault();
  if(document.getElementById("desc").value.trim()=="" || document.getElementById("amount").value.trim()== ""){
    alert(
      "Please Enter the description and amount"
    );}
    else{
      const transaction = {
        id : uniqueId(),
        description : document.getElementById("desc").value,
        amount : + document.getElementById("amount").value,
      };
      transactions.push(transaction);
      loadTransactionDetails(transaction);
      document.getElementById("desc").value = "";
      document.getElementById("amount").value = "";
      updateAmount();
      updateLocalStorage();
    }

}
document.getElementById("form").addEventListener("submit", addTransaction);

window.addEventListener("load",function(){
    config();
    updateAmount();
});
function updateLocalStorage(){
  localStorage.setItem("trans",JSON.stringify(transactions));
}
function uniqueId(){
  return Math.floor(Math.random() * 10000000);
}