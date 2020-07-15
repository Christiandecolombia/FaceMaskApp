import React from "react";
import { Camera, FaceDetectionResult } from "expo-camera";
import { RNCamera } from "react-native-camera";
import * as images from "../../asset";
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
    cameraView: {
        flex: 1,
        position: "relative",
        justifyContent: "flex-start",
    },
    mask: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    dot: {
        borderRadius: 50,
        borderWidth: 1,
        height: 10,
        width: 10,
        borderColor: "red",
        position: "absolute",
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
    },
});

interface ImagePos {
    top: number;
    right?: number;
    bottom?: number;
    left: number;
}
interface ControlProps {
    pickImage: () => void;
    takePicture: () => void;
    handleCameraType: () => void;
}
const Controls: React.FC<ControlProps> = ({
    pickImage,
    takePicture,
    handleCameraType,
}) => {
    return (
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
    );
};
const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: "lightgreen",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Text>Waiting</Text>
    </View>
);
const FaceRecognition: React.FC = () => {
    const cameraRef = React.useRef<RNCamera>(null);
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [imagePos, setImagePos] = React.useState<ImagePos>({
        top: 0,
        left: 0,
    });
    const [cameraType, setCameraType] = React.useState(
        Camera.Constants.Type.front
    );
    const takePicture = async function (camera: RNCamera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log(data.uri);
    };
    // Set mask
    // const { height, width } = Dimensions.get("window");
    // const maskRowHeight = Math.round((height - 300) / 20);
    // const maskColWidth = (width - 300) / 2;

    //Get camera ratio
    // const pictureSize = Camera.defaultProps.ratio;

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

    // React.useEffect(() => {
    //     if (!hasPermission) {
    //         // getPermissionAsync();
    //         console.log("No permissions yet")
    //     }
    // }, [hasPermission]);

    const handleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        console.log(result);
    };

    const handleFacesDetected = ({ faces }: FaceDetectionResult) => {
        if (!faces.length) return;
        faces.forEach((face: FaceDetector.FaceFeature) => {
            // const bottom = face.bounds.origin.x + face.bounds.size.height;
            const top = face.bounds.origin.y;
            // const right = face.bounds.origin.x + face.bounds.size.width;
            const left = face.bounds.origin.x;
            console.log(face);
            setImagePos({
                top,
                left,
            });
        });
    };

    if (!hasPermission) {
        return (
            <View>
                <Text>No access to camera</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <RNCamera
                    // style={styles.cameraView}
                    // ref={cameraRef}
                    // type={cameraType}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: "Permission to use camera",
                        message: "We need your permission to use your camera",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancel",
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: "Permission to use audio recording",
                        message: "We need your permission to use your audio",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancel",
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                    // faceDetectorSettings={{
                    //     mode: FaceDetector.Constants.Mode.fast,
                    //     detectLandmarks: FaceDetector.Constants.Landmarks.all,
                    //     runClassifications:
                    //         FaceDetector.Constants.Classifications.all,
                    //     minDetectionInterval: 2000,
                    //     tracking: true,
                    // }}
                    // onFacesDetected={handleFacesDetected}
                >
                    {/* <Image
                    style={{
                        position: "absolute",
                        borderColor: "blue",
                        borderWidth: 1,
                        resizeMode: "cover",
                        ...imagePos,
                    }}
                    source={images.MaskOverlay2}
                /> */}
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== "READY") return <PendingView />;
                        return (
                            <View
                                style={{
                                    flex: 0,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => takePicture(camera)}
                                    style={styles.capture}
                                >
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }
};

export default FaceRecognition;

const faceDetectedExample = {
    bottomMouthPosition: {
        x: 189.75197637648807,
        y: 417.0086154513889,
    },
    bounds: {
        origin: {
            x: 115.04761904761901,
            y: 274.9634920634921,
        },
        size: {
            height: 189.56190476190477,
            width: 146.66666666666666,
        },
    },
    faceID: 35,
    leftCheekPosition: {
        x: 220.71471586681545,
        y: 384.4088016570561,
    },
    leftEarPosition: {
        x: 236.43371000744045,
        y: 379.12754565042167,
    },
    leftEyeOpenProbability: 0.9887905716896057,
    leftEyePosition: {
        x: 212.6302548363095,
        y: 341.03062414744545,
    },
    leftMouthPosition: {
        x: 207.3382626488095,
        y: 410.31459137447297,
    },
    noseBasePosition: {
        x: 191.2796921502976,
        y: 371.90965033637156,
    },
    rightCheekPosition: {
        x: 156.83528645833331,
        y: 382.9143811422681,
    },
    rightEarPosition: {
        x: 129.98944382440476,
        y: 377.16719399104045,
    },
    rightEyeOpenProbability: 0.9021314382553101,
    rightEyePosition: {
        x: 166.0282040550595,
        y: 340.5072952512711,
    },
    rightMouthPosition: {
        x: 171.229747953869,
        y: 408.31238907102556,
    },
    rollAngle: 359.8363603949547,
    smilingProbability: 0.007616420742124319,
    yawAngle: 4.826995372772217,
};
