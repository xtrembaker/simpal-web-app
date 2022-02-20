import {View, Button} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageDefineMaster} from "../services/message";

export default function SettingsPage(){
    return (
        <View>
            <Button title="Définir ce téléphone comme étant le maitre" onPress={async() => await sendSMS(createMessageDefineMaster())}/>
        </View>
    );
}