import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { entries } from '@/database';
import {
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Button,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Layout from '@/components/layouts/Layout';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
    toggleTheme: () => void;
    isTheme: {
        palette: {
            mode: string;
        };
    };
}

const EntryPage: FC<Props> = ({ entry, toggleTheme, isTheme }) => {
    const [inputValue, setInputValue] = useState(entry.description);
    const [isStatus, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    const router = useRouter();
    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const isNotValid = useMemo(
        () => inputValue.length <= 0 && touched,
        [inputValue, touched]
    );

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) =>
        setInputValue(event.target.value);

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>
        setStatus(event.target.value as EntryStatus);

    const onSave = () => {
        if (inputValue.trim().length === 0) return;
        const updatedEntry: Entry = {
            ...entry,
            status: isStatus,
            description: inputValue,
        };
        updateEntry(updatedEntry, true);
    };

    const onDelete = () => {
        deleteEntry(entry._id, true);
        router.push('/');
    };

    return (
        <Layout
            title={inputValue.substring(0, 20) + '...'}
            toggleTheme={toggleTheme}
            isTheme={isTheme}
        >
            <>
                <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Card>
                            <CardHeader
                                title={`Entrada: ${inputValue}`}
                                subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                                    entry.createdAt
                                )}`}
                            />
                            <CardContent>
                                <TextField
                                    sx={{ marginTop: 2, marginBottom: 1 }}
                                    fullWidth
                                    placeholder="Nueva entrada"
                                    autoFocus
                                    multiline
                                    label="Nueva entrada"
                                    value={inputValue}
                                    onBlur={() => setTouched(true)}
                                    onChange={onInputValueChanged}
                                    helperText={
                                        isNotValid && 'Ingresa un valor'
                                    }
                                    error={isNotValid}
                                />
                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={isStatus}
                                        onChange={onStatusChanged}
                                    >
                                        {validStatus.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant="contained"
                                    fullWidth
                                    onClick={onSave}
                                    disabled={inputValue.length <= 0}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <IconButton
                    onClick={onDelete}
                    sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        backgroundColor: 'red',
                    }}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await entries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { entry },
    };
};

export default EntryPage;
