import {View, Text, Button, Pressable} from "react-native";
import {useState} from "react";
import {sendSMS} from "../services/sendSMS";
import {createMessageResetToFactorySettings} from "../services/message";
import localStorage from "../services/localStorage";
import ModalBox from "./ModalBox";
import PasswordInput from "./PasswordInput";

export default function ResetDefaultFactory(){
    const [modalVisible, setModalVisible] = useState(false);
    const onConfirmResetDefaultFactory = async (password) => {
        return sendSMS(createMessageResetToFactorySettings(password)).then(() => {
            localStorage().reset().then(() => {
                setModalVisible(false);
            });
        })
    };

    return (
        <View>
            <ModalBox visible={modalVisible}>
                <Pressable onPress={() => setModalVisible(false)}>
                    <Text style={{textAlign: "right", marginBottom: 20, color: "#007AFF", fontSize: 16}}>Annuler</Text>
                </Pressable>
                <Text style={{fontSize: 25, textAlign: "center"}}>Mot de passe de l’appareil</Text>
                <PasswordInput placeholder={"Mot de passe"} onEndEditing={({nativeEvent: {text}}) => onConfirmResetDefaultFactory(text)}/>
            </ModalBox>
            <Button title="Réinitialiser l’appareil Simpal" onPress={() => setModalVisible(true)}/>
        </View>
    );
}