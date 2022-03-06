import {Switch, Text, View} from "react-native";
import mainStyle from "../styles/main";
import {useCallback, useEffect, useState} from "react";

export default function SwitchButton({value: getDefaultValue, onValueChange, text}){
    const [value, setValue] = useState(false);

    useEffect(() => {
        getDefaultValue().then((value) => {
            setValue(value);
        })
    }, [value]);

    const onSwitchValueChange = useCallback((value) => {
        return onValueChange(value).then(() => {
            setValue(value);
        }).catch(() => {})
    }, [value]);

    return (
        <View style={mainStyle.switchButtonContainer}>
            <Text style={{fontSize: 18}}>{text}</Text>
            <Switch onValueChange={onSwitchValueChange} value={value}></Switch>
        </View>
    )
}