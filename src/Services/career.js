import {get, post, urlPrefix} from "./restClient";

const prefix = `${urlPrefix}/careers`;

const createCareer = (jwt, body) => {
    return post(`${prefix}`, jwt, body);
}

const listCareer = (jwt) => {

    return get(`${prefix}`, jwt);
}

const retrieveCareer = (careerId, jwt) => {
    return get(`${prefix}/${careerId}`, jwt);
}

const updateCareer = (careerId, jwt, body) => {
    return post(`${prefix}/${careerId}`, jwt, body);
}

const deactivateCareer = (careerId, jwt) => {
    return post(`${prefix}/deactivate/${careerId}`, jwt, null);
}

const activateCareer = (careerId, jwt) => {
    return post(`${prefix}/activate/${careerId}`, jwt, null);
}

const applyCareer = (careerId, jwt) => {
    return post(`${prefix}/apply/${careerId}`, jwt, null);
}

export {
    createCareer,
    retrieveCareer,
    listCareer,
    updateCareer,
    deactivateCareer,
    activateCareer,
    applyCareer
}