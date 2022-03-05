import { View, Button } from 'react-native';
import AppReady from "../components/AppReady";
import mainStyle from "../styles/main";

export default function HomePage({route: {params}, navigation}) {
    return (
        <View style={mainStyle.pageContainer}>
            <Button title="Sonde interne" onPress={() => navigation.navigate('InternalProbePage')}/>
            <Button title="Sonde externe" onPress={() => navigation.navigate('ExternalProbePage')}/>
            <AppReady visible={params.appReady ? params.appReady : false}/>
        </View>
    )
}