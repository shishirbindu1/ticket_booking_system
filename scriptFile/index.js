import movies from "./data.js";

const movieSection= document.querySelector('.movieSection')

function cardMovie(movie) {
  const card = document.createElement("div");
  card.className= "border border-gray-200"
  card.innerHTML = `
    <img
      src="${movie.image}"
      alt="${movie.title}"
      class="h-52 w-full object-cover"
    />

    <!-- Card Content -->
    <div class="p-5">

      <!-- Title -->
      <h2 class="mb-2 text-2xl font-bold text-gray-900">
        ${movie.title}
      </h2>

      <!-- Movie Info -->
      <div class="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <span>${movie.duration}</span>
        <span>•</span>
        <span>${movie.genre}</span>
        <span>•</span>
        <span>⭐ ${movie.rating}</span>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-2 gap-3">

        <button
          class="buyNow-btn rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          data-id="${movie.id}"
        >
          Buy Now
        </button>
      </div>

    </div>
    `;

    return card;
}

function displayMovie(){
    movieSection.innerHTML = '';

    movies.forEach(movie=>{
        const card = cardMovie(movie)
        movieSection.appendChild(card)
    })

}

movieSection.addEventListener('click',(e)=>{
  if(e.target.classList.contains('buyNow-btn')){
    const movieId = e.target.dataset.id;
    
    window.location.href = `booking.html?id=${movieId}`
  }
})









displayMovie()