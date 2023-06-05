let filmeNameRef = document.getElementById("nome-filme");
let pesquisaBtn = document.getElementById("btn-pesquisa");
let result = document.getElementById("resultado");

let getFilme = () => {
  let nomeFilme = filmeNameRef.value;
  let url = `http://www.omdbapi.com/?t=${nomeFilme}&apikey=${key}`;

  if (nomeFilme.length <= 0) {
    result.innerHTML = `<h3 class="msg">Escreva o nome de um filme em inglês</h3>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response === "True") {
          result.innerHTML = `
            <div class="info">
              <img src="${data.Poster}" class="poster">
              <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                  <img src="img/star-icon.svg">
                  <h4>${data.imdbRating}</h4>
                </div> 
                <div class="detalhes">
                  <span>${data.Rated}</span> 
                  <span>${data.Year}</span> 
                  <span>${data.Runtime}</span> 
                </div>
                <div class="genero">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div> 
              </div>
            </div>
            <h3>Enredo:</h3>
            <p>${data.Plot}</p>
            <h3>Elenco:</h3>
            <p>${data.Actors}</p>
          `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Ocorreu um erro</h3>`;
      });
  }
};

pesquisaBtn.addEventListener("click", getFilme);
window.addEventListener("load", getFilme);
