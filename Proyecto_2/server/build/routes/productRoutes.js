"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControler_1 = require("../controllers/productControler");
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', productControler_1.productCtrl.getProduct);
        this.router.post('/cart/add', productControler_1.productCtrl.addCart);
        this.router.get('/cart/:id', productControler_1.productCtrl.getCart);
        this.router.post('/cart/delete', productControler_1.productCtrl.deleteOneDet);
        this.router.post('/buy', productControler_1.productCtrl.buy);
        this.router.post('/cart/deleteC', productControler_1.productCtrl.deleteCart);
        this.router.get('/categoria', productControler_1.productCtrl.getCategoria);
        this.router.post('/add', productControler_1.productCtrl.addProduct);
        this.router.get('/get/:id', productControler_1.productCtrl.getOneProduct);
        this.router.post('/like', productControler_1.productCtrl.addLike);
        this.router.post('/dislike', productControler_1.productCtrl.addDislike);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
