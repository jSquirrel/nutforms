import ApiHandler from './api/ApiHandler.js';
import LayoutWeaver from './layout/LayoutWeaver.js';
import FormWeaver from './layout/FormWeaver.js';
import ListWeaver from './layout/ListWeaver.js';

class Nutforms {

    /**
     * Binds nutforms to given element/document.
     *
     * @param {Element|HTMLDocument} doc
     * @param {string} locale
     */
    bind(doc, locale) {
        let url = document.location.origin + '/';
        let apiHandler = new ApiHandler(url, 'admin', '1234'); // TODO: this needs security, but that is not part of my thesis
        LayoutWeaver.weave(doc, apiHandler)
            .then(() => {
                return FormWeaver.weave(doc, apiHandler, locale);
            })
            .then(() => {
                return ListWeaver.weave(doc, apiHandler, locale);
            })
            .then(() => console.log("Nutforms bound."));
    }

    /**
     * Returns query parameter of given name or "Not found" if the parameter doesn't exist.
     *
     * @param {string} name
     * @returns {string}
     */
    getQueryParameter(name) {
        var result = "Not found",
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === name) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

}

window.nutforms = new Nutforms();
