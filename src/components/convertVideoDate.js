function convertVideoDate(date) {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = new Date(date);
  const day = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  const fullDate = `${day} ${monthArr[month]} ${year}`;

  return fullDate;
}

export default convertVideoDate;
