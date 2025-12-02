import type {CookieConsentHistoryRecord, SortProps} from "chums-types";
import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/app/configureStore.ts";
import {deleteExpiredCookies, fetchCookies} from "@/slices/cookies/api.ts";
import {dismissAlert} from "@chumsinc/alert-list";
import type {CookieConsentHistoryResponse, PurgeHistoryResponse} from "@/types/cookies.ts";
import {cookiesSorter} from "@/slices/cookies/utils.ts";

export interface CookiesState {
    status: 'idle' | 'loading' | 'purging' | 'rejected';
    current: CookieConsentHistoryRecord | null;
    offset: number;
    limit: number;
    count: number;
    expired: number;
    sort: SortProps<CookieConsentHistoryRecord>
}

const adapter = createEntityAdapter<CookieConsentHistoryRecord, string>({
    selectId: (arg) => arg.uuid,
    sortComparer: (a, b) => a.uuid.localeCompare(b.uuid)
});

const selectors = adapter.getSelectors();

const extraState: CookiesState = {
    status: 'idle',
    current: null,
    offset: 0,
    limit: 10,
    count: 0,
    expired: 0,
    sort: {field: 'dateUpdated', ascending: false},
};

const cookiesSlice = createSlice({
    name: 'cookies',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setCurrent: (state, action: PayloadAction<CookieConsentHistoryRecord | null>) => {
            state.current = action.payload;
        },
        setSort: (state, action: PayloadAction<SortProps<CookieConsentHistoryRecord>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCookies.pending, (state, action) => {
                state.status = 'loading';
                state.offset = action.meta.arg;
            })
            .addCase(loadCookies.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload?.history ?? []);
                const current = action.payload?.history?.find(cookie => cookie.uuid === state.current?.uuid);
                state.current = current ?? null;
                state.count = action.payload?.count ?? 0;
                state.expired = action.payload?.expired ?? 0;
            })
            .addCase(loadCookies.rejected, (state, action) => {
                state.status = 'rejected';
                state.offset = action.meta.arg;
            })
            .addCase(purgeCookies.pending, (state) => {
                state.status = 'purging';
            })
            .addCase(purgeCookies.fulfilled, (state, action) => {
                state.status = 'idle';
                state.count = action.payload?.count ?? 0;
                state.expired = action.payload?.expired ?? 0;
            })
            .addCase(purgeCookies.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('cookies')) {
                    state.status = 'idle';
                }
            })

    },
    selectors: {
        selectOffset: (state) => state.offset,
        selectLimit: (state) => state.limit,
        selectAll: (state) => selectors.selectAll(state),
        selectCurrentCookie: (state) => state.current,
        selectStatus: (state) => state.status,
        selectSort: (state) => state.sort,
        selectCount: (state) => state.count,
        selectExpired: (state) => state.expired,
    }
});

export default cookiesSlice;

export const {setLimit, setCurrent, setSort} = cookiesSlice.actions;
export const {
    selectCurrentCookie,
    selectLimit,
    selectStatus,
    selectAll,
    selectOffset,
    selectSort,
    selectExpired,
    selectCount
} = cookiesSlice.selectors;

export const selectSortedCookies = createSelector(
    [selectAll, selectSort],
    (list, sort) => {
        return [...list].sort(cookiesSorter(sort))
    }
)
export const loadCookies = createAsyncThunk<CookieConsentHistoryResponse | null, number, { state: RootState }>(
    'cookies/load',
    async (arg, {getState}) => {
        const state = getState();
        const limit = selectLimit(state);
        return await fetchCookies(arg, limit);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    }
)

export const purgeCookies = createAsyncThunk<PurgeHistoryResponse|null, void, {state:RootState}>(
    'cookies/purge',
    async () => {
        return await deleteExpiredCookies();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    });
