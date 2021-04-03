/**
 * Check whether the user is authenticated
 *
 * @return bool
 */
export const apiUrl = 'http://localhost:5000/api/';

export function isUserAuthenticated() {
    const cookieExpire = sessionStorage.getItem('cookieExpire');
    const COOKIE_EXPIRE_MINS = 5;
    if (cookieExpire !== undefined) {
        const now = new Date();
        var diffInMins = (now.getTime() - cookieExpire) / 60000;
        if (diffInMins <= COOKIE_EXPIRE_MINS) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
