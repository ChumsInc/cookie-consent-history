import type {SortableTableField} from "@chumsinc/sortable-tables";
import dayjs from 'dayjs';
import type {CookieConsentHistoryRecord} from "chums-types";
import UserIcon from "@/components/UserIcon.tsx";
import UserLink from "@/components/UserLink.tsx";
import StatusIcons from "@/components/StatusIcons.tsx";

export const fields: SortableTableField<CookieConsentHistoryRecord>[] = [
    {field: 'accountType', title: '?', sortable: true, render: (row) => <UserIcon accountType={row.accountType} />},
    {field: 'name', title: 'Name', sortable: true, render: (row) => <UserLink userId={row.userId} name={row.name} ipAddress={row.ipAddress} />},
    {field: 'status', title: 'Status', sortable: true, render: (row) => <StatusIcons preferences={row.preferences} ack={row.ack} gpc={row.gpc} />},
    {
        field: 'dateUpdated',
        title: 'Updated',
        sortable: true,
        align: 'end',
        render: (record) => dayjs(record.dateUpdated).format('YYYY-MM-DD HH:mm')
    },
]
