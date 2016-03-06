import ApiHandler from './api/ApiHandler.js';
import LayoutInjector from './render/LayoutInjector.js';
import FormInjector from './render/FormInjector.js';
import ListInjector from './render/ListInjector.js';

class Nutforms {

    /**
     * Binds nutforms to given element/document.
     *
     * The element is scanned for any layouts first. After each layout is injected and rendered, the function
     * scans for any forms or lists, builds rich model for each entity and renders all widgets.
     *
     * @param {Element|HTMLDocument} doc
     * @param {string} locale
     */
    bind(doc, locale) {
        let url = document.location.origin + '/';
        // TODO: Improvement: ApiHandler needs to be secured, username and password should not just lay around like this
        let apiHandler = new ApiHandler(url, 'admin', '1234');

        LayoutInjector.inject(doc, apiHandler)
            .then(() => {
                let formInjectorPromise = FormInjector.inject(doc, apiHandler, locale);
                let listInjectorPromise = ListInjector.inject(doc, apiHandler, locale);
                return Promise.all([formInjectorPromise, listInjectorPromise]);
            })
            .then(() => console.log("Nutforms rendered."));
    }

}

window.nutforms = new Nutforms();
