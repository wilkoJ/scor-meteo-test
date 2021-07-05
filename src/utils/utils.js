const utils = (() => {
  const formatStringDate = (value) => {
    if (value <= 9) return "0" + value;
    else return "1" + value;
  };
  const checkLocalStorage = (city) => {
    if (localStorage.getItem(city)) {
      const date = new Date(localStorage.getItem(city + "Date"));
      if ((Date.now() - date.getTime()) / 60 / 60 / 1000 > 1)
        localStorage.clear();
    }
  };
  return { formatStringDate, checkLocalStorage };
})();

export default utils;
