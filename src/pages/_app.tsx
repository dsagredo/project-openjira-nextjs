import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@/styles/globals.css';
import UIProvider from '@/context/ui/UIProvider';
import EntriesProvider from '@/context/entries/EntriesProvider';
import { darkTheme, lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
    const [isTheme, setTheme] = useState(darkTheme);
    const [isSelectedTheme, setSelectedTheme] = useState<'dark' | 'light'>(
        'dark'
    );

    const getTheme = (mode: 'dark' | 'light') =>
        mode === 'dark' ? darkTheme : lightTheme;

    const toggleTheme = () => {
        const theme = isSelectedTheme === 'dark' ? 'light' : 'dark';
        setSelectedTheme(theme);
    };

    useEffect(() => {
        setTheme(getTheme(isSelectedTheme));
    }, [isSelectedTheme]);

    return (
        <SnackbarProvider maxSnack={3}>
            <EntriesProvider>
                <UIProvider>
                    <ThemeProvider theme={isTheme}>
                        <CssBaseline />
                        <Component
                            {...pageProps}
                            toggleTheme={toggleTheme}
                            isTheme={isTheme}
                        />
                    </ThemeProvider>
                </UIProvider>
            </EntriesProvider>
        </SnackbarProvider>
    );
}
