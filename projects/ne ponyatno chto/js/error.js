let error = document.getElementsByTagName('span');

console.log(error);

for (let i = 0; i < error.length; i++) {
	if (error[i].textContent === "") {
		error[i].classList.remove('form-error');
	} else {
		error[i].classList.add('form-error');
	}
}