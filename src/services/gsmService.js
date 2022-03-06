import {createMessageDisableLowGsmSignalAlert, createMessageEnableLowGsmSignalAlert} from "./message";
import {CANCELLED_STATE, sendSMS} from "./sendSMS";
import localStorage from "./localStorage";

const STORAGE_KEY = 'gsmLowSignalAlert';

export const onGsmLowSignalValueChange = async (value) => {
    const message = value ? createMessageEnableLowGsmSignalAlert() : createMessageDisableLowGsmSignalAlert();
    return sendSMS(message).then((response) => {
        if(response.result === CANCELLED_STATE){
            return Promise.reject('User cancelled action');
        }
        return localStorage().setItem(STORAGE_KEY, value);
    });
}

export const getGsmAlertValue = async() => {
    return localStorage().getItem(STORAGE_KEY);
}