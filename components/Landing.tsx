import React from "react";
import { Button, View, Text } from "react-native";
import { MainRouterProps } from "./MainRouter";

import { StackNavigationProp } from '@react-navigation/stack';

type LandingNavProps = StackNavigationProp<MainRouterProps, "Landing">;

type Props = {
    navigation: LandingNavProps;
}

const Landing: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >

            <Text> Designs </Text>

            <Button
                title="Camera"
                onPress={() => navigation.navigate('FaceRecognition')}
            />





        </View>
    );
};

export default Landing;
