/// <reference types="Cypress" />

describe("구현 결과가 요구사항과 일치해야 한다.", () => {
    const baseUrl = "../index.html"; // cy.visit()에 이용하는게 best ! <= https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl
    const SELECTOR = {
        COIN_MENU: "#vending-machine-manage-menu",
        COIN_CHARGE_INPUT: "#vending-machine-charge-input",
        COIN_CHARGE_BUTTON: "#vending-machine-charge-button",
        COIN_500: "#vending-machine-coin-500-quantity",
        COIN_100: "#vending-machine-coin-100-quantity",
        COIN_50: "#vending-machine-coin-50-quantity",
        COIN_10: "#vending-machine-coin-10-quantity",
        PRODUCT_MENU: "#product-add-menu",
        PRODUCT_NAME_INPUT: "#product-name-input",
        PRODUCT_PRICE_INPUT: "#product-price-input",
        PRODUCT_QUANTITY_INPUT: "#product-quantity-input",
        PRODUCT_ADD_BUTTON: "#product-add-button",
        PURCHASE_MENU: "#product-purchase-menu",
        PURCHASE_CHARGE_INPUT: "#charge-input",
        PURCHASE_CHARGE_AMOUNT: "#charge-amount",
        PURCHASE_CHARGE_BUTTON: "#charge-button",
        PURCHASE_ITEM_BUTTON: ".purchase-button",
        PURCHASE_ITEM_QUANTITY: ".product-purchase-quantity",
    };

    before(() => {
        Cypress.Commands.add("stubRandomReturns", (returnValues = []) => {
            const randomStub = cy.stub();

            returnValues.forEach((value, index) => {
                randomStub.onCall(index).returns(value); // Q. 이렇게 만드는 이유가 뭐지? 그냥 value를 리턴하면 안되나?
            });

            cy.visit(baseUrl, {
                onBeforeLoad: window => {
                    // onBeforeLoad : 페이지에 필요한 자원을 받아오기 전에, 가능한 빨리 호출됨
                    window.MissionUtils = {
                        // windows에 custom property로 세팅해서 이용함
                        Random: {
                            pickNumberInList: randomStub,
                            // 실제 MissionUtils 무작위로 나오기에 테스트 할 수가 없다. 그래서 테스트할 수 있는 MissionUtils를 만들어서 이용
                        },
                    };
                },
            });
        });

        Cypress.Commands.add("addProduct", (name, price, quantity) => {
            cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(name);
            cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(price);
            cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(quantity);
            cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
        });
    });

    beforeEach(() => {
        cy.stubRandomReturns([100, 100, 100, 100, 50]);
    });
    // Q. before과 뭐가 다르지?
    // before: 최초 1번만 실행
    // beforeEach: 테스트(it())가 실행되기 전마다 실행
    // Q. 언제 beforEach를 쓰지?
    // -> before로 1,2번째 테스트에서 공통으로 시작하는 페이지를 설정했지만, 첫번째 테스트에서 페이지이동 시, 그대로 남게된다 -> 그럴 때, beforeEach로 세팅해두면 되는 것 !
    // 참고: https://simian114.gitbook.io/blog/undefined/cypress/before-beforeeach

    // Q. 근데, 왜 랜덤으로 돈 생성하는게 테스트 실행되기 전마다 실행해야하지? 잔돈충전에서만 이용하면 되지 않나?

    it("상품 1개를 구매할 수 있어야 한다.", () => {
        // given
        const name = "콜라";
        const price = 1500;
        const quantity = 20;
        const coinAmount = 450;
        const chargeAmount = 3000;

        // 상품 추가
        cy.get(SELECTOR.PRODUCT_MENU).click();
        cy.addProduct(name, price, quantity);
        cy.addProduct("사이다", 1000, 10);

        // 잔돈 충전
        cy.get(SELECTOR.COIN_MENU).click();
        cy.get(SELECTOR.COIN_CHARGE_INPUT).type(coinAmount);
        cy.get(SELECTOR.COIN_CHARGE_BUTTON).click(); // 이때, before에서 설정해둔 window.missionUtils를 이용하게 됨

        // 금액 투입
        cy.get(SELECTOR.PURCHASE_MENU).click();
        cy.get(SELECTOR.PURCHASE_CHARGE_INPUT).type(chargeAmount);
        cy.get(SELECTOR.PURCHASE_CHARGE_BUTTON).click();

        // when
        cy.get("[data-product-name='콜라']").parent().find(SELECTOR.PURCHASE_ITEM_BUTTON).click();
        // dataset의 input.value랑 동일해서 dataset을 써야할 필요성을 못 느꼈는데, class가 여러개일 때 dataset의 value는 고유하니 식별자로 쓸 수 있군

        // then
        cy.get(SELECTOR.PURCHASE_CHARGE_AMOUNT).should("have.text", chargeAmount - price);
        cy.get("[data-product-name='콜라']")
            .parent()
            .find(SELECTOR.PURCHASE_ITEM_QUANTITY)
            .should("have.text", quantity - 1);
        cy.get(SELECTOR.COIN_MENU).click();
        cy.get(SELECTOR.COIN_100).should("have.text", "4개");
        cy.get(SELECTOR.COIN_50).should("have.text", "1개");
        // 반환하기 버튼을 안눌렀는데, 이걸 왜 구매한 뒤에 체크하는거지? 잔돈충전하고 잘 렌더링됐는지 확인해야하는게 좋지 않을까?
    });

    it("잘못된 입력값으로 잔돈 충전을 시도하는 경우 alert이 호출되어야 한다.", () => {
        // given
        const alertStub = cy.stub();
        const invalidInput = -1;
        // 음수 && 10원 단위가 아닌 것 -> 10원 단위체크할 때 걸릴 수도 있음.
        // 음수 체크 테스트 필요 ** 10의 단위인데 음수인 값(-10) 테스트도 추가해야겠다

        cy.on("window:alert", alertStub);

        // when
        cy.get(SELECTOR.COIN_MENU).click();
        cy.get(SELECTOR.COIN_CHARGE_INPUT).type(invalidInput);

        // then
        cy.get(SELECTOR.COIN_CHARGE_BUTTON)
            .click()
            .then(() => {
                expect(alertStub).to.be.called;
            });
    });
});
