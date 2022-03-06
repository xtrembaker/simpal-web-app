import {sendSMS} from "../services/sendSMS";
import {createMessageDefineMaster} from "../services/message";
import ChangePassword from "../components/ChangePassword";
import {View, Button, Switch, Alert} from "react-native";
import FamilyNumbersPage from "./FamilyNumbersPage";
import localStorage from "../services/localStorage";
import ResetDefaultFactory from "../components/ResetDefaultFactory";
import mainStyle from "../styles/main";
import {getDelCurrentValue, onDelValueChange} from "../services/delService";
import {getGsmAlertValue, onGsmLowSignalValueChange} from "../services/gsmService";
import {getPowerOutageAlertValue, onPowerOutageAlertValueChange} from "../services/powerOutageService";
import SwitchButton from "../components/SwitchButton";

export default function SettingsPage({navigation}){
    const onResetApp = () => Alert.alert(
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
        <View style={mainStyle.pageContainer}>
            <Button title="Définir ce téléphone comme étant le maitre" onPress={async() => await sendSMS(createMessageDefineMaster())}/>
            <ChangePassword/>
            <Button title="Numéros famille" onPress={() => navigation.navigate('FamilyNumbersPage')}/>
            <SwitchButton onValueChange={onDelValueChange} text={"Activer la LED"} value={getDelCurrentValue}/>
            <SwitchButton onValueChange={onPowerOutageAlertValueChange} text={"Activer l’alerte hors tension"} value={getPowerOutageAlertValue}/>
            <SwitchButton onValueChange={onGsmLowSignalValueChange} text={"Alerte signal GSM faible"} value={getGsmAlertValue}/>
            <Button title="Réinitialiser l’application" onPress={onResetApp}/>
            <ResetDefaultFactory />
        </View>
    );
}