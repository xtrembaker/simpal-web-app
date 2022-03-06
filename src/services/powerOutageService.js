import {createMessageDisablePowerOutageAlert, createMessageEnablePowerOutageAlert} from "./message";
import {CANCELLED_STATE, sendSMS} from "./sendSMS";
import localStorage from "./localStorage";

const STORAGE_KEY = 'powerOutageAlert';

export const onPowerOutageAlertValueChange = async (value) => {
    const message = value ? createMessageEnablePowerOutageAlert() : createMessageDisablePowerOutageAlert();
    return sendSMS(message).then((response) => {
        if(response.result === CANCELLED_STATE){
            return Promise.reject('User cancelled action');
        }
        return localStorage().setItem(STORAGE_KEY, value);
    });
}

export const getPowerOutageAlertValue = async() => {
    return localStorage().getItem(STORAGE_KEY);
}