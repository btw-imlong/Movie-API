const API_KEY = "38ce8edf86ce46dd2cc6a4d56763297a"; // Your TMDB API key

// Get references to HTML elements
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const resultsGrid = resultsDiv.querySelector("div");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const moviesContainer = document.getElementById("movies");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    // Construct the API URL for searching movies
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        // Check if there are any search results
        if (data.results.length) {
          // Generate HTML for each movie result
          resultsGrid.innerHTML = data.results
            .map(
              (movie) => `
            <a href="../page/watch-movie.html?id=${movie.id}" class="block">
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
            .join("");
        } else {
          // Display a message if no results are found
          resultsGrid.innerHTML = `<p class="text-center text-gray-400">No results found</p>`;
        }

        // Show the search results
        resultsDiv.classList.remove("hidden");
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        // Consider adding more user-friendly error handling here
      });
  } else {
    // Hide search results if the query is too short
    resultsDiv.classList.add("hidden");
  }
});

// URL to fetch currently playing movies
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

// Function to fetch and display "Now Playing" movies
function fetchMovies() {
  fetch(nowPlayingUrl)
    .then((response) => response.json())
    .then((data) => {
      // Get the container for the movies
      const moviesContainer = document.getElementById("movies");
      // Clear any existing content in the container
      moviesContainer.innerHTML = "";

      // Loop through the movie data and create HTML for each movie
      data.results.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("rounded-md"); // Add a rounded corners class

        // Generate the HTML for the movie element
        const posterPop = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieElement.innerHTML = `
          <div class="md:w-[15vw] w-40">
            <a href="../page/watch-movie.html?id=${movie.id}" class="block">
              <img src="${posterPop}" 
                alt="${movie.title}" 
                class="rounded-md h-[20vh] w-full object-cover mb-2" />

              <h2 class="text-lg font-semibold line-clamp-1 text-white">${
                movie.title
              }</h2>

              <div class="w-full flex flex-row justify-between">
                <p class="text-sm text-gray-200">(${
                  movie.release_date.split("-")[0]
                })</p>
                  <p class="flex">
  <svg
    class="w-4 h-4 text-gray-200 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
    />
  </svg>
  <svg
    class="w-4 h-4 text-gray-200 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
    />
  </svg>
  <svg
    class="w-4 h-4 text-gray-200 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z"
    />
  </svg>
</p>

                </div>
            </a>
          </div>
        `;

        // Add the movie element to the movies container
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      // Consider adding more user-friendly error handling here
    });
}

// Call the function to load now playing movies when the page loads
fetchMovies();

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    const popular = document.getElementById("pop");
    popular.innerHTML = "";

    data.results.forEach((popmovie) => {
      const popCard = document.createElement("div");
      popCard.classList.add("rounded-md");

      const posterPop = `https://image.tmdb.org/t/p/w500${popmovie.poster_path}`;

      popCard.innerHTML = `
        <div class="md:w-[15vw] w-40 sm:w-30">
         <a href="../page/watch-movie.html?id=${popmovie.id}" class="block">
             <img src="${posterPop}" alt="${popmovie.title}" class="w-full rounded-md h-64 object-cover">
    
      <div class="p-4 w-full">
        <h2 class="text-lg text-white font-bold line-clamp-1">${popmovie.title}</h2>
        <p class="text-sm text-gray-100">Rating: ${popmovie.vote_average}</p>
      </div>
        </div>`;
      popular.appendChild(popCard);
    });
  })
  .catch((error) => console.error("Error:", error));

const fetchTrending = fetch(
  `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
)
  .then((response) => response.json())
  .then((trend) => {
    const trending = document.getElementById("tren");

    trending.innerHTML = "";

    trend.results.forEach((tre) => {
      const trencard = document.createElement("div");
      const posterPop = `https://image.tmdb.org/t/p/w500${tre.poster_path}`;
      trencard.innerHTML = `
        <div class="md:w-[15vw] w-40 sm:w-30">
       <a href="../page/watch-movie.html?id=${tre.id}" class="block">
             <img src="${posterPop}" alt="${tre.title}" class="w-full rounded-md h-64 object-cover">
    
      <div class="p-4 w-full">
        <h2 class="text-lg text-white font-bold line-clamp-1">${tre.title}</h2>
        <p class="text-sm text-gray-100">Rating: ${tre.vote_average}</p>
         </div>
      </a>
          </div>
      `;
      trending.appendChild(trencard);
    });
  })
  .catch((error) => console.error("Error:", error));

const fetchTop =
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1
`)
    .then((response) => response.json())
    .then((rate) => {
      const topRate = document.getElementById("top");
      topRate.innerHTML = "";

      rate.results.forEach((rate) => {
        const rateTop = document.createElement("div");
        const posterPop = `https://image.tmdb.org/t/p/w500${rate.poster_path}`;
        rateTop.innerHTML = `
        <div class="md:w-[15vw] w-40 sm:w-30">
         <a href="../page/watch-movie.html?id=${rate.id}" class="block">
             <img src="${posterPop}" alt="${rate.title}" class="w-full rounded-md h-64 object-cover">
    
      <div class="p-4 w-full">
        <h2 class="text-lg text-white font-bold line-clamp-1">${rate.title}</h2>
        <p class="text-sm text-gray-100">Rating: ${rate.vote_average}</p>
         </div>
      </a>
      </div>
        `;
        topRate.appendChild(rateTop);
      });
    })
    .catch((error) => console.error("Error:", error));

const up =
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1

`)
    .then((response) => response.json())
    .then((data) => {
      const up = document.getElementById("up");
      up.innerHTML = "";

      data.results.forEach((upComing) => {
        const comingUp = document.createElement("div");
        const posterPop = `https://image.tmdb.org/t/p/w500${upComing.poster_path}`;

        comingUp.innerHTML = `
        <div class="md:w-[15vw] w-40 sm:w-30">
        <a href="../page/watch-movie.html?id=${upComing.id}" class="block">
             <img src="${posterPop}" alt="${upComing.title}" class="w-full rounded-md h-64 object-cover">
    
      <div class="p-4 w-full">
        <h2 class="text-lg text-white font-bold line-clamp-1 ">${upComing.title}</h2>
        <p class="text-sm text-gray-100">Rating: ${upComing.vote_average}</p>
         </div>
      </a>
      </div>
      `;
        up.appendChild(comingUp);
      });
    });
