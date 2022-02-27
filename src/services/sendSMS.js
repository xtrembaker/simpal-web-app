import * as SMS from "expo-sms";
import {getSimpalPhoneNumber} from "./simpalPhoneNumber";

export const CANCELLED_STATE = 'cancelled';

export const sendSMS = async function(message){
    const number = await getSimpalPhoneNumber();
    return SMS.sendSMSAsync(
        [number],
        message,
    );
}