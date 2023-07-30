let startBtn = document.querySelector('#start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavings = document.getElementsByClassName('monthsavings-value')[0],
	yearSavings = document.getElementsByClassName('yearsavings-value')[0],
	expensesItem = document.querySelectorAll('.expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0];
	btnOpt = document.getElementsByTagName('button')[1],
	btnCount = document.getElementsByTagName('button')[2],
	optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	chooseIncome = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	chooseSum = document.querySelector('#sum'),
	choosePercent = document.querySelector('#percent'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value'),
	allBtn = document.getElementsByTagName('button');

let money, time;


for (let i = 0;  i < allBtn.length - 1; i++) {
	allBtn[i].disabled = true;
	allBtn[i].style.background = 'lightgray';
}


startBtn.addEventListener('click', function() {
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt('Ваш бюджет на месяц?', '');

	while(isNaN(money) || money == '' || money == null) {
		money = +prompt('Ваш бюджет на месяц?', '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();

	for (let i = 0;  i < allBtn.length - 1; i++) {
		allBtn[i].disabled = false;
		allBtn[i].style.backgroundImage = 'linear-gradient(336deg,#ffbd75,#ff964b),linear-gradient(#fff,#fff)';
	}
});

expensesBtn.addEventListener('click', function() {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++){
		let a = expensesItem[i].value,
			b = expensesItem[++i].value;
		if ( (typeof(a) === 'string') && (typeof(a) != null) && (typeof(b) != null)
			&& (a != '') && (b != '') && (a.length < 50) ) {
			console.log('done');
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i--;
		}
	}

	expensesValue.textContent = sum;

});

btnOpt.addEventListener('click', function() {
	for (let i = 0; i < optionalexpensesItem.length; i++) {
		let ask = optionalexpensesItem[i].value;
		appData.optionalExpenses[i] = ask;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}

});

btnCount.addEventListener('click', function() {
	let sum = 0;
	for (let key in appData.expenses) {
		sum += +appData.expenses[key];
	}

	if (appData.budget != undefined) {
		appData.moneyPerDay = +(((appData.budget - sum)/ 30).toFixed());
		dayBudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень достатка';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	} else {
		dayBudgetValue.textContent= 'Произошла ошибка';
	}
});

chooseIncome.addEventListener('input', function() {
	let items = chooseIncome.value;

	// while (typeof(items) !== 'string' || items == '' || items == null){
	// 	items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
	// }

	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

chooseSum.addEventListener('input', function() {
	if(appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthValue.textContent = appData.monthIncome.toFixed(1);
		yearValue.textContent = appData.yearIncome.toFixed(1);
	}
});

choosePercent.addEventListener('input', function() {
	if(appData.savings == true) {
		if(appData.savings == true) {
			let sum = +chooseSum.value,
				percent = +choosePercent.value;

			appData.monthIncome = sum/100/12*percent;
			appData.yearIncome = sum/100*percent;

			monthSavings.textContent = appData.monthIncome.toFixed(1);
			yearSavings.textContent = appData.yearIncome.toFixed(1);
		}
	}
});

let appData = {
	budget : money,
	timeData : time,
	expenses : {},
	optionalExpenses : {},
	income : [],
	savings : false,
};