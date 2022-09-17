(function () {
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const submitForm = document.querySelector("form");
  const forError = document.getElementById("forError");
  const itemsElm = document.getElementById("items");
  const search = document.querySelector("#filter");
  const addProudctButton = document.querySelector(".add-product");
  const updateButton = document.querySelector(".update-button");

  let products = [];

  let updatedItemID;

  // Form Data Collect
  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { productNameValue, productPriceValue } = getUserValue();

    // User Data Validation
    const error = userDataValidation(productNameValue, productNameValue);
    // reseting form data
    resetFormData();
    const id = products.length;
    if (!error) {
      const uploadProduct = {
        id: id,
        name: productNameValue,
        price: productPriceValue,
      };
      // Adding Data to source

      products.push(uploadProduct);
      // Adding Item to the UI
      addingItemToTheUI(id, productNameValue, productPriceValue);
      addToLocalStorage(uploadProduct);
    }
  });
  // Delete Item from UI
  itemsElm.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-item")) {
      updatedItemID = productId(e.target);
      // Remove from ui
      document.querySelector(`.item-${updatedItemID}`).remove();
      // Remove from array
      const restOfThePd = products.filter(
        (product) => product.id !== updatedItemID
      );
      products = restOfThePd;

      // Remove from LocalStorage
      removeFromStorage(updatedItemID);
    } else if (e.target.classList.contains("edit-item")) {
      updatedItemID = productId(e.target);
      const foundpd = products.find((product) => product.id === updatedItemID);
      populateUiToState(foundpd);
      if (!document.querySelector(".update-button")) {
        showUpdateButton();
      }

      // Update button click
      updateButton.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-item")) {
          const { productNameValue, productPriceValue } = getUserValue();
          products = products.map((product) => {
            if (product.id === updatedItemID) {
              return {
                id: product.id,
                name: productNameValue,
                price: productPriceValue,
              };
            } else {
              return product;
            }
          });
        }
        resetFormData();
        addingItemsUI(products);
      });
    }
  });

  // SHowing update button
  const showUpdateButton = () => {
    const buttonElm = ` <button
        type="button"
        class="update-button px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Update
      </button>`;
    addProudctButton.style.display = "none";
    submitForm.insertAdjacentHTML("beforeend", buttonElm);
  };
  const populateUiToState = (product) => {
    productName.value = product.name;
    productPrice.value = product.price;
  };

  search.addEventListener("keyup", (e) => {
    const value = e.target.value;
    const filterdProduct = products.filter((product) =>
      product.name.includes(value)
    );

    filterdProduct.forEach((product) => {
      addingItemsUI(product);
    });
  });

  // Adding items to the ui
  const addingItemsUI = (product) => {
    itemsElm.innerHTML = "";
    {
      product.map((item) => {
        const listElement = `     
 <li class="item-${item.id} rounded shadow-lg py-4 px-4 border-2 border-gray-100 my-1">
           <div class="flex justify-between">
             <div class="flex">
               <h2 class="text-bold">${item.name}</h2>
               <h2 class="ml-2">$${item.price}</h2>
             </div>

             <div>
               <i class="fa-sharp fa-solid fa-trash delete-item mr-4 cursor-pointer"></i>
               <i class="update-icon fa-solid fa-pen-to-square ml-4 edit-item cursor-pointer"></i>

             </div>
           </div>
         </li>
   `;
        itemsElm.insertAdjacentHTML("afterbegin", listElement);
      });
    }
  };

  // Getting the ID from class
  const productId = (elm) => {
    const pelm = elm.parentElement.parentElement.parentElement;
    return Number(pelm.classList[0].split("-")[1]);
  };
  // Getting the form value
  const getUserValue = () => {
    const productNameValue = productName.value;
    const productPriceValue = productPrice.value;
    return { productNameValue, productPriceValue };
  };

  // Validate the user data
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

  // Reset form data
  const resetFormData = () => {
    productName.value = "";
    productPrice.value = "";
  };

  // Adding Item to the ui
  const addingItemToTheUI = (id, pdName, pdPrice) => {
    const listElement = `
  <li class="item-${id} rounded shadow-lg py-4 px-4 border-2 border-gray-100 my-1">
            <div class="flex justify-between">
              <div class="flex">
                <h2 class="text-bold">${pdName}</h2>
                <h2 class="ml-2">$${pdPrice}</h2>
              </div>

              <div>
                <i class="fa-sharp fa-solid fa-trash delete-item cursor-pointer mr-4"></i>
                <i class="update-icon fa-solid fa-pen-to-square ml-4 cursor-pointer"></i>
                </div>
            </div>
          </li>
    `;

    itemsElm.insertAdjacentHTML("afterbegin", listElement);
  };

  // Add our product to the localstorage
  const addToLocalStorage = (product) => {
    let products;
    if (localStorage.getItem("allproducts")) {
      products = JSON.parse(localStorage.getItem("allproducts"));
      products.push(product);
      localStorage.setItem("allproducts", JSON.stringify(products));
    } else {
      let products = [];
      products.push(product);
      localStorage.setItem("allproducts", JSON.stringify(products));
    }
  };

  // Load All Prouduct After page reload
  document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("allproducts")) {
      products = JSON.parse(localStorage.getItem("allproducts"));
      addingItemsUI(products);
    }
  });

  // Remove item from LocalStorage
  const removeFromStorage = (id) => {
    const products = JSON.parse(localStorage.getItem("allproducts"));
    const restOfThePd = products.filter((product) => product.id !== id);
    localStorage.setItem("allproducts", JSON.stringify(restOfThePd));
  };
})();
