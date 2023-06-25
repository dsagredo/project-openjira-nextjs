import React, { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '@/interfaces';

export type EntriesState = {
    entries: Entry[];
};

type Props = {
    children?: React.ReactNode;
};

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description:
                'Pending: Labore dolore consectetur do ipsum id proident id.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description:
                'In Progress: Sunt ullamco duis elit velit excepteur excepteur sit incididunt eiusmod in ipsum ullamco deserunt.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description:
                'Finished: Aliqua dolore minim adipisicing minim pariatur exercitation adipisicing.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
    ],
};

const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending',
        };

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
    };

    const updateEntry = (entry: Entry) =>
        dispatch({ type: '[Entry] Update-Entry', payload: entry });

    return (
        <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
            {children}
        </EntriesContext.Provider>
    );
};

export default EntriesProvider;
