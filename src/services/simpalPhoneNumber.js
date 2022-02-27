import localStorage from "../services/localStorage";

export const SIMPAL_PHONE_NUMBER_STORAGE_KEY = 'simpalPhoneNumber';

export async function getSimpalPhoneNumber(){
    return localStorage().getItem(SIMPAL_PHONE_NUMBER_STORAGE_KEY);
}

export async function setSimpalPhoneNumber(number){
    return localStorage().setItem(SIMPAL_PHONE_NUMBER_STORAGE_KEY, number);
}