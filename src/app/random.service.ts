import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
    // source: http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
    public generateRandomString(length: number, charMask = 'aA#!'): string {
        let mask = '';
        if (charMask.indexOf('a') > -1) {
            mask += 'abcdefghijklmnopqrstuvwxyz';
        }
        if (charMask.indexOf('A') > -1) {
            mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (charMask.indexOf('#') > -1) {
            mask += '0123456789';
        }
        if (charMask.indexOf('!') > -1) {
            mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        }
        let result = '';
        for (let i = length; i > 0; --i) {
            result += mask[Math.floor(Math.random() * mask.length)];
        }
        return result;
    }

    public generateStateString(length: number): string {
        return this.generateRandomString(length, 'aA#');
    }
}
