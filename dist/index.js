"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var memoize = require('fast-memoize');
function deepMergeObject(rootAcc, element) {
    if (typeof element === 'string' ||
        typeof element === 'number' ||
        typeof element === 'function' ||
        typeof element === 'undefined' ||
        typeof element === 'boolean' ||
        element === null) {
        return element;
    }
    return Object.keys(element).reduce(function (acc, key) {
        var _a;
        return (__assign({}, acc, (_a = {}, _a[key] = deepMergeObject(rootAcc[key] || {}, element[key]), _a)));
    }, rootAcc);
}
function deepMerge(rootAcc) {
    var elements = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        elements[_i - 1] = arguments[_i];
    }
    return elements.reduce(function (acc, element) { return deepMergeObject(acc, element); }, rootAcc);
}
exports.deepMerge = deepMerge;
function getStyle(givenOverrideStyle, givenConstructorStyle, givenPropsStyle, constants, props) {
    var localStyle = resolveStyleObject(givenOverrideStyle, constants, props);
    var staticStyle = resolveStyleObject(givenConstructorStyle, constants, props);
    var propsStyle = Array.isArray(givenPropsStyle)
        ? deepMerge.apply(void 0, [{}].concat(givenPropsStyle.map(function (s) {
            return resolveStyleObject(s, constants, props);
        }))) : resolveStyleObject(givenPropsStyle, constants, props);
    return deepMerge({}, staticStyle, propsStyle, localStyle);
}
exports.getStyle = getStyle;
exports.memoizeGetStyle = memoize(getStyle);
function resolveStyleObject(functionOrObject, constants, props) {
    if (functionOrObject === void 0) { functionOrObject = {}; }
    return typeof functionOrObject === 'function'
        ? functionOrObject(constants, props)
        : functionOrObject;
}
function createStyledComponent(constants) {
    return /** @class */ (function (_super) {
        __extends(StyledComponent, _super);
        function StyledComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.calculateStyle = memoize(getStyle);
            return _this;
        }
        StyledComponent.prototype.getStyle = function (overrideStyle) {
            var _a = this.props, style = _a.style, restProps = __rest(_a, ["style"]);
            var diffProps = restProps;
            var fixedProps = Object.keys(restProps)
                .filter(function (key) {
                return typeof diffProps[key] === 'string' ||
                    typeof diffProps[key] === 'number' ||
                    typeof diffProps[key] === 'boolean';
            })
                .reduce(function (acc, key) {
                var _a;
                return (__assign({}, acc, (_a = {}, _a[key] = diffProps[key], _a)));
            }, {});
            return this.calculateStyle(overrideStyle, this.style, style, constants, fixedProps);
        };
        return StyledComponent;
    }(React.PureComponent));
}
exports.createStyledComponent = createStyledComponent;
