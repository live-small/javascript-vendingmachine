const CoinChargeView = (coinTohave, coinData) => `
	<div class="coin-charge-form">
		<h2>자판기 동전 충전하기</h2>
		<input type="number" id="vending-machine-charge-input" />
		<button type="button" id="vending-machine-charge-button">충전하기</button>
		<h3>보유 금액: 
			<span id="vending-machine-charge-amount">${coinTohave}</span>	
		</h3>
	</div>
	<div class="coin-current-status">
		<table>
			<tr>
				<th>동전</th>
				<th>개수</th>
			</tr>
			<tr>
				<td>500원</td>
				<td id="vending-machine-coin-500-quantity">${coinData[500]}개</td>
			</tr>
			<tr>
				<td>100원</td>
				<td id="vending-machine-coin-100-quantity">${coinData[100]}개</td>
			</tr>
			<tr>
				<td>50원</td>
				<td id="vending-machine-coin-50-quantity">${coinData[50]}개</td>
			</tr>
			<tr>
				<td>10원</td>
				<td id="vending-machine-coin-10-quantity">${coinData[10]}개</td>
			</tr>
		</table>
	</div>
	`;

export default CoinChargeView;
