import {Router} from 'express';
import { loginCtrl } from '../controllers/userControler'

class LoginRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/get/:id', loginCtrl.getUser );
        this.router.post('/login', loginCtrl.login);
        this.router.post('/create', loginCtrl.createUsr);
        this.router.post('/enviar', loginCtrl.sendEmail);
        this.router.get('/verify-email/:id', loginCtrl.verify_email);
        this.router.get('/paises', loginCtrl.getPaises);
        this.router.post('/restart-pass', loginCtrl.restartPass1);
        this.router.post('/restart-pass/:id', loginCtrl.restartPass2);
        this.router.post('/create/compra', loginCtrl.createCompra);
        this.router.post('/sendFactura', loginCtrl.sendFactura);
        this.router.post('/sendVenta', loginCtrl.sendVenta);
        this.router.post('/bitacora', loginCtrl.bitacora);
        //this.router.get('/login', loginCtrl.login);
    }

}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;