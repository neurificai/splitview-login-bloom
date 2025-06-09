import CryptoJS from 'crypto-js';
const VITE_APP_IV = import.meta.env.VITE_APP_IV;
const VITE_APP_SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

/**
 * Returns a SHA-256 hash (hex) of the input string.
 * @param {string} input - The string to hash.
 * @returns {string} - The SHA-256 hash in hex format.
 */

export function hashSHA256(input) {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

export function hashMD5(input) {
    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}

export function hashSHA1(input) {
    return CryptoJS.SHA1(input).toString(CryptoJS.enc.Hex);
}

export function encryptAES(input) {
    const key = CryptoJS.enc.Utf8.parse(VITE_APP_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(VITE_APP_IV);

    const encrypted = CryptoJS.AES.encrypt(input, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
}