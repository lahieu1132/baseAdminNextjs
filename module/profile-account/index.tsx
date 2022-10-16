import React, {useState} from "react";
import {IUserLogin} from "@app/types";
import {useQuery} from "react-query";
import ApiUser from "@app/api/ApiUser";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Input,
  Modal,
  notification,
  Tooltip,
} from "antd";
import {CameraOutlined, EditOutlined} from "@ant-design/icons";
import {ModalUpdateProfile} from "@app/module/profile-account/components/ModalUpdateProfile";

export function ProfileAccount(): JSX.Element {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalUpload, setToggleModalUpload] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const getMeData = (): Promise<IUserLogin> => {
    return ApiUser.getMe();
  };

  const {
    data: dataUser,
    isLoading,
    refetch,
  } = useQuery("dataUser", getMeData) || {};

  const dataRefetch = (): void => {
    refetch();
  };

  const onFileUpload = () => {
    if (!fileUpload) {
      notification.error({
        duration: 1,
        message: `Chưa chọn ảnh mới`,
      });
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload);
      ApiUser.updateAvatar(formData)
        .then((response) => {
          notification.success({
            duration: 1,
            message: `Sửa thành công`,
          });
          setToggleModalUpload(false);
          setFileUpload(undefined);
          dataRefetch();
        })
        .catch((error) =>
          notification.warning({
            duration: 1,
            message: `Sửa thất bại`,
          })
        );
      setToggleModalUpload(false);
      setFileUpload(undefined);
    }
  };

  const handleChooseFile = (e: any) => {
    const img = e.target.files[0];
    setFileUpload(img);
  };

  return (
    <div className="profile-page flex justify-center">
      <Card className="w-40x mt-4" loading={isLoading}>
        <div className="col-all-center m-2">
          <div>
            <Avatar.Group maxPopoverTrigger="hover" className="hover-pointer">
              <Tooltip
                style={{backgroundColor: "white"}}
                title="Sửa ảnh đại diện"
                placement="top"
              >
                <Modal
                  title="Sửa ảnh đại diện"
                  centered
                  visible={toggleModalUpload}
                  className="modal"
                  footer={[
                    <Button
                      key="save"
                      style={{backgroundColor: "#40a9ff"}}
                      type="primary"
                      className="btn-action m-1 hover-pointer"
                      onClick={onFileUpload}
                    >
                      Lưu
                    </Button>,
                  ]}
                  onCancel={() => setToggleModalUpload(false)}
                >
                  <div className="m-2 d-flex">
                    <p className="ml-2 font-bold w-20x">Thêm ảnh</p>
                    <Input
                      type="file"
                      className="input w-100x"
                      onChange={handleChooseFile}
                      placeholder="abc"
                      style={{
                        width: "100px",
                      }}
                    />
                  </div>
                </Modal>
                <Avatar
                  icon={<CameraOutlined />}
                  size={140}
                  src={dataUser?.avatar || "/img/avatar/avatar.jpg"}
                  onClick={() => setToggleModalUpload(true)}
                />
              </Tooltip>
            </Avatar.Group>
          </div>
          <div className="font-bold m-1" />
        </div>
        <h4 className="text-center">{dataUser?.fullName}</h4>
        <div className="profile">
          <div className="btn-edit">
            {toggleModal && (
              <ModalUpdateProfile
                dataRefetch={dataRefetch}
                setToggleModal={setToggleModal}
                dataProfile={dataUser || {}}
              />
            )}
          </div>
          <div>
            <Descriptions column={1} className="ml-5">
              <Descriptions.Item label="Chức vụ">
                {dataUser?.role?.roleName}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {dataUser?.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {dataUser?.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item label="Số cmnd/cccd">
                {dataUser?.personId}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {dataUser?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {dataUser?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại người thân">
                {dataUser?.phoneNumberRelative}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="primary"
            style={{backgroundColor: "#40a9ff"}}
            icon={<EditOutlined />}
            onClick={() => setToggleModal(true)}
          >
            Sửa thông tin nhân viên
          </Button>
        </div>
      </Card>
    </div>
  );
}
