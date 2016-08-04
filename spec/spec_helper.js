let globals;

beforeAll(() => {
  globals = {
  };
  Object.assign(global, globals);
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
});
