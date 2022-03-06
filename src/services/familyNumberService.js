import {createMessageDisableFamilyNumberAlert, createMessageEnableFamilyNumberAlert} from "./message";
import {CANCELLED_STATE, sendSMS} from "./sendSMS";
import localStorage from "./localStorage";

const STORAGE_KEY = 'familyAlert'

export const onSwitchFamilyNumberAlert = async (value) => {
    const message = value ? createMessageEnableFamilyNumberAlert() : createMessageDisableFamilyNumberAlert();
    return sendSMS(message).then((response) => {
        if(response.result === CANCELLED_STATE){
            return Promise.reject('User cancelled action');
        }
        return localStorage().setItem(STORAGE_KEY, value);
    });
}

export const getCurrentValue = async () => {
    return localStorage().getItem(STORAGE_KEY);
}