import React, {useEffect, useState} from 'react';
import { Button } from 'react-native';
import HomePage from "./src/pages/HomePage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsPage from "./src/pages/SettingsPage";
import FamilyNumbersPage from "./src/pages/FamilyNumbersPage";
import InternalProbePage from "./src/pages/InternalProbePage";
import ExternalProbePage from "./src/pages/ExternalProbePage";
import {getSimpalPhoneNumber} from "./src/services/simpalPhoneNumber";
import WelcomePage from "./src/pages/WelcomePage";

const Stack = createNativeStackNavigator();

export default function App() {
    const [welcomePageDone, setWelcomePageDone] = useState(false);
    useEffect(() => {
        getSimpalPhoneNumber().then((value) => {
            setWelcomePageDone(value !== null);
        })
    }, []);
    if(!welcomePageDone){
        return (<WelcomePage onDone={() => setWelcomePageDone(true)}/>)
    }
    return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={HomePage}
                  options={({navigation}) => ({
                      title: 'Simpal T2',
                      headerRight: () => (
                          <Button title="Paramètres" onPress={() => navigation.navigate('Settings')}/>
                      )
                  })}
              />
              <Stack.Screen name="Settings" title="Paramètres" component={SettingsPage} />
              <Stack.Screen name="FamilyNumbersPage" title="Liste des numéros famille" component={FamilyNumbersPage} />
              <Stack.Screen name="InternalProbePage" title="Sonde interne" component={InternalProbePage} />
              <Stack.Screen name="ExternalProbePage" title="Sonde externe" component={ExternalProbePage} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
