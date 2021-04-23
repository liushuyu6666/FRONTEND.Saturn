import {get, post, urlPrefix} from "./restClient";

const prefix = `${urlPrefix}/careers`;

const createCareer = (jwt, body) => {
    return post(`${prefix}`, jwt, body);
}

const listCareer = (jwt, page=0, size=20, isActive=true, isApplied=false) => {
    return get(`${prefix}?page=${page}&pageSize=${size}&isActive=${isActive}&isApplied=${isApplied}`, jwt);
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

const countFilteredCareer = (isActive=true, isApplied=false) => {
    return get(`${prefix}/count?isActive=${isActive}&isApplied=${isApplied}`);
}

export {
    createCareer,
    retrieveCareer,
    listCareer,
    updateCareer,
    deactivateCareer,
    activateCareer,
    applyCareer,
    countFilteredCareer,
}