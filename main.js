// select title elements
const e_balance = document.querySelector(".balance .value");
const e_incomeTotal = document.querySelector(".outcome-total");
const e_outcomeTotal = document.querySelector(".income-total");

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
let entry_list = [];
let balance = 0, income = 0, outcome = 0;

// event listener
b_expenseTab.addEventListener('click', function(){
    active(b_expenseTab);
    inactive([b_incomeTab, b_allTab]);
});
b_incomeTab.addEventListener('click', function(){
    active(b_incomeTab);
    inactive([b_expenseTab, b_allTab]);
});
b_allTab.addEventListener('click', function(){
    active(b_allTab);
    inactive([b_expenseTab, b_incomeTab]);
});

addIncome.addEventListener('click', function(){
    if(!incomeTitle.value || !incomeAmount.value) return;
    let income = {
        type : "income",
        title : incomeTitle.value,
        amount : parseFloat(incomeAmount.value)
    }
    entry_list.push(income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);
});

addExpense.addEventListener('click', function(){
    if(!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type : "expense",
        title : expenseTitle.value,
        amount : parseFloat(expenseAmount.value)
    }
    entry_list.push(expense);
    updateUI();
    clearInput([expenseTitle, expenseAmount]);
});

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);


// Helpers
function deleteOrEdit(event){
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;

    if(targetBtn.id == "delete"){
        deleteEntry(entry);
    }else if(targetBtn.id == "edit"){
        editEntry(entry);
    }
}
function deleteEntry(entry){
    entry_list.splice(entry.id, 1);
    updateUI();
}
function editEntry(entry){
    let entry = entry_list[entry.id];
    if(entry.type == "income"){
        incomeAmount.value = entry.value;
        incomeTitle.value = entry.title;
    }else if(entry.type == "expense"){
        expenseAmount.value = entry.value;
        expenseTitle.value = entry.title;
    }
    deleteEntry(entry);
}
function updateUI(){
    income = calculateTotal("income", entry_list);
    outcome = calculateTotal("expense", entry_list);
    balance = calculateBalance(income, outcome);

    e_incomeTotal.innerHTML = `<small>$</small>${income}`;
    e_outcomeTotal.innerHTML = `<small>$</small>${outcome}`;
    e_balance.innerHTML = `<small>$</small>${balance}`;

    clearElement([incomeList, expenseList, allList]);
    entry_list.forEach( (entry, index) => {
        if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        }else if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);
    })
    updateChart(income, outcome);
}
function showEntry(list, type, title, amount, id){
    const entry = `<li id="${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;
    const position = "afterbegin";
    list.insertAdjacentElement(position, entry);
}
function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}
function calculateTotal(type, entry_list){
    let sum = 0;
    entry_list.forEach(entry => {
        if(entry.type == type){
            sum += entry.amount;
        }
    })
    return sum;
}
function calculateBalance(income, outcome){
    return (income - outcome);
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
function clearInput(inputs){
    inputs.forEach(input => {
        input.value = "";
    })
}

