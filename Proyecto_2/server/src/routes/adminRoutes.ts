import { Router } from 'express';
import { adminCtrl } from '../controllers/adminControler';

class AdminRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/report_1',adminCtrl.report_1);
        this.router.get('/report_1/:id',adminCtrl.report_1_Ord);
        this.router.get('/report_2',adminCtrl.report_2);
        this.router.get('/report_3',adminCtrl.report_3);
        this.router.get('/report_4',adminCtrl.report_4);
        this.router.get('/report_5a',adminCtrl.report_5a);
        this.router.get('/report_5b',adminCtrl.report_5b);
        this.router.get('/report_6',adminCtrl.report_6);
        this.router.get('/report_7',adminCtrl.report_7);
        this.router.get('/report_8',adminCtrl.report_8);
    }

}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;