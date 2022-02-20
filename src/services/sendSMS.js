import * as SMS from "expo-sms";

export const sendSMS = async function(message){
    return SMS.sendSMSAsync(
        [''],
        message,
    ).then(function(result){
        console.log(`result: `, result);
    }).catch(function(error){
        console.log(`error: `, error);
    });
}