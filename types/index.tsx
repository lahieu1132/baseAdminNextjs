import React from "react";

export interface CommonReduxAction {
  type: string;
}

export interface CommonReactProps {
  children: React.ReactNode;
}

export interface ISettingId {
  _id?: string;
  themes?: string;
  location?: string;
  region?: string;
  language?: string;
  referCode?: string;
}

export enum IAccountRole {
  USER = 0,
  ADMIN = 1,
  ANONYMOUS = 2,
  MANAGER,
}

export enum IState {
  INACTIVE,
  ACTIVE,
  DELETED,
}

export interface IDataCost {
  April: number;
  August: number;
  December: number;
  February: number;
  January: number;
  July: number;
  June: number;
  March: number;
  May: number;
  November: number;
  October: number;
  September: number;
}

export interface IDataProjectList {
  name?: string;
  id?: number;
  state?: number;
  startDate?: string;
  endDate?: string;
  scale?: number;
  customer?: string;
  technicality?: string;
  description?: string;
  projectManager?: {
    id: number;
    avatar: string;
    fullName: string;
    email: string;
    employeeCode: string;
    personId: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
    phoneNumberRelative: string;
  };
}

export interface IDataOnsite {
  id: number;
  dayOnWeek?: string;
  day?: number | string;
  onsitePlace?: string;
  salary?: number;
  date?: string;
  state?: number;
  action?: boolean;
}

export interface IDataOverTime {
  id: number;
  dayOnWeek?: string;
  day?: number | string;
  date?: string;
  state?: number;
  action?: boolean;
  hour?: number | string;
  projectName?: string;
  project?: {
    id: number;
    name: string;
    projectManager: {
      state: number;
      gender: string;
      englishCertificate: string;
      role: {
        id: number;
        roleName: string;
        permissions: [
          {
            id: number;
            permissionName: string;
            permissionKey: "";
          }
        ];
      };
    };
  };
}

export interface IDataProject {
  id?: number;
  date?: string;
  salary?: number;
  projectName?: string;
  project?: {
    id: number;
    name: string;
    projectManager: {
      state: number;
      gender: string;
      englishCertificate: string;
      role: {
        id: number;
        roleName: string;
        permissions: [
          {
            id: number;
            permissionName: string;
            permissionKey: "";
          }
        ];
      };
    };
  };
}

export interface IDataBonus {
  id?: number;
  date?: string;
  reason?: string;
  salary?: number;
  projectName?: string;
  project?: {
    id: number;
    name: string;
    projectManager: {
      state: number;
      gender: string;
      englishCertificate: string;
      role: {
        id: number;
        roleName: string;
        permissions: [
          {
            id: number;
            permissionName: string;
            permissionKey: "";
          }
        ];
      };
    };
  };
}

export interface IDataDeductionDay {
  id?: number;
  date?: string;
  dayOffWork?: number;
  hourLateWork?: number;
  deductionSalaryDay?: number | string;
  deductionSalaryHour?: number | string;
}

export interface IDataSalary {
  afterTaxSalary: number;
  baseSalary: number;
  bonusSalary: number;
  createdAt: string;
  date: string;
  deductionSalary: number;
  id: number;
  manageSalary: number;
  onsiteSalary: number;
  overtimeSalary: number;
  projectSalary: number;
  state: number;
  taxSalary: number;
  totalSalary: number;
  updatedAt: string;
}

export interface IUserLogin {
  date?: string;
  createdAt?: string;
  month?: number;
  id?: string;
  fullName?: string;
  state?: IState;
  email?: string;
  dateOfBirth?: string;
  positionId?: number;
  avatar?: string;
  personId?: number;
  address?: string;
  phoneNumber?: string;
  role?: {
    id?: IAccountRole;
    roleName?: string;
  };
  phoneNumberRelative?: string;
  baseSalary?: number;
  manageSalary?: number;
  gender?: string;
}

export interface IDataProjectSalary {
  projectName?: string;
  projectSalary?: number | string;
}

export interface IProfile {
  _id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  avatar?: string;
  newEmail?: string;
}

export interface IAccountInfo {
  user?: IUserLogin;
  accessToken?: string;
  refreshToken?: string;
  isConfirmed?: boolean;
  dataProfile?: IProfile;
  role?: {
    id?: number;
    roleName?: string;
  };
}

export interface ILeaveWork {
  id?: number;
  user?: {
    id: number;
    email: string;
    fullName: string;
  };
  startDate?: Date;
  reason?: string;
  reasonRefuse?: string;
  quantity?: number;
  state?: number;
}

export interface IEvent {
  id?: number;
  title?: string;
  content?: string;
  startDate?: string;
  endDate?: string;
}

export interface IPosition {
  id?: number;
  name?: string;
  description?: string;
}

export interface IWorkType {
  id?: number;
  name?: string;
  description?: string;
}

export interface ISetStateModal {
  startDate?: string;
  endDate?: string;
  quantity?: number;
  reason?: string;
  refuseReason?: string;
  title?: string;
  content?: string;
  name?: string;
  description?: string;
}
