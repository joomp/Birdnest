/**
 * Respond with status 404 and error message
 *
 * @param request Request object
 * @param response Response object
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'Unknown endpoint.'});
};

export default unknownEndpoint;
