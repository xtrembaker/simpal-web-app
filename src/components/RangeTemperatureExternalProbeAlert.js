import {StyleSheet, View, Text, Switch, Button} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useEffect, useState} from "react";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {
    createMessageDisableTemperatureAlert,
    createMessageEnableTemperatureAlert,
    createMessageProbeDisableTemperatureAlert,
    createMessageProbeEnableTemperatureAlert, createMessageProbeTemperatureRangeAlert,
    createMessageTemperatureRangeAlert
} from "../services/message";
import localStorage from "../services/localStorage";

const styles = StyleSheet.create({
    mainView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1
    },
    text: {
        fontSize: 18
    }
});

const STORAGE_KEY = 'externalProbeTemperatureAlert';

export default function RangeTemperatureExternalProbeAlert(){
    const [minSelectedValue, setMinSelectedValue] = useState(15);
    const [maxSelectedValue, setMaxSelectedValue] = useState(20);
    const [rangeTemperatureAlertValue, setRangeTemperatureValue] = useState(false);
    useEffect(() => {
        localStorage().getItem(STORAGE_KEY).then((value) => {
            if(!value){
                return;
            }
            setMinSelectedValue(value.minSelectedValue);
            setMaxSelectedValue(value.maxSelectedValue);
            setRangeTemperatureValue(value.rangeTemperatureAlertValue);
        })
    }, []);
    const storageData = {
        rangeTemperatureAlertValue,
        minSelectedValue,
        maxSelectedValue
    }

    const onChangeRangeTemperatureAlertValue = (value) => {
        return sendSMS(value ? createMessageProbeEnableTemperatureAlert() : createMessageProbeDisableTemperatureAlert()).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            const newValue = {...storageData, ...{rangeTemperatureAlertValue: value}};
            localStorage().setItem(STORAGE_KEY, newValue).then(() => {
                setRangeTemperatureValue(value);
            })
        })
    };

    const onValidateRangeTemperatureValue = () => {
        return sendSMS(createMessageProbeTemperatureRangeAlert(minSelectedValue, maxSelectedValue)).then(() => {
            const newValue = {...storageData, ...{minSelectedValue, maxSelectedValue}};
            return localStorage().setItem(STORAGE_KEY, newValue);
        })
    }

    return (
        <View style={styles.mainView}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 20}}>
                <Text style={{fontSize: 18, marginRight: 10}}>Activer l’alerte température</Text>
                <Switch onValueChange={onChangeRangeTemperatureAlertValue} value={rangeTemperatureAlertValue}></Switch>
            </View>
            <Text style={styles.text}>Température minimum : {minSelectedValue}</Text>
            <Text style={styles.text}>Température maximum : {maxSelectedValue}</Text>
            <MultiSlider
                min={-10}
                max={50}
                values={[minSelectedValue, maxSelectedValue]}
                showSteps={true}
                onValuesChange={([min, max]) => { setMinSelectedValue(min); setMaxSelectedValue(max)}}
            />
            <Button onPress={() => onValidateRangeTemperatureValue()} title="Valider"></Button>
        </View>
    )
}