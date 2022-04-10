import request from 'supertest'
import Server from '../src/express/server';
import config from '../src/config/index';
//import promiseAllWithFails from '../src/utils/promiseAllWithFails'
const { service } = config;


let server: Server
afterEach(async()=>{
    jest.useFakeTimers();
})
beforeAll(async () => {
    jest.useFakeTimers();
    server = new Server(service.port);
    console.log('Starting server...');

    await server.start();

    console.log(`Server started on port: ${service.port}`);
})

describe('POST /information', () => {
  it('should return 200 & valid response if request param list is empty', async done => {
    request(server.app)
      .post(`/api/information`)
      .send({"runUID": "123", "dataSource": "aka"})
      .expect(200)
      .end(function() {
        return done();
      });

  })

  it('should return 400 validation error response, no runUID in body', async done => {
    request(server.app)
      .post(`/api/information`)
      .send({ "dataSource": "aka"})
      .expect(400)
      .end(function() { 
        return done();
      });

  })
  it('should return 400 validation error response, no dataSource in body', async done => {
    request(server.app)
      .post(`/api/information`)
      .send({"runUID": "123"})
      .expect(400)
      .end(function() {   
        return done();
      });

  })

  it('should return 400 validation error response, wrong dataSource in body', async done => {
    request(server.app)
      .post(`/api/information`)
      .send({"runUID": "123","dataSource": "akaa"})
      .expect(400)
      .end(function() {
        
        return done();
      });
      

  })

})