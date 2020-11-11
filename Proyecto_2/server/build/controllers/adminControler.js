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
exports.adminCtrl = void 0;
const db_1 = __importDefault(require("../db"));
class AdminCtrl {
    report_1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 1');
            var sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_1_Ord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 1 ORD');
            var sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario`;
            var id = req.params.id;
            if (id == 'DESC') {
                sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario
                   ORDER BY bit.Fecha DESC`;
            }
            else if (id = 'ASC') {
                sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario
                   ORDER BY bit.Fecha ASC`;
            }
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 2');
            var sql = `SELECT prod.Producto,usr.Nombre, usr.Apellido, COUNT(det.Cod_producto) as Cantidad
                   FROM Detalle_compras det
                   INNER JOIN PRODUCTOS prod ON prod.Cod_producto = det.Cod_producto
                   INNER JOIN USUARIOS usr ON prod.Cod_usuario = usr.Cod_usuario
                   GROUP BY prod.Producto, usr.Nombre, usr.Apellido
                   ORDER BY Cantidad DESC
                   FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 3');
            var sql = `SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Likes
                   FROM PRODUCTOS prod, USUARIOS usr
                   WHERE prod.Cod_usuario = usr.Cod_usuario
                   ORDER BY prod.Likes DESC
                   FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 4');
            var sql = `SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Dislikes
                   FROM PRODUCTOS prod, USUARIOS usr
                   WHERE prod.Cod_usuario = usr.Cod_usuario
                   ORDER BY prod.dislikes DESC
                   FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_5a(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 4');
            var sql = `SELECT Nombre, Apellido, Correo, Fecha, Creditos
                   FROM USUARIOS
                   WHERE Tipo != 0
                   ORDER BY CREDITOS DESC
                   FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_5b(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 4');
            var sql = `SELECT Nombre, Apellido, Correo, Fecha, Creditos
                   FROM USUARIOS
                   WHERE Tipo != 0
                   ORDER BY CREDITOS ASC
                   FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_6(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    report_7(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 7');
            var sql = `SELECT usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos, COUNT(prod.Cod_producto) as CANT
                    FROM USUARIOS usr, PRODUCTOS prod
                    WHERE usr.Tipo != 0 AND usr.Cod_usuario = prod.Cod_usuario
                    GROUP BY usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos
                    ORDER BY CANT DESC
                    FETCH FIRST 10 ROWS ONLY`;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    report_8(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('llego a reporte 8');
            var sql = `SELECT temp1.pais, temp2.Cantidad, temp1.Creditos, temp1.cant_usr
                    FROM( SELECT p.Cod_Pais, p.pais, COUNT(usr.Cod_usuario) as cant_usr, SUM(usr.Creditos) as Creditos
                        FROM pais p, USUARIOS usr
                        WHERE usr.Tipo != 0 AND p.Cod_pais = usr.Cod_pais  
                        GROUP BY p.Cod_pais, p.pais) temp1 ,
                        (SELECT p.Cod_Pais, p.pais, COUNT(prod.COD_PRODUCTO) as Cantidad
                        FROM pais p, PRODUCTOS prod, USUARIOS usr
                        WHERE usr.Tipo != 0 AND p.Cod_pais = usr.Cod_pais AND usr.Cod_usuario = prod.Cod_usuario 
                        GROUP BY p.Cod_pais, p.pais) temp2
                    WHERE temp1.Cod_Pais = temp2.Cod_Pais
                    ORDER BY temp1.Creditos DESC `;
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
}
exports.adminCtrl = new AdminCtrl();
