import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";
import SizingPage from "./SizingPage";
import FaceRecognition from "./camera/FaceRecognition";

// const FaceRecognition() {
//     return (
//         <view style {{flex: 1, alignItems: "center", justifyContect: "center" }}>
//             <Text>FaceRecognition</Text>
//         </view>
//     )
// }

export type MainRouterProps = {
    Landing: undefined;
    Camera: undefined;
};

export type CameraRouterProps = {
    SizingPage: undefined;
}

const Stack = createStackNavigator<MainRouterProps>();
const CamStack = createStackNavigator();

const CameraNavigator: React.FC = () => {
    return (
        <CamStack.Navigator>
            <CamStack.Screen name="SizingPage" component={SizingPage} />
        </CamStack.Navigator>
    );
};

const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Camera" component={CameraNavigator} />
        </Stack.Navigator>
    );
};

const MainRouter: React.FC = () => {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
};

export default MainRouter;
