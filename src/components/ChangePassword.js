import {useState} from "react";
import {Button, View, Pressable, Text} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageSwitchPassword} from "../services/message";
import PasswordInput from "./PasswordInput";
import ModalBox from "./ModalBox";

export default function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onValidate = async () => {
        return sendSMS(createMessageSwitchPassword(oldPassword, newPassword))
            .then(() => closeModal())
            .catch(() => {});
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View>
            <ModalBox visible={modalVisible}>
                <Pressable onPress={() => closeModal()}>
                    <Text style={{textAlign: "right", marginBottom: 20, color: "#007AFF", fontSize: 16}}>Annuler</Text>
                </Pressable>
                <Text style={{fontSize: 25, textAlign: "center"}}>Définir un mot de passe{"\n"}pour l’appareil</Text>
                <PasswordInput placeholder="Ancien mot de passe" onEndEditing={({nativeEvent: {text}}) => setOldPassword(text)}/>
                <PasswordInput placeholder="Nouveau mot de passe" onEndEditing={({nativeEvent: {text}}) => setNewPassword(text)}/>
                <Button title="Valider" onPress={onValidate}/>
            </ModalBox>
            <Button title="Définir un mot de passe pour l’appareil" onPress={async() => await setModalVisible(true)}/>
        </View>
    );
}