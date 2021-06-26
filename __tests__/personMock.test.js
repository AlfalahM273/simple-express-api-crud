const mockRequest = (params, query, body) => ({
  params: params,
  query: query,
  body: body,
});

const personController = require('../src/controller');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe.only('Person Get Data', () => {
  test('should 200', async () => {
    const res = mockResponse();
    await personController(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

});
