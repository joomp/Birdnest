import Infraction from '../models/infraction';
import {Request, Response} from 'express';
/**
 * Respond with pilot information. Fetches the pilot information from pilot API.
 * Responds with error if the pilot does not have recent NDZ violations or the
 * pilot information is not found.
 *
 * @param request Request
 * @param response Response
 */
const get = async (request: Request, response: Response) => {
  const serialNumber = request.params['serialNumber'];
  let registeredOffender;
  try {
    registeredOffender = await Infraction.findOne({serialNumber});
  } catch (e) {
    console.error(e);
    response.status(500).send({error: 'Problem with the database.'});
    return;
  }
  if (!registeredOffender) {
    response.status(403).send({
      error:
        `The pilot of ${serialNumber} does not have recent NDZ violations. ` +
        'Access to the pilot information forbidden.',
    });
    return;
  }
  try {
    const url = `http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`;
    const resp = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    if (resp.status === 404) {
      response.status(404).send({
        error: 'The pilot information not found :(',
      });
    } else {
      response.status(200).json(await resp.json());
    }
  } catch (e) {
    console.error(e);
    response.status(500).send({error: 'Something went awry.'});
  }
};

export default {get};
