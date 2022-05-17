const ProductManageView = products => `
	<div class="product-add-form">
		<h3>상품 추가하기</h3>
		<input type="text" id="product-name-input" placeholder="상품명"/>
		<input type="number" id="product-price-input" placeholder="가격"/>
		<input type="number" id="product-quantity-input" placeholder="수량"/>
		<button id="product-add-button">추가하기</button>
	</div>
	<div class="product-current-status">
		<h3>상품현황</h3>
		<table id="product-manage-list">
			<thead>
				<tr>
					<th>상품명</th>
					<th>가격</th>
					<th>수량</th>
					<th>삭제</th>
				</tr>
			</thead>
			${products
                .map(
                    ({ name, price, quantity }, key) =>
                        `
					<tr class="product-manage-item" data-product-manage-key="${key}">
						<td class="product-manage-name">${name}</td>
						<td class="product-manage-price">${price}</td>
						<td class="product-manage-quantity">${quantity}</td>
						<td>
							<button id="product-delete-button" type="button">삭제하기</button>
						</td>
					</tr>
				 `
                )
                .join("")}
			
		</table>
	</div>
	`;

export default ProductManageView;
