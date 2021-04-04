import {post, urlPrefix} from "./restClient";

const login = (username, password) => {
    let loginRequest = {
        "username": username,
        "password": password,
    };
    return post(`${urlPrefix}/login`, null, loginRequest);
}

const verify = (jwt) => {
    return post(`${urlPrefix}/verify`, jwt, null);
}

export {
    login,
    verify
}