import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {loadCookies, purgeCookies, selectExpired} from "@/slices/cookies";
import numeral from "numeral";
import LegendModal from "@/components/LegendModal.tsx";
import PurgeCookiesModal from "@/components/PurgeCookiesModal.tsx";

export default function Legend() {
    const dispatch = useAppDispatch();
    const expired = useAppSelector(selectExpired);
    const [showLegend, setShowLegend] = useState(false);
    const [showPurge, setShowPurge] = useState(false);

    const onPurgeCookies = async () => {
        await dispatch(purgeCookies());
        dispatch(loadCookies(0));
        setShowPurge(false);
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div onClick={() => setShowLegend(true)} className="btn btn-sm btn-link">Legend</div>
                {expired > 0 && (
                    <div className="btn btn-sm btn-outline-danger" onClick={() => setShowPurge(true)}>
                        Purge Expired ({numeral(expired).format('0,0')})
                    </div>
                )}
            </div>
            <LegendModal show={showLegend} onHide={() => setShowLegend(false)}/>
            <PurgeCookiesModal onPurgeCookies={onPurgeCookies} show={showPurge} onHide={() => setShowPurge(false)}/>
        </div>
    )
}
