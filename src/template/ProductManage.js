const ProductManageView = products => `
	<div class="add-menu-form">
		<h3>상품 추가하기</h3>
		<input type="text" id="product-name-input" />
		<input type="text" id="product-price-input" />
		<input type="text" id="product-quantity-input" />
		<button id="product-add-button">추가하기</button>
	</div>
	<div class="product-current-status">
		<h3>상품현황</h3>
		<table>
			<tr>
				<th>상품명</th>
				<th>가격</th>
				<th>수량</th>
			</tr>
			${products.map(product => {
                const { name, price, quantity } = product;
                return `
				<tr class="product-manage-item">
					<td class="product-manage-name">${name}</td>
					<td class="product-manage-price">${price}</td>
					<td class="product-manage-quantity">${quantity}</td>
				</tr>
				`;
            })}
		</table>
	</div>
	`;

export default ProductManageView;
