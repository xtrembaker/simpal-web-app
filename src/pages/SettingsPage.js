import {sendSMS} from "../services/sendSMS";
import {createMessageDefineMaster} from "../services/message";
import ChangePassword from "../components/ChangePassword";
import {View, Button, Switch} from "react-native";
import FamilyNumbersPage from "./FamilyNumbersPage";
import SwitchDelValue from "../components/SwitchDelValue";

export default function SettingsPage({navigation}){
    return (
        <View>
            <Button title="Définir ce téléphone comme étant le maitre" onPress={async() => await sendSMS(createMessageDefineMaster())}/>
            <ChangePassword/>
            <Button title="Numéros famille" onPress={() => navigation.navigate('FamilyNumbersPage')}/>
            <SwitchDelValue />
        </View>
    );
}