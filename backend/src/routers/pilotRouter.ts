import * as express from 'express';
import controller from '../controllers/pilotController';

/**
 * Creates router for infractions
 *
 * @returns Infraction router
 */
const createRouter = () => {
  const router = express.Router();
  router.get('/:serialNumber', controller.get);
  return router;
};

export default createRouter;
