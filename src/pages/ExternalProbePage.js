import {Button, View} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageGetProbeTemperature} from "../services/message";
import RangeTemperatureExternalProbeAlert from "../components/RangeTemperatureExternalProbeAlert";
import mainStyle from "../styles/main";

export default function ExternalProbePage(){
    return (
        <View style={mainStyle.pageContainer}>
            <Button onPress={async() => { await sendSMS(createMessageGetProbeTemperature())}} title="Obtenir la temperature de la sonde"></Button>
            <RangeTemperatureExternalProbeAlert />
        </View>
    )
}