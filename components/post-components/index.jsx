import PWAInstallButton from "./pwainstall";
import UUIDV4Generator from "./uuidv4generator";
import QRCodeGenerator from "./qrgenerator";
import Compass from "./compass";
import Chatbot from "./chatbot";
import { Block } from "../ui/block";

const postComponents = {
  UUIDV4Generator: UUIDV4Generator,
  PWAInstallButton: PWAInstallButton,
  QRCodeGenerator: QRCodeGenerator,
  Compass: Compass,
  Chatbot: Chatbot,
  Block: Block
};

export default postComponents;
