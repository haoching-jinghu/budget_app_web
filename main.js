// select title elements
const e_balance = document.querySelector(".balance .value");
const e_incomeTotal = document.querySelector(".income-total");
const e_outcomeTotal = document.querySelector(".outcome-total");

// select tab elements
const e_expenseTab = document.querySelector("#expense");
const e_incomeTab = document.querySelector("#income");
const e_allTab = document.querySelector("#all");

const expenseList = document.querySelector("#expense .list");
const incomeList = document.querySelector("#income .list");
const allList = document.querySelector("#all .list");

// select tab buttons
const b_expenseTab = document.querySelector(".tab1");
const b_incomeTab = document.querySelector(".tab2");
const b_allTab = document.querySelector(".tab3");

// input buttons
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");
const addIncome = document.querySelector(".add-income");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");
const addExpense = document.querySelector(".add-expense");

// variables
let ENTRY_LIST;
let balance = 0, income = 0, outcome = 0;
const DELETE = "delete", EDIT = "edit"

// local storage functions
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];

// event listener
b_expenseTab.addEventListener("click", function(){
    show(e_expenseTab);
    hide([e_incomeTab, e_allTab]);
    active(b_expenseTab);
    inactive([b_incomeTab, b_allTab]);
});
b_incomeTab.addEventListener("click", function(){
    show(e_incomeTab);
    hide([e_expenseTab, e_allTab]);
    active(b_incomeTab);
    inactive([b_expenseTab, b_allTab]);
});
b_allTab.addEventListener("click", function(){
    show(e_allTab);
    hide([e_expenseTab, e_incomeTab]);
    active(b_allTab);
    inactive([b_expenseTab, b_incomeTab]);
});
addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;

    let expense ={
        type : "expense",
        title : expenseTitle.value,
        amount : parseFloat(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);

    updateUI();
    clearInput([expenseTitle, expenseAmount]);
})
addIncome.addEventListener("click", function(){
    if(!incomeTitle.value || !incomeAmount.value) return;

    let income ={
        type : "income",
        title : incomeTitle.value,
        amount : parseFloat(incomeAmount.value)
    }
    ENTRY_LIST.push(income);

    updateUI();
    clearInput([incomeTitle, incomeAmount]);
})

// helpers
function updateUI(){
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = calculateBalance(income, outcome);

    // update UI
    e_incomeTotal.innerHTML = `<small>$</small>${income}`;
    e_outcomeTotal.innerHTML = `<small>$</small>${outcome}`;
    e_balance.innerHTML = `<small>$</small>${balance}`;
    
    clearElement([incomeList, expenseList, allList]);
    ENTRY_LIST.forEach( (entry, index) => {
        if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }else if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    })
}
function showEntry(list, type, title, amount, index){
    const entry = ` <li id="${index} class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;
    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
}
function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}
function calculateTotal(type, list){
    let sum = 0;

    list.forEach( entry => {
        if(entry.type == type){
            sum += entry.amount;
        }
    })
    return sum;
}
function calculateBalance(income, outcome){
    return (income - outcome);
}
function clearInput(inputs){
    inputs.forEach( input => {
        input.value = "";
    })
}
function active(element){
    element.classList.add("active");
}
function show(element){
    element.classList.remove("hide");
}
function inactive(elements){
    elements.forEach(element => {
        element.classList.remove("active");
    })
}
function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide");
    })
}


