import React from "react";
import { Camera } from "expo-camera";
import * as images from "../asset";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView: {
        flex: 1,
        justifyContent: "flex-start",
    },
    maskOutter: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    maskInner: {
        width: 300,
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: "rgba(1,1,1,0.6)",
    },
    maskRow: {
        width: "100%",
    },
    maskCenter: { flexDirection: "row" },
});

const FaceRecognition = () => {
    return (
        <div>
            
        </div>
    )
}

export default FaceRecognition
