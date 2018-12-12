/* eslint-disable strict, no-undef*/
"use strict";

(function() {
  // inisialisasi endpoint API URL
  const apiKey = "a6ff111546c0411f9228e774270964e3";
  const API_URL =
    "https://newsapi.org/v2/everything?q=detik&sortBy=publishedAt&apiKey=" +
    apiKey;

  // get container
  const container = document.getElementById("ids");

  // get row
  var row = document.getElementsByClassName("row")[0];

  // set loading
  // <p>Loading...</p>
  var loading = document.createElement("div");
  var loadingInner = document.createElement("div");
  var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading...';
  loading.innerHTML = loadingText;
  loading.className = "lead";
  loadingInner.className = "inner-div";
  loading.className = "outer-div";
  container.appendChild(loading);

  // Buat function list berita, dibawah komen ini
  function listBerita(response) {
    // console.log(response);
    // sembunyikan loading
    loading.style.display = "none";
    // masukkan response.data ke dalam DOM
    // ingat response.data adalah array object
    var articles = response.data.articles;
    for (let index = 0; index < articles.length; index++) {
      var column = document.createElement("div");
      var card = document.createElement("div");
      var img = document.createElement("img");
      var cardBody = document.createElement("div");
      var title = document.createElement("h4");
      var author = document.createElement("h6");
      var detail = document.createElement("h6");
      var penerbitBerita = document.createElement("h6");
      var isi = document.createElement("p");
      var link = document.createElement("a");

      // set atrribute
      column.setAttribute("class", "col-4");
      card.setAttribute("class", "card");
      img.setAttribute("class", "card-img-top");
      cardBody.setAttribute("class", "card-body");
      title.setAttribute("class", "card-title title");
      author.setAttribute("class", "class-title author");
      detail.setAttribute("class", "card-title detail");
      penerbitBerita.setAttribute("class", "card-title penerbit");
      isi.setAttribute("class", "card-text");
      link.setAttribute("class", "btn btn-primary");

      title.innerText = articles[index].title;
      // detail
      detail.innerText = articles[index].description;
      //author
      author.innerText = articles[index].author;
      // image
      img.src = articles[index].urlToImage;

      // penerbitBerita
      penerbitBerita.innerText = articles[index].source.name;

      // isi
      isi.innerText = articles[index].content;

      // link
      link.href = articles[index].url;
      link.innerText = "See more...";

      //masukkan kedalam Card Body
      [title, detail, isi, penerbitBerita, link].forEach(function(item) {
        cardBody.appendChild(item);
      });

      //masukkan kedalam Card
      card.appendChild(img);
      card.appendChild(cardBody);

      //masukkan kedalam Column-4
      column.appendChild(card);
      // console.log(row.children);
      //masukkan kedalam Row
      row.appendChild(column);
    }
  }

  // Buat function error
  function tampungError(error) {
    // hide loading
    loading.style.display = "none";
    // console.log(error);
    // console.log(error.message);
    var paragraph = document.createElement("p");
    paragraph.className = "lead";
    paragraph.style.textAlign = "center";
    paragraph.innerText = error.message;
    container.appendChild(paragraph);
  }

  // request berita via axios dan masukkan function list berita di success
  // dan taro function error di catch
  axios
    .get(API_URL)
    .then(listBerita)
    .catch(tampungError);

  // Fungsi search saat enter atau
  // Fungsi search saat tekan button search
  // via submit
  var cari = document.getElementById("form-search");
  cari.addEventListener("submit", function(event) {
    event.preventDefault(); // stop browser behavior on submit form
    // convert ke array
    let children = [].slice.call(row.children);
    // hapus dulu list yang lama
    children.forEach(function(child) {
      child.remove();
    });
    loading.style.display = "inherit";
    var target = event.target.elements.search.value.trim().toLowerCase(); // user input
    if (target !== "") {
      let API_URL =
        "https://newsapi.org/v2/everything?q=" +
        target +
        "&sortBy=publishedAt&apiKey=" +
        apiKey;
      axios
        .get(API_URL)
        .then(listBerita)
        .catch(tampungError);
    } else {
      axios
        .get(API_URL)
        .then(listBerita)
        .catch(tampungError);
    }
  });
})();
