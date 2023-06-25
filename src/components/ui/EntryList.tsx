import React, { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';
import EntryCard from './EntryCard';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import styles from '../../styles/EntryList.module.css';

interface Props {
    status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries, status]
    );

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    };

    const onDragEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find((e) => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    return (
        <div
            onDrop={onDragEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    padding: 1,
                }}
            >
                <List
                    sx={{
                        opacity: isDragging ? 0.2 : 1,
                        transition: 'all .3s',
                        padding: 0,
                    }}
                >
                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export { EntryList };
