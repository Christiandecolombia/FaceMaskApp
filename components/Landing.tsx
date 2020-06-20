import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import FaceRecognition from "./FaceRecognition";
import MainRouter from "./MainRouter";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 
const CameraPage = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>

    );
}
const Landing = ( navigation: any  ) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

            <Text> Designs </Text>
            
            <Button 
            title = "Camera"
            onPress={() => navigation.navigation ('FaceRecognition') } 
            />
        




        </View>
    );
};

export default Landing;
