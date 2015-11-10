/**
 * Created by Ondřej Kratochvíl on 10.11.15.
 */
export default class Context {

    /**
     * Creates an instance with given set of rules
     * @param {JSON} rules
     */
    constructor(rules) {
        // toDo: hold rule data as a map (?) of functions (Rule object)
        this._rules = rules;
    }

    /**
     * Return {@link JSON} of rules in current context
     */
    getRules() {
        return this._rules;
    }
}