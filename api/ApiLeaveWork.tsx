import {fetcher} from "./Fetcher";
import {ILeaveWork} from "../types";

export interface ILeaveWorkBody {
  startDate?: string;
  quantity?: number;
  reason?: string;
}

export interface IRefuseLeaveWorkBody {
  id?: number;
  refuseReason?: string;
}

export interface ILeaveWorkResponse {
  id: number;
  userId: number;
  startDate?: string;
  reason: string;
  reasonRefuse?: string;
  quantity: number;
  state?: number;
}

export interface IParamsGetLeaveWork {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
  filter?: {
    state_IN?: number[];
    createdAt_RANGE?: string[];
  };
}

const path = {
  getLeaveWork: "letter-leave",
};

function getLeaveWork(params?: IParamsGetLeaveWork): Promise<ILeaveWork[]> {
  return fetcher({url: path.getLeaveWork, method: "get", params: params});
}

function getDaysAllowedLeave(): Promise<ILeaveWork> {
  return fetcher({
    url: path.getLeaveWork + "/days-allowed-leave",
    method: "get",
  });
}

function createLeaveWork(body: ILeaveWorkBody): Promise<ILeaveWorkResponse> {
  return fetcher({url: path.getLeaveWork, method: "post", data: body});
}

function deleteLeaveWork(id: number): Promise<ILeaveWork[]> {
  return fetcher({url: path.getLeaveWork + "/" + id, method: "delete"});
}

function refuseLeaveWork(
  body: IRefuseLeaveWorkBody
): Promise<ILeaveWorkResponse> {
  return fetcher({
    url: path.getLeaveWork + "/" + body.id + "/refuse",
    method: "put",
    data: {reasonRefuse: body.refuseReason},
  });
}

function approvalLeaveWork(id: number): Promise<ILeaveWork[]> {
  return fetcher({
    url: path.getLeaveWork + "/" + id + "/approval",
    method: "put",
  });
}

export default {
  getLeaveWork,
  getDaysAllowedLeave,
  createLeaveWork,
  deleteLeaveWork,
  refuseLeaveWork,
  approvalLeaveWork,
};
