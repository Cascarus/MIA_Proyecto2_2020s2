import { Request, Response} from 'express';

class ImageController {

    public create(req: Request, res:Response) {
        console.log('foto cargada')
        res.json({text: req.file.path})
    }

    public get(req: Request, res:Response) {
        console.log('foto cargada')
        res.json({text:'foto cargada'})
    }
}

export const imageController = new ImageController();