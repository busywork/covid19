export const formatNum = str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
