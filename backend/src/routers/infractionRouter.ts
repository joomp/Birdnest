import * as express from 'express';
import controller from '../controllers/infractionController';

/**
 * Creates router for infractions
 *
 * @returns Infraction router
 */
const createRouter = () => {
  const router = express.Router();
  router.get('/', controller.getAll);
  return router;
};

export default createRouter;
