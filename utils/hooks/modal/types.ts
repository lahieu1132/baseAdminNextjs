import {ComponentType} from "react";
import {Observable} from "rxjs";

export interface ModalRef {
  close: (data?: any) => void;
  afterClosed: () => Observable<any>;
}

export interface ModalOptions<Data = any> {
  data?: Data;
  dialogClassName?: string;
}

export interface ModalProps<Data = any> {
  modalRef: ModalRef;
  data?: Data;
}

export interface ModalSetting {
  modalId: number;
  content: ComponentType<ModalProps>;
  options: ModalOptions;
  modalRef: ModalRef;
  softDeleted?: boolean;
}

type ExtractPropsFromComponent<C> = C extends ComponentType<infer P> ? P : any;

type ExtractModalDataFromProps<P> = P extends ModalProps<infer ModalData>
  ? ModalData
  : any;

export type ExtractModalData<T = any> = T extends (props: infer P) => any
  ? ExtractModalDataFromProps<P>
  : ExtractModalDataFromProps<ExtractPropsFromComponent<T>>;
