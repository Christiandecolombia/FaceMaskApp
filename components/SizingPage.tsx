import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";
import FaceRecognition from "./camera/FaceRecognition";
import MainRouter, { MainRouterProps } from "./MainRouter";
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from "expo-camera";


// const SizePage = () => {
//     return (
//         <View>
//             <Text>This Is Sizing Page</Text>
//             <NavigationContainer>
//                 <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
//             </NavigationContainer>
//         </View>
//     )
// }




// const Stack = createStackNavigator();

// function SizePage() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen
//                     name="FaceRecognition"
//                     component={FaceRecognition}
//                     options={{ title: 'FaceRecognition' }}
//                 />
//                 <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }


type LandingNavProps = StackNavigationProp<MainRouterProps, "SizingPage">;

type Props = {
    navigation: LandingNavProps;
}

const SizingPage: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

            <Text> Chose a size that best matches your face.  </Text>
            <Button
                title="Small"
                onPress={() =>  }
            />

            <Button
                title="Open Camera"
                onPress={() => navigation.navigate('FaceRecognition')}
            />






        </View >


    );
};
export default SizingPage;