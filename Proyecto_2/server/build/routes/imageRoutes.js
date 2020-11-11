"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageControler_1 = require("../controllers/imageControler");
const multer_1 = __importDefault(require("../libs/multer"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', multer_1.default.single('image'), imageControler_1.imageController.create);
        this.router.get('/', imageControler_1.imageController.get);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
