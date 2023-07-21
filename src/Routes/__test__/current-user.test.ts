import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/cookie-auth-helper';

it('responds with details about the current user', async () => {
    const cookie = await signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if unauthorized', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);

    expect(response.body.currentUser).toEqual(undefined);
});