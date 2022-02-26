import {
    createMessageDisableLowGsmSignalAlert,
    createMessageEnableLowGsmSignalAlert
} from "../services/message";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {Switch, Text, View} from "react-native";
import {useState} from "react";

export default function SwitchGsmLowSignalAlert(){
    const [gsmLowSignalValue, setGsmLowSignalValue] = useState(false);
    const onGsmLowSignalValueChange = async (value) => {
        const message = value ? createMessageEnableLowGsmSignalAlert() : createMessageDisableLowGsmSignalAlert();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            setGsmLowSignalValue(value);
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Alerte "signal GSM faible"</Text>
            <Switch onValueChange={onGsmLowSignalValueChange} value={gsmLowSignalValue}></Switch>
        </View>
    );
}