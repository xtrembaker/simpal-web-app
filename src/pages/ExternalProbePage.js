import {Button, View} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageGetProbeTemperature} from "../services/message";

export default function ExternalProbePage(){
    return (
        <View>
            <Button onPress={async() => { await sendSMS(createMessageGetProbeTemperature())}} title="Obtenir la temperature de la sonde"></Button>
        </View>
    )
}