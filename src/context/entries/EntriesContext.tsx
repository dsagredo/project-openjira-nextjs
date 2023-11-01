import { createContext } from 'react';
import { Entry } from '@/interfaces';

interface ContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
    deleteEntry: (entry: string, showSnackbar?: boolean) => void;
}

const EntriesContext = createContext({} as ContextProps);

export { EntriesContext };
