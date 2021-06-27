const personController = require('../src/controller/person');
// const Jest = require('jest');

const mockRequest = (params, query, body) => ({
  params: params,
  query: query,
  body: body,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('Person Get Data', () => {
  //Positive
  test('get All data should 200', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await personController.index(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  //Positive
  test('get search data', async () => {
    const query = { q: 'tes'}
    const req = mockRequest( {}, query, {} );
    const res = mockResponse();
    await personController.search(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  //Positive
  test('get data by id and its found', async () => {
    const params = { id : '6'}
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.findById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Negative
  test('get data by id, id contains string', async () => {
    const params = { id : '2ss'}
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.findById(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith('personId must bee number!');
  });
  // Negative
  test('get data by id, id is not set', async () => {
    const params = { id : null }
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.findById(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith('personId not set');
  });
  // Negative
  test('get data by id and its not found', async () => {
    const params = { id : '222'}
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.findById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Person Not Found');
  });

});

describe('Person create data', () => {
  //Negative
  test('post data where 1 of the required field is missing, return 422', async () => {
    const body = { 
      // name : 'name',
      age : 10,
      address : 'address',
    }
    const req = mockRequest({}, {}, body);
    const res = mockResponse();
    await personController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
  });
  //Positive
  test('post data where 1 of the required field is missing, return 422', async () => {
    const body = { 
      name : 'name',
      age : 10,
      address : 'address',
    }
    const req = mockRequest({}, {}, body);
    const res = mockResponse();
    await personController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('Person delete data', () => {
  //Negative
  test('Delete person data based on its Id. person not found', async () => {
    const params = { id : '222'}
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  //Positive
  test.skip('Delete person data based on its Id. person found', async () => {
    const params = { id : '3'}
    const req = mockRequest( params, {}, {} );
    const res = mockResponse();
    await personController.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
