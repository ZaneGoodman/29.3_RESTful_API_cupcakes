const ul = document.querySelector("#cupcakes");
const addCupcakeBtn = document.querySelector("#add-cupcake");
const rating = document.querySelector("#rating").value;
const size = document.querySelector("#size").value;
const flavor = document.querySelector("#flavor").value;

console.log(addCupcakeBtn);
window.addEventListener("load", getCupcakes);

function list_cupcakes(cupcake) {
  li = document.createElement("li");
  img = document.createElement("img");
  p = document.createElement("p");

  img.src = cupcake.image;
  img.width = 200;
  p.append(
    `size: ${cupcake.size} , flavor: ${cupcake.flavor}, rating: ${cupcake.rating}`
  );

  li.append(img, p);
  ul.append(li);
}

async function getCupcakes() {
  response = await axios.get("/api/cupcakes");
  data = response["data"]["cupcakes"];
  for (cupcake of data) {
    list_cupcakes(cupcake);
  }
}

addCupcakeBtn.addEventListener("submit", addCupcake);

async function addCupcake() {
  data = {
    rating: rating,
    size: size,
    flavor: flavor,
  };
  response = await axios.post("/api/cupcakes", data);

  getCupcakes();
  return response;
}
