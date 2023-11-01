import React from 'react';
import Link from 'next/link';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
    toggleTheme?: () => void;
    isTheme?: {
        palette: {
            mode: string;
        };
    };
}

const Navbar = ({ toggleTheme, isTheme }: Props) => (
    <AppBar position="sticky">
        <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
                <Link
                    href="/"
                    passHref
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                    }}
                >
                    <Typography variant="h6">OpenJira</Typography>
                </Link>
                <IconButton onClick={toggleTheme} color="inherit">
                    {isTheme?.palette.mode === 'dark' ? (
                        <Brightness4Icon />
                    ) : (
                        <Brightness7Icon />
                    )}
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
);

export { Navbar };
