"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serverlessExpress = require('@vendia/serverless-express');
var app_1 = require("./app");
exports.handler = serverlessExpress({ app: app_1.default });
