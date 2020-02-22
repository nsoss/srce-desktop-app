import { SET_ADMIN } from './type';

export const setAdmin = bool => {
    return {
        type: SET_ADMIN,
        payload: bool,
    };
};
