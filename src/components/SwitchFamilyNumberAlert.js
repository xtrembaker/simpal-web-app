import {
    createMessageDisableFamilyNumberAlert,
    createMessageEnableFamilyNumberAlert
} from "../services/message";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {Switch, Text, View} from "react-native";
import {useState} from "react";

export default function SwitchFamilyNumberAlert(){
    const [familyNumberAlert, setFamilyNumberAlert] = useState(false);
    const onFamilyNumberAlert = async (value) => {
        const message = value ? createMessageEnableFamilyNumberAlert() : createMessageDisableFamilyNumberAlert();
        await sendSMS(message).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            setFamilyNumberAlert(value);
        });
    }

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginLeft: 50, marginRight: 50}}>
            <Text style={{fontSize: 18}}>Activer les alertes famille</Text>
            <Switch onValueChange={onFamilyNumberAlert} value={familyNumberAlert}></Switch>
        </View>
    );
}