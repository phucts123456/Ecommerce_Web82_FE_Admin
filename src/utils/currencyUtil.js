const toVndString = (price) => {
    if (!price) return '0 VND';
    //const formatPrice = new Intl.NumberFormat().format(price);
    //return formatPrice;
    return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export {
    toVndString
}