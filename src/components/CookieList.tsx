import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {loadCookies, selectSort, selectSortedCookies, setSort} from "@/slices/cookies";
import {SortableTable} from "@chumsinc/sortable-tables";
import {fields} from "@/components/cookie-list-fields.tsx";
import type {SortProps} from "chums-types";
import type {ConsentRecord} from "@/types/cookies.ts";
import {useEffect, useState} from "react";
import ConsentInfoModal from "@/components/ConsentInfoModal.tsx";

export default function CookieList() {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectSort);
    const list = useAppSelector(selectSortedCookies);
    const [current, setCurrent] = useState<ConsentRecord|null>(null);

    const sortChangeHandler = (sort:SortProps<ConsentRecord>) => {
        dispatch(setSort(sort));
    }

    useEffect(() => {
        dispatch(loadCookies(0));
    }, [dispatch]);


    return (
        <div>
            <SortableTable size="xs" fields={fields} keyField="uuid"
                           data={list} onSelectRow={setCurrent}
                           currentSort={sort} onChangeSort={sortChangeHandler}  />
            <ConsentInfoModal show={!!current} consent={current!} onHide={() => setCurrent(null)}/>
        </div>
    )

}
