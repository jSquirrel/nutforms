/**
 * Created by Ondřej Kratochvíl on 10.11.15.
 */
export default class Model {

    /**
     * Model constructor
     *
     * @param {EntityMetadata} entityMetadata
     * @param {Context} context
     */
    constructor(entityMetadata, context) {
        this._entityMetadata = entityMetadata;
        this._context = context;
    }

    getEntityMetadata() {
        return this._entityMetadata;
    }

    getContext() {
        return this._context;
    }
}