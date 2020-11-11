"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCtrl = void 0;
const db_1 = __importDefault(require("../db"));
class ProductCtrl {
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Llego a getProduct");
            var sql = "SELECT * FROM productos WHERE cod_usuario != :id";
            var obj = req.body;
            console.log(obj);
            yield db_1.default.db2().exec(sql, [obj.id], function (result) {
                res.json(result);
            });
        });
    }
    addCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a addCart");
            var sql = "SELECT Cod_carrito FROM Carrito WHERE Cod_usuario=:idUsr AND BLOQUEADO != 1";
            var obj = req.body;
            yield db_1.default.db2().exec(sql, [obj.idUsr], function (result) {
                sql = "INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)VALUES(:carrito,:cod_product,:cant,:precio,:subTotal)";
                var temp = result[0];
                console.log(temp);
                delete obj.idUsr;
                obj.carrito = temp.COD_CARRITO;
                console.log(obj);
                db_1.default.db2().exec(sql, obj, function (result) {
                    res.json({ text: "se a agregado al carrito con exito" });
                });
            });
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a getCart");
            var sql = "SELECT Cod_carrito FROM Carrito WHERE Cod_usuario=:idUsr AND BLOQUEADO != 1";
            var obj = req.params.id;
            console.log(obj);
            yield db_1.default.db2().exec(sql, [obj], function (result) {
                sql = "SELECT det.Cod_Carrito, det.Cod_Producto, prod.Producto, det.Cantidad, det.Precio, det.Sub_Total FROM Detalle_Carrito det, Productos prod WHERE COD_CARRITO=:COD_CARRITO AND det.Cod_producto = prod.Cod_producto AND Cantidad != 0";
                var temp = result[0];
                console.log(temp);
                db_1.default.db2().exec(sql, temp, function (result) {
                    res.json(result);
                });
            });
        });
    }
    deleteOneDet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            var sql = "UPDATE Detalle_Carrito SET Cantidad = 0 WHERE COD_Carrito =:COD_CARRITO AND COD_PRODUCTO =: COD_PRODUCTO";
            var obj = req.body;
            console.log(obj);
            yield db_1.default.db2().exec(sql, obj, function (result) {
                res.json({ text: "eliminado correctamente" });
            });
        });
    }
    buy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a Buy");
            var sql = "INSERT INTO Detalle_compras(Cod_Compra, Cod_producto, Cantidad, Precio, Sub_Total)VALUES(:COD_COMPRA,:COD_PRODUCTO,:CANT,:PRECIO,:SUB)";
            var obj = req.body;
            console.log(obj);
            yield db_1.default.db2().exec(sql, obj, function (result) {
                res.json({ text: "insertado correctamente" });
            });
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            var sql = "UPDATE CARRITO SET BLOQUEADO = 1 WHERE COD_Carrito =:COD_CARRITO";
            var obj = req.body;
            console.log(obj);
            yield db_1.default.db2().exec(sql, [obj.COD_CARRITO], function (result) {
                //res.json({text: "eliminado correctamente"})
                sql = `INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
                   VALUES(:COD_USUARIO,TO_DATE(:FECHA,\'YYYY/MM/DD\'),0)`;
                delete obj.COD_CARRITO;
                console.log(obj);
                db_1.default.db2().exec(sql, obj, function (result) {
                    res.json(result);
                });
            });
        });
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a getCategoria");
            var sql = 'SELECT * FROM CATEGORIAS';
            db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a addProduct");
            var sql = `INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
                   VALUES(:Cod_usuario,:Producto,:Precio,:Descripcion,:Likes,:Dislikes,:Bloqueado,:Foto)`;
            var obj = req.body;
            console.log(obj);
            db_1.default.db2().exec(sql, obj, function (result) {
                sql = "SELECT Cod_producto FROM PRODUCTOS WHERE Cod_usuario=:id AND Producto=:producto";
                let tempProd = {
                    id: obj.Cod_usuario,
                    producto: obj.Producto,
                };
                db_1.default.db2().exec(sql, tempProd, function (result) {
                    console.log(result[0]);
                    res.json(result[0]);
                });
            });
        });
    }
    getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a getCart");
            var sql = "SELECT * FROM PRODUCTOS WHERE Cod_Producto=:id";
            var obj = req.params.id;
            console.log(obj);
            yield db_1.default.db2().exec(sql, [obj], function (result) {
                console.log(result[0]);
                res.json(result[0]);
            });
        });
    }
    addLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a addLike");
            var sql = `UPDATE Productos SET Likes = :likes WHERE Cod_producto =:cod_product`;
            var obj = req.body;
            console.log(obj);
            db_1.default.db2().exec(sql, obj, function (result) {
                console.log(result);
                res.json(result);
            });
        });
    }
    addDislike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("llego a addLike");
            var sql = `UPDATE Productos SET DISLIKES = :dislikes WHERE Cod_producto =:cod_product`;
            var obj = req.body;
            console.log(obj);
            db_1.default.db2().exec(sql, obj, function (result) {
                console.log(result);
                res.json(result);
            });
        });
    }
}
exports.productCtrl = new ProductCtrl();
