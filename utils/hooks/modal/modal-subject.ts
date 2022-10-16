/**
 * Note: DO NOT IMPORT THIS FILE DIRECTLY(EXCEPT FOR ModalPortal).
 */
import {BehaviorSubject} from "rxjs";
import {ModalSetting} from "./types";

export const modalSubject = new BehaviorSubject<ModalSetting[]>([]);
