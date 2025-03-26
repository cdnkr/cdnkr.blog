import ImageMasonry from "../image-masonry";
import { Block } from "../ui/block";
import Chatbot from "./chatbot";
import Compass from "./compass";
import PWAInstallButton from "./pwainstall";
import QRCodeGenerator from "./qrgenerator";
import UUIDV4Generator from "./uuidv4generator";
import CurrentLocation from "./currentlocation-mapbox";
import Base64Converter from "./bas64converter";

const postComponents = {
  UUIDV4Generator: UUIDV4Generator,
  PWAInstallButton: PWAInstallButton,
  QRCodeGenerator: QRCodeGenerator,
  Compass: Compass,
  Chatbot: Chatbot,
  Block: Block,
  ImageMasonry: ImageMasonry,
  CurrentLocation: CurrentLocation,
  Base64Converter: Base64Converter,
};

export default postComponents;
