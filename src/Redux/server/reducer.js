import {LOADING, LOADED, SET_SERVER_ERRORS, SET_MAIN_CONTENT, SET_AUXILIARY_CONTENT, RESET_SERVER} from "./actionType";

const initStates = {
    isLoading: true,
    errorsFromServer: {isValid: false, message: ""},
    mainContent: [],
    auxiliaryContent: [],
}

export default function serverReducer(state = initStates, action){
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case LOADED: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case SET_SERVER_ERRORS: {
            return {
                ...state,
                errorsFromServer: {
                    isValid: action.payload.isValid,
                    message: action.payload.message,
                },
            }
        }
        case SET_MAIN_CONTENT: {
            return {
                ...state,
                mainContent: action.payload,
            }
        }
        case SET_AUXILIARY_CONTENT: {
            return {
                ...state,
                auxiliaryContent: action.payload
            }
        }
        case RESET_SERVER: {
            return {
                ...state,
                mainContent: [],
                auxiliaryContent: [],
                isLoading: true,
                errorsFromServer: {isValid: false, message: ""},
            }
        }
        default:{
            return state;
        }
    }
}