import request from 'supertest';
import { app } from '../app';

export var signin = async () => {
    const email = 'test@test.com';
    const password = 'password123';

    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = res.get('Set-Cookie');

    return cookie;
};