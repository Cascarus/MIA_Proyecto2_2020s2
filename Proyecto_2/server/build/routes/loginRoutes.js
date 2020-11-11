"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControler_1 = require("../controllers/loginControler");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', loginControler_1.loginCtrl.getUser);
        this.router.post('/', loginControler_1.loginCtrl.login);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
