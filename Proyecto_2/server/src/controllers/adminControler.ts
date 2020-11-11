import { Request, Response} from 'express';
import db from '../db';

class AdminCtrl {

    public async report_1(req: Request, res: Response){
        console.log('llego a reporte 1');
        var sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_1_Ord(req: Request, res: Response){
        console.log('llego a reporte 1 ORD');
        var sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario`;
        var id = req.params.id;

        if(id=='DESC'){
            sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario
                   ORDER BY bit.Fecha DESC`;
        } else if(id='ASC'){
            sql = `SELECT usr.Correo, bit.Descripcion, bit.Fecha
                   FROM USUARIOS usr, Bitacora bit
                   WHERE usr.Cod_usuario = bit.Cod_usuario
                   ORDER BY bit.Fecha ASC`;
        }

        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_2(req: Request, res: Response){
        console.log('llego a reporte 2');
        var sql = `SELECT prod.Producto,usr.Nombre, usr.Apellido, COUNT(det.Cod_producto) as Cantidad
                   FROM Detalle_compras det
                   INNER JOIN PRODUCTOS prod ON prod.Cod_producto = det.Cod_producto
                   INNER JOIN USUARIOS usr ON prod.Cod_usuario = usr.Cod_usuario
                   GROUP BY prod.Producto, usr.Nombre, usr.Apellido
                   ORDER BY Cantidad DESC
                   FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_3(req: Request, res: Response){
        console.log('llego a reporte 3');
        var sql = `SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Likes
                   FROM PRODUCTOS prod, USUARIOS usr
                   WHERE prod.Cod_usuario = usr.Cod_usuario
                   ORDER BY prod.Likes DESC
                   FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_4(req: Request, res: Response){
        console.log('llego a reporte 4');
        var sql = `SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Dislikes
                   FROM PRODUCTOS prod, USUARIOS usr
                   WHERE prod.Cod_usuario = usr.Cod_usuario
                   ORDER BY prod.dislikes DESC
                   FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_5a(req: Request, res: Response){
        console.log('llego a reporte 4');
        var sql = `SELECT Nombre, Apellido, Correo, Fecha, Creditos
                   FROM USUARIOS
                   WHERE Tipo != 0
                   ORDER BY CREDITOS DESC
                   FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_5b(req: Request, res: Response){
        console.log('llego a reporte 4');
        var sql = `SELECT Nombre, Apellido, Correo, Fecha, Creditos
                   FROM USUARIOS
                   WHERE Tipo != 0
                   ORDER BY CREDITOS ASC
                   FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_6(req: Request, res: Response){

    }

    public async report_7(req: Request, res: Response){
        console.log('llego a reporte 7');
        var sql = `SELECT usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos, COUNT(prod.Cod_producto) as CANT
                    FROM USUARIOS usr, PRODUCTOS prod
                    WHERE usr.Tipo != 0 AND usr.Cod_usuario = prod.Cod_usuario
                    GROUP BY usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos
                    ORDER BY CANT DESC
                    FETCH FIRST 10 ROWS ONLY`;
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async report_8(req: Request, res: Response){
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
        
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    
}

export const adminCtrl = new AdminCtrl();