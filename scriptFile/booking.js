import movies from "./data.js";

// =========================
// DOM ELEMENTS
// =========================

const featImage = document.querySelector(".featImage");
const movieDetail = document.querySelector(".detail");

const showTimeContainer = document.querySelector(".showTime");
const availableDateContainer = document.querySelector(".showDate");

const movieSeatContainer = document.querySelector(".movieContainer");
const movieCost = document.querySelector(".movieCost");


// =========================
// STATE
// =========================

let selectedDate = null;
let selectedTime = null;
let selectedShow = null;
let selectedSeat = [];
let totalPrice = 0;


// =========================
// GET MOVIE ID FROM URL
// =========================

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");


// =========================
// FIND MOVIE
// =========================

const movie = movies.find(
  (movie) => movie.id === Number(movieId)
);


// =========================
// CHECK MOVIE
// =========================

if (!movie) {
  document.body.innerHTML = `
    <h1 class="text-center text-2xl font-bold mt-10">
      Movie not found
    </h1>
  `;

  throw new Error("Movie not found");
}


// =========================
// DISPLAY MOVIE IMAGE
// =========================

featImage.innerHTML = `
  <img
    src="${movie.image}"
    alt="${movie.title}"
    class="w-full h-[400px] object-cover"
  >
`;


// =========================
// DISPLAY MOVIE DETAILS
// =========================

movieDetail.innerHTML = `
  <h2 class="text-xl font-bold">
    ${movie.title}
  </h2>

  <p>
    Duration: ${movie.duration}
  </p>

  <p>
    Genre: ${movie.genre}
  </p>

  <p>
    Rating: ⭐${movie.rating}
  </p>
`;


// =========================
// DISPLAY AVAILABLE DATES
// =========================

// Get unique dates
const dates = [...new Set(
  movie.shows.map((show) => show.date)
)];

dates.forEach((date) => {
  availableDateContainer.innerHTML += `
    <button
      class="dateBtn bg-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-400 hover:text-white"
      data-date="${date}"
    >
      ${date}
    </button>
  `;
});


// =========================
// DATE SELECTION
// =========================

availableDateContainer.addEventListener("click", (e) => {

  if (!e.target.classList.contains("dateBtn")) {
    return;
  }

  // Remove active state from all dates
  document.querySelectorAll(".dateBtn").forEach((button) => {
    button.classList.remove("bg-black", "text-white");
    button.classList.add("bg-gray-300");
  });

  // Add active state
  e.target.classList.remove("bg-gray-300");

  e.target.classList.add(
    "bg-black",
    "text-white"
  );

  // Store selected date
  selectedDate = e.target.dataset.date;

  // Reset previous time
  selectedTime = null;
  selectedShow = null;

  // Clear old times
  showTimeContainer.innerHTML = "";

  // Find shows available on selected date
  const availableShows = movie.shows.filter(
    (show) => show.date === selectedDate
  );

  // Display available times
  availableShows.forEach((show) => {

    showTimeContainer.innerHTML += `
      <button
        class="timeBtn bg-gray-300 px-3 py-1 cursor-pointer hover:bg-gray-400 hover:text-white"
        data-time="${show.time}"
      >
        ${show.time}
      </button>
    `;

  });

  // Reset cost information
  movieCost.innerHTML = `
    <p>Select a showtime</p>
  `;

  console.log("Selected date:", selectedDate);
});


// =========================
// TIME SELECTION
// =========================

showTimeContainer.addEventListener("click", (e) => {

  if (!e.target.classList.contains("timeBtn")) {
    return;
  }

  // Remove active state from all times
  document.querySelectorAll(".timeBtn").forEach((button) => {
    button.classList.remove("bg-black", "text-white");
    button.classList.add("bg-gray-300");
  });

  // Add active state
  e.target.classList.remove("bg-gray-300");

  e.target.classList.add(
    "bg-black",
    "text-white"
  );

  // Store selected time
  selectedTime = e.target.dataset.time;


  // Find the exact show
  selectedShow = movie.shows.find(
    (show) =>
      show.date === selectedDate &&
      show.time === selectedTime
  );



  // Display show information
  movieCost.innerHTML = `
    <p>
      Date: ${selectedShow.date}
    </p>

    <p>
      Time: ${selectedShow.time}
    </p>

    <p>
      Hall: ${selectedShow.hall}
    </p>

    <p>
      Ticket Price: Rs. ${selectedShow.price}
    </p>

    <p>
      Selected seats:
      ${selectedSeat.length > 0 ? selectedSeat.join(", ") : "None"}
    </p>

    <p>
      Total:
      Rs. ${totalPrice}
    </p>
  `;

});


// =========================
// CREATE SEATS
// =========================

const rows = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G"
];

rows.forEach((row) => {

  for (let seat = 1; seat <= 6; seat++) {

    const seatName = `${row}${seat}`;

    // Create aisle
    const column = seat <= 3 ? seat : seat + 1;

    movieSeatContainer.innerHTML += `
      <button
        class="seatBtn bg-gray-300 p-3 rounded cursor-pointer hover:bg-gray-400"
        style="grid-column: ${column}"
        data-seat="${seatName}"
      >
        ${seatName}
      </button>
    `;
  }

});


// =========================
// SEAT SELECTION
// =========================

movieSeatContainer.addEventListener("click", (e) => {

  if (!e.target.classList.contains("seatBtn")) {
    return;
  }

  // Make sure user selects date and time first
  if (!selectedShow) {

    alert("Please select a date and showtime first.");

    return;
  }


  const seatNo = e.target.dataset.seat;


  // Check if seat already selected
  if (selectedSeat.includes(seatNo)) {

    // Remove seat
    selectedSeat = selectedSeat.filter(
      (seat) => seat !== seatNo
    );

    // Change button back
    e.target.classList.remove(
      "bg-black",
      "text-white"
    );

    e.target.classList.add("bg-gray-300");

  } else {

    // Add seat
    selectedSeat.push(seatNo);

    // Change button
    e.target.classList.remove("bg-gray-300");

    e.target.classList.add(
      "bg-black",
      "text-white"
    );
  }


  // Calculate total price
  totalPrice =
    selectedSeat.length * selectedShow.price;


  // Display booking information
  movieCost.innerHTML = `
    <p>
      Date: ${selectedShow.date}
    </p>

    <p>
      Time: ${selectedShow.time}
    </p>

    <p>
      Hall: ${selectedShow.hall}
    </p>

    <p>
      Ticket Price: Rs. ${selectedShow.price}
    </p>

    <p>
      Selected seats:
      ${selectedSeat.length > 0
        ? selectedSeat.join(", ")
        : "None"
      }
    </p>

    <p>
      Total:
      Rs. ${totalPrice}
    </p>
  `;

});