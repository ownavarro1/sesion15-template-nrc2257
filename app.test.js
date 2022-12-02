import request from 'supertest';
import app from './app';

// Caso de exito - Recibe usuario y password correctos
describe('POST /users', () => {
  describe('given a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/users').send({
        username: 'username',
        password: 'password',
      });

      expect(response.statusCode).toBe(200);
    });

    // se debe retornar el id del usuario creado
    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/users').send({
        username: 'username',
        password: 'password',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });

    // se retorna el userId
    test('response has user Id', async () => {
      const response = await request(app).post('/users').send({
        username: 'username',
        password: 'password',
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  // Caso de Error - cuando no se recibe usuario y contraseña
  describe('when the username and password is missing', () => {
    // retorna error status 400
    test('should respond with a status code of 400', async () => {
      const bodyData = [{ username: 'username' }, { password: 'password' }, {}];
      for (const body of bodyData) {
        const response = await request(app).post('/users').send(body);

        expect(response.statusCode).toBe(400);
      }
    });
  });
});
