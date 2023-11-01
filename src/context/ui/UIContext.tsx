import { createContext } from 'react';

interface ContextProps {
    isAddingEntry: boolean;
    isDragging: boolean;
    setIsAddingEntry: (isAdding: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

const UIContext = createContext({} as ContextProps);

export { UIContext };
