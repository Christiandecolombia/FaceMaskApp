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
    const cameraRef = React.useRef<Camera>(null);
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [cameraType, setCameraType] = React.useState(
        Camera.Constants.Type.front
    );

    const { height, width } = Dimensions.get("window");
    const maskRowHeight = Math.round((height - 300) / 20);
    const maskColWidth = (width - 300) / 2;

    // Camera roll Permission
    const getPermissionAsync = async () => {
        if (Platform.OS === "ios") {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== "granted") {
                alert(
                    "Sorry, we need camera roll permissions to make this work!"
                );
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status === "granted");
    };

    React.useEffect(() => {
        if (!hasPermission) {
            getPermissionAsync();
        }
    }, [hasPermission]);

    const handleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await (cameraRef.current as any).takePictureAsync();
            console.log(photo);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        console.log(result);
    };

    if (hasPermission === null) {
        return <View />;
    } else if (hasPermission === false) {
        return (
            <View>
                <Text>No access to camera</Text>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 45,
                    }}
                >
                    Designs By Pispa
                </Text>

                {/* Navagation buttons */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignSelf: "flex-end",
                            alignItems: "center",
                            backgroundColor: "transparent",
                        }}
                        onPress={() => pickImage()}
                    ></TouchableOpacity>
                </View>

                <Camera
                    ref={cameraRef}
                    style={styles.cameraView}
                    ratio={"1:1"}
                    type={cameraType}
                    faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.accurate,
                        detectLandmarks: FaceDetector.Constants.Landmarks.all,
                        runClassifications:
                            FaceDetector.Constants.Classifications.all,
                        minDetectionInterval: 2000,
                        tracking: true,
                    }}
                >
                    {/* overlay image */}
                    <Image
                        style={{
                            flex: 1,
                            width: width / 2,
                            height: height / 2,
                            margin: width / 4,
                            top: height,
                        }}
                        source={images.GoldenPng}
                    />

                    {/* Camera mask settings */}
                    <View style={styles.maskOutter}>
                        <View
                            style={[
                                { flex: maskRowHeight },
                                styles.maskRow,
                                styles.maskFrame,
                            ]}
                        />
                        <View style={[{ flex: 30 }, styles.maskCenter]}>
                            <View
                                style={[
                                    { width: maskColWidth },
                                    styles.maskFrame,
                                ]}
                            />
                            <View style={styles.maskInner} />
                            <View
                                style={[
                                    { width: maskColWidth },
                                    styles.maskFrame,
                                ]}
                            />
                        </View>
                        <View
                            style={[
                                { flex: maskRowHeight },
                                styles.maskRow,
                                styles.maskFrame,
                            ]}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignSelf: "flex-end",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                            onPress={() => pickImage()}
                        >
                            <Ionicons
                                name="ios-photos"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: "flex-end",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                            onPress={() => takePicture()}
                        >
                            <FontAwesome
                                name="camera"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: "flex-end",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                            onPress={() => handleCameraType()}
                        >
                            <MaterialCommunityIcons
                                name="camera-switch"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
};

export default FaceRecognition;
