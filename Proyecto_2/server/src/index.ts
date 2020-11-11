import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import imageRoutes from './routes/imageRoutes'
import productRoutes from './routes/productRoutes'
import adminRoutes from './routes/adminRoutes'
import path from 'path';

 class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        //this.app.use(indexRoutes);
        this.app.use('/user',userRoutes);
        this.app.use('/image', imageRoutes);
        this.app.use('/product',productRoutes);
        this.app.use('/admin',adminRoutes)
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'))
        });
    }

 }

 const server = new Server();
 server.start();