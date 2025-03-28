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
       <a href="src/page/watch-movie.html?id=${
         movie.id
       }" class="block min-w-[150px]">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
             alt="${movie.title}" 
             class="rounded-md h-[20vh] w-full object-cover mb-2" />
        
        <h2 class="text-lg font-semibold line-clamp-1 text-white">${
          movie.title
        }</h2>
           <div class="flex flex-row justify-between">
      <p class="text-sm text-gray-200">
         (${movie.release_date.split("-")[0]})
      </p>
      <p class="flex">
        <svg
          class="w-6 h-6 text-gray-200 dark:text-white"
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
        <svg class="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"/>
</svg>
<svg class="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z"/>
</svg>


      </p>
    </div>

      `;

      moviesContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Call the function to load now playing movies when the page loads
fetchMovies(); // Replace with your actual TMDB API key

const movieContainer2 = document.getElementById("movie-container2");

fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    movieContainer2.innerHTML = "";

    data.results.slice(0, 12).forEach((code) => {
      const movieCard = document.createElement("div");
      movieCard.className = "min-w-[150px] flex-shrink-0 overflow-hidden";

      const posterPath = code.poster_path
        ? `https://image.tmdb.org/t/p/w500${code.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

      movieCard.innerHTML = `
        <a href="src/page/watch-movie.html?id=${code.id}" class="block md:w-auto w-[150px] ">
          <img src="${posterPath}" alt="${code.title}" class="w-full  h-64 object-cover">
          <div class="p-4">
            <h2 class="text-lg text-white font-bold line-clamp-1">${code.title}</h2>
            <p class="text-sm text-gray-100">Rating: ${code.vote_average}</p>
          </div>
        </a>
      `;

      movieContainer2.appendChild(movieCard);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    movieContainer2.innerHTML =
      "<p class='text-center text-red-500'>Failed to load movies.</p>";
  });

const upcoming = document.getElementById("upcoming-movie");

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    upcoming.innerHTML = "";

    data.results.slice(0, 12).forEach((coming) => {
      const comingCard = document.createElement("div");
      comingCard.className = "min-w-[150px] flex-shrink-0 overflow-hidden";

      const posterPath = coming.poster_path
        ? `https://image.tmdb.org/t/p/w500${coming.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

      comingCard.innerHTML = `
        <a href="src/page/watch-movie.html?id=${coming.id}" class="block md:w-auto w-[150px]">
          <img src="${posterPath}" alt="${coming.title}" class="w-full h-64 object-cover">
          <div class="p-4">
            <h2 class="text-lg text-white font-bold line-clamp-1">${coming.title}</h2>
            <p class="text-sm text-gray-100">Rating: ${coming.vote_average}</p>
          </div>
        </a>
      `;

      upcoming.appendChild(comingCard);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    upcoming.innerHTML =
      "<p class='text-center text-red-500'>Failed to load movies.</p>";
  });
