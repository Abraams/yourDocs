const ajaxSendForm = (data) => {
	// fetch("mail.php", {
	// 	method: "POST",
	// 	body: data,
	// })
	// 	.then((response) => console.log(`it's ok`))
	// 	.catch((error) => console.log(error));

	console.log("Отправленно");
	return true;
};

const addFormHandler = () => {
	const forms = document.querySelectorAll("form");

	forms.forEach((form) => {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			let data = new FormData(this);
			// data.append('name', 'value')
			// for (let [name, value] of data) {
			// 	console.log(`${name} = ${value}`);
			// }

			if (ajaxSendForm(data)) {
				let currModal = document.querySelector(`.modal._open`);
				let thxModal = document.querySelector(`#modal-thx`);

				if (currModal) {
					setTimeout(() => {
						currModal.classList.add("_hidden");
						currModal.classList.remove("_open");
					}, 300);
				}

				setTimeout(() => {
					thxModal.classList.remove("_hidden");
					thxModal.classList.add("_open");

					setTimeout(() => {
						thxModal.classList.add("_hidden");
						thxModal.classList.remove("_open");
					}, 3000);
				}, 700);
			}
			this.reset();
		});
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initMenu();
	initModal();
	initReviewsSlider();
	addFormHandler();
});
