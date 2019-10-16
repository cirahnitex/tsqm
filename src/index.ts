import iohook from "iohook";
import robot from "robotjs";
iohook.start(false);
robot.setKeyboardDelay(1);
robot.setMouseDelay(1);

export * from "./delay";
export * from "./isKeyDown";
export * from "./keycodes";
export * from "./keyEvents";
export * from "./RGB";
export * from "./screen";
export * from "./simulateInput";