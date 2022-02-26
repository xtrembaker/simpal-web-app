import {
    createMessageDisablePowerOutageAlert,
    createMessageEnablePowerOutageAlert
} from "../services/message";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {Switch, Text, View} from "react-native";
import {useState} from "react";

export default function SwitchPowerOutageValue(){
    const [powerOutageValue, setPowerOutageValue] = useState(false);
    const onPowerOutageValueChange = async (value) => {
        const message = value ? createMessageEnablePowerOutageAlert() : createMessageDisablePowerOutageAlert();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            setPowerOutageValue(value);
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Activer l’alerte hors tension</Text>
            <Switch onValueChange={onPowerOutageValueChange} value={powerOutageValue}></Switch>
        </View>
    );
}