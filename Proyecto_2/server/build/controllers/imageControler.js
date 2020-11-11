"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
class ImageController {
    create(req, res) {
        console.log('foto cargada');
        res.json({ text: req.file.path });
    }
    get(req, res) {
        console.log('foto cargada');
        res.json({ text: 'foto cargada' });
    }
}
exports.imageController = new ImageController();
