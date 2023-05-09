let list = document.querySelectorAll("ul li");
let content = Array.from(document.querySelectorAll(".content div"));
// [1] At onclick on list remove all active class from all list
// [2] add class active to this li click
// [3] (.content div) remove all class active from div array
// [4] add active class To div one when tap1 contain active class etc.
list.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Remove All Active Class
    list.forEach((li) => {
      li.classList.remove("active");
      e.currentTarget.classList.add("active");
    });

    content.forEach((div) => {
      div.classList.remove("active");
      document
        .querySelector(e.currentTarget.dataset.num)
        .classList.add("active");
    });
  });
});

//PRICE FUNCTIONS & VARIABLES
//let price = document.getElementById("price-number").textContent;
//price = price.replace(".", "");
let basePrice = 350000;

const partPrices = [0, 0, 0, 0];
function handlePartPrices(value, i) {
  partPrices[i] = value;
  const sum = partPrices.reduce((partialSum, a) => partialSum + a, 0);
  price = sum + basePrice;
  var parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  price = parts.join(".");
  document.getElementById("price-number").innerHTML = price;
}

/*var parts = price.toString().split(".");
parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
price = parts.join(".");*/
