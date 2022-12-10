import {parseStringPromise} from 'xml2js';
import '../types';

/**
 * Request drone report from drones API. If the request fails, returns null,
 * else returns object.
 *
 * @returns Report object
 */
export const getReport = async () => {
  try {
    const url = 'https://assignments.reaktor.com/birdnest/drones';
    const response = await fetch(url, {
      headers: {
        accept: 'application/xml',
      },
    });
    const xml = await response.text();
    const object = await parseStringPromise(xml, {explicitArray: false});
    return object.report as report;
  } catch (e) {
    console.error(e);
    return null;
  }
};
