import {Router} from 'express';
import { productCtrl } from '../controllers/productControler'

class ProductRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/', productCtrl.getProduct );
        this.router.post('/cart/add', productCtrl.addCart);
        this.router.get('/cart/:id', productCtrl.getCart);
        this.router.post('/cart/delete', productCtrl.deleteOneDet);
        this.router.post('/buy',productCtrl.buy);
        this.router.post('/cart/deleteC', productCtrl.deleteCart);
        this.router.get('/categoria', productCtrl.getCategoria);
        this.router.post('/add', productCtrl.addProduct);
        this.router.get('/get/:id', productCtrl.getOneProduct)
        this.router.post('/like', productCtrl.addLike)
        this.router.post('/dislike', productCtrl.addDislike)
    }

}

const productRoutes = new ProductRoutes();
export default productRoutes.router;