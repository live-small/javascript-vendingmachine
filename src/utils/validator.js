const isEmptyValue = value => !value;

const isValidProductPrice = price => price >= 100 && price % 10 === 0;

export const isValidProduct = ({ name, price, quantity }) => {
    if (isEmptyValue(name)) {
        return alert(`상품명을 입력해주세요`);
    }
    if (isEmptyValue(Number(price))) {
        return alert(`가격을 입력해주세요`);
    }
    if (isEmptyValue(Number(quantity))) {
        return alert(`수량을 입력해주세요`);
    }

    if (!isValidProductPrice(Number(price))) {
        return alert(`가격은 100원부터 시작하고, 10원 단위로만 입력할 수 있습니다`);
    }

    return true;
};
