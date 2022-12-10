import Infraction from '../models/infraction';
import {Request, Response} from 'express';

/**
 * Respond with JSON containing all infractions in the db
 *
 * @param request Request
 * @param response Response
 */
const getAll = async (request: Request, response: Response) => {
  try {
    const all = await Infraction.find({}).sort({snapshotTimestamp: -1});
    response.status(200).json(all);
  } catch (e) {
    console.error(e);
    response.status(500).send({error: 'Problem with the database.'});
  }
};

export default {getAll};
