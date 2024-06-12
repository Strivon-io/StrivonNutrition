import api from "~services/api";
import { DayEvents } from "~services/types/dayEvents.types";

export const getDayEvents = async (date: Date): Promise<DayEvents> => {
  const response = await api.get(`http://localhost:8000/day-events`, {
    params: { date },
  });
  return response.data;
};
