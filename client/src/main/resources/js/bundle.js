(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsEntityFormJs = require('./components/EntityForm.js');

var _componentsEntityFormJs2 = _interopRequireDefault(_componentsEntityFormJs);

var _componentsMetadataJs = require('./components/metadata.js');

// TODO: load metadata from API /meta endpoint

_react2['default'].render(_react2['default'].createElement(_componentsEntityFormJs2['default'], { metadata: _componentsMetadataJs.metadata }), document.getElementById('form'));

},{"./components/EntityForm.js":2,"./components/metadata.js":3,"react":"react"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var EntityForm = (function (_React$Component) {
    _inherits(EntityForm, _React$Component);

    function EntityForm() {
        _classCallCheck(this, EntityForm);

        _get(Object.getPrototypeOf(EntityForm.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(EntityForm, [{
        key: "render",
        value: function render() {

            var sections = [];
            var metadata = this.props.metadata;

            metadata.attributes.forEach(function (attribute) {

                switch (attribute.type) {
                    case "java.lang.String":
                        sections.push(_react2["default"].createElement(TextInput, { name: attribute.name }));
                        return;

                    case "java.lang.Long":
                        sections.push(_react2["default"].createElement(NumberInput, { name: attribute.name }));
                        return;
                }
            });

            return _react2["default"].createElement(
                "form",
                { role: "form" },
                sections,
                _react2["default"].createElement(
                    "button",
                    { type: "submit", className: "btn btn-default" },
                    "Submit"
                )
            );
        }
    }]);

    return EntityForm;
})(_react2["default"].Component);

exports["default"] = EntityForm;

var TextInput = (function (_React$Component2) {
    _inherits(TextInput, _React$Component2);

    function TextInput() {
        _classCallCheck(this, TextInput);

        _get(Object.getPrototypeOf(TextInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TextInput, [{
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "form-group" },
                _react2["default"].createElement(
                    "label",
                    { htmlFor: this.props.name },
                    this.props.name
                ),
                _react2["default"].createElement("input", { type: "text", className: "form-control", name: this.props.name })
            );
        }
    }]);

    return TextInput;
})(_react2["default"].Component);

var NumberInput = (function (_React$Component3) {
    _inherits(NumberInput, _React$Component3);

    function NumberInput() {
        _classCallCheck(this, NumberInput);

        _get(Object.getPrototypeOf(NumberInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(NumberInput, [{
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "form-group" },
                _react2["default"].createElement(
                    "label",
                    { htmlFor: this.props.name },
                    this.props.name
                ),
                _react2["default"].createElement("input", { type: "number", className: "form-control", name: this.props.name })
            );
        }
    }]);

    return NumberInput;
})(_react2["default"].Component);

module.exports = exports["default"];

},{"react":"react"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var metadata = {
    "attributes": [{
        "name": "description",
        "type": "java.lang.String",
        "is_primary": false
    }, {
        "name": "log",
        "type": "java.lang.String",
        "is_primary": false
    }, {
        "name": "id",
        "type": "java.lang.Long",
        "is_primary": true
    }, {
        "name": "localizedDescription",
        "type": "java.lang.String",
        "is_primary": false
    }],
    "relationships": [{
        "name": "project",
        "type": "ToOne",
        "target_entity": "cz.cvut.fel.nutforms.example.model.Project"
    }]
};
exports.metadata = metadata;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmlsaXAvSmF2YVByb2plY3RzL251dGZvcm1zL2NsaWVudC9hcHAuanMiLCIvVXNlcnMvZmlsaXAvSmF2YVByb2plY3RzL251dGZvcm1zL2NsaWVudC9jb21wb25lbnRzL0VudGl0eUZvcm0uanMiLCIvVXNlcnMvZmlsaXAvSmF2YVByb2plY3RzL251dGZvcm1zL2NsaWVudC9jb21wb25lbnRzL21ldGFkYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztxQkNBa0IsT0FBTzs7OztzQ0FDRiw0QkFBNEI7Ozs7b0NBQzVCLDBCQUEwQjs7OztBQUlqRCxtQkFBTSxNQUFNLENBQ1Isd0VBQVksUUFBUSxnQ0FBVyxHQUFHLEVBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDVGdCLE9BQU87Ozs7SUFFSixVQUFVO2NBQVYsVUFBVTs7YUFBVixVQUFVOzhCQUFWLFVBQVU7O21DQUFWLFVBQVU7OztpQkFBVixVQUFVOztlQUNyQixrQkFBRzs7QUFFTCxnQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7QUFFbkMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUyxFQUFLOztBQUV2Qyx3QkFBUSxTQUFTLENBQUMsSUFBSTtBQUNsQix5QkFBSyxrQkFBa0I7QUFDbkIsZ0NBQVEsQ0FBQyxJQUFJLENBQUMsaUNBQUMsU0FBUyxJQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxBQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQ2xELCtCQUFPOztBQUFBLEFBRVgseUJBQUssZ0JBQWdCO0FBQ2pCLGdDQUFRLENBQUMsSUFBSSxDQUFDLGlDQUFDLFdBQVcsSUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQUFBQyxHQUFFLENBQUMsQ0FBQztBQUNwRCwrQkFBTztBQUFBLGlCQUNkO2FBRUosQ0FBQyxDQUFDOztBQUVILG1CQUNJOztrQkFBTSxJQUFJLEVBQUMsTUFBTTtnQkFDWixRQUFRO2dCQUNUOztzQkFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUI7O2lCQUFnQjthQUM5RCxDQUNUO1NBQ0w7OztXQTFCZ0IsVUFBVTtHQUFTLG1CQUFNLFNBQVM7O3FCQUFsQyxVQUFVOztJQTZCekIsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOzttQ0FBVCxTQUFTOzs7aUJBQVQsU0FBUzs7ZUFDTCxrQkFBRztBQUNMLG1CQUNJOztrQkFBSyxTQUFTLEVBQUMsWUFBWTtnQkFDdkI7O3NCQUFPLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztvQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7aUJBQVM7Z0JBQzFELDRDQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUMsR0FBRzthQUNuRSxDQUNUO1NBQ0o7OztXQVJDLFNBQVM7R0FBUyxtQkFBTSxTQUFTOztJQVdqQyxXQUFXO2NBQVgsV0FBVzs7YUFBWCxXQUFXOzhCQUFYLFdBQVc7O21DQUFYLFdBQVc7OztpQkFBWCxXQUFXOztlQUNQLGtCQUFHO0FBQ0wsbUJBQ0k7O2tCQUFLLFNBQVMsRUFBQyxZQUFZO2dCQUN2Qjs7c0JBQU8sT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxBQUFDO29CQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtpQkFBUztnQkFDMUQsNENBQU8sSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQyxHQUFHO2FBQ3JFLENBQ1Q7U0FDSjs7O1dBUkMsV0FBVztHQUFTLG1CQUFNLFNBQVM7Ozs7Ozs7Ozs7QUMxQ2xDLElBQU0sUUFBUSxHQUFHO0FBQ3BCLGdCQUFZLEVBQUUsQ0FDVjtBQUNJLGNBQU0sRUFBRSxhQUFhO0FBQ3JCLGNBQU0sRUFBRSxrQkFBa0I7QUFDMUIsb0JBQVksRUFBRSxLQUFLO0tBQ3RCLEVBQ0Q7QUFDSSxjQUFNLEVBQUUsS0FBSztBQUNiLGNBQU0sRUFBRSxrQkFBa0I7QUFDMUIsb0JBQVksRUFBRSxLQUFLO0tBQ3RCLEVBQ0Q7QUFDSSxjQUFNLEVBQUUsSUFBSTtBQUNaLGNBQU0sRUFBRSxnQkFBZ0I7QUFDeEIsb0JBQVksRUFBRSxJQUFJO0tBQ3JCLEVBQ0Q7QUFDSSxjQUFNLEVBQUUsc0JBQXNCO0FBQzlCLGNBQU0sRUFBRSxrQkFBa0I7QUFDMUIsb0JBQVksRUFBRSxLQUFLO0tBQ3RCLENBQ0o7QUFDRCxtQkFBZSxFQUFFLENBQ2I7QUFDSSxjQUFNLEVBQUUsU0FBUztBQUNqQixjQUFNLEVBQUUsT0FBTztBQUNmLHVCQUFlLEVBQUUsNENBQTRDO0tBQ2hFLENBQ0o7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRW50aXR5Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvRW50aXR5Rm9ybS5qcyc7XG5pbXBvcnQge21ldGFkYXRhfSBmcm9tICcuL2NvbXBvbmVudHMvbWV0YWRhdGEuanMnXG4vLyBUT0RPOiBsb2FkIG1ldGFkYXRhIGZyb20gQVBJIC9tZXRhIGVuZHBvaW50XG5cblxuUmVhY3QucmVuZGVyKFxuICAgIDxFbnRpdHlGb3JtIG1ldGFkYXRhPXttZXRhZGF0YX0gLz4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKVxuKTtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCBzZWN0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgbWV0YWRhdGEgPSB0aGlzLnByb3BzLm1ldGFkYXRhO1xuXG4gICAgICAgIG1ldGFkYXRhLmF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiamF2YS5sYW5nLlN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICBzZWN0aW9ucy5wdXNoKDxUZXh0SW5wdXQgbmFtZT17YXR0cmlidXRlLm5hbWV9Lz4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwiamF2YS5sYW5nLkxvbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbnMucHVzaCg8TnVtYmVySW5wdXQgbmFtZT17YXR0cmlidXRlLm5hbWV9Lz4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAge3NlY3Rpb25zfVxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5uYW1lfT57dGhpcy5wcm9wcy5uYW1lfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgbmFtZT17dGhpcy5wcm9wcy5uYW1lfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5uYW1lfT57dGhpcy5wcm9wcy5uYW1lfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPXt0aGlzLnByb3BzLm5hbWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICBcImF0dHJpYnV0ZXNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiamF2YS5sYW5nLlN0cmluZ1wiLFxuICAgICAgICAgICAgXCJpc19wcmltYXJ5XCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImxvZ1wiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiamF2YS5sYW5nLlN0cmluZ1wiLFxuICAgICAgICAgICAgXCJpc19wcmltYXJ5XCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcImlkXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJqYXZhLmxhbmcuTG9uZ1wiLFxuICAgICAgICAgICAgXCJpc19wcmltYXJ5XCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwibG9jYWxpemVkRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImphdmEubGFuZy5TdHJpbmdcIixcbiAgICAgICAgICAgIFwiaXNfcHJpbWFyeVwiOiBmYWxzZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInJlbGF0aW9uc2hpcHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJwcm9qZWN0XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJUb09uZVwiLFxuICAgICAgICAgICAgXCJ0YXJnZXRfZW50aXR5XCI6IFwiY3ouY3Z1dC5mZWwubnV0Zm9ybXMuZXhhbXBsZS5tb2RlbC5Qcm9qZWN0XCJcbiAgICAgICAgfVxuICAgIF1cbn07Il19
