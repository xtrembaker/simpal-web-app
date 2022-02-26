import {View, Button} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageGetTemperature} from "../services/message";

export default function InternalProbePage(){
    return (
        <View>
            <Button onPress={async() => { await sendSMS(createMessageGetTemperature())}} title="Obtenir la temperature de la sonde"></Button>
        </View>
    )
}