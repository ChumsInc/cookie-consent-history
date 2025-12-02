import {fetchJSON} from "@chumsinc/ui-utils";
import type {CookieConsentHistoryResponse, PurgeHistoryResponse} from "@/types/cookies.ts";

export async function fetchCookies(offset: number, limit: number): Promise<CookieConsentHistoryResponse|null> {
    try {
        const params = new URLSearchParams();
        params.set('offset', offset.toString());
        params.set('limit', limit.toString());
        const url = `/api/user/v2/admin/cookie-consent/history.json?${params.toString()}`;
        return  await fetchJSON<CookieConsentHistoryResponse>(url, {cache: 'no-cache'});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchCookies()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCookies()", err);
        return Promise.reject(new Error('Error in fetchCookies()'));
    }
}

export async function deleteExpiredCookies():Promise<PurgeHistoryResponse|null> {
    try {
        const url = `/api/user/v2/admin/cookie-consent/history.json`;
        return await fetchJSON<PurgeHistoryResponse>(url, {method: 'DELETE'});
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("deleteExpiredCookies()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteExpiredCookies()", err);
        return Promise.reject(new Error('Error in deleteExpiredCookies()'));
    }
}
