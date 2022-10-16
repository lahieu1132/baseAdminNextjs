import React, {useEffect, useState} from "react";
import {modalSubject} from "./modal-subject";
import {ModalSetting} from "./types";
import {ModalContext} from "./modal-context";
import Grow from "@mui/material/Grow";
import {Fade} from "@mui/material";

export function ModalPortal(): JSX.Element {
  const [modalList, setModalList] = useState<ModalSetting[]>([]);

  useEffect(() => {
    modalSubject.subscribe((modalList) => {
      setModalList(modalList);
    });
  }, []);

  return (
    <div className="modal-portals de-modal">
      <Fade in={!!modalList.length}>
        <div className="ds-modal-backdrop" />
      </Fade>

      {modalList.map((modal, idx) => (
        <ModalWrapper key={idx} modal={modal} />
      ))}
    </div>
  );
}

interface ModalWrapperProps {
  modal: ModalSetting;
}

function ModalWrapper(props: ModalWrapperProps): JSX.Element {
  const [show, setShow] = useState(false);
  const {modal} = props;

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{modal}}>
      <Grow in={show} timeout={{enter: 320}}>
        <div
          style={{display: "block"}}
          className="modal fade show"
          tabIndex={-1}
          role="dialog"
          aria-hidden="false"
        >
          <div
            className={`modal-dialog modal-dialog-centered ${
              modal.options.dialogClassName ? modal.options.dialogClassName : ""
            }`}
            role="document"
          >
            <div className="modal-content">
              <modal.content
                modalRef={modal.modalRef}
                data={modal.options?.data}
              />
            </div>
          </div>
        </div>
      </Grow>
    </ModalContext.Provider>
  );
}
