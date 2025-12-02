import type {CookieConsentHistoryRecord} from "chums-types";

export interface ConsentRecord extends CookieConsentHistoryRecord {
    ['preferences.functional']?: boolean;
    ['preferences.preferences']?: boolean;
    ['preferences.analytics']?: boolean;
    ['preferences.marketing']?: boolean;
}

export interface CookieConsentHistoryResponse {
    history: ConsentRecord[];
    count: number;
    expired: number;
}

export type PurgeHistoryResponse = Omit<CookieConsentHistoryResponse, 'history'>;
