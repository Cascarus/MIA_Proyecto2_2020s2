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
exports.loginCtrl = void 0;
const db_1 = __importDefault(require("../db"));
class LoginCtrl {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var sql = "SELECT * FROM usuario";
            yield db_1.default.db2().exec(sql, [], function (result) {
                res.json(result);
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //var connection = db.db2();
            //var sql = 'SELECT * FROM usuario WHERE COD_USUARIO =: COD_USUARIO';
            //var obj = req.body;
            //console.log(obj);
            //res.send('recivido');
            res.send("llego login server");
            /*await connection.exec(sql,obj,function(result:any){
                res.json(result)
            });*/
        });
    }
}
exports.loginCtrl = new LoginCtrl();
