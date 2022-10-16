import React, {useContext, PropsWithChildren} from "react";
import {ModalContext} from "./modal-context";
import classNames from "classnames";
import {Button} from "antd";
import Icon from "@app/components/Icon/Icon";

type ModalWrapperProps = PropsWithChildren<{
  title?: React.ReactNode;
  className?: string;
}>;

export function ModalWraper(props: ModalWrapperProps): JSX.Element {
  const modalCtx = useContext(ModalContext);

  return (
    <div className={classNames("ds-modal-wrapper", props.className)}>
      <div className="ds-modal-header">
        <span className="text-body-m-bold">{props.title}</span>
        <Button
          className="modal-close-btn"
          onClick={(): void => modalCtx.modal.modalRef.close()}
        >
          <Icon size={24} className="clr-white" icon="Edit_Profile" />
        </Button>
      </div>

      <div className="ds-modal-body">{props.children}</div>
    </div>
  );
}
