import { View, Button } from 'react-native';
import AddSimpalNumberModal from "../components/AddSimpalNumberModal";

export default function HomePage({navigation}) {
    return (
        <View>
            <Button title="Sonde interne" onPress={() => navigation.navigate('InternalProbePage')}/>
            <Button title="Sonde externe" onPress={() => navigation.navigate('ExternalProbePage')}/>
            <AddSimpalNumberModal />
        </View>
    )
}