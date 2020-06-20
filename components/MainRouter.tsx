import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";
import FaceRecognition from "./FaceRecognition";


// const FaceRecognition() {
//     return (
//         <view style {{flex: 1, alignItems: "center", justifyContect: "center" }}>
//             <Text>FaceRecognition</Text>
//         </view>
//     )
// }


const Stack = createStackNavigator();

const MainRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRouter;
