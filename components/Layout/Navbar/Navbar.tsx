import React, {useEffect} from "react";
import {MenuOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {loginUser, logoutUser} from "@app/redux/slices/UserSlice";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {useQuery} from "react-query";
import {IUserLogin} from "@app/types";
import ApiUser from "@app/api/ApiUser";
import Image from "next/image";
import {Dropdown, Menu, Modal} from "antd";
import Link from "next/link";
import Icon from "@app/components/Icon/Icon";
import {useRouter} from "next/router";

/**
 *
 */
export default function Navbar(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);

  const dispatch = useDispatch();

  const getMeData = (): Promise<IUserLogin> => {
    return ApiUser.getMe();
  };

  const dataUser = useQuery("dataUser", getMeData);

  useEffect(() => {
    dataUser.refetch().then((data) => {
      dispatch(loginUser({...user, user: data?.data}));
    });
  }, []);

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        dispatch(logoutUser());
        router.push("/");
      },
    });
  };
  /**
   *
   * @returns {*}
   */
  const renderDropdown = (): JSX.Element => (
    <Menu>
      <Menu.Item key="0">
        <Link href="/user/home" passHref>
          <div>
            <Icon icon="BlockUser" size={20} color="#000" className="mr-2" />
            Đổi mật khẩu
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={handleLogout}>
        <div>
          <Icon icon="SignOut" size={20} color="#000" className="mr-2" />
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center">
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
      </div>
      <div className="group-user-info">
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Image
              src="/img/avatar/avatar.jpg"
              width={30}
              height={30}
              className="rounded-full"
              alt="avatar"
            />
            <span className="ml-2 hidden md:flex">
              {dataUser?.data?.fullName}
            </span>
            <Icon icon="ArrowDown" size={20} color="#000" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
