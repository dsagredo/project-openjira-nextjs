import { createContext } from 'react';

interface ContextProps {
    isAddingEntry: boolean;
    sideMenuOpen: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

const UIContext = createContext({} as ContextProps);

export { UIContext };
