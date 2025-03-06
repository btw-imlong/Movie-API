const API_KEY = "38ce8edf86ce46dd2cc6a4d56763297a"; // TMDB API key
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const resultsGrid = resultsDiv.querySelector("div");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        resultsGrid.innerHTML = data.results.length
          ? data.results
              .map(
                (movie) => `
           <a href="../src/page/watch-movie.html?id=${movie.id}" class="block">
            <div class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        alt="${movie.title}" 
          class="w-full h-64 object-cover rounded-md">
    <h2 class="mt-2 font-bold line-clamp-1">${movie.title}</h2>
      <p class="text-sm text-gray-400">${movie.release_date}</p>
    </div>
    </a>
          `
              )
              .join("")
          : `<p class="text-center text-gray-400">No results found</p>`;

        resultsDiv.classList.remove("hidden");
      })
      .catch((error) => console.error("Error fetching movies:", error));
  } else {
    resultsDiv.classList.add("hidden");
  }
});

// URL to fetch the now playing movies
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

async function fetchMovies() {
  try {
    const response = await fetch(nowPlayingUrl);
    const data = await response.json();
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Clear previous movies

    data.results.slice(0, 12).forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("rounded-md");

      movieElement.innerHTML = `
       <a href="../src/page/watch-movie.html?id=${movie.id}" class="block">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
             alt="${movie.title}" 
             class="rounded-md h-[20vh] w-full object-cover mb-2" />
        
        <h2 class="text-lg font-semibold line-clamp-1 text-white">${
          movie.title
        }</h2>
        <p class="text-sm text-gray-200">${movie.vote_count} votes (${
        movie.release_date.split("-")[0]
      })</p>
      `;

      moviesContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Call the function to load now playing movies when the page loads
fetchMovies();
