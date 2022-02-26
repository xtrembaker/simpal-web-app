import * as SMS from "expo-sms";

export const CANCELLED_STATE = 'cancelled';

export const sendSMS = async function(message){
    return SMS.sendSMSAsync(
        ['0606060606'],
        message,
    );
    // .then(function(result){
    //     console.log(`result: `, result);
    // }).catch(function(error){
    //     console.log(`error: `, error);
    // });
}