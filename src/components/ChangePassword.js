import {useState} from "react";
import {TextInput, Modal, Button, StyleSheet, View, Pressable, Text} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageSwitchPassword} from "../services/message";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputText: {
        fontSize: 20,
        padding: 5,
        marginBottom: 20,
        width: 200,
        borderColor: "#000000",
        borderWidth: 1
    }
});



export default function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onValidate = async () => {
        await sendSMS(createMessageSwitchPassword(oldPassword, newPassword))
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
                            <Text style={{textAlign: "right", marginBottom: 20, color: "#007AFF", fontSize: 16}}>Fermer</Text>
                        </Pressable>
                        <TextInput
                            placeholder="Mot de passe actuel"
                            placeholderTextColor="#000000"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onEndEditing={({nativeEvent: {text}}) => setOldPassword(text)}
                            clearTextOnFocus={true}
                            style={styles.inputText}
                            autoCorrect={false}
                            maxLength={4}
                        />
                        <TextInput
                            placeholder="Nouveau mot de passe"
                            placeholderTextColor="#000000"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onEndEditing={({nativeEvent: {text}}) => setNewPassword(text)}
                            autoCorrect={false}
                            clearTextOnFocus={true}
                            maxLength={4}
                            style={styles.inputText}
                        />
                        <Button title="Valider" onPress={async() => { await onValidate() }}/>
                    </View>
                </View>
            </Modal>
            <Button title="Définir le mot de passe" onPress={async() => await setModalVisible(true)}/>
        </View>
    );
}