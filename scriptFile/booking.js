import movies from "./data.js";

// ==========================================
// DOM ELEMENTS
// ==========================================

const featImage = document.querySelector(".featImage");
const movieDetail = document.querySelector(".detail");
const showTimeContainer = document.querySelector(".showTime");
const availableDateContainer = document.querySelector(".showDate");
const movieSeatContainer = document.querySelector(".movieSeat");

// ==========================================
// BOOKING STATE
// ==========================================

let selectedTime = null;
let selectedDate = null;

// ==========================================
// GET SELECTED MOVIE
// ==========================================

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const movie = movies.find((movie) => movie.id === Number(movieId));

// ==========================================
// DISPLAY MOVIE
// ==========================================

featImage.innerHTML = `
  <img 
    src="${movie.image}" 
    alt="${movie.title}"
    class="w-full h-[400px] object-cover"
  >
`;

movieDetail.innerHTML = `
  <h2>Title: ${movie.title}</h2>
  <p>Duration: ${movie.duration}</p>
  <p>Genre: ${movie.genre}</p>
  <p>Rating: ⭐${movie.rating}</p>
`;

// ==========================================
// DISPLAY DATES
// ==========================================

movie.showDate.forEach((date) => {
  availableDateContainer.innerHTML += `
    <button
      class="dateBtn bg-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-400 hover:text-white"
      data-date="${date}"
    >
      ${date}
    </button>
  `;
});

// ==========================================
// SELECT DATE
// ==========================================

availableDateContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dateBtn")) return;

  document.querySelectorAll(".dateBtn").forEach((button) => {
    button.classList.remove("bg-black", "text-white");
    button.classList.add("bg-gray-300");
  });

  e.target.classList.remove("bg-gray-300");
  e.target.classList.add("bg-black", "text-white");

  selectedDate = e.target.dataset.date;

  console.log("Selected date:", selectedDate);
});

// ==========================================
// DISPLAY SHOWTIMES
// ==========================================

movie.showTime.forEach((time) => {
  showTimeContainer.innerHTML += `
    <button
      class="timeBtn bg-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-400 hover:text-white"
      data-time="${time}"
    >
      ${time}
    </button>
  `;
});

// ==========================================
// SELECT SHOWTIME
// ==========================================

showTimeContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("timeBtn")) return;

  // Reset all showtime buttons
  document.querySelectorAll(".timeBtn").forEach((button) => {
    button.classList.remove("bg-black", "text-white");
    button.classList.add("bg-gray-300");
  });

  // Activate selected button
  e.target.classList.remove("bg-gray-300");
  e.target.classList.add("bg-black", "text-white");

  // Store selected time
  selectedTime = e.target.dataset.time;

  console.log("Selected time:", selectedTime);
});

// ==========================================
// SEAT PLANNING
// ==========================================

const rows = ["A", "B", "C", "D", "E", "F", "G"];

rows.forEach((row) => {
  for (let seat = 1; seat <= 6; seat++) {
    const seatName = `${row}${seat}`;
    const column = seat <= 3 ? seat : seat+1;

    movieSeatContainer.innerHTML += `
        <button
        class="seatBtn bg-gray-300 p-3 rounded cursor-pointer"
        style="grid-column: ${column}"
        data-seat="${seatName}"
      >
        ${seatName}
      </button>
        `;
  }
});
