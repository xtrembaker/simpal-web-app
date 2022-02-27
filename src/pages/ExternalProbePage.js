import {Button, View} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageGetProbeTemperature} from "../services/message";
import RangeTemperatureExternalProbeAlert from "../components/RangeTemperatureExternalProbeAlert";

export default function ExternalProbePage(){
    return (
        <View>
            <Button onPress={async() => { await sendSMS(createMessageGetProbeTemperature())}} title="Obtenir la temperature de la sonde"></Button>
            <RangeTemperatureExternalProbeAlert />
        </View>
    )
}