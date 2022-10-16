import {openModal, ModalProps, ModalWraper} from ".";
import {Button} from "antd";

interface ConfirmParams {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Default: false */
  displayCloseOnly?: boolean;
}

function ConfirmModal(props: ModalProps<ConfirmParams>): JSX.Element {
  const {modalRef} = props;

  return (
    <ModalWraper title={props.data?.title}>
      <div className="de-mb-4 text-center">{props.data?.description}</div>
      <div className="text-center">
        {!props.data?.displayCloseOnly && (
          <>
            <Button type="primary" onClick={(): void => modalRef.close(false)}>
              Cancel
            </Button>
            <Button
              className="ml-3"
              type="primary"
              onClick={(): void => modalRef.close(true)}
            >
              Confirm
            </Button>
          </>
        )}
      </div>
    </ModalWraper>
  );
}

export function confirm(params: ConfirmParams) {
  return openModal(ConfirmModal, {data: params}).afterClosed();
}
