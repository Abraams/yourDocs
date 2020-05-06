const openModalElems = document.querySelectorAll('[data-modal-id]');
// Находим открывающие элементы
const closeModalElems = document.querySelectorAll('[data-modal-exit]');
// Находим закрывающие элементы
const modalElems = document.querySelectorAll('.modal');
// Находим модальные окна

function openModal() {
    // функция открытия модального окна

    let modalId = this.getAttribute('data-modal-id');
    // Считываем id модального окна, хранящееся в data атрибуте кнопки
    let modalTitle = this.getAttribute('data-modal-title');
    // Считываем заголовок, хранящийся в data атрибуте кнопки
    let modalSubject = this.getAttribute('data-modal-subject');
    // Считываем тему письма, хранящуюся в data атрибуте кнопки
    let modalMetrica = this.getAttribute('data-modal-metrica');
    // Считываем тему письма, хранящуюся в data атрибуте кнопки

    modalElems.forEach(item => {
        // перебираем все модальные окна
        if (item.getAttribute('id') === modalId) {
            // если id модального окна === id из дата атрибута нажатой кнопки
            // Тогда идем дальше

            if (modalId !== 'modal-thx') {
                // Если id модального окна НЕ modal-thx, тогда
                // вызываем функцию замены заголовка и темы письма
                chageModalParams(modalId, modalTitle, modalSubject, modalMetrica);
            }

            item.classList.remove('_hidden');
            // Удаляем класс _hidden у нужного модального окна
        }
    });
}

function chageModalParams(modalId, modalTitle, modalSubject, modalMetrica) {
    // функция заметы заголовка и темы модального окна


	// Замена тайтла
    switch (modalTitle && modalTitle !== '') {
        case true:
            // Если переменная modalTitle НЕ пуста, то присваиваем модальному окну ее содержимое
            document.querySelector(`#${modalId} .modal__title`).innerHTML = modalTitle;
            break;
        default:
            // иначе, присваиваем стандартный заголовок
            // document.querySelector(`#${modalId} .modal__title`).innerHTML = 'Закажите обратный звонок';
    }

	// Замена темы
    switch (modalSubject && modalSubject !== '') {
        case true:
            // Если переменная modalSubject НЕ пуста, то присваиваем модальному окну ее содержимое
            document.querySelector(`#${modalId} [name="msg_subject"]`).value = modalSubject;
            break;
        default:
            // иначе, присваиваем стандартную тему письма
            // document.querySelector(`#${modalId} [name="msg_subject"]`).value = 'Клиент ждет обратного звонка';
    }

	// Замена metrica-id
    switch (modalMetrica && modalMetrica !== '') {
        case true:
            // Если переменная modalMetrica НЕ пуста, то присваиваем модальному окну ее содержимое
            document.querySelector(`#${modalId} [data-modal-metrica]`).setAttribute('data-modal-metrica', modalMetrica);

            break;
        default:
            // иначе, присваиваем стандартный id
            // document.querySelector(`#${modalId} [data-modal-metrica]`).setAttribute('data-modal-metrica', 'form');
    }
}

function closeModal() {
    // Функция закрытия модального окна
    // let modalId = this.getAttribute('data-modal-id');
    // Считываем id модального окна, хранящееся в data атрибуте кнопки

    modalElems.forEach(item => {
        if (!item.classList.contains('_hidden')) {
            // Если модальное окно не содержит класс _hidden, то мы его добавляем
            item.classList.add('_hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    closeModalElems.forEach(item => {
        item.addEventListener('click', closeModal);
        // Вешаем событие на клик по открывающим кнопкам
    });

    openModalElems.forEach(item => {
        item.addEventListener('click', openModal);
        // Вешаем событие на клик по открывающим кнопкам
    });

});
