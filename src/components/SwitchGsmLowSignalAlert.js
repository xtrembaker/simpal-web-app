import {
    createMessageDisableLowGsmSignalAlert,
    createMessageEnableLowGsmSignalAlert
} from "../services/message";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {Switch, Text, View} from "react-native";
import {useEffect, useState} from "react";
import localStorage from "../services/localStorage";

const STORAGE_KEY = 'gsmLowSignalAlert'

export default function SwitchGsmLowSignalAlert(){
    const [gsmLowSignalValue, setGsmLowSignalValue] = useState(false);
    useEffect(() => {
        localStorage().getItem(STORAGE_KEY).then((value) => {
            setGsmLowSignalValue(value);
        })
    });
    const onGsmLowSignalValueChange = async (value) => {
        const message = value ? createMessageEnableLowGsmSignalAlert() : createMessageDisableLowGsmSignalAlert();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            localStorage().setItem(STORAGE_KEY, value).then(() => {
                setGsmLowSignalValue(value);
            });
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Alerte "signal GSM faible"</Text>
            <Switch onValueChange={onGsmLowSignalValueChange} value={gsmLowSignalValue}></Switch>
        </View>
    );
}