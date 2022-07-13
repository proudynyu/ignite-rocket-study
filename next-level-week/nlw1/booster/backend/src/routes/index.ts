import { Router } from 'express';
import PointsControllers from '../controllers/pointsControllers';
import ItensControllers from '../controllers/itensControllers';

import multer from 'multer';
import config from '../config/multer';

const routes = Router();

const uploads = multer(config);

const itensControllers = new ItensControllers;
const pointsControllers = new PointsControllers;

routes.get('/itens', itensControllers.index);

routes.get('/points', pointsControllers.index);
routes.post('/points', uploads.single('image'), pointsControllers.create);
routes.get('/points/:id', pointsControllers.show)

routes.get('/', (req, res) => {
    return res.json({msg: 'Hello World'});
});

export default routes;