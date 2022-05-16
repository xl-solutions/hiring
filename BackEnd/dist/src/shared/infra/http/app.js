"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("../../container");
const AppError_1 = require("../../errors/AppError");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(routes_1.router);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error: ${err.message}`,
    });
});
