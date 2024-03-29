import {View, StyleSheet, TextInput, Button} from "react-native";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {
    createMessageAddFamilyNumber, createMessageDeleteAllFamilyNumber,
    createMessageDeleteFamilyNumber, createMessageListAllFamilyNumbers,
} from "../services/message";
import {useEffect, useState} from "react";
import localStorage from "../services/localStorage";
import mainStyle from "../styles/main";
import SwitchButton from "../components/SwitchButton";
import { getCurrentValue as familyAlertGetValue, onSwitchFamilyNumberAlert } from "../services/familyNumberService";

const styles = StyleSheet.create({
    input: {
        borderColor: "#007AFF",
        borderWidth: 1,
        borderStyle: "dashed",
        fontSize: 20,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 25,
    }
});

const STORAGE_KEY = 'familyNumbers';

export default function FamilyNumbersPage(){
    const [familyNumbers, setFamilyNumbers] = useState([]);
    const phoneNumberInputs = [
        {
            id: "15256287-612a-442a-b8b0-8fad08d0c0f1",
        },
        {
            id: "d4bc4119-b468-48b2-b5c0-4624373a6507",
        },
        {
            id: "807f950c-6d66-45ea-8e6e-785e5e5dada6",
        },
        {
            id: "075c7be0-7cb6-404f-935d-4fa521005574",
        }];

    useEffect(() => {
        localStorage().getItem(STORAGE_KEY).then((value) => {
            if(value === null){
                return
            }
            setFamilyNumbers(value);
        })
    }, [])

    const onSubmitPhoneNumber = async(id, number) =>
    {
        return sendSMS(createMessageAddFamilyNumber(number)).then((response) => {
            if(response.result === CANCELLED_STATE) {
                return;
            }
            const newValue = [...familyNumbers, {id, number}];
            return localStorage().setItem(STORAGE_KEY, newValue).then(() => {
                setFamilyNumbers(newValue);
            })
        });
    }

    const onRemovePhoneNumber = (id) => {
        const number = findNumberInCollectionById(id)
        if(!number){
            return;
        }
        return sendSMS(createMessageDeleteFamilyNumber(number)).then(response => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            const newValue = familyNumbers.filter((item) => item.id !== id);
            localStorage().setItem(STORAGE_KEY, newValue).then(() => {
                setFamilyNumbers(newValue);
            })
        })
    }

    const onRemoveAllPhoneNumber = () => {
        return sendSMS(createMessageDeleteAllFamilyNumber()).then((response) => {
            if(response.result === CANCELLED_STATE){
                return ;
            }
            return localStorage().removeItem(STORAGE_KEY).then(() => {
                setFamilyNumbers([]);
            })
        })
    }

    const getRecordedFamilyNumbersOnDevice = () => {
        return sendSMS(createMessageListAllFamilyNumbers());
    }

    const findNumberInCollectionById = (id) => {
        const found = familyNumbers.find((item) => item.id === id)
        if(!found){
            return null;
        }
        return found.number;
    }

    return (
        <View style={mainStyle.pageContainer}>
            <SwitchButton onValueChange={onSwitchFamilyNumberAlert} text={"Activer les alertes famille"} value={familyAlertGetValue}/>
            {phoneNumberInputs.map(({id}) => {
                return (
                    <View key={id}>
                        <TextInput
                            style={styles.input}
                            defaultValue={findNumberInCollectionById(id)}
                            placeholder="Ajouter numéro famille"
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            onSubmitEditing={({nativeEvent: {text}}) => onSubmitPhoneNumber(id, text)}
                        />
                        <Button title="Supprimer" onPress={() => onRemovePhoneNumber(id)}></Button>
                    </View>)
            })}
            <Button title="Afficher les numéros enregistrés sur l’appareil" onPress={() => getRecordedFamilyNumbersOnDevice()}/>
            <Button title="Supprimer tous les numéros famille" onPress={() => onRemoveAllPhoneNumber()}/>
        </View>
    );
};