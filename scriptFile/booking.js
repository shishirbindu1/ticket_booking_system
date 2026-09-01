import movies from "./data.js";

const featImage = document.querySelector(".featImage");
const showTimeContainer = document.querySelector(".showTime");
const movieDetail = document.querySelector(".detail");

let selectedTime = null

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const movie = movies.find((movie) => movie.id === Number(movieId));

featImage.innerHTML = `
<img src="${movie.image}" class="w-full h-[500px]">`;

movieDetail.innerHTML = `
<h2>Title: ${movie.title}</h2>
<p>Duration: ${movie.duration}</p>
<h2>Genre: ${movie.genre}</h2>
<h2>Rating: ⭐${movie.rating}</h2>
`;

movie.showTime.forEach((time) => {
  showTimeContainer.innerHTML += `
    <button class="timeBtn bg-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-400 hover:text-white" data-time="${time}">${time}</button>
    `;
});

showTimeContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('timeBtn')){
        document.querySelectorAll(".timeBtn").forEach((button) => {
            button.classList.remove("bg-black", "text-white");
            button.classList.add("bg-gray-300");
          });
      
          // Add active style to clicked button
          e.target.classList.remove("bg-gray-300");
          e.target.classList.add("bg-black", "text-white");
      
          // Save selected time
          selectedTime = e.target.dataset.time;
      
          console.log(selectedTime);
    }
    
})
