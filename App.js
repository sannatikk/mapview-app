import { Platform, SafeAreaView, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import * as Location from 'expo-location'
import Map from './screens/Map';
import MainAppBar from './components/MainAppBar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './screens/Settings'

const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}
  
const Stack = createNativeStackNavigator()

export default function App() {

  const [icon, setIcon] = useState(icons.location_not_known)
  
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0421, // a higher zoom level = smaller number
    longitudeDelta: 0.0421,
  })

  const [mapType, setMapType] = useState('standard')

  const getLocation = async () => {

    setIcon(icons.location_searching)

    let { status } = await Location.requestForegroundPermissionsAsync()
    try {
        if (status !== 'granted') {
            console.log('Ei lupaa sijaintiin')
            setIcon(icons.location_not_known)
            return
        }
        let position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        setLocation({ 
            ...location, 
            "latitude": position.coords.latitude, 
            "longitude": position.coords.longitude 
        })
        setIcon(icons.location_found)
        } catch (error) {
          console.log(error)
        }
    }

  return (

    /* käytä safeareaview view:n sijaan jos haluat ios että palkit peittyy */
    /* androidiin npx expo install expo-constants */ 

  <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Map"
            screenOptions={{header: (props) =>
              <MainAppBar {...props}
              backgroundColor = {settings.backgroundColor}
              icon = {icon}
              getUserPosition = {getLocation}
              />
            }}
          >
            <Stack.Screen
              name="Map" >
              { () => <Map 
              location={location} 
              mapType={mapType} /> }
            </Stack.Screen>
            <Stack.Screen 
              name="Settings" >
                {() => <Settings 
                  backgroundColor={settings.backgroundColor} 
                  mapType={mapType} 
                  setMapType={setMapType} />}
              </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  )

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     /* tämä rajaisi androidin statusbarin pois apista */
//     // marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0 
//   },
// })