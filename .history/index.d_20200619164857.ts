import { ImageSourcePropType } from "react-native";

declare module "*.png" {
    const src: ImageSourcePropType;
    export default src;
}
