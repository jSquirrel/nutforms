import Context from './Context.js';

/**
 * Created by Ondřej Kratochvíl on 10.11.15.
 */
export default class ContextFactory {

    /**
     * Static factory method for creating {@link Context} instances
     * @param {string} context path specifying set of rules
     * @returns {Promise<Context>}
     */
    static create(context) {
        return fetch(this.getUrlPrefix() + (context.startsWith('/') ? context.slice(1) : context))
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                return new Context(json);
            }).catch(function (ex) {
                console.log('Unable to load rule context', ex);
            })
    }

    /**
     * Return url prefix for accessing {@link Context} info
     * toDo: consider other way
     *
     * @returns {string}
     */
    static getUrlPrefix() {
        return 'http://localhost:8080/rules/';
    }
}