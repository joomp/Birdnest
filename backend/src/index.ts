import mongoose from 'mongoose';
import {createServer} from 'http';
import env from './config';
import sp from './streamProcessing';
import app from './app';

mongoose
  .connect(`${env.DATABASE_URI}/${env.COLLECTION}${env.URI_PARAMS}`)
  .then(() => {
    console.log('connected to MongoDB');
    sp.start(1800);
    createServer(app).listen(5000);
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message);
  });
