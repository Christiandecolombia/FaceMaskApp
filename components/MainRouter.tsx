import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Landing";

const Stack = createStackNavigator();

const MainRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" component={Landing} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRouter;
