import "./index.scss";
import React, {useEffect} from "react";
import ApiEvent from "@app/api/ApiEvent";
import {IEvent} from "@app/types";
import {useQuery} from "react-query";
import {EventCalendar} from "@app/module/event/components/EventCalendar";

export function Event(): JSX.Element {
  const getEvent = (): Promise<IEvent[]> => {
    return ApiEvent.getEvent();
  };
  const dataEvent = useQuery("listEvent", getEvent);

  const dataRefetch = (): void => {
    dataEvent.refetch();
  };

  useEffect(() => {
    dataRefetch();
  }, []);

  return (
    <div className="container">
      <EventCalendar dataEvent={dataEvent.data} dataRefetch={dataRefetch} />
    </div>
  );
}
