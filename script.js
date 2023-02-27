const container = document.querySelector(".container");
/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seat = document.getElementById("row-seat");
const count = document.getElementById("count");
const seatGuideText = document.getElementById("seat-guide-text");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const placeOrder = document.getElementById("place-order");
const cinemaHub = document.getElementById("cinema-hub");
const confirmationMessage = document.getElementById("confirm-order-message");
const cinemaHubBody = document.getElementById("main-container");
const colorMode = document.getElementById("color-mode");
const colorModeButton = document.getElementById("color-mode-button");
const lightModeIcon = document.getElementById("light-mode-icon");
const darkModeIcon = document.getElementById("dark-mode-icon");
const seatGuide = document.getElementById("showcase");
const closeOrderMessageButton = document.getElementById("close-order-message");
const confirmationMessageContainer = document.getElementById(
  "confirm-order-message"
);

/** displays the current date on the page */
n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

populateUI();

let ticketPrice = +movieSelect.value;

/** save the selected movie index & price */
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

/** updates user's total number of tickets & cost */
function updateOrder() {
  /** stores all seats that have the `selected` class on them */
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  /** converts node list of select seats into an array */
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  /** retrieves the selectedSeats that were stored in localStorage & reformats them into a JSON object */
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  /** checks if there is any data in selectedSeats */
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      /** checks if the returned index a positive number (means that it exists) */
      if (selectedSeats.indexOf(index) > -1) {
        /** uses localStorage to permanently add the occupied class to the seat the user selected */
        seat.classList.add("occupied");
      }
    });
  }

  /** uses selectedMovieIndex that was set to store movie index into localStorage */
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  /** checks if the movie's index is already in the current localStorage */
  if (selectedMovieIndex !== null) {
    /** sets the movie into localStorage permanently */
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/** event handler for changing an unoccupied seat's class to `selected` if the user clicks on it */
container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    /** uses `toggle` to select/deselect the seat class on click */
    event.target.classList.toggle("selected");

    updateOrder();
  }
});

/** will display a message of order confirmation when use clicks the "place order" button */
placeOrder.addEventListener("click", (event) => {
  if (event.target.classList.contains("place-order-button")) {
    /** removes all other elements from page and just displays the confirmation message */
    cinemaHub.classList.toggle("hidden");
    cinemaHubBody.classList.toggle("order-confirmation-background");
    confirmationMessage.classList.toggle("order-confirmation-message");
  }
});

/** changes ticketPrice to the selected movie's ticket price */
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  /** reloads page on click to clear selected seats from previous movie */
  window.location.reload();
  setMovieData(event.target.selectedIndex, event.target.value);
  updateOrder();
});

colorMode.addEventListener("click", (event) => {
  /** renders light mode when the light mode button is clicked */
  cinemaHubBody.classList.toggle("light-mode");
  svg.classList.toggle("light");
  seat.classList.toggle("available");
  seatGuideText.classList.toggle("showcase-text");
});

closeOrderMessageButton.addEventListener("click", (event) => {
  /** removes confirmation message from screen and displays blank page */
  confirmationMessage.style.display = "none";
  /** removes the `hidden` class from the page body to re-display home page */
  cinemaHub.classList.toggle("");
});

darkModeIcon.addEventListener("click", (event) => {
  /** reloads page to re-display dark mode */
  window.location.reload();
});

/** sets the initial user's count and total */
updateOrder();
