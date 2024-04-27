"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Config object to log all console.log calls
 */
var config = [];
var object = {
    hidden: __spreadArray([], config, true),
    list: {},
    all: false,
    focus: [],
    focused: []
};
function createProxy(target, handler) {
    return new Proxy(target, handler);
}
var handler = {
    get: function (obj, props) {
        obj.list[props] = "";
        if (props == "get") {
            setTimeout(function () {
                console.warn(Object.keys(obj.list));
                return Object.keys(obj.list);
            }, 100);
        }
        if (obj.hidden.includes(props) || obj.all) {
            return function () { return false; };
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, __spreadArray(["[".concat(props, "]>")], args, false));
            return true;
        };
    },
    set: function (obj, props, value) {
        var _a;
        if (props == "focus") {
            obj.focus = value;
        }
        if (props == "hidden") {
            (_a = obj.hidden).push.apply(_a, value);
        }
        if (props == "all") {
            obj.all = value;
        }
        return true;
    }
};
var log = createProxy(object, handler);
/**
 * log.[your type console log here]("your message here")
 *
 * Log.hidden = ["your type console log here 1", "your type console log here 2"]
 *
 * Log.all = true //is to show or hidden all console.log
 *
 * Log.focus = ["your type console log here 1", "your type console log here 2"]
 *
 * Log.get //to get all console.log type
 *
 * @description Proxy object to log all console.log calls
 * @param object
 */
exports.default = log;
