import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {loadCookies, selectCount, selectExpired, selectLimit, selectOffset} from "@/slices/cookies";
import {useEffect, useState} from "react";

export default function HistoryNav() {
    const dispatch = useAppDispatch();
    const offset = useAppSelector(selectOffset);
    const count = useAppSelector(selectCount);
    const expired = useAppSelector(selectExpired)
    const limit = useAppSelector(selectLimit);
    const [allowNext, setAllowNext] = useState(false);
    const [allowPrev, setAllowPrev] = useState(false);

    useEffect(() => {
        setAllowPrev(offset > 0);
        setAllowNext(offset + limit < count);
    }, [offset, count, limit]);

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="text-secondary">Count: {count}</div>
            {expired > 0  && (<div className="text-warning">Expired: {expired}</div>)}
            <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-link"
                        onClick={() => dispatch(loadCookies(0))}>
                    <span className="bi-chevron-bar-left"/>
                </button>
                <button className="btn btn-sm btn-link" disabled={!allowPrev}
                        onClick={() => dispatch(loadCookies(offset - limit))}>
                    <span className="bi-chevron-left"/>
                </button>
                <button className="btn btn-sm btn-link" disabled={!allowNext}
                        onClick={() => dispatch(loadCookies(offset + limit))}>
                    <span className="bi-chevron-right"/>
                </button>
                <button className="btn btn-sm btn-link" disabled={!allowNext}
                        onClick={() => dispatch(loadCookies(count - (count % limit)))}>
                    <span className="bi-chevron-bar-right"/>
                </button>
            </div>
        </div>
    )


}
