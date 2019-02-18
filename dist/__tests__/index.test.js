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
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var radium_1 = require("radium");
var React = require("react");
var index_1 = require("../index");
var StyledComponent = index_1.createStyledComponent({});
it('should merge objects', function () {
    var a = { a: { b: 1, c: 2 } };
    var b = { a: { b: 5 }, d: 3 };
    expect(index_1.deepMerge(a, b)).toEqual({ a: { b: 5, c: 2 }, d: 3 });
});
it('should merge objects 2', function () {
    var a = { a: { b: 1, c: 2 } };
    var b = { a: { b: 5, j: { g: 7 } }, d: 3 };
    expect(index_1.deepMerge(a, b)).toEqual({ a: { b: 5, c: 2, j: { g: 7 } }, d: 3 });
});
it('should merge objects 3', function () {
    var a = { a: { b: 1, c: 2 } };
    var b = { a: { b: 5, c: { g: 7 } }, d: 3 };
    expect(index_1.deepMerge(a, b)).toEqual({ a: { b: 5, c: { g: 7 } }, d: 3 });
});
it('should merge objects 4', function () {
    var b = { a: { b: 1, c: 2 } };
    var a = { a: { b: 5, c: { g: 7 } }, d: 3 };
    expect(index_1.deepMerge(a, b)).toEqual({ a: { b: 1, c: 2 }, d: 3 });
});
it('should merge objects 5', function () {
    var b = { a: { b: 1, c: 2 } };
    var a = { a: { b: 5, c: { g: 7 } }, d: 3 };
    var c = { g: 17 };
    expect(index_1.deepMerge(a, b, c)).toEqual({ a: { b: 1, c: 2 }, d: 3, g: 17 });
});
it('should merge objects with different values', function () {
    var g = function () { };
    var b = { a: { b: true, c: undefined } };
    var a = { a: { d: null, g: g } };
    var c = { g: 17 };
    expect(index_1.deepMerge(a, b, c)).toEqual({
        a: { b: true, c: undefined, d: null, g: g },
        g: 17,
    });
});
it('memoized gets style for large objects is faster', function () {
    var dateFirst = new Date();
    for (var i = 0; i < 10000; i += 1) {
        index_1.getStyle({
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, {
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, {
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, { b: { c: 3 } }, { b: { c: 3 } });
    }
    for (var i = 0; i < 10000; i += 1) {
        index_1.memoizeGetStyle({
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, {
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, {
            b: {
                c: 3,
                g: {
                    b: {
                        c: 3,
                        g: {
                            b: { c: 3 },
                            g: { b: { c: 3 } },
                            h: { b: { c: 3 }, g: { b: { c: 3 } } },
                        },
                    },
                },
            },
        }, { b: { c: 3 } });
    }
});
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var style = this.getStyle();
        return (React.createElement("button", { style: style.button },
            React.createElement("span", { style: style.text }, "Text")));
    };
    Button.style = {
        button: {
            paddingLeft: '20px',
        },
        text: {
            color: 'red',
        },
    };
    return Button;
}(StyledComponent));
var ButtonWithRadium = radium_1.default(Button);
var Button2 = /** @class */ (function (_super) {
    __extends(Button2, _super);
    function Button2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button2.prototype.render = function () {
        var style = this.getStyle();
        return (React.createElement("button", { style: style.button },
            React.createElement("span", { style: style.text }, "Text")));
    };
    Button2.style = function () { return ({
        button: {
            paddingLeft: '30px',
        },
        text: {
            color: 'blue',
        },
    }); };
    return Button2;
}(StyledComponent));
var Button2WithRadium = radium_1.default(Button2);
it('should render Button with default style', function () {
    expect(enzyme_1.render(React.createElement(ButtonWithRadium, null))).toMatchSnapshot();
});
it('should render Button with default style overriden with custom style (as object)', function () {
    expect(enzyme_1.render(React.createElement(ButtonWithRadium, { style: { button: { paddingLeft: '100px' } } }))).toMatchSnapshot();
});
it('should render Button with default style merged with custom style (as object)', function () {
    expect(enzyme_1.render(React.createElement(ButtonWithRadium, { style: { text: { textTransform: 'uppercase' } } }))).toMatchSnapshot();
});
it('should render Button with default style merged with custom style (as array of objects)', function () {
    expect(enzyme_1.render(React.createElement(ButtonWithRadium, { style: [
            { button: { textTransform: 'uppercase' } },
            { button: { marginLeft: '100px' } },
            { text: { color: 'blue' } },
        ] }))).toMatchSnapshot();
});
it('should render Button with default style merged with custom style (as array of objects)', function () {
    expect(enzyme_1.render(React.createElement(ButtonWithRadium, { style: [
            { button: { textTransform: 'uppercase' } },
            function () { return ({ button: { marginLeft: '100px' } }); },
            { text: { color: 'blue' } },
        ] }))).toMatchSnapshot();
});
it('should render Button and Button2 with different styles', function () {
    expect(enzyme_1.render(React.createElement("div", null,
        React.createElement(ButtonWithRadium, null),
        React.createElement(Button2WithRadium, null)))).toMatchSnapshot();
});
it('should render Button with passed styles and different styles', function () {
    expect(enzyme_1.render(React.createElement("div", null,
        React.createElement(ButtonWithRadium, { style: { button: { paddingLeft: '5px' } } }),
        React.createElement(ButtonWithRadium, { style: { button: { paddingLeft: '10px' } } })))).toMatchSnapshot();
});
it('should render Button2 with passed styles and different styles', function () {
    expect(enzyme_1.render(React.createElement("div", null,
        React.createElement(Button2WithRadium, { style: { button: { paddingLeft: '5px' } } }),
        React.createElement(Button2WithRadium, { style: { button: { paddingLeft: '10px' } } })))).toMatchSnapshot();
});
