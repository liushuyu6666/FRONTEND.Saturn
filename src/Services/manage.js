import {get, post, urlPrefix} from "./restClient";

const prefix = `${urlPrefix}/manage`;

const countCareer = () => {
    return get(`${prefix}/countCareer`, null);
}

export {countCareer};