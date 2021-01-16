import {FilterType} from "../utils/util";
import {isEventPast, isEventFuture} from "./time";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.startEvent)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.startEvent))
};
