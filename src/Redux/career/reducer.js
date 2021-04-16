import {
    RECORD_HOMEPAGE_PAGE_NUMBER
} from "./actionTypes";

const initStates = {
    page: 0,
}

export default function careerReducer (state = initStates, action){
    console.log(action);
    switch (action.type) {
        case RECORD_HOMEPAGE_PAGE_NUMBER: {
            return {
                ...state,
                page: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}