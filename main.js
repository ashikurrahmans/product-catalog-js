const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const submitForm = document.querySelector("form");
const forError = document.getElementById("forError");
const itemsElm = document.getElementById("items");

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { productNameValue, productPriceValue } = getUserValue();

  // User Data Validation
  userDataValidation(productNameValue, productNameValue);
  // reseting form data
  resetFormData();

  // Adding Item to the UI

  addingItemToTheUI(productNameValue, productPriceValue);
});

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
  (productName.value = ""), (productPrice.value = "");
};

const addingItemToTheUI = (pdName, pdPrice) => {
  const listElement = `
    <li class="flex justify-between rounded shadow-lg py-4 px-4 border-2 border-gray-100"
          >
            <div class="flex">
              <h2 class="text-bold">${pdName}</h2>
              <h2 class="ml-2">$${pdPrice}</h2>
          
            <div>
            <i class="fa-sharp fa-solid fa-trash"></i>
            </div>
          </li>
    `;

  itemsElm.insertAdjacentHTML("afterbegin", listElement);
};
