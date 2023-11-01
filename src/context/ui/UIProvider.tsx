import React, { FC, useReducer } from 'react';
import { UIContext, UIReducer } from './';

export type UIState = {
    isAddingEntry: boolean;
    isDragging: boolean;
};

type Props = {
    children?: React.ReactNode;
};

const UI_INITIAL_STATE: UIState = {
    isAddingEntry: false,
    isDragging: false,
};

const UIProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const setIsAddingEntry = (isAdding: boolean) =>
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });

    const startDragging = () => dispatch({ type: 'UI - Start Dragging' });

    const endDragging = () => dispatch({ type: 'UI - End Dragging' });

    return (
        <UIContext.Provider
            value={{
                ...state,
                setIsAddingEntry,
                startDragging,
                endDragging,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};

export default UIProvider;
