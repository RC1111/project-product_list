// Item Class: Represents an Item
class Product {
  constructor(item, marketPrice, cost, profit, source) {
    this.item = item;
    this.marketPrice = marketPrice;
    this.cost = cost;
    this.profit = profit;
    this.source = source;
  }
}
// UI Class: Handle UI Tasks
class UI {
  static displayItems() {
    const products = Store.getProducts();

    products.forEach(product => UI.addProductToList(product));
  }

  static addProductToList(product) {
    const list = document.querySelector("#product-list");
    const row = document.createElement("tr");

    row.innerHTML = ` 
      <td>${product.item}</td>
      <td class="text-center">$ ${product.marketPrice}</td>
      <td>$ ${product.cost}</td>
      <td>$ ${product.profit}</td> 
      <td> ${product.source}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteProduct(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#product-form");
    container.insertBefore(div, form);

    //
    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }

  static clearFields() {
    document.querySelector("#item").value = "";
    document.querySelector("#marketPrice").value = "";
    document.querySelector("#cost").value = "";
    document.querySelector("#profit").value = "";
    document.querySelector("#source").value = "";
  }
}
// Store Class: Handles Storage (LOCAL STORAGE)

class Store {
  static getProducts() {
    let products;
    if (localStorage.getItem("products") === null) {
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem("products"));
    }
    return products;
  }

  static addProduct(product) {
    const products = Store.getProducts();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  }
  static removeProduct(source) {
    const products = Store.getProducts();
    products.forEach((product, index) => {
      if (product.source === source) {
        products.splice(index, 1);
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
}

//

// Event: Display an Item
document.addEventListener("DOMContentLoaded", UI.displayItems);
// Event: Add an Item
document.querySelector("#product-form").addEventListener("submit", e => {
  // Event: Get form values
  e.preventDefault();
  const item = document.querySelector("#item").value;
  const marketPrice = document.querySelector("#marketPrice").value;
  const cost = document.querySelector("#cost").value;
  const profit = document.querySelector("#profit").value;
  const source = document.querySelector("#source").value;

  //Validate
  if (
    item == "" ||
    marketPrice == "" ||
    cost == "" ||
    profit == "" ||
    source == ""
  ) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate Product
    const product = new Product(item, marketPrice, cost, profit, source);

    //  add Item to UI
    UI.addProductToList(product);
    //   Add item to store
    Store.addProduct(product);

    //   Show success message
    UI.showAlert("Item Added", "success");

    //   Clear Fields
    UI.clearFields();
  }
});

// Event: Calculate and display product

// Clear Fields
// Event: Remove an Item

document.querySelector("#product-list").addEventListener("click", e => {
  UI.deleteProduct(e.target);
  //   Remove book from Local Storage
  Store.removeProduct(
    e.target.parentElement.previousElementSibling.textContent
  );

  UI.showAlert("Item removed", "success");
  //   Remove book from Local Storage
});
