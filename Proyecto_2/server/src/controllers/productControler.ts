import { Request, Response, ErrorRequestHandler} from 'express';
import db from '../db';
import nodemailer from 'nodemailer';
import correo from '../correo';
import crypto from 'crypto';

class ProductCtrl {

    public async getProduct(req: Request, res:Response){
        console.log("Llego a getProduct");
        var sql = "SELECT * FROM productos WHERE cod_usuario != :id";
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,[obj.id],function(result:any){
            res.json(result)
        });
    }

    public async addCart(req: Request, res:Response){
        console.log("llego a addCart");
        var sql = "SELECT Cod_carrito FROM Carrito WHERE Cod_usuario=:idUsr AND BLOQUEADO != 1"
        var obj = req.body;
        
        await db.db2().exec(sql,[obj.idUsr], function(result: any){
            sql = "INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)VALUES(:carrito,:cod_product,:cant,:precio,:subTotal)";
            var temp = result[0];
            console.log(temp);
            delete obj.idUsr;

            obj.carrito = temp.COD_CARRITO;
            console.log(obj);

            db.db2().exec(sql,obj,function(result: any){
                res.json({text:"se a agregado al carrito con exito"});
            });
        });
        
    }
    
    public async getCart(req: Request, res: Response){
        console.log("llego a getCart");
        var sql = "SELECT Cod_carrito FROM Carrito WHERE Cod_usuario=:idUsr AND BLOQUEADO != 1"
        var obj = req.params.id;
        console.log(obj);
        
        await db.db2().exec(sql,[obj], function(result: any){
            sql = "SELECT det.Cod_Carrito, det.Cod_Producto, prod.Producto, det.Cantidad, det.Precio, det.Sub_Total FROM Detalle_Carrito det, Productos prod WHERE COD_CARRITO=:COD_CARRITO AND det.Cod_producto = prod.Cod_producto AND Cantidad != 0";
            var temp = result[0];
            console.log(temp);

            db.db2().exec(sql,temp,function(result: any){
                res.json(result);
            });
        });

    }

    public async deleteOneDet(req: Request, res:Response){
        console.log()
        var sql = "UPDATE Detalle_Carrito SET Cantidad = 0 WHERE COD_Carrito =:COD_CARRITO AND COD_PRODUCTO =: COD_PRODUCTO";
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,obj,function(result: any){
            res.json({text: "eliminado correctamente"})
        });
    }

    public async buy(req: Request, res: Response){
        console.log("llego a Buy");
        var sql = "INSERT INTO Detalle_compras(Cod_Compra, Cod_producto, Cantidad, Precio, Sub_Total)VALUES(:COD_COMPRA,:COD_PRODUCTO,:CANT,:PRECIO,:SUB)";
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,obj,function(result: any){
            res.json({text: "insertado correctamente"});
        });
    }

    public async deleteCart(req: Request, res:Response){
        console.log()
        var sql = "UPDATE CARRITO SET BLOQUEADO = 1 WHERE COD_Carrito =:COD_CARRITO";
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,[obj.COD_CARRITO],function(result: any){
            //res.json({text: "eliminado correctamente"})
            sql = `INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
                   VALUES(:COD_USUARIO,TO_DATE(:FECHA,\'YYYY/MM/DD\'),0)`
            
            delete obj.COD_CARRITO;
            console.log(obj);

            db.db2().exec(sql,obj,function(result: any){
                res.json(result);
            });
        });
    }

    public async getCategoria(req: Request, res:Response){
        console.log("llego a getCategoria");
        var sql = 'SELECT * FROM CATEGORIAS'
        
        db.db2().exec(sql,[],function(result: any){
            res.json(result);
        });
    }


    public async addProduct(req: Request, res:Response){
        console.log("llego a addProduct");
        var sql = `INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
                   VALUES(:Cod_usuario,:Producto,:Precio,:Descripcion,:Likes,:Dislikes,:Bloqueado,:Foto)`
        var obj = req.body;
        console.log(obj);
        
        db.db2().exec(sql,obj,function(result: any){
            sql = "SELECT Cod_producto FROM PRODUCTOS WHERE Cod_usuario=:id AND Producto=:producto"
            let tempProd={
                id: obj.Cod_usuario,
                producto: obj.Producto,
            };

            db.db2().exec(sql,tempProd,function(result: any){
                console.log(result[0]);
                res.json(result[0]);
            });
        });
    }

    public async getOneProduct(req: Request, res: Response){
        console.log("llego a getCart");
        var sql = "SELECT * FROM PRODUCTOS WHERE Cod_Producto=:id"
        var obj = req.params.id;
        console.log(obj);
        
        await db.db2().exec(sql,[obj], function(result: any){
            console.log(result[0]);
            res.json(result[0])
        });

    }

    public async addLike(req: Request, res:Response){
        console.log("llego a addLike");
        var sql = `UPDATE Productos SET Likes = :likes WHERE Cod_producto =:cod_product`
        var obj = req.body;
        console.log(obj);
        
        db.db2().exec(sql,obj,function(result: any){
            console.log(result);
            res.json(result);
        });
    }

    public async addDislike(req: Request, res:Response){
        console.log("llego a addLike");
        var sql = `UPDATE Productos SET DISLIKES = :dislikes WHERE Cod_producto =:cod_product`
        var obj = req.body;
        console.log(obj);
        
        db.db2().exec(sql,obj,function(result: any){
            console.log(result);
            res.json(result);
        });
    }
}

export const productCtrl = new ProductCtrl();