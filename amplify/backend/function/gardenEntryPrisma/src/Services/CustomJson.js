"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomJson = /** @class */ (function () {
    function CustomJson() {
    }
    // JSON.stringifyがBigIntに対応していないためカスタマイズ
    CustomJson.stringify = function (sourceObject) {
        return JSON.stringify(sourceObject, function (key, value) {
            return typeof value === "bigint" ? value.toString() : value;
        });
    };
    return CustomJson;
}());
exports.default = CustomJson;
