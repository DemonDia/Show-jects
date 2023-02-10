const formatDate = (isoDate) => {
    console.log(isoDate);
    const dateInMS = Date.parse(isoDate);
    // + now.getTimezoneOffset() * 60 * 1000;
    const correctDate = new Date(dateInMS);
    console.log(correctDate);

    const year = correctDate.getFullYear();
    const month = correctDate.getMonth() + 1;
    const day = correctDate.getDay();
    const hours = correctDate.getHours();
    const minutes = correctDate.getMinutes();
    const seconds = correctDate.getSeconds();

    // const [weekday, month, day, year, time] = localStringDate.split(" ");
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export { formatDate };
