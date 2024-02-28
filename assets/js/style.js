
// navbar-dropdown
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
// accordrian-script --- (faq)

$(".accordion__header").click(function (e) {
  e.preventDefault();
  var currentIsActive = $(this).hasClass("is-active");
  $(this).parent(".accordion").find("> *").removeClass("is-active");
  if (currentIsActive != 1) {
    $(this).addClass("is-active");
    $(this).next(".accordion__body").addClass("is-active");
  }
});
// sponsor-exhibitor-searchbar-scribt
$(document).ready(function () {
  var selectedOptions = []; // Array to store selected options
  var placeholderSpan = $(".placeholder-span");

  $(".custom-input").on("click", function () {
    placeholderSpan.hide();
    $("#options").toggle();
  });

  $("#customInput").on("input", function () {
    var searchValue = $(this).text().toLowerCase().trim();
    $("#options option").each(function () {
      var text = $(this).text().toLowerCase();
      if (text.includes(searchValue)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $("#options").click(function (event) {
    event.stopPropagation(); // Prevent click propagation to document body
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest("#options").length && !$(event.target).is(".custom-input")) {
      $("#options").hide();
      placeholderSpan.show();
    }
  });

  $("#options").on("change", function () {
    var selectedOption = $(this).find("option:selected").last();
    var optionValue = selectedOption.val();
    if (selectedOption.length && !selectedOptions.includes(optionValue)) {
      var selectedText = selectedOption.text();
      var badge = $('<span class="selected-option badge badge-primary">' + selectedText + '<i class="fas fa-times ml-1"></i></span>');
      badge.find(".fas").click(function () {
        $(this).parent().remove();
        selectedOption.prop("selected", false);
        selectedOptions = selectedOptions.filter(function (option) {
          return option !== optionValue;
        });
      });
      $(".custom-input").append(badge);
      selectedOptions.push(optionValue); // Add to selected options array
    }
  });

  $("#clearAll").click(function () {
    $(".custom-input").empty();
    $("#options").val([]);
    $("#options option").show();
    selectedOptions = []; // Clear selected options array
  });
});

// form-page-script
const form = document.querySelector("#form");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const jobtitle = document.querySelector("#jobtitle");
const company = document.querySelector("#company");
const email = document.querySelector("#email");
const linkedin = document.querySelector("#linkedin");
const area = document.querySelector("#area");

form.addEventListener("submit", (e) => {
  if (!validateInputs()) {
    e.preventDefault();
  }
});

function validateInputs() {
  const firstnameVal = firstname.value.trim();
  const lastnameVal = lastname.value.trim();
  const jobtitleVal = jobtitle.value.trim();
  const companyVal = company.value.trim();
  const emailVal = email.value.trim();
  const linkedinVal = linkedin.value.trim();
  const areaVal = area.value.trim();
  let success = true;

  if (firstnameVal === "") {
    success = false;
    setError(firstname, "First Name is required");
  } else {
    setSuccess(firstname);
  }

  if (lastnameVal === "") {
    success = false;
    setError(lastname, "Last Name is required");
  } else {
    setSuccess(lastname);
  }

  if (jobtitleVal === "") {
    success = false;
    setError(jobtitle, "Job Tilte is required");
  } else {
    setSuccess(jobtitle);
  }

  if (companyVal === "") {
    success = false;
    setError(company, "Company Name is required");
  } else {
    setSuccess(company);
  }

  if (emailVal === "") {
    success = false;
    setError(email, "Email is required");
  } else if (!validateEmail(emailVal)) {
    success = false;
    setError(email, "Invalid email format");
  } else {
    setSuccess(email);
  }

  if (linkedinVal === "") {
    success = false;
    setError(linkedin, "LinkedIn Profile is required");
  } else {
    setSuccess(linkedin);
  }

  if (areaVal === "") {
    success = false;
    setError(area, "Area Of Interest is required");
  } else {
    setSuccess(area);
  }
  return success;
}
//element - password, msg- pwd is reqd
function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// past-speaker-slider
$(document).ready(function () {
  $(".Spkr-container-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  });
});


// Function to handle form submission
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the search value
  var searchValue = document.getElementById("floorplanName").value.trim().toLowerCase();

  // Filter the booth list items based on the search value
  var boothListItems = document.querySelectorAll(".floorplan-area-content li");
  boothListItems.forEach(function (item) {
    var boothName = item.querySelector(".booth-name").textContent.trim().toLowerCase();
    if (boothName.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// banner-text-auto-type-script

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Affiliates", "Fintechs", "Traders"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});


//  eight-section-expand-script
// Function to toggle the active class on click
function expand(element) {
  var allElements = document.querySelectorAll(".eight-section-list");
  allElements.forEach(function (el) {
    if (el !== element) {
      el.classList.remove("active");
    }
  });
  element.classList.toggle("active");
}



// testimonial-attend-page

function toggleSize(card) {
  card.classList.toggle("expanded");

  const testimonials = document.querySelectorAll(".testimonial");
  testimonials.forEach((testimonial) => {
    if (testimonial !== card) {
      testimonial.classList.remove("expanded");
    }
  });
}

// attendees-page-script -start
// Attendees AllShowBtn Script
//  default-showing-all-script
// document.addEventListener("DOMContentLoaded", function () {
//     const showAllBtn = document.getElementById("showAllBtn");
//     const attendeesBoxes = document.querySelectorAll(".attendees-box");

//     showAllBtn.addEventListener("click", function () {
//         attendeesBoxes.forEach(function (box) {
//             box.style.display = "block";
//         });
//     });
// });

// Alphapet Filter Script
function filterByAlphabet(letter) {
  var attendessBoxes = document.querySelectorAll(".attendees-box");
  attendessBoxes.forEach(function (box) {
    var name = box.dataset.name.toUpperCase();
    if (name.startsWith(letter)) {
      box.style.display = "flex";
    } else {
      box.style.display = "none";
    }
  });
}

// SearchInput Script
function filterSpeakers() {
  var input = document.getElementById("searchInput").value.toUpperCase();
  var attendessBoxes = document.querySelectorAll(".attendees-box");
  attendessBoxes.forEach(function (box) {
    var name = box.dataset.name.toUpperCase();
    if (name.indexOf(input) > -1) {
      box.style.display = "flex";
    } else {
      box.style.display = "none";
    }
  });
}

// Add Active Class to the Attendees Tabs Current Button
var menuItems = document.querySelectorAll(".Alphabet-btn");
menuItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    menuItems.forEach(function (item) {
      item.classList.remove("Alphabetactive");
    });
    event.target.classList.add("Alphabetactive");
  });
});

// Remove Active Class to the Attendees Tabs Current Button when search button clicking
var removeActiveBtn = document.getElementById("searchInput");
removeActiveBtn.addEventListener("click", function () {
  menuItems.forEach(function (item) {
    item.classList.remove("Alphabetactive");
  });
});

// attendees-page-script-end



