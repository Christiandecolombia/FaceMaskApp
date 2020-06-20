import "react-native-gesture-handler";
import React from "react";
import { View, Text } from 'react-native';
import MainRouter from "./components/MainRouter";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from "./components/Landing";
import FaceRecognition from "./components/FaceRecognition"

// function FaceRecognition() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Landing</Text>
//       </View>
//     );
//   }
  
  const Stack = createStackNavigator();
  
export default function App() {
    return (   <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        </Stack.Navigator>
      </NavigationContainer>);
}
