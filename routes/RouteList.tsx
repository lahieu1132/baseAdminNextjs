import {IAccountRole} from "../types";

export interface IRoute {
  path: string;
  name: string;
  role?: Array<IAccountRole>;
  icon?: string;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  // {
  //   path: Config.PATHNAME.LOGIN,
  //   name: "Auth",
  //   isAuth: true,
  // },
  // {
  //   path: "/approve-news",
  //   name: "sidebar.approve_new",
  //   role: ["admin"],
  //   icon: "usd_coin_usdc",
  //   isPrivate: true,
  //   isSidebar: true,
  // },
  {
    path: "/",
    name: "Quản lý tài khoản",
    role: [IAccountRole.ADMIN],
    icon: "Users",
    isSidebar: true,
  },
  {
    path: "/manager-salary",
    name: "Quản lý bảng lương",
    role: [IAccountRole.ADMIN],
    icon: "Payroll",
    isSidebar: true,
  },
  {
    path: "/salary",
    name: "Bảng lương",
    icon: "Payroll",
    isSidebar: true,
  },
  {
    path: "/salary-user",
    name: "Duyệt lương nhân viên",
    role: [3],
    icon: "Users",
    isSidebar: true,
  },
  {
    path: "/leave-work",
    name: IAccountRole.ADMIN ? "Quản lý nghỉ phép" : "Đơn xin nghỉ phép",
    role: [IAccountRole.USER, IAccountRole.ADMIN],
    icon: "MangeLeave",
    isSidebar: true,
  },
  {
    path: "/event",
    name: "Sự kiện công ty",
    icon: "Event",
    isSidebar: true,
  },
  {
    path: "/birthday",
    name: "Sinh nhật",
    icon: "Birthday",
    isSidebar: true,
  },
  {
    path: "/profile-account",
    name: "Thông tin tài khoản",
    icon: "User",
    isSidebar: true,
  },
  {
    path: "/rules",
    name: "Nội quy - Quy định",
    icon: "Rules",
    isSidebar: true,
  },
  {
    path: "/work-schedule",
    name: "Lịch làm việc",
    icon: "CalenderWork",
    isSidebar: true,
  },
  {
    path: "/project",
    name: "Dự án",
    icon: "Project",
    isSidebar: true,
    role: [IAccountRole.ADMIN],
  },
  {
    path: "/settings",
    name: "Cài đặt",
    icon: "Setting",
    role: [IAccountRole.ADMIN],
    isSidebar: true,
  },
  {
    path: "/position",
    name: "Chức vụ",
    icon: "",
    role: [IAccountRole.ADMIN],
    isSidebar: true,
  },
  {
    path: "/work-type",
    name: "Loại hình làm việc",
    icon: "",
    role: [IAccountRole.ADMIN],
    isSidebar: true,
  },
];

export default routes;
