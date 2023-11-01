import React, { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar } from '../ui';

interface Props {
    title?: string;
    toggleTheme?: () => void;
    isTheme?: {
        palette: {
            mode: string;
        };
    };
    children: JSX.Element;
}

const Layout: FC<Props> = ({
    title = 'OpenJira',
    toggleTheme,
    isTheme,
    children,
}) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar toggleTheme={toggleTheme} isTheme={isTheme} />
            <Box sx={{ padding: '10px 20px' }}>{children}</Box>
        </Box>
    );
};

export default Layout;
