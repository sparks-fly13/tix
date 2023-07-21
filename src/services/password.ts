import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(6).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`;
    }
    static async compare(storedPassword: string, givenPassword: string) {
        const [hashedPwd, salt] = storedPassword.split('.');
        const buffer = (await scryptAsync(givenPassword, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashedPwd;
    }
}