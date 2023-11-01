import React, { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesAPI } from '@/apis';

type Props = {
    children?: React.ReactNode;
};

export type EntriesState = {
    entries: Entry[];
};

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
};

const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data } = await entriesAPI.post<Entry>('/entries', {
            description: description,
        });
        dispatch({ type: '[Entry] Add-Entry', payload: data });
    };

    const updateEntry = async (
        { _id, description, status }: Entry,
        showSnackbar = false
    ) => {
        try {
            const { data } = await entriesAPI.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });
            dispatch({ type: '[Entry] Update-Entry', payload: data });
            if (showSnackbar)
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
        } catch (error) {}
    };

    const deleteEntry = async (id: string, showSnackbar = false) => {
        try {
            const { data } = await entriesAPI.delete<Entry>(`/entries/${id}`);
            dispatch({
                type: '[Entry] Deleted-Entry',
                payload: data,
            });

            if (showSnackbar) {
                enqueueSnackbar('Entrada borrada correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const refreshEntries = async () => {
        const { data } = await entriesAPI.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    };

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider
            value={{ ...state, addNewEntry, updateEntry, deleteEntry }}
        >
            {children}
        </EntriesContext.Provider>
    );
};

export default EntriesProvider;
