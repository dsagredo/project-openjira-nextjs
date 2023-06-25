import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@/styles/globals.css';
import UIProvider from '@/context/ui/UIProvider';
import EntriesProvider from '@/context/entries/EntriesProvider';
import { darkTheme, lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <EntriesProvider>
            <UIProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </UIProvider>
        </EntriesProvider>
    );
}
