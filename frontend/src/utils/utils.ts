export const dateToStr = (date: Date, changeType: 'MMDD' | 'YYYYMMDD') => {
    switch (changeType) {
        case 'MMDD':
            return `${date.getMonth() + 1}/${date.getDate()}`;
        case 'YYYYMMDD':
            return `${date.getFullYear()}/${
                date.getMonth() + 1
            }/${date.getDate()}`;
        default:
            break;
    }
};
