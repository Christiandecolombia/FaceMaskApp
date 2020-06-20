import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={Landing}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRouter;
