import type {CookieConsentHistoryRecord, SortProps} from "chums-types";

export const cookiesSorter = (sort: SortProps<CookieConsentHistoryRecord>) => (a: CookieConsentHistoryRecord, b: CookieConsentHistoryRecord) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
        case 'name':
            return (
                (a[sort.field] ?? '').toLowerCase().localeCompare((b[sort.field] ?? '').toLowerCase()) == 0
                    ? (+(a.userId ?? 0) === +(b.userId ?? 0)
                        ? a.uuid.localeCompare(b.uuid)
                        : +(a.userId ?? 0) - +(b.userId ?? 0)
                    )
                    : (a[sort.field] ?? '').toLowerCase().localeCompare((b[sort.field] ?? '').toLowerCase())
            ) * sortMod;
        case 'gpc':
            return (
                a.gpc == b.gpc
                    ? a.uuid.localeCompare(b.uuid)
                    : a.gpc ? -1 : 1
            ) * sortMod;
        case 'dateUpdated':
        case 'dateExpires':
        case 'dateCreated':
        case 'uuid':
        case 'ipAddress':
        case 'url':
        case 'status':
            return (
                a[sort.field].localeCompare(b[sort.field]) == 0
                    ? a.uuid.localeCompare(b.uuid)
                    : a[sort.field].localeCompare(b[sort.field])
            ) * sortMod;
        default:
            return a.uuid.localeCompare(b.uuid) * sortMod;
    }
}
