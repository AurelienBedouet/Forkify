import View from "./View";
import icons from "url:../../img/icons.svg";

class addRecipeView extends View {
    _parentElement = document.querySelector(".upload");
    _message = "Recipe was successfully uploaded :)";

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor () {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            // 1) on récup l'ensemble des données du form grâce à l'API browser moderne "FromData"
            // 2) à l'intérieur du FormData constructor on doit passer un élément qui est un form
            // 3) ici c'est le this keyword qui fait référence à "this._parentElement"
            // puisque l'on est dans une handler function et que l'élément parent est "upload" ici
            // c'est à dire le formulaire
            // 4) on spread l'object dans un array
            // conclusion: data = un array comprenant l'ensemble des données du form
            // chaque élément du form est présenté sous forme d'un array comprenant 
            // le name du field et la value
            const dataArr = [...new FormData(this)];
            // New method (ES2019) to convert entries to an object = fromEntries
            // takes an array of entries and converts it to an object
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    _generateMarkup() {

    }
}

export default new addRecipeView();