require('./spec_helper');

describe('UserRouter', () => {
  const fetch = require('isomorphic-fetch');
  const base_url = `http://localhost:${process.env.PORT}`;

  describe('GET /user/:id', () => {
    it('returns status code 200', async(done) => {
      const res = await fetch(`${base_url}/user/1`);
      const body = await res.json();
      expect(res.status).toEqual(200);
      expect(body).toEqual({});
      done();
    });
  });
});
