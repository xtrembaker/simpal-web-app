import {View, StyleSheet, TextInput} from "react-native";
import {sendSMS} from "../services/sendSMS";
import {createMessageAddFamilyNumber} from "../services/message";
import SwitchFamilyNumberAlert from "../components/SwitchFamilyNumberAlert";

const styles = StyleSheet.create({
    input: {
        borderColor: "#007AFF",
        borderWidth: 1,
        borderStyle: "dashed",
        fontSize: 18,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 25,
    }
});

export default function FamilyNumbersPage(){
    const phoneNumberInputs = [
        {
            id: "15256287-612a-442a-b8b0-8fad08d0c0f1",
            placeholder: "Numéro 1"
        },
        {
            id: "d4bc4119-b468-48b2-b5c0-4624373a6507",
            placeholder: "Numéro 2"
        },
        {
            id: "807f950c-6d66-45ea-8e6e-785e5e5dada6",
            placeholder: "Numéro 3"
        },
        {
            id: "075c7be0-7cb6-404f-935d-4fa521005574",
            placeholder: "Numéro 4"
        }];

    const onSubmitPhoneNumber = async(number) =>
    {
        await sendSMS(createMessageAddFamilyNumber(number))
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log('error', error);
            });
    }

    return (
        <View>
            <SwitchFamilyNumberAlert />
            {phoneNumberInputs.map(({id, placeholder}) => {
                return (<TextInput
                    style={styles.input}
                    key={id}
                    placeholder={placeholder}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    onSubmitEditing={({nativeEvent: {text}}) => onSubmitPhoneNumber(text)}
                ></TextInput>)
            })}
        </View>
    );
};