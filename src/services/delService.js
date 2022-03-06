import {createMessageDisableDel, createMessageEnableDel} from "./message";
import {CANCELLED_STATE, sendSMS} from "./sendSMS";
import localStorage from "./localStorage";

const STORAGE_KEY = 'delActivate';

export const onDelValueChange = async (value) => {
    const message = value ? createMessageEnableDel() : createMessageDisableDel();
    return sendSMS(message).then((response) => {
        if(response.result === CANCELLED_STATE){
            return Promise.reject('User cancelled action')
        }
        return localStorage().setItem(STORAGE_KEY, value);
    });
}

export const getDelCurrentValue = async () => {
    return localStorage().getItem(STORAGE_KEY);
}