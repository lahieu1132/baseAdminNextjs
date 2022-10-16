import {ComponentType} from "react";
import {Subject} from "rxjs";
import {modalSubject} from "./modal-subject";
import {ModalOptions, ModalRef, ExtractModalData, ModalProps} from "./types";

let increNumber = 1;

export function openModal<T extends ComponentType<ModalProps>>(
  Content: T,
  options?: ModalOptions<ExtractModalData<T>>
): ModalRef {
  const currentTop = window.scrollY;
  const modalId = increNumber++;
  const modalSbj: Subject<any>[] = [];
  const modalRef: ModalRef = {
    close: (data: any) => {
      modalSbj.forEach((ob) => {
        ob.next(data);
      });

      modalSubject.next(
        modalSubject.getValue().filter((modal) => modal.modalId !== modalId)
      );

      document.body.classList.remove("no-scroll");
      document.body.style.marginTop = "";
      window.scrollTo({top: currentTop, behavior: "instant" as ScrollBehavior});
    },
    afterClosed: () => {
      const sj = new Subject();
      modalSbj.push(sj);
      return sj;
    },
  };

  const modalList = modalSubject.getValue();
  const modalOpts: ModalOptions = options || {};
  document.body.style.marginTop = `-${currentTop}px`;
  document.body.classList.add("no-scroll");

  modalSubject.next([
    ...modalList,
    {modalId, content: Content, options: modalOpts, modalRef},
  ]);

  return modalRef;
}
