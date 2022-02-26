import {useState} from "react";
import {Switch, View, Text} from "react-native";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {createMessageDisableDel, createMessageEnableDel} from "../services/message";

export default function SwitchDelValue() {
    const [delValue, setDelValue] = useState(false);
    const onDelValueChange = async (value) => {
        const message = value ? createMessageEnableDel() : createMessageDisableDel();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            setDelValue(value);
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Activer la LED</Text>
            <Switch onValueChange={onDelValueChange} value={delValue}></Switch>
        </View>
    );
}