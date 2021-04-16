import store from "../Redux";
import {
    loaded,
    loading,
    setServerError,
    setMainContent,
    resetServer,
    setAuxiliaryContent
} from "../Redux/server/actionCreator";

// responseFromServer: Promise
export const loadPage = (responseFromServer) => {

    const dispatch = store.dispatch;

    dispatch(loading());
    responseFromServer
        .then(res => {
            if (res.result != null) {
                dispatch(setMainContent(res.result));
                dispatch(loaded());
                dispatch(setServerError({
                    isValid: true,
                    message: res.msg,
                }));
            } else {
                dispatch(loaded());
                dispatch(setServerError({
                    isValid: false,
                    message: res.msg,
                }));
            }
        })
        .catch(res => {
            dispatch(loaded());
            dispatch(setServerError({
                isValid: false,
                message: res.msg,
            }));
        });
}

// auxiliaryInfoFromServer: Promise
export const loadAuxiliaryInfo = (auxiliaryInfoFromServer, label) => {
    const dispatch = store.dispatch;

    dispatch(loading());
    auxiliaryInfoFromServer
        .then(res => {
            if(res.result != null){
                let result = {[label] : res.result};
                dispatch(setAuxiliaryContent(result));
                dispatch(loaded());
            }
        })
        .catch(res => {
            dispatch(loaded());
        });
}