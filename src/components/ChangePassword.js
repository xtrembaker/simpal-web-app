import {useState} from "react";
import {Modal, Button, StyleSheet, View, Pressable, Text} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageSwitchPassword} from "../services/message";
import PasswordInput from "./PasswordInput";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        borderRadius: 20,
        padding: 40,
        alignItems: "center",
    }
});



export default function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onValidate = async () => {
        return sendSMS(createMessageSwitchPassword(oldPassword, newPassword))
            .then(function(){
                closeModal()
            })
            .catch(function(error){
                console.log(error);
            });
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View>
            <Modal visible={modalVisible} presentationStyle="overFullScreen">
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable onPress={() => closeModal()}>
                            <Text style={{textAlign: "right", marginBottom: 20, color: "#007AFF", fontSize: 16}}>Annuler</Text>
                        </Pressable>
                        <PasswordInput placeholder="Ancien" onEndEditing={({nativeEvent: {text}}) => setOldPassword(text)}/>
                        <PasswordInput placeholder="Nouveau" onEndEditing={({nativeEvent: {text}}) => setNewPassword(text)}/>
                        <Button title="Valider" onPress={onValidate}/>
                    </View>
                </View>
            </Modal>
            <Button title="Définir le mot de passe" onPress={async() => await setModalVisible(true)}/>
        </View>
    );
}