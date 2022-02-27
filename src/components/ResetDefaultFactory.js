import {View, StyleSheet, Modal, Text, TextInput, Button, Pressable} from "react-native";
import {useState} from "react";
import {sendSMS} from "../services/sendSMS";
import {createMessageResetToFactorySettings} from "../services/message";
import localStorage from "../services/localStorage";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
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
            <Modal
                animationType="none"
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{textAlign: "right", marginBottom: 20, color: "#007AFF", fontSize: 16}}>Fermer</Text>
                        </Pressable>
                        <Text style={styles.modalText}>Quel est le mot de passe de l’appareil Simpal ?</Text>
                        <TextInput
                            placeholder=""
                            placeholderTextColor="#000000"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onEndEditing={({nativeEvent: {text}}) => onConfirmResetDefaultFactory(text)}
                            clearTextOnFocus={true}
                            style={styles.inputText}
                            autoCorrect={false}
                            maxLength={4}
                        />
                    </View>
                </View>
            </Modal>
            <Button title="Réinitialiser l’appareil Simpal" onPress={() => setModalVisible(true)}/>
        </View>
    );
}