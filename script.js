/** @format */

showItems();

async function showItems() {
  const data = await sql("SELECT * FROM `ryby`");
  console.log(data);

  data.forEach((item) => {
    let itemElement = document.createElement("article");
    itemElement.id = item.ID;

    let imageElement = document.createElement("img");
    imageElement.src = item.Foto;
    imageElement.alt = "product image";
    itemElement.appendChild(imageElement);

    let priceElement = document.createElement("h2");
    priceElement.innerText = item.Cena + " Kč";
    priceElement.classList.add("price");
    itemElement.appendChild(priceElement);

    let nameElement = document.createElement("h2");
    nameElement.innerText = item.Název;
    itemElement.appendChild(nameElement);

    let deleteElement = document.createElement("img");
    deleteElement.src = "./img/delete.svg";
    deleteElement.alt = "DeleteBtn";
    deleteElement.classList.add("delete");
    deleteElement.addEventListener("click", () => deleteItem(item.ID));
    itemElement.appendChild(deleteElement);

    let editElement = document.createElement("img");
    editElement.src = "./img/edit.svg";
    editElement.alt = "EditBtn";
    editElement.classList.add("edit");
    editElement.addEventListener("click", () =>
      showEditForm(item.ID, item.Foto, item.Cena, item.Název),
    );
    itemElement.appendChild(editElement);

    let buyElement = document.createElement("button");
    buyElement.classList.add("buyButton");
    buyElement.innerText = "Koupit";
    buyElement.addEventListener("click", () =>
      buyButton(item.ID, item.Název, item.Cena),
    );
    itemElement.appendChild(buyElement);

    let saleElement = document.createElement("img");
    saleElement.src = "./img/sale.svg";
    saleElement.alt = "SaleBtn";
    saleElement.classList.add("sale");
    saleElement.addEventListener("click", () =>
      showEditForm(item.ID, item.Foto, item.Cena, item.Název),
    );
    itemElement.appendChild(saleElement);

    document.getElementById("items").appendChild(itemElement);
  });
}

async function deleteItem(id) {
  console.log("Deleting comment with id:", id);
  await sql(`DELETE FROM ryby WHERE id = ${id}`);
}

async function buyButton(id, Cena, Název) {
  console.log("Buying item with id:", id);
  alert(
    "Děkujeme za nákup! Vaše objednávka bude brzy připravena k vyzvednutí. Těšíme se na vaši návštěvu! 😊",
  );
}

function showEditForm(ID, Foto, Cena, Název) {
  let fotoInput = document.createElement("input");
  fotoInput.type = "text";
  fotoInput.value = Foto;
  document.body.appendChild(fotoInput);

  let cenaInput = document.createElement("input");
  cenaInput.type = "text";
  cenaInput.value = Cena;
  document.body.appendChild(cenaInput);

  let nazevInput = document.createElement("input");
  nazevInput.type = "text";
  nazevInput.value = Název;
  document.body.appendChild(nazevInput);

  let saveButton = document.createElement("button");
  saveButton.innerText = "Uložit";
  saveButton.addEventListener("click", async () => {
    const newFoto = fotoInput.value;
    const newCena = cenaInput.value;
    const newNazev = nazevInput.value;
    await sql(
      `UPDATE ryby
   SET Foto = '${newFoto}',
       Cena = '${newCena}',
       Název = '${newNazev}'
   WHERE id = ${ID}`,
    );
  });
  document.body.appendChild(saveButton);
}

function showAddForm() {
  let addFotoInput = document.createElement("input");
  addFotoInput.type = "text";
  addFotoInput.value = "odkaz na foto";
  document.body.appendChild(addFotoInput);

  let addCenaInput = document.createElement("input");
  addCenaInput.type = "text";
  addCenaInput.value = "Napište cenu";
  document.body.appendChild(addCenaInput);

  let addNazevInput = document.createElement("input");
  addNazevInput.type = "text";
  addNazevInput.value = "Napište název";
  document.body.appendChild(addNazevInput);

  let cancelButton = document.createElement("button");
  cancelButton.innerText = "Zrušit";

  let addButton = document.createElement("button");
  addButton.innerText = "Uložit";
  addButton.addEventListener("click", async () => {
    const addNewFoto = addFotoInput.value;
    const addNewCena = addCenaInput.value;
    const addNewNazev = addNazevInput.value;
    await sql(
      `INSERT INTO ryby (Foto, Cena, Název) VALUES ('${addNewFoto}', '${addNewCena}', '${addNewNazev}')`,
    );
  });
  document.body.appendChild(addButton);
}

function showSaleForm(ID, Foto, Cena, Název) {
  let saleH = document.createElement("h2");
  saleHElement.classList.add("delete");
  saleH.innerText = "Sleva!";
  itemElement.appendChild(saleHElement);

  let cenaInput = document.createElement("input");
  cenaInput.type = "text";
  cenaInput.value = Cena;
  document.body.appendChild(cenaInput);

  let saveButton = document.createElement("button");
  saveButton.innerText = "Uložit";
  saveButton.addEventListener("click", async () => {
    const newCena = cenaInput.value;
    await sql(
      `UPDATE ryby
   SET Cena = '${newCena}',
   WHERE id = ${ID}`,
    );
  });
  document.body.appendChild(saveButton);
}

const addItemButton = document.getElementById("addItem");
addItemButton.addEventListener("click", () => showAddForm());

const addSaleButton = document.getElementById("addSale");
addSaleButton.addEventListener("click", () => showSaleForm());
