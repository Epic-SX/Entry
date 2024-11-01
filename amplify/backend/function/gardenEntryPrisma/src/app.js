"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tests_1 = require("./routes/tests");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use('/tests', tests_1.default);
exports.default = app;
