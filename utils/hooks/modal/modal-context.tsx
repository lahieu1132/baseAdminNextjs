import {createContext} from "react";
import {ModalSetting} from "./types";

export interface ModalContextValues {
  modal: ModalSetting;
}

export const ModalContext = createContext<ModalContextValues>(
  {} as ModalContextValues
);
