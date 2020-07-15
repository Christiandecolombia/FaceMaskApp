import * as React from "react";
import { Button, View, Text } from "react-native";
import { MainRouterProps } from "./MainRouter";
import { StackNavigationProp } from "@react-navigation/stack";
import FaceRecognition from "./camera/FaceRecognition";


type LandingNavProps = StackNavigationProp<MainRouterProps, "Camera">;

type Props = {
    navigation: LandingNavProps;
};

const SizingPage: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, backgroundColor: "lightblue" }}
        >
            <Text> Chose a size that best matches your face. </Text>
  
            <FaceRecognition />
        </View>
    );
};
export default SizingPage;
