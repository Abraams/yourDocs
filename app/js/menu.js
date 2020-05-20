class HeaderBar {
	constructor(
		elem = document.querySelector(`#Header`),
		fixed = false,
		mobile = false,
		open = false
	) {
		this.elem = elem;
		this.toggler = elem.querySelector(`#HeaderToggler`);
		this.fixed = fixed;
		this.mobile = mobile;
		this.open = open;
	}

	fix() {
		if (!this.mobile) {
			if (this.fixed) return false;

			this.elem.classList.add(`_fixed`);
			this.fixed = true;
			return true;
		}
	}
	unfix() {
		if (!this.mobile) {
			if (!this.fixed) return false;

			this.elem.classList.remove(`_fixed`);
			this.fixed = false;
		}
	}
	openMenu() {
		this.toggler.classList.add(`_active`);

		this.elem.classList.add(`_open`);
		this.open = true;
		return true;
	}
	closeMenu() {
		this.toggler.classList.remove(`_active`);

		this.elem.classList.remove(`_open`);
		this.open = false;
		return true;
	}
	toggleMenu() {
		if (this.mobile) {
			if (this.open) this.closeMenu();
			else this.openMenu();
		}
		return false;
	}

	enableMobileMod() {
		this.elem.addEventListener(`click`, (event) => {
			const target = event.target;

			if (
				target.id === "HeaderToggler" ||
				target.tagName.toLowerCase() === "span"
			) {
				this.toggleMenu();
			}
			if (
				target.tagName.toLowerCase() === "a" ||
				target.tagName.toLowerCase() === "button"
			) {
				this.closeMenu();
			}
		});

		return false;
	}

	enableDesctopMod() {
		let winScroll;

		window.addEventListener("scroll", () => {
			winScroll = document.querySelector("html").scrollTop;

			if (winScroll >= 500 && !this.fixed) {
				this.fix();
			} else if (winScroll <= 300 && this.fixed) {
				this.unfix();
			}
		});
	}

	toggleMenuMod() {
		if (window.screen.width <= 971) {
			this.unfix();
			this.mobile = true;
			this.enableMobileMod();
		} else {
			this.closeMenu();
			this.mobile = false;
			this.enableDesctopMod();
		}
	}
}

function initMenu() {
	const mainHeader = new HeaderBar();
	mainHeader.toggleMenuMod();
}
