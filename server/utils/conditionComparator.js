function conditionComparator(conditionArray, currentTime) {
  return conditionArray
    .filter(({ time }) => {
      const itemDate = new Date(time);
      const currentDate = new Date(currentTime);
      const differenceInTime = currentDate.getTime() - itemDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return !(differenceInDays <= 7);
    })
    .map((item) => item.ean);
}

module.exports = conditionComparator;
