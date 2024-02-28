const myFunction = async (defaultName = 13) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${defaultName}`
  );
  const data = await res.json();
  const phones = data.data;
  displayShow(phones);
};

const displayShow = (products) => {
  // Step No.1 get a card-container
  const cardContainer = document.getElementById("card-container");

  // Clear Container Before Search
  cardContainer.innerHTML = "";

  // Next page and condition show the display 12 product
  const nextPage = document.getElementById("next-page");
  if (products.length > 12) {
    nextPage.classList.remove("hidden");
  } else {
    nextPage.classList.add("hidden");
  }
  // Top 10 Display Show Products
  products = products.slice(0, 12);

  // Run For-Each LOOP
  products.forEach((product) => {
    // console.log(product);

    // Step No.2 create a new div
    const newDiv = document.createElement("div");

    newDiv.classList = `bg-[#FFFEFF] rounded-lg p-5 border-2 `;

    // Step No.3 Set InnerHtml
    newDiv.innerHTML = ` <figure>
    <img class="mx-auto"
      src="${product.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-2xl mx-auto font-bold">${product.phone_name}</h2>
    <p class="text-lg text-center">ipsum dolor sit amet, consectetur adipisicing elit. Placeat, quo.</p>
    <div class="card-actions justify-end">
      <button onclick="showDetailsClick('${product.slug}');show_details_modal.showModal()" class="btn btn-primary mx-auto text-lg mt-5">Show Details</button>
    </div>
  </div>`;
    // Step No.4 AppendChild
    cardContainer.appendChild(newDiv);
  });
};

// Show Details click Function
const showDetailsClick = async (id) => {
  // Phone Details Link
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const moreDetails = data.data;
  console.log(moreDetails);

  showDetails(moreDetails);
};

// pop pop / modal function
const showDetails = (product) => {
  const moreDetails = document.getElementById("more-details");
  moreDetails.innerHTML = `
  <img class="mx-auto w-auto h-28" src="${product.image}" alt="">
  <h1 class="text-2xl font-bold text-center mb-4">${product.name}</h1>
  <p class="mt-2 text-sm"><span class="text-base font-bold">Storage:</span> ${
    product.mainFeatures.storage
  }</p>
  <p class="mt-2 text-sm"><span class="text-base font-bold">Display size:</span> ${
    product.mainFeatures.displaySize
  }</p>
  <p class="mt-2 text-sm"><span class="text-base font-bold">ChipSet:</span> ${
    product.mainFeatures.chipSet
  }</p>
  <p class="mt-2 text-sm"><span class="text-base font-bold">memory:</span> ${
    product.mainFeatures.memory
  }</p>
  <p class="mt-2 text-sm"><span class="text-base font-bold">Release data:</span> ${
    product?.releaseDate || "release date not found data"
  }</p>
  <p class="mt-2 text-sm"><span class="text-base font-bold">Brand:</span> ${
    product.brand
  }</p>
  <p class="mt-2 mb-0 text-sm"><span class="text-base font-bold">GPS:</span> ${
    product.others?.GPS || "GPS not found data"
  }</p>
  `;
};
// Search Button click to Function
const clickButton = () => {
  const inputText = document.getElementById("input-text");
  const inputValue = inputText.value;
  myFunction(inputValue);
};
myFunction();
