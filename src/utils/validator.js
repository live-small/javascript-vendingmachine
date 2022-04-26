const isEmptyValue = value => !value;

const isValidProductPrice = price => price >= 100 && price % 10 === 0;

const isTenUnit = price => price % 10 === 0;

const isNegative = number => number < 0;

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

export const isValidCoinInput = coinToInput => {
    if (isEmptyValue(Number(coinToInput))) {
        return alert(`충전할 돈을 입력해주세요`);
    }
    if (isNegative(Number(coinToInput))) {
        return alert(`음수는 입력할 수 없습니다. 10원 이상부터 충전할 수 있습니다.`);
    }
    if (!isTenUnit(coinToInput)) {
        return alert(`돈은 10원 단위로만 입력할 수 있습니다`);
    }
    return true;
};
