## webpack으로 번들링 적용 전/후 차이

1. request 요청 횟수 감소 (17회 -> 1회) \*17은 프로젝트에서 사용하는 모듈 개수
2. DOMContentLoaded, Load 5초 감소 (10초 -> 5초)

## 구현 전 가정

- 지폐를 잔돈으로 반환하는 경우는 없다. 잔돈은 항상 현재 유통되는 500, 100, 50, 10원을 이용해 반환된다.
  - 그렇기에, 자판기에 동전을 충전할 때도 10원 단위로만 충전이 가능하다.
- 자판기에 돈이 부족할 경우, 반환할 수 있는 돈만 반환되니 유의해야한다.
- 상품명은 공백으로 인한 혼동을 줄이기 위해, 양 끝 공백을 제거해 입력된다.
- 상품을 구매한 후, 재고가 없을 경우 구매할 수 있는 상품 현황에서 제거된다.
- 사용자가 투입한 돈으로 상품을 구매하면서 생기는 돈은 [잔돈충전]에서 관리하는 자판기 보유 동전과 독립적으로 관리한다.
- 이미 추가된 상품은 또 다시 추가할 수 없다.(이후 생길 상품수정 기능으로 수정하면 된다. 상품이 많아지면 찾는 게 어려우니까 검색기능도 추가해야할 거 같다)

## 기능 목록

- [x] 첫 화면은 상품 관리탭, 잔돈 충전탭, 상품 구매탭만 보인다.
- [x] 상품 관리탭을 클릭하면, 상품 추가할 수 있는 폼, 상품 현황을 볼 수 있다.
- [x] 상품 관리에서 상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.
  - [x] `조건` 상품 가격은 100원 이상, 10원으로 나누어 떨어져야 한다.
  - [x] 추가한 상품을 상품 현황에서 바로 확인할 수 있다.
- [x] 잔돈 충전탭을 클릭하면, 자판기 동전을 충전할 수 있는 폼, 보유 금액, 보유한 동전 개수를 확인할 수 있다.
- [x] 잔돈 충전에서 `충전하기` 버튼을 클릭하면 자판기 보유 금액을 충전할 수 있다.
  - [x] 충전된 금액만큼 무작위로 동전이 생성되어, 기존 동전에 더해진다.
  - [x] `예외` 음수는 올 수 없고, 10원 이상부터 충전할 수 있다.
- [x] 상품 구매탭을 클릭하면, 금액 투입하는 폼, 투입한 금액, 구매할 수 있는 상품현황, 반환된 잔돈 개수를 볼 수 있다.
- [x] 상품 구매에서 `투입하기`버튼을 클릭하면, 입력된 금액이 투입된다.
  - [x] `조건` 10원으로 나누어 떨어지는 금액만 투입할 수 있다.
  - [x] `조건` 누적으로 투입할 수 있다.
- [x] 상품 구매에서 `구매하기` 버튼을 클릭하면, 상품을 구매할 수 있다.
  - [x] `예외` 투입한 금액보다 큰 경우에는 구매할 수 없다.
- [x] 상품 구매에서 `반환하기`버튼을 클릭하면 잔돈을 반환받을 수 있다.
  - [x] `조건` 현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.
  - [x] `예외` 잔돈을 반환할 수 없는 경우(자판기에 돈이 없을경우..등), 반환할 수 있는 금액만 반환한다.

### 추가 작업 목록

- [ ] 테스트 코드 작성(현재 테스트 코드는 아주 기본만 체크해서, 수정하고 추가해서 작성하기)
- [x] [잔돈충전] 충전된 금액만큼 무작위로 동전 생성되는 함수(generateCoinRandomly), 연산량 줄이도록 리팩토링
- [x] [상품관리] 추가된 상품 삭제 가능
- [ ] [상품관리] 추가된 상품 수정 가능
- [ ] 스타일 작업하기
- [ ] [상품관리] 이미 추가된 상품 중복 불가
- [ ] [상품관리] 추가된 상품 검색 기능
