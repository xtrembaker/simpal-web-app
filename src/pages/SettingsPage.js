import {sendSMS} from "../services/sendSMS";
import {createMessageDefineMaster} from "../services/message";
import ChangePassword from "../components/ChangePassword";
import {View, Button, Switch, Alert} from "react-native";
import FamilyNumbersPage from "./FamilyNumbersPage";
import SwitchDelValue from "../components/SwitchDelValue";
import SwitchPowerOutageValue from "../components/SwitchPowerOutageValue";
import SwitchGsmLowSignalAlert from "../components/SwitchGsmLowSignalAlert";
import localStorage from "../services/localStorage";

export default function SettingsPage({navigation}){
    const showAlert = () => Alert.alert(
        'L’application va être réinitialisée',
        'Confirmer ?',
        [
            {
                "text": "Oui",
                onPress: () => localStorage().reset(),
                style: "default"
            },
            {
                "text": "Annuler",
                style: "default"
            }
        ],
        {
            cancelable: false
        }
    )

    return (
        <View>
            <Button title="Définir ce téléphone comme étant le maitre" onPress={async() => await sendSMS(createMessageDefineMaster())}/>
            <ChangePassword/>
            <Button title="Numéros famille" onPress={() => navigation.navigate('FamilyNumbersPage')}/>
            <SwitchDelValue />
            <SwitchPowerOutageValue />
            <SwitchGsmLowSignalAlert />
            <Button title="Réinitialiser l’application" onPress={showAlert}/>
        </View>
    );
}