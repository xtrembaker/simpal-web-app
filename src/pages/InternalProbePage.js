import {View, Button} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageGetTemperature} from "../services/message";
import RangeTemperatureInternalProbeAlert from "../components/RangeTemperatureInternalProbeAlert";
import mainStyle from "../styles/main";

export default function InternalProbePage(){
    return (
        <View style={mainStyle.pageContainer}>
            <Button onPress={async() => { await sendSMS(createMessageGetTemperature())}} title="Obtenir la temperature de la sonde"></Button>
            <RangeTemperatureInternalProbeAlert />
        </View>
    )
}