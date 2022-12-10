const vars = {
  VITE_BACKEND_URL: "",
};

Object.keys(vars).forEach((key) => {
  const value = import.meta.env[key];

  if (value === undefined) {
    throw new Error(`Env variable ${key} is undefined.`);
  }

  vars[<keyof typeof vars>key] = value;
});

export default vars;
