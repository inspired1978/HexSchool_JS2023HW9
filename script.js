// 請代入自己的網址路徑
const api_path = "inspired1978";
const token = "hB97r4YBYiSU3hy7SOPPT28KwEH3";

// 取得產品列表
let productData = [];
const productList = document.querySelector('.productWrap');

function getProductList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`).
    then(function (response) {
      // console.log(response.data);
      productData = response.data.products;
      renderProductList();
      console.log(productData);
    })
    .catch(function(error){
      console.log(error.response.data)
    })
}

getProductList();

function renderProductList() {
  let str = "";
  productData.forEach(function(item) {
    str += `<li class="productCard">
      <h4 class="productType">新品</h4>
      <img src=${item.images} alt="">
      <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
      <h3>${item.title}</h3>
      <del class="originPrice">NT$${item.origin_price}</del>
      <p class="nowPrice">NT$${item.price}</p>
  </li>`;
  }) 
  productList.innerHTML = str;
}


// 加入購物車
function addCartItem(id) {
  axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`, {
    data: {
      "productId": id,
      "quantity": 1
    }
  }).
    then(function (response) {
      console.log(response.data);
      getCartList();
    })

}

productList.addEventListener('click', function(e) {
  const addCartList = e.target.getAttribute("class");
  if (addCartList != "addCardBtn") {
    return;
  }

  // console.log(e.target.getAttribute("data-id"));
  const productId = e.target.getAttribute("data-id");

  addCartItem(productId);

})



// 取得購物車列表
let cartData = [];
const cartList = document.querySelector('.shoppingCart-table');

function getCartList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`).
    then(function (response) {
      // console.log(response.data);
      cartData = response.data.carts;
      renderCartList();
    })
}

getCartList();

function renderCartList() {
  let str = "";

  str += `                
        <tr>
        <th width="40%">品項</th>
        <th width="15%">單價</th>
        <th width="15%">數量</th>
        <th width="15%">金額</th>
        <th width="15%"></th>
        </tr>
        `;

  cartData.forEach(function(item) {
    str += `
          <tr>
          <td>
              <div class="cardItem-title">
                  <img src="${item.product.images}" alt="">
                  <p> ${item.product.title} </p>
              </div>
          </td>
          <td>NT$${item.product.origin_price}</td>
          <td>${item.quantity}</td>
          <td>NT$${item.product.price}</td>
          <td class="discardBtn">
              <a href="#" class="material-icons">
                  clear
              </a>
          </td>
      </tr>    
           `;
  })

  str += `
        <tr>
        <td>
            <a href="#" class="discardAllBtn">刪除所有品項</a>
        </td>
        <td></td>
        <td></td>
        <td>
            <p>總金額</p>
        </td>
        <td></td>
        </tr>`;

  cartList.innerHTML = str;

}


// 清除購物車內全部產品
function deleteAllCartList() {
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`).
    then(function (response) {
      console.log(response.data);
      getCartList();
    })
}

const deleteAllCartBtn = document.querySelector('.shoppingCart-table');

deleteAllCartBtn.addEventListener('click', function(e) {
  console.log(e.target.getAttribute("class"));
  deleteAllCartList();
})


// 刪除購物車內特定產品
function deleteCartItem(cartId) {
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${cartId}`).
    then(function (response) {
      console.log(response.data);
    })
}

// 送出購買訂單
function createOrder() {

  axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
    {
      "data": {
        "user": {
          "name": "六角學院",
          "tel": "07-5313506",
          "email": "hexschool@hexschool.com",
          "address": "高雄市六角學院路",
          "payment": "Apple Pay"
        }
      }
    }
  ).
    then(function (response) {
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error.response.data);
    })
}

// 取得訂單列表
function getOrderList() {
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
    {
      headers: {
        'Authorization': token
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
}

// 修改訂單狀態

function editOrderList(orderId) {
  axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
    {
      "data": {
        "id": orderId,
        "paid": true
      }
    },
    {
      headers: {
        'Authorization': token
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
}

// 刪除全部訂單
function deleteAllOrder() {
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
    {
      headers: {
        'Authorization': token
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
}

// 刪除特定訂單
function deleteOrderItem(orderId) {
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${orderId}`,
    {
      headers: {
        'Authorization': token
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
}

