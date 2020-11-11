import { Request, Response} from 'express';
import db from '../db';
import nodemailer from 'nodemailer';
import correo from '../correo';
import crypto from 'crypto';

class LoginCtrl {

    public async getUser(req: Request, res:Response){
        var sql = "SELECT * FROM usuarios WHERE COD_USUARIO =:id";
        var id = req.params.id;

        await db.db2().exec(sql,[id],function(result:any){
            let tempUser={
                id: result[0].COD_USUARIO,
                nombre: result[0].NOMBRE,
                apellido: result[0].APELLIDO,
                correo: result[0].CORREO,
                cod_Pais: result[0].COD_PAIS,
                fecha: result[0].FECHA,
                tipo: result[0].TIPO,
                foto: result[0].FOTO,
                creditos: result[0].CREDITOS,
                validacion: result[0].VALIDACION,
            };
            res.json(tempUser);
        });
    }

    public async getPaises(req: Request, res: Response){
        var sql = "SELECT * FROM PAIS WHERE COD_PAIS != 1 ORDER BY Cod_pais ASC";
        await db.db2().exec(sql,[],function(result:any){
            res.json(result)
        });
    }

    public async login(req:Request, res:Response){
        var connection = db.db2();
        var sql = 'SELECT * FROM usuarios WHERE correo=:correo AND contrasena=:contrasena';
        var obj = req.body;

        console.log(obj);
        if(obj.Correo != 'admin'){
            obj.Contrasena = crypto.createHash('md5').update(obj.Contrasena).digest('hex')
        }
        console.log(obj);

        await connection.exec(sql,obj,function(result:any){
            console.log("respuesta")
            console.log(result.length)

            if(result.length == 1){
                let tempUser={
                    id: result[0].COD_USUARIO,
                    nombre: result[0].NOMBRE,
                    apellido: result[0].APELLIDO,
                    correo: result[0].CORREO,
                    cod_Pais: result[0].COD_PAIS,
                    fecha: result[0].FECHA,
                    tipo: result[0].TIPO,
                    foto: result[0].FOTO,
                    creditos: result[0].CREDITOS,
                    validacion: result[0].VALIDACION,
                    text: 'true',
                };
                res.json(tempUser);
            }else{
                res.json({text: 'false'})
            }
        });


    }

    public async sendEmail(req: Request, res: Response){
        let transporter = nodemailer.createTransport({
          service: "gmail",
          
          auth: correo.auth,
          
        });
               var obj = req.body;
        console.log("llego a send")
        console.log(obj);
        
        let info = await transporter.sendMail({
          
            from: "cascarus2@gmail.com", // sender address
            to: obj.Correo, // list of receivers
            subject: "Confirmacion de registro", // Subject line
            html: `<h1 style="color: #5e9ca0;">Hola <strong>` + obj.Nombre +`</strong>!</h1>
            <p>Por favor, haga clic en la url a continuaci&oacute;n para verificar su correo electr&oacute;nico</p>
            <p><a href="http://localhost:4200/confirmation/` + obj.Cod_usuario +`">http://localhost:4200/confirmation/` + obj.Cod_usuario +`</a></p>
            <p>O copiar esta url y pegar en la barra de direcciones de su navegador:<a href="http://localhost:4200/confirmation/` + obj.Cod_usuario +`">http://localhost:4200/confirmation/` + obj.Cod_usuario +`</a></p>
            <p>Saludos, de parte del equipo de&nbsp;<strong>GTSales Marketplace</strong></p>`
          }, (error, info) => {
            if (error) {
                return console.log(error);
              }
              console.log('mensaje enviado')
              res.json({text: "enviado"})
          });
    }

    public async createUsr(req: Request, res: Response){
        console.log("llego a createUsr");
        var connection = db.db2();
        var sql = 'SELECT * FROM usuarios WHERE correo=:correo';
        var obj = req.body;

        obj.Contrasena = crypto.createHash('md5').update(obj.Contrasena).digest("hex")

        await connection.exec(sql,[obj.Correo],function(result:any){
            console.log(result);  
            console.log(obj)  
            if(result.length < 1){
                sql = `INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_Pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
                       VALUES(:Nombre, :Apellido, :Correo, :Cod_Pais, TO_DATE(:Fecha, \'YYYY/MM/DD\'), :Tipo, :Contrasena, :Foto, :Creditos, :Validacion)`

                connection.exec(sql,obj,function(result: any){
                    sql = 'SELECT Cod_usuario FROM usuarios WHERE correo=:Correo';

                    connection.exec(sql,[obj.Correo],function(result: any){
                        console.log('resultado es:', result)

                        if(result.length == 1){
                            let tempUser={
                                id: result[0].COD_USUARIO,
                                text: "true"
                            };
                            res.json(tempUser);
                        }
                        res.json({text: "false"})
                    });
                });
            }else{
                res.json({text:"false"});
            }
        });
    }

    public async verify_email(req: Request, res:Response){
        var sql = "UPDATE USUARIOS SET Validacion = 1 WHERE cod_usuario =:id";
        var id = req.params.id;

        console.log(id);
        await db.db2().exec(sql,[id],function(result:any){
            //res.json(result)
            sql = `INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
                   VALUES(:COD_USUARIO,TO_DATE(:FECHA,\'YYYY/MM/DD\'),0)`

            let cart = {
              COD_USUARIO: id,
              FECHA: new Date().getFullYear() + '/' +  new Date().getMonth() + '/' + new Date().getDate(),
            }
            db.db2().exec(sql,cart,function(result: any){
                res.json(result);
            }); 
        });
        res.json({text: "se actualizo el dato " + id})
    }

    public async restartPass1(req: Request, res: Response){
        var sql = "SELECT * FROM USUARIOS WHERE Correo=:correo";
        var obj = req.body;
        console.log(obj);
        
        await db.db2().exec(sql,[obj.Correo], function(result: any){
            console.log(result);
            if(result.length == 1){
                let tempUser={
                    id: result[0].COD_USUARIO,
                    nombre: result[0].NOMBRE,
                    correo: result[0].CORREO,
                };
                
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    
                    auth: correo.auth,
                    
                });
                
                let info = transporter.sendMail({
                    
                        from: "cascarus2@gmail.com", // sender address
                        to: tempUser.correo, // list of receivers
                        subject: "Restablece tu contraseña", // Subject line
                        html: `<h1 style="color: #5e9ca0;">Hola <strong>` +  tempUser.nombre +`</strong>!</h1>
                        <p>Por favor, haga clic en la url a continuaci&oacute;n para restablecer su contraseña</p>
                        <p><a href="http://localhost:4200/reset-password/` + tempUser.id +`">http://localhost:4200/reset-password/` + tempUser.id  +`</a></p>
                        <p>O copiar esta url y pegar en la barra de direcciones de su navegador:<a href="http://localhost:4200/reset-password/` + tempUser.id +`">http://localhost:4200/reset-password/` + tempUser.id  +`</a></p>
                        <p>Si no has sido tu el que solicito el cambio de clave, puedes ignorar este mensaje</p>
                        <p>Saludos, de parte del equipo de&nbsp;<strong>GTSales Marketplace</strong></p>`
                    
                    }, (error, info) => {
                      if (error) {
                          return console.log(error);
                        }
                        console.log('mensaje enviado')
                        res.json({text: "enviado"})
                    });
            }       
        });
    }

    public async restartPass2(req: Request, res: Response){
        console.log("llego a restar2");
        var sql = "UPDATE USUARIOS SET Contrasena=:contrasena WHERE Cod_usuario=:id";
        var id = req.params.id;
        var obj = req.body;
        console.log(obj);
        console.log(id);

        let obj2={
            id: id,
            contrasena: crypto.createHash('md5').update(obj.contra).digest("hex"),
        };

        await db.db2().exec(sql,obj2, function(result: any){
            res.json({text: "Contrasena acutalizada con exito"});
        });
    }

    public async createCompra(req: Request, res: Response){
        console.log("llego a createCompra");
        var sql = `INSERT INTO compras(Cod_usuario, Fecha)
                   VALUES(:usr,  TO_DATE(:fecha, \'YYYY/MM/DD\'))`;
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,obj, function(result: any){
            sql = 'SELECT Cod_compra FROM COMPRAS WHERE Cod_usuario =:usr ORDER BY Cod_compra DESC FETCH FIRST 1 ROWS ONLY';

            db.db2().exec(sql,[obj.usr], function(result: any){
                res.json(result);
            });
        });
    }

    public async sendFactura(req: Request, res: Response){
        console.log("llego sendFactura");
        var obj = req.body;
        console.log(obj);

        var encabezado = `<h1 style="color: #5e9ca0;">Hola <strong>` + obj.Nombre +`</strong>!</h1>
                          <p>Este es su comprobante de la compra</p>
                          <table class="table table-hover">
                          <thead>
                          <tr><td><h4>Cantidad</h4></td><td><h4>Descripcion</h4></td><td><h4>Precio</h4></td><td><h4>Sub Total</h4></td></tr>
                          </thead>
                          <tbody>`;

        var final = `</tbody>
                     <tfoot>
                     <tr><td></td><td></td><td><h4>TOTAL</h4></td><td>Q.` + obj.Total + `</td></tr>
                     </tfoot>
                     </table>
                     <p>El total ha sido debitado de sus creditos</p>
                     <p>Saludos, de parte del equipo de&nbsp;<strong>GTSales Marketplace</strong></p>`;
        
        var cuerpo: string = '';

        for(let det of obj.Prod){
            cuerpo += "<tr><td>" + det.CANTIDAD + "</td><td>" + det.PRODUCTO + "</td><td>Q." + det.PRECIO + "</td><td>Q." + det.SUB_TOTAL + "</td></tr>";
        }
        
        let transporter = nodemailer.createTransport({
          service: "gmail",
          
          auth: correo.auth,
          
        });
        
        let info = await transporter.sendMail({
          
            from: "cascarus2@gmail.com", // sender address
            to: obj.Correo, // list of receivers
            subject: "Compra realizada exitosamente!", // Subject line
            html: encabezado + cuerpo + final
          }, (error, info) => {
            if (error) {
                return console.log(error);
              }
              console.log('mensaje enviado')
              res.json({text: "enviado"})
          });
    }

    public async sendVenta(req: Request, res: Response){
        console.log("llego sendVenta");
        var sql = "SELECT usr.NOMBRE, usr.CORREO FROM USUARIOS usr, PRODUCTOS prod WHERE prod.COD_PRODUCTO =:COD_PRODUCTO AND usr.Cod_usuario = prod.Cod_usuario";
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,[obj.COD_PRODUCTO], function(result: any){
            var temp = result[0];
            console.log(temp);

            var encabezado = `<h1 style="color: #5e9ca0;">Hola <strong>` + temp.NOMBRE +`</strong>!</h1>
                          <p>Este es su comprobante de la venta</p>
                          <table class="table table-hover">
                          <thead>
                          <tr><td><h4>Cantidad</h4></td><td><h4>Descripcion</h4></td><td><h4>Precio</h4></td><td><h4>Total</h4></td></tr>
                          </thead>
                          <tbody>`;

            var final = `</tbody>
                        </table>
                        <p>El Total se ha acreditado a su cuenta</p>
                        <p>Saludos, de parte del equipo de&nbsp;<strong>GTSales Marketplace</strong></p>`;
            
            var cuerpo: string = "<tr><td>" + obj.CANTIDAD + "</td><td>" + obj.PRODUCTO + "</td><td>Q." + obj.PRECIO + "</td><td>Q." + obj.SUB_TOTAL + "</td></tr>";
            
            let transporter = nodemailer.createTransport({
            service: "gmail",
            
            auth: correo.auth,
            
            });
            
            let info = transporter.sendMail({
            
                from: "cascarus2@gmail.com", // sender address
                to: temp.CORREO, // list of receivers
                subject: "Venta realizada exitosamente", // Subject line
                html: encabezado + cuerpo + final
            }, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('mensaje enviado')
                res.json({text: "enviado"})
            });
        });
    }

    public async bitacora(req: Request, res: Response){
        console.log("llego a bitacora");
        var sql = "INSERT INTO BITACORA(COD_USUARIO,DESCRIPCION,FECHA)VALUES(:id,:descripcion,TO_DATE(:fecha, \'YYYY/MM/DD\'))"
        var obj = req.body;
        console.log(obj);

        await db.db2().exec(sql,obj,function(result: any){
            res.json({text: "insertardo"});
        });

    }


    
}

export const loginCtrl = new LoginCtrl();