import {createStore, combineReducers} from "redux";
import userReducer from "./user/reducer";
import serverReducer from "./server/reducer";
import careerReducer from "./career/reducer";

// persist profile while refresh the web page
const saveToLocalStorage = state => {

    try{
        const reduxStateUser = JSON.stringify(state.user); // ? state.user
        localStorage.setItem("reduxStateUser", reduxStateUser);

    } catch (e){
        console.log(e);
    }
}

const persistedState = () => {
    try{
        const serializedStateUser = localStorage.getItem("reduxStateUser");
        if(serializedStateUser === null) return undefined;
        let persistedValueUser = JSON.parse(serializedStateUser);

        return {user: persistedValueUser};
    } catch (e){
        console.log(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    server: serverReducer,
    career: careerReducer,
})

// const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;