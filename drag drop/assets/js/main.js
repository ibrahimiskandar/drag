let dropElm = document.querySelector(".dropElm");
let table = document.querySelector(".table");
let upload = document.querySelector(".fa-arrow-up-from-bracket");
let input = document.querySelector(".dropElm input");

upload.onclick = () => input.click();

input.onchange = function (ev) {
  uploadImage(ev.target.files);
  ev.target.value = "";
};

dropElm.ondragover = (ev) => ev.preventDefault();
let counter = 1;

dropElm.ondrop = function (ev) {
  ev.preventDefault();
  uploadImage(ev.dataTransfer.files);
};

function uploadImage(files) {
  [...files].forEach((file) => {
    let reader = new FileReader();
    reader.onloadend = function (ev) {
      let tr = `
            <tr>
              <th scope="row">${counter++}</th>
              <td >
                     <img src="${ev.target.result}" alt="image" width="200px">
              </td>
              <td >${file.name}</td>
              <td >${file.size}</td>
          <td><button class="remove" >Remove</button></td>
            </tr>`;

      if (counter == 2) {
        let tablee = `
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Size</th>
              <th><button class="removeall">Remove All</button></th>
            </tr>
          </thead>`;
        table.innerHTML += tablee;
      }
      table.lastElementChild.innerHTML += tr;

      let removeAll = document.querySelector("table .removeall");
      removeAll.onclick = function () {
        counter = 1;
        let tra = ``;
        table.innerHTML = tra;
      };
    };
    reader.readAsDataURL(file);
  });
}

dropElm.ondrop = function (ev) {
  uploadImage(ev.dataTransfer.files);
};
