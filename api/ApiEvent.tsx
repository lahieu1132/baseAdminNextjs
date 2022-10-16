import {fetcher} from "./Fetcher";
import {IEvent} from "../types";

export interface IEventBody {
  startDate?: string;
  endDate?: string;
  title?: string;
  content?: string;
}

const path = {
  getEvent: "event",
};

function getEvent(): Promise<IEvent[]> {
  return fetcher({url: path.getEvent, method: "get"});
}

function createEvent(body?: IEventBody): Promise<IEvent[]> {
  return fetcher({url: path.getEvent, method: "post", data: body});
}

function deleteEvent(id: number): Promise<IEvent[]> {
  return fetcher({url: path.getEvent + "/" + id, method: "delete"});
}

export default {
  getEvent,
  createEvent,
  deleteEvent,
};
