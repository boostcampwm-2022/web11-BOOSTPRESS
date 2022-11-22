export const dateToStrMMDD = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const dateToStrYYYYMMDD = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
