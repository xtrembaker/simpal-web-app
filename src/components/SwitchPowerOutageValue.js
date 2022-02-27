import {
    createMessageDisablePowerOutageAlert,
    createMessageEnablePowerOutageAlert
} from "../services/message";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {Switch, Text, View} from "react-native";
import {useEffect, useState} from "react";
import localStorage from "../services/localStorage";

const STORAGE_KEY = 'powerOutageAlert';

export default function SwitchPowerOutageValue(){
    const [powerOutageValue, setPowerOutageValue] = useState(false);
    useEffect(() => {
        localStorage().getItem(STORAGE_KEY).then((value) => {
            setPowerOutageValue(value);
        })
    })
    const onPowerOutageValueChange = async (value) => {
        const message = value ? createMessageEnablePowerOutageAlert() : createMessageDisablePowerOutageAlert();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            localStorage().setItem(STORAGE_KEY, value).then(() => {
                setPowerOutageValue(value);
            });
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Activer l’alerte hors tension</Text>
            <Switch onValueChange={onPowerOutageValueChange} value={powerOutageValue}></Switch>
        </View>
    );
}