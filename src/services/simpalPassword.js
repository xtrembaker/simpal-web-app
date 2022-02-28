import localStorage from "../services/localStorage";
import {sendSMS} from "./sendSMS";
import {createMessageSwitchPassword} from "./message";

export const SIMPAL_PHONE_NUMBER_STORAGE_KEY = 'simpalPhoneNumber';

export async function getSimpalPhoneNumber(){
    return localStorage().getItem(SIMPAL_PHONE_NUMBER_STORAGE_KEY);
}

export async function setSimpalPassword(password){
    return sendSMS(createMessageSwitchPassword())
}