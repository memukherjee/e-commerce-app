const stringToDate = (dateString, formatter) => {
    const date = dateString.split(formatter);
    return new Date(date[2], date[1] - 1, date[0]);
}

export { stringToDate };