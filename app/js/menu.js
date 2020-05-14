function initMenu() {
	const HTML = document.querySelector("html");
	const BODY = document.querySelector("body");

	// --- БЛОК ГЛАВНОГО МЕНЮ ---
	const header = document.querySelector(".header");
	const menuToggler = document.querySelector(".header__toggler");
	const menu = document.querySelector(".header__nav");
	const exitMenuElems = document.querySelectorAll("[data-menu-exit]");
	const exitMenuAnchor = document.querySelectorAll('[href^="#"]');

	// -- Липкое меню --
	let winScroll = 0;

	// Функция отображения мобильного меню
	const fixMenu = function () {
		header.classList.add("_fixed");
	};

	const mobMenu = function () {
		header.classList.add("_mobile");
	};
	// Функция скрытия мобильного меню
	const unFixMenu = function () {
		header.classList.remove("_fixed");
		closeMenu();
	};
	// Условие отображения мобильного меню
	if (window.screen.width >= 1023) {
		window.addEventListener("scroll", () => {
			winScroll = HTML.scrollTop;
			if (winScroll >= 500 && !header.classList.contains("_fixed")) {
				fixMenu();
			} else if (winScroll <= 300 && header.classList.contains("_fixed")) {
				unFixMenu();
			}
		});
	}

	// Функция открытия меню
	const closeMenu = function () {
		header.classList.remove("_open");
		menuToggler.classList.remove("_active");
	};
	// Функция закрытия меню
	const openMenu = function () {
		header.classList.add("_open");
		menuToggler.classList.add("_active");
	};

	const toggleMenu = function () {
		if (!header.classList.contains("_open")) {
			openMenu();
		} else {
			closeMenu();
		}
	};

	// Функция присваивания события по клику на закрывающие/открывающие меню элементы
	exitMenuElems.forEach((elem) => {
		elem.addEventListener("click", toggleMenu);
	});
	// Функция присваивания события по клику на закрывающие меню ссылки
	// exitMenuLinks.forEach(elem => {
	//   elem.addEventListener('click', closeMenu);
	// });
	exitMenuAnchor.forEach((elem) => {
		elem.addEventListener("click", closeMenu);
	});

	// ---  ---

	menuToggler.addEventListener("click", toggleMenu);
}
