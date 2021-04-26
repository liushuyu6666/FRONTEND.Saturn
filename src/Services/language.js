import {get, post, urlPrefix} from "./restClient";

const prefix = `${urlPrefix}/languages`;

export const createLanguage = (jwt, body) => {
    return post(`${prefix}`, jwt, body);
}

export const listLanguage = (jwt, page=0, size=20) => {
    return get(`${prefix}?page=${page}&pageSize=${size}`, jwt);
}

export const retrieveLanguage = (languageId, jwt) => {
    return get(`${prefix}/${languageId}`, jwt);
}

export const updateLanguage = (languageId, jwt, body) => {
    return post(`${prefix}/${languageId}`, jwt, body);
}

