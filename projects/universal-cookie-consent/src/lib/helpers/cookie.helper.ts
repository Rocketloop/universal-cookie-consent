import * as Cookies from 'js-cookie';

export const UNIVERSAL_COOKIE_CONSENT_NAMESPACE = 'ucc';

/**
 * Write a new key value pair to the cookies
 * @param key
 * @param value
 * @param options
 */
export function writeCookie<T>(key: string, value: T, options?: any) {
    if (options) {
        Cookies.set(`${UNIVERSAL_COOKIE_CONSENT_NAMESPACE}_${key}`, JSON.stringify(value), options);
    } else {
        Cookies.set(`${UNIVERSAL_COOKIE_CONSENT_NAMESPACE}_${key}`, JSON.stringify(value));
    }
}

/**
 * Read the value of the cookie with the given key
 * @param key
 */
export function readCookie<T>(key): T | null {
    const value = Cookies.get(`${UNIVERSAL_COOKIE_CONSENT_NAMESPACE}_${key}`);
    if (value) {
        try {
            return JSON.parse(value) as T;
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * Clear the key from the cookies
 */
export function clearCookie(key: string) {
    Cookies.remove(`${UNIVERSAL_COOKIE_CONSENT_NAMESPACE}_${key}`);
}
