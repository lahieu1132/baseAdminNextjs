import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {TextArea} from "@app/components/Modal/TextArea";
import ApiLeaveWork, {IRefuseLeaveWorkBody} from "@app/api/ApiLeaveWork";
import {useMutation} from "react-query";

interface ModalRefuseLeaveWorkProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  refuseWorkLeaveId?: number;
  dataRefetch: () => void;
}

export function ModalRefuseLeaveWork({
  isModalVisible,
  toggleModal,
  refuseWorkLeaveId,
  dataRefetch,
}: ModalRefuseLeaveWorkProps): JSX.Element {
  const [data, setData] = useState<IRefuseLeaveWorkBody>({
    refuseReason: "",
  });

  const refuseLeaveWorkMutation = useMutation(ApiLeaveWork.refuseLeaveWork);
  const handleRefuseLeaveWork = (values: IRefuseLeaveWorkBody): void => {
    refuseLeaveWorkMutation.mutate(
      {
        id: values.id,
        refuseReason: values.refuseReason,
      }
      // {
      //   onSuccess: () => {
      //     //todo
      //   },
      //   onError: () => {
      //     //todo
      //   },
      // }
    );
    toggleModal();
    dataRefetch();
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-refuse-leave-work">
        <TextArea
          keyValue="refuseReason"
          value={data.refuseReason ?? ""}
          label="Lý do"
          required
          placeholder="Lý do từ chối"
          onChange={setData}
        />
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleOk={(): void =>
        handleRefuseLeaveWork({
          id: refuseWorkLeaveId,
          refuseReason: data.refuseReason,
        })
      }
      handleCancel={toggleModal}
      title="Lý do từ chối"
      content={renderContent()}
    />
  );
}
