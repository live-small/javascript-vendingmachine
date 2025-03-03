const ProductPurchaseView = (products, coinToInsert, coinData) => `
	<div class="insert-coin">
		<h2>금액 투입</h2>
		<input type="number" id="charge-input" placeholder="투입금액"/>
		<button type="button" id="charge-button">투입하기</button>
		<div>
			투입한 금액:
			<span id="charge-amount">${coinToInsert}</span>
		</div>
	</div>
	<br />
	<div class="product-to-buy">
		<h2>구매할 수 있는 상품 현황</h2>
		<table id="product-list">
			<thead>
				<tr>
					<th>상품명</th>
					<th>가격</th>
					<th>수량</th>
					<th>구매</th>
				</tr>
			</thead>
			${products
                .map(
                    ({ name, price, quantity }, key) => `
				<tr class="product-purchase-item" data-product-index=${key}>
					<td class="product-purchase-name" data-product-name=${name}>${name}</td>
					<td class="product-purchase-price" data-product-price=${price}>${price}</td>
					<td class="product-purchase-quantity" data-product-quantity=${quantity}>${quantity}</td>
					<td>
						<button type="button" class="purchase-button">구매하기</button>
					</td>
				</tr>
				`
                )
                .join("")}
		</table>
	</div>
	<br />
	<div class="return-coin">
		<h2>잔돈</h2>
		<button type="button" id="coin-return-button">반환하기</button>
		<table>
			<tr>
				<th>동전</th>
				<th>개수</th>
			</tr>
			<tr>
				<td>500원</td>
				<td id="coin-500-quantity">${coinData[500]}개</td>
			</tr>
			<tr>
				<td>100원</td>
				<td id="coin-100-quantity">${coinData[100]}개</td>
			</tr>
			<tr>
				<td>50원</td>
				<td id="coin-50-quantity">${coinData[50]}개</td>
			</tr>
			<tr>
				<td>10원</td>
				<td id="coin-10-quantity">${coinData[10]}개</td>
			</tr>
		</table>
	</div>
	`;

export default ProductPurchaseView;
