export const findDayOnWeek = (
  year: number | string,
  month: number | string,
  day: number | string
): string => {
  let dayName = "";
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  const dateString = year + "-" + month + "-" + day;
  const date = new Date(dateString);
  const currentDay = date.getDay();
  switch (currentDay) {
    case 0:
      dayName = "Chủ nhật";
      break;
    case 1:
      dayName = "Thứ hai";
      break;
    case 2:
      dayName = "Thứ ba";
      break;
    case 3:
      dayName = "Thứ tư";
      break;
    case 4:
      dayName = "Thứ năm";
      break;
    case 5:
      dayName = "Thứ sáu";
      break;
    case 6:
      dayName = "Thứ bảy";
      break;
    default:
      break;
  }
  return dayName;
};
