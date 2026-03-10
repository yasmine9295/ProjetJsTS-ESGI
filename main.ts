interface Film {
  id: number
  title: string
  year: number
  director: string
  genres: string[]
}

async function fetchFilms(){
  const response = await fetch("https://keligmartin.github.io/api/films.json")

  const films: Film[] = await response.json()

  // return liste des films
  return films
}

//récupérer les films et les afficher dans la page HTML
async function displayFilms() {

  //fonction qui récupère les films depuis l’API
  const films = await fetchFilms()
  console.log(films)

  }

// Appel de la fonction
displayFilms()