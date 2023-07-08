const ul = document.querySelector("#cupcakes");
let addCupcakeBtn = document.querySelector("#new-cupcake");
const rating = document.querySelector("#rating");
const size = document.querySelector("#size");
const flavor = document.querySelector("#flavor");
const image = document.querySelector("#img");

window.addEventListener("load", getCupcakes);

function list_cupcakes(cupcake) {
  // Create cupcake LI and append to page
  li = document.createElement("li");
  img = document.createElement("img");
  p = document.createElement("p");

  if (cupcake.image === "") {
    img.src =
      "https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg";
  } else {
    img.src = cupcake.image;
  }

  img.width = 200;
  p.append(
    `size: ${cupcake.size} , flavor: ${cupcake.flavor}, rating: ${cupcake.rating}`
  );

  li.append(img, p);

  ul.append(li);
}

async function getCupcakes() {
  // Get cupcakes from server & list
  response = await axios.get("/api/cupcakes");
  data = response["data"]["cupcakes"];

  for (cupcake of data) {
    list_cupcakes(cupcake);
  }
}

async function addCupcake(e) {
  // Post a new cupcake
  e.preventDefault();

  response = await axios.post(
    "/api/cupcakes",
    (data = {
      flavor: flavor.value,
      image: image.value,
      rating: rating.value,
      size: size.value,
    })
  );

  list_cupcakes(response.data["cupcake"]);
  return response;
}

addCupcakeBtn.addEventListener("submit", addCupcake);
