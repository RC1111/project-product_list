//Round to two decimal places.
function roundtwodecimal(x) {
  return Number.parseFloat(x).toFixed(2);
}

// ======================EBAY======================================
//create a function for which radio button selected will be returned.
function checkedfees() {
  if (document.getElementById("eBayFifteen").checked) {
    return document.getElementById("eBayFifteen").value;
  } else if (document.getElementById("eBayTwelve").checked) {
    return document.getElementById("eBayTwelve").value;
  } else document.getElementById("eBayTen").checked;
  return document.getElementById("eBayTen").value;
}
//Paypal fees radio button.
function paypfees() {
  if (document.getElementById("paypalStandardFees").check) {
    return document.getElementById("paypalStandardFees").value;
  } else {
    return document.getElementById("paypalStandardFees").value;
  }
}
//create a function to calculate and display the total profit for eBay.
function Calculate() {
  //create variables for each value. (Sale price, Shipping price, etc.)
  var SaleP = document.getElementById("SalePrice").value;
  var ShipP = document.getElementById("ShippingPrice").value;
  var ProductC = document.getElementById("ProductCost").value;
  var ShippingC = document.getElementById("ShippingCost").value;
  var fees = +SaleP * checkedfees();
  var payfees = +SaleP * paypfees();
  var Revenue = +SaleP + +ShipP;
  var Expense = +ProductC + +ShippingC + +fees + payfees + 0.3;
  var TotalProfit = +Revenue - +Expense;

  document.getElementById("ebay_profit").innerHTML =
    "$" + roundtwodecimal(TotalProfit);
  console.log(SaleP);
  console.log(ShipP);
  console.log(ProductC);
  console.log(ShippingC);
  console.log(fees);
  console.log(payfees);
  console.log(TotalProfit);
}
// ===========================AMAZON===================================

//this function displays Amazonfees onkey pressed.
var inputBox = document.getElementById("SalePriceAMZ");
var amazonfees = 0.15;
inputBox.onkeyup = function amazonF() {
  document.getElementById("printamzfee").innerHTML =
    "$" + roundtwodecimal(inputBox.value * 0.15);
};
//FBA price based on what user clicks.
function fbaFees() {
  if (document.getElementById("large2Fees").checked) {
    return document.getElementById("large2Fees").value;
  } else if (document.getElementById("largeFees").checked) {
    return document.getElementById("largeFees").value;
  } else document.getElementById("standardFees").checked;
  return document.getElementById("standardFees").value;
}

//create a function to calculate and display the total profit for Amazon.
function CalculateAMZ() {
  //create variables for each value. (Sale price, Shipping price, etc.)
  var amazonfee = 0.15;
  var SaleP = document.getElementById("SalePriceAMZ").value;
  var ShipP = document.getElementById("ShippingPriceAMZ").value;
  var ProductC = document.getElementById("ProductCostAMZ").value;
  var ShippingC = document.getElementById("ShippingCostAMZ").value;
  var sellingFees = +SaleP * amazonfee;
  var FBAfees = +fbaFees();
  var Revenue = +SaleP + +ShipP;
  var Expense = +ProductC + +ShippingC + +sellingFees + FBAfees;
  var TotalProfit = +Revenue - +Expense;

  document.getElementById("profitAMZ").innerHTML =
    "$" + roundtwodecimal(TotalProfit);
}

// CALCULATOR
