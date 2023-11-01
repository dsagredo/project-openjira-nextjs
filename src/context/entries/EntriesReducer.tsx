import { EntriesState } from './EntriesProvider';
import { Entry } from '@/interfaces';

type EntriesActionType =
    | { type: '[Entry] Add-Entry'; payload: Entry }
    | { type: '[Entry] Update-Entry'; payload: Entry }
    | { type: '[Entry] Refresh-Data'; payload: Entry[] }
    | { type: '[Entry] Deleted-Entry'; payload: Entry };

const EntriesReducer = (
    state: EntriesState,
    action: EntriesActionType
): EntriesState => {
    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload],
            };
        case '[Entry] Update-Entry':
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                }),
            };
        case '[Entry] Deleted-Entry':
            return {
                ...state,
                entries: state.entries.filter(
                    (entry) => entry._id !== action.payload._id
                ),
            };
        case '[Entry] Refresh-Data':
            return {
                ...state,
                entries: [...action.payload],
            };
        default:
            return state;
    }
};

export { EntriesReducer };
