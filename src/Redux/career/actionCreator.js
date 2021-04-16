import {
    ADD_CAREER,
    RETRIEVE_CAREER,
    LIST_CAREER,
    UPDATE_CAREER,
    DEACTIVATE_CAREER,
    ACTIVATE_CAREER,
    APPLY_CAREER,
    RECORD_HOMEPAGE_PAGE_NUMBER}
    from "./actionTypes";

export const addCareer = careerItem => (
    {
        type: ADD_CAREER,
        payload: careerItem,
    }
)

export const retrieveCareer = () => (
    {
        type: RETRIEVE_CAREER,
    }
)

export const listCareer = () => (
    {
        type: LIST_CAREER,
    }
)

export const updateCareer = careerItem => (
    {
        type: UPDATE_CAREER,
        payload: careerItem,
    }
)

export const deactivateCareer = () => (
    {
        type: DEACTIVATE_CAREER,
    }
)

export const activateCareer = () => (
    {
        type: ACTIVATE_CAREER,
    }
)

export const applyCareer = () => (
    {
        type: APPLY_CAREER,
    }
)

export const recordPageNumberInHomePage = (page) => (
    {
        payload: page,
        type: RECORD_HOMEPAGE_PAGE_NUMBER,
    }
)