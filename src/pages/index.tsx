import { NextPage } from 'next';
import Layout from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { NewEntry, EntryList } from '../components/ui';

interface Props {
    toggleTheme: () => void;
    isTheme: {
        palette: {
            mode: string;
        };
    };
}

const HomePage: NextPage<Props> = ({ toggleTheme, isTheme }) => {
    return (
        <Layout
            title="Home - OpenJira"
            toggleTheme={toggleTheme}
            isTheme={isTheme}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title="Pendientes" />
                        <CardContent>
                            <NewEntry />
                            <EntryList status="pending" />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title="En Progreso" />
                        <CardContent>
                            <EntryList status="in-progress" />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: 'calc(100vh - 100px)' }}>
                        <CardHeader title="Completadas" />
                        <CardContent>
                            <EntryList status="finished" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default HomePage;
