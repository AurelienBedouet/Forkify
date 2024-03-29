import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", e => {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupNextBtn(curPage);
        }

        // Last Page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupPrevBtn(curPage);
        }
        // Other Pages
        if (curPage < numPages) {
            return `
            ${this._generateMarkupPrevBtn(curPage)}
            ${this._generateMarkupNextBtn(curPage)}
            `;
        }
        // Page 1, and there are no other pages
        return "";
    }

    _generateMarkupPrevBtn(page) {
        return `
        <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
        `;
    }

    _generateMarkupNextBtn(page) {
        return `
        <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
}

export default new PaginationView();