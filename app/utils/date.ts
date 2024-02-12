import { format } from "date-fns";

import { capitalized } from "~utils/capitalize";

export const formatRecipeDate = (date: string): string => {
  const formattedDate = format(new Date(date), "EEEE dd MMMM yyyy", {
    locale: require("date-fns/locale/fr"),
  });
  const capitalizedDay = capitalized(formattedDate.split(" ")[0]);
  return `${capitalizedDay}${formattedDate.slice(formattedDate.indexOf(" "))}`;
};
