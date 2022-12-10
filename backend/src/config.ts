import {config} from 'dotenv';
config();

const vars = {
  DATABASE_URI: '',
  COLLECTION: '',
  URI_PARAMS: '',
};

Object.keys(vars).forEach(key => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Env variable ${key} is undefined.`);
  }

  vars[<keyof typeof vars>key] = value;
});

export default vars;
