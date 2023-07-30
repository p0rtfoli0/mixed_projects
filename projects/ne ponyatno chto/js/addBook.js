window.addEventListener('DOMContentLoaded', function() {

	let bookItem = document.getElementsByClassName('books'),
		containerBook = document.querySelector('.book-item'),
		nameBookValue = document.getElementById('bookName'),
		deleteElement = document.getElementById('delete'),
		// hideClose = deleteElement.querySelector('.close'),
		containerValueAndBook = document.querySelector('.container-bookList'),
		blockBook = document.querySelector('.block-book'),
		borderSch = 0;
		let form = document.querySelector('form');
		let message = {
			loading: 'Загрузка...',
			success: 'Готово!',
			failure: 'Что-то пошло не так...'
		};


	// // --------------------------------------------------------

	async function postResource1(url) {
		const res = await fetch(`${url}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			},
		});

		return await res;
	};
	postResource1("data/data_base.json")
	.then(response => response.json())        // получаем ответ в виде промиса
	.then(data => {
  		console.log(data);
  		createBooks(data);                          // выводим данные в консоль
	})
	.catch(error => console.error(error));     // или ошибку, если что-то пошло не так

	function createBooks(response) {
		for (let i = 0; i < response.length; i++){
			let newBook = document.createElement('li'),
	    		newSpan = document.createElement('span'),
	    		close = document.createElement('div'),
				link = document.createElement('a');

			
			link.href = response[i].link;
			link.textContent = response[i].name;
			newBook.id = response[i].id;
	    	newBook.classList.add('books');
	    	close.classList.add('close');
			newBook.append(link);
			newBook.append(newSpan);
			newSpan.textContent = response[i].time;

			newBook.append(close);
			blockBook.style.opacity = '1';
			containerBook.appendChild(newBook);
			borderSch = response.length - 1;
		}

		bookItem[borderSch].style.borderBottom = "none";
		// bookItem[0].style.borderBottom = "none";
	}

	// // ---------------------
	form.addEventListener('submit', () => {
		event.preventDefault();
		if (nameBookValue.value !== ''){
			let newBook = document.createElement('li'),
				newSpan = document.createElement('span'),
				close = document.createElement('div'),
				link = document.createElement('a');

			let link_name = nameBookValue.value.replace(/\s+/g, '');
			link_name = link_name.toLowerCase();

			link.href = `WYSIWYG/index.html?${link_name}`;
			link.textContent = `${nameBookValue.value} `;
			// newBook.id = id_sch + 1;
			newBook.classList.add('books');
			close.classList.add('close');

			let Data = new Date(),
				Year = Data.getFullYear(),
				Month = ((Data.getMonth() + 1) <= 9) ? '0' + (Data.getMonth() + 1) : (Data.getMonth() + 1),
				Day = (Data.getDate() <= 9) ? '0' + Data.getDate() : Data.getDate(),
				Hours = (Data.getHours() <= 9) ? '0' + Data.getHours() : Data.getHours(),
				Minutes = (Data.getMinutes() <= 9) ? '0' + Data.getMinutes() : Data.getMinutes(),
				Seconds = (Data.getSeconds() <= 9) ? '0' + Data.getSeconds() : Data.getSeconds();

			let time = `${Hours}:${Minutes}:${Seconds}`,
				yearMonthDay = `${Day}-${Month}-${Year}`;

			newBook.append(link);
			newBook.append(newSpan);
			newSpan.textContent = `${time} ${yearMonthDay}`;

			newBook.append(close);
			// containerBook.appendChild(newBook);
			// bookItem[0].before(newBook);
			blockBook.style.opacity = '1';
			console.log(bookItem);

			if(bookItem.length == 0) {
				containerBook.appendChild(newBook);
			} else {
				bookItem[0].before(newBook);
				console.log(bookItem.length);
			}
			bookItem[bookItem.length - 1].style.borderBottom = "none";
			console.log(bookItem);

			//=====================================================================
			//====================ОТПРАВКА ЗАПРОСА=================================
			//=====================================================================
			
			function req1() {
				// event.preventDefault();
				let obj = {
					name: nameBookValue.value,
					time: newSpan.textContent,
					link: `WYSIWYG/index.html?${link_name}`

				};

				postResource2("server/base.php", obj);
			}

			req1();

			async function postResource2(url, data) {
				const res = await fetch(`${url}`, {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(data)
				});

				if(!res.ok) {
					throw new Error(`Could not fetch ${url}, status: ${res.status}`);
				}

				// return await res.json();
			}

			
			nameBookValue.value = "";

		} else {
			alert('Введите название учебника');
		}
	});


	function checkItem(n) {
		if(n == 0) {
			blockBook.style.opacity = '0';
		} else if (n > 0) {
			blockBook.style.opacity = '1';
		}
	}
	checkItem(bookItem.length);


	// Remove Element

	let removeId = document.getElementsByClassName('close');

	containerValueAndBook.addEventListener('click', function(event) {
		target = event.target;
		if (target && target.classList.contains('close')){
			for (let i = 0; i < removeId.length; i++) {
				if (target == removeId[i]) {

					function req2() {
						// event.preventDefault();
						let nameDelete = bookItem[i].querySelector('a').textContent;
						console.log(nameDelete);
						let obj = {
							delete: nameDelete
						};					

						postResource3("server/delete.php", obj);
					}

					req2();

					async function postResource3(url, data) {
						const res = await fetch(`${url}`, {
							method: "POST",
							headers: {
								"Content-type": "application/json"
							},
							body: JSON.stringify(data)
						});

						if(!res.ok) {
							throw new Error(`Could not fetch ${url}, status: ${res.status}`);
						}

						// return await res.json();
					}

					bookItem[i].remove();
					console.log(bookItem);

					if (bookItem.length != 0){
						bookItem[bookItem.length - 1].style.borderBottom = "none";
					}
					checkItem(bookItem.length);

					break;
				}
			}
		}
	});

});
