import { UIState } from './UIProvider';

type UIActionType =
    | { type: 'UI - Set isAddingEntry'; payload: boolean }
    | { type: 'UI - Start Dragging' }
    | { type: 'UI - End Dragging' };

const UIReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload,
            };

        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true,
            };
        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false,
            };
        default:
            return state;
    }
};

export { UIReducer };
