import 'babel-polyfill';
import assert from 'assert';
import ModelFactory from '../../../../src/main/javascript/model/ModelFactory.js';

let className = "cz.cvut.fel.nutforms.example.model.cz.cvut.fel.nutforms.example.model.Bug";
let metadata = {
    "attributes": [
        {
            "name": "description",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "log",
            "type": "java.lang.String",
            "is_primary": false
        },
        {
            "name": "id",
            "type": "java.lang.Long",
            "is_primary": true
        },
        {
            "name": "localizedDescription",
            "type": "java.lang.String",
            "is_primary": false
        }
    ],
    "relationships": [
        {
            "name": "project",
            "type": "ToOne",
            "target_entity": "cz.cvut.fel.nutforms.example.model.Project"
        }
    ]
};
let data = {
    "description": "Lorem Ipsum",
    "log": "Lorem Ipsum",
    "id": 1,
    "localizedDescription": "Lorem Ipsum",
    "project": 1
};

describe('model.ModelFactory', function () {
    describe('#create', function () {

        it('should return instance of Model with given className', function () {
            let modelFactory = new ModelFactory();
            let model = modelFactory.create(className, "context", null, {}, {}, {});
            assert.equal(className, model.className);
        });

        it('should return instance of Model with correct attributes and relations', function () {
            let modelFactory = new ModelFactory();
            let model = modelFactory.create(null, "context", null, metadata, {}, {});

            assert.equal("java.lang.String", model.getAttribute("description").type);
            assert.equal("java.lang.String", model.getAttribute("log").type);
            assert.equal("java.lang.Long", model.getAttribute("id").type);
            assert.equal("java.lang.String", model.getAttribute("localizedDescription").type);
            assert.equal("ToOne", model.getRelation("project").type);
            assert.equal("cz.cvut.fel.nutforms.example.model.Project", model.getRelation("project").targetClass);
        });

        it('should return instance of Model with correct values', function () {
            let modelFactory = new ModelFactory();
            let model = modelFactory.create(null, "context", null, metadata, {}, data);

            assert.equal(data.description, model.getAttribute("description").value);
            assert.equal(data.log, model.getAttribute("log").value);
            assert.equal(data.id, model.getAttribute("id").value);
            assert.equal(data.localizedDescription, model.getAttribute("localizedDescription").value);
            assert.equal(data.project, model.getRelation("project").value);
        });

    });
});
