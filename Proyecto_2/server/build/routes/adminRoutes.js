"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControler_1 = require("../controllers/adminControler");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/report_1', adminControler_1.adminCtrl.report_1);
        this.router.get('/report_1/:id', adminControler_1.adminCtrl.report_1_Ord);
        this.router.get('/report_2', adminControler_1.adminCtrl.report_2);
        this.router.get('/report_3', adminControler_1.adminCtrl.report_3);
        this.router.get('/report_4', adminControler_1.adminCtrl.report_4);
        this.router.get('/report_5a', adminControler_1.adminCtrl.report_5a);
        this.router.get('/report_5b', adminControler_1.adminCtrl.report_5b);
        this.router.get('/report_6', adminControler_1.adminCtrl.report_6);
        this.router.get('/report_7', adminControler_1.adminCtrl.report_7);
        this.router.get('/report_8', adminControler_1.adminCtrl.report_8);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
