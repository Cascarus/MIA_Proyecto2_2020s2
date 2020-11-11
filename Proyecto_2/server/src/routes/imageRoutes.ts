import { Router } from 'express';
import { imageController } from '../controllers/imageControler'
import multer from '../libs/multer';

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
      this.router.post('/', multer.single('image') ,imageController.create  );
      this.router.get('/',imageController.get  );
    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;