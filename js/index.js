const table = document.getElementById("table");
const tableBody = document.getElementById("table-body");
const url = "http://starlord.hackerearth.com/movieslisting";
let receivedData = [];
let dataDisplayed = [];
let loading = true;
let darkTheme = false;
let currentPage = 1;
fetch(url)
  .then(response => response.json())
  .then(data => {
    data.map((item, index) => {
      item.movie_title = item.movie_title.trim();
      item.genres = item.genres.split("|").join(", ");
      item.plot_keywords = item.plot_keywords.split("|").join(", ");
    });
    loading = false;
    receivedData = data;
    currentPage = 1;
    updateDomData(currentPage);
    console.log(receivedData);
  })
  .catch(error => { console.log(error); 
                    receivedData = [];
                    loading = false;
                  });


const createNode = (elem) => {
  return document.createElement(elem);
}

const append = (parent, elem) => {
  return parent.appendChild(elem);
}

const darkThemeToggle = () => {
  if(darkTheme){
    darkTheme = false;
    table.classList.remove("table-dark");
  }
  else{
    darkTheme = true;
    table.classList.add("table-dark");
  }
}

const updateDomData = (index) => {
      var dataArr = [];
      if(index > 0){
        dataArr = receivedData.slice(10 * (index-1),10 * index);
        dataDisplayed = dataArr;
      }
      //clearing DOM
      while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
      }
      
      dataArr.map((item, index) =>{
        let tr = createNode('tr');
        let movie_title = createNode('td');
        let director_name = createNode('td');
        let actor_1_name = createNode('td');
        let actor_2_name = createNode('td');
        let genres = createNode('td');
        let language = createNode('td');
        let country = createNode('td');
        let content_rating = createNode('td');
        let budget = createNode('td');
        let title_year = createNode('td');
        let plot_keywords = createNode('td');
    
        //"movie_imdb_link": "http://www.imdb.com/title/tt0499549/?ref_=fn_tt_tt_1"
    
        movie_title.textContent = item.movie_title;
        director_name.textContent = item.director_name;
        actor_1_name.textContent = item.actor_1_name;
        actor_2_name.textContent = item.actor_2_name;
        genres.textContent = item.genres;
        language.textContent = item.language;
        country.textContent = item.country
        content_rating.textContent = item.content_rating;
        budget.textContent = item.budget;
        title_year.textContent = item.title_year;
        plot_keywords.textContent = item.plot_keywords;

        append(tr, movie_title);
        append(tr, director_name);
        append(tr, actor_1_name);
        append(tr, actor_2_name);
        append(tr, genres);
        append(tr, language);
        append(tr, country);
        append(tr, content_rating);
        append(tr, budget);
        append(tr, title_year);
        append(tr, plot_keywords);
        append(tableBody, tr);
      })
}

const decPage = () => {
  if(currentPage > 1){
    currentPage--;
    updateDomData(currentPage);
  }
}

const incPage = () => {
  if(currentPage < Math.floor(receivedData.length/10)){
    currentPage++;
    updateDomData(currentPage);
  }
}

const sortBy = (type) => {
  currentPage = 1;
  switch(type){
    case 'language':
     receivedData.sort((a,b) => {return (a.language > b.language) ? 1 : ((b.language > a.language) ? -1 : 0);});
     updateDomData(currentPage);
     break;
    case 'country':
     receivedData.sort((a,b) => {return (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0);});
     updateDomData(currentPage);
     break;
    case 'budget':
     receivedData.sort((a,b) => {return (a.budget > b.budget) ? 1 : ((b.budget > a.budget) ? -1 : 0);});
     updateDomData(currentPage);
     break;
    case 'genres':
     receivedData.sort((a,b) => {return (a.genre[0] > b.genre[0]) ? 1 : ((b.genre[0] > a.genre[0]) ? -1 : 0);});
     updateDomData(currentPage);
     break;


  }
}

