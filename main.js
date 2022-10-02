// DISPLAY ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeListEl = document.querySelector("#income .list");
const expenseListEl = document.querySelector("#expense .list");
const allListEl = document.querySelector("#all .list");

// SELECT BUTTONS
const expenseTab = document.querySelector(".tab1");
const incomeTab = document.querySelector(".tab2");
const allTab = document.querySelector(".tab3");

// INPUT BUTTONS
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");
const addExpense = document.querySelector(".add-expense");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");
const addIncome = document.querySelector(".add-income");

// VARIABLES
let ENTRY_LIST = [];
let income = 0, outcome = 0, balance = 0;
const DELETE = "delete", EDIT = "edit";

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

// EVENT LISTENERS
expenseTab.addEventListener("click", function(){
    show(expenseEl);
    hide([incomeEl, allEl]);
    active(expenseTab);
    inactive([incomeTab, allTab]);
})
incomeTab.addEventListener("click", function(){
    show(incomeEl);
    hide([expenseEl, allEl]);
    active(incomeTab);
    inactive([expenseTab, allTab]);
})
allTab.addEventListener("click", function(){
    show(allEl);
    hide([expenseEl, incomeEl]);
    active(allTab);
    inactive([expenseTab, incomeTab]);
})
addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;

    let entry = {
        type : "expense",
        title : expenseTitle.value,
        amount : parseFloat(expenseAmount.value)
    }
    ENTRY_LIST.push(entry);
    updateUI();
    clearInput([expenseTitle, expenseAmount]);
})
addIncome.addEventListener("click", function(){
    if(!incomeTitle.value || !incomeAmount.value) return;

    let entry = {
        type : "income",
        title : incomeTitle.value,
        amount : parseFloat(incomeAmount.value)
    }
    ENTRY_LIST.push(entry);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);
})

expenseListEl.addEventListener("click", deleteOrEdit);
incomeListEl.addEventListener("click", deleteOrEdit);
allListEl.addEventListener("click", deleteOrEdit);

// HELPERS
function deleteOrEdit(event){
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;
    if( targetBtn.id == DELETE ){
        deleteEntry(entry);
    }else if(targetBtn.id == EDIT ){
        editEntry(entry);
    }
}
function deleteEntry(entry){
    ENTRY_LIST.splice( entry.id, 1);

    updateUI();
}
function editEntry(entry){
    let ENTRY = ENTRY_LIST[entry.id];

    if(ENTRY.type == "income"){
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
    }else if(ENTRY.type == "expense"){
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }

    deleteEntry(entry);
}
function updateUI(){
    // calculate total and balance
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = calculateBalance(income, outcome);

    // update UI
    balanceEl.innerHTML = `<small>$</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    clearElement([expenseListEl, incomeListEl, allListEl]);
    ENTRY_LIST.forEach( (entry, index) => {
        if(entry.type == "expense"){
            showElement(expenseListEl, entry.type, entry.title, entry.amount, index);
        }else if(entry.type == "income"){
            showElement(incomeListEl, entry.type, entry.title, entry.amount, index);
        }
        showElement(allListEl, entry.type, entry.title, entry.amount, index);
    })
    updateChart(income, outcome);
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}
function showElement(list, type, title, amount, index){
    const entry = `<li id="${index}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;
    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
}
function clearElement(elements){
    elements.forEach(element => {
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
    inputs.forEach(input => {
        input.value = "";
    })
}
function show(element){
    element.classList.remove("hide");
}
function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide");
    });
}
function active(element){
    element.classList.add("active");
}
function inactive(elements){
    elements.forEach(element => {
        element.classList.remove("active");
    });
}
