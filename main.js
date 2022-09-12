const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const submitForm = document.querySelector("form");
const forError = document.getElementById("forError");
const itemsElm = document.getElementById("items");

let products = [];
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { productNameValue, productPriceValue } = getUserValue();

  // User Data Validation
  const error = userDataValidation(productNameValue, productNameValue);
  // reseting form data
  resetFormData();
  const id = products.length;
  if (!error) {
    // Adding Data to source

    products.push({
      id: id,
      product: productNameValue,
      price: productPriceValue,
    });
    // Adding Item to the UI
    addingItemToTheUI(id, productNameValue, productPriceValue);
  }
});

itemsElm.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    const id = productId(e.target);
    // Remove from ui
    document.querySelector(`.item-${id}`).remove();
    // Remove from array
    const restOfThePd = products.filter((product) => product.id !== id);
    products = restOfThePd;
  }
});

const productId = (elm) => {
  const pelm = elm.parentElement.parentElement.parentElement;
  return Number(pelm.classList[0].split("-")[1]);
};

const getUserValue = () => {
  const productNameValue = productName.value;
  const productPriceValue = productPrice.value;
  return { productNameValue, productPriceValue };
};

const userDataValidation = (nameValue, priceValue) => {
  let error = false;
  if (nameValue.length < 4) {
    alert("Product name should be more then 4 charecter");
    error = true;
    if (priceValue <= 0) {
      alert("Invalid Price");
      error = true;
    }

    return error;
  }
};

const resetFormData = () => {
  productName.value = "";
  productPrice.value = "";
};

const addingItemToTheUI = (id, pdName, pdPrice) => {
  const listElement = `
  <li class="item-${id} rounded shadow-lg py-4 px-4 border-2 border-gray-100 my-1">
            <div class="flex justify-between">
              <div class="flex">
                <h2 class="text-bold">${pdName}</h2>
                <h2 class="ml-2">$${pdPrice}</h2>
              </div>

              <div>
                <i class="fa-sharp fa-solid fa-trash delete-item"></i>
              </div>
            </div>
          </li>
    `;

  itemsElm.insertAdjacentHTML("afterbegin", listElement);
};
