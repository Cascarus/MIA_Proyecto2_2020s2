"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControler_1 = require("../controllers/userControler");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/get/:id', userControler_1.loginCtrl.getUser);
        this.router.post('/login', userControler_1.loginCtrl.login);
        this.router.post('/create', userControler_1.loginCtrl.createUsr);
        this.router.post('/enviar', userControler_1.loginCtrl.sendEmail);
        this.router.get('/verify-email/:id', userControler_1.loginCtrl.verify_email);
        this.router.get('/paises', userControler_1.loginCtrl.getPaises);
        this.router.post('/restart-pass', userControler_1.loginCtrl.restartPass1);
        this.router.post('/restart-pass/:id', userControler_1.loginCtrl.restartPass2);
        this.router.post('/create/compra', userControler_1.loginCtrl.createCompra);
        this.router.post('/sendFactura', userControler_1.loginCtrl.sendFactura);
        this.router.post('/sendVenta', userControler_1.loginCtrl.sendVenta);
        this.router.post('/bitacora', userControler_1.loginCtrl.bitacora);
        //this.router.get('/login', loginCtrl.login);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
