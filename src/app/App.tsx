import AppAlertList from "@/components/AppAlertList.tsx";
import CookieList from "@/components/CookieList.tsx";
import Legend from "@/components/Legend.tsx";
import HistoryNav from "@/components/HistoryNav.tsx";

function App() {
    return (
        <div>
            <h3>Cookie Consent History</h3>
            <AppAlertList/>
            <HistoryNav />
            <CookieList />
            <Legend />
        </div>
    );
}

export default App;
