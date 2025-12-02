import type {CookieConsentHistoryRecord, CookieConsentRecord} from "chums-types";

export interface StatusIconsProps {
    preferences?: CookieConsentHistoryRecord['preferences'];
    ack?: CookieConsentRecord['ack'];
    gpc?: CookieConsentRecord['gpc'];
}

export default function StatusIcons({preferences, ack, gpc}: StatusIconsProps) {
    return (
        <div className="d-flex gap-1">
            {ack && <span className="bi-check-circle-fill text-success" />}
            {!ack && <span className="bi-check-circle text-secondary" />}
            {isAccepted(preferences) && <span className="bi-check text-success" />}
            {!isAccepted(preferences) && isPartiallyAccepted(preferences) && <span className="bi-check text-warning" />}
            {isRejected(preferences) && <span className="bi-check text-danger" />}
            {gpc && <span className="bi-incognito text-secondary" />}
        </div>
    )
}

function isAccepted(preferences?: CookieConsentHistoryRecord['preferences']) {
    return preferences?.preferences
        && preferences?.analytics
        && preferences?.marketing;
}

function isPartiallyAccepted(preferences?: CookieConsentHistoryRecord['preferences']) {
    return preferences?.preferences
        || preferences?.analytics
        || preferences?.marketing;
}

function isRejected(preferences?: CookieConsentHistoryRecord['preferences']) {
    return !isAccepted(preferences) && !isPartiallyAccepted(preferences);
}
