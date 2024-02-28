// flooplan-start

const svgContainer = document.querySelector(".svg-container");
const svgContent = document.querySelector(".svg-content");
let scale = 1;
let isDragging = false;
let startOffsetX, startOffsetY;

function zoomIn() {
    scale += 0.1;
    applyTransform();
}

function zoomOut() {
    scale -= 0.1;
    applyTransform();
}

function maxFit() {
    scale = 1;
    applyTransform();
}

function handleMouseWheel(event) {
    if (event.deltaY < 0) {
        scale += 0.2;
        zoomIn();
    } else {
        scale = 1;
        zoomOut();
    }
    event.preventDefault();
}

function startDrag(event) {
    isDragging = true;
    startOffsetX = event.clientX - svgContainer.getBoundingClientRect().left;
    startOffsetY = event.clientY - svgContainer.getBoundingClientRect().top;
    svgContainer.style.cursor = "grabbing";
}

function endDrag() {
    isDragging = false;
    svgContainer.style.cursor = "grab";
}

function applyTransform() {
    svgContent.style.transform = `scale(${scale})`;
}

svgContainer.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const offsetX = event.clientX - svgContainer.getBoundingClientRect().left - startOffsetX;
        const offsetY = event.clientY - svgContainer.getBoundingClientRect().top - startOffsetY;
        svgContent.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
    }
});

// //

function filterFloorplan() {
    const selectedOption = document.querySelector(".floorplan-select").value;
    const allLiElements = document.querySelectorAll(".floorplan-area-content li");

    // Show all elements initially
    allLiElements.forEach((li) => {
        li.style.display = "block";
    });

    // Hide elements based on selected option
    if (selectedOption === "2") {
        // Speakers
        allLiElements.forEach((li) => {
            if (!li.classList.contains("floorplan-speaker")) {
                li.style.display = "none";
            }
        });
    } else if (selectedOption === "3") {
        // Exhibitors
        allLiElements.forEach((li) => {
            if (!li.classList.contains("floorplan-exhibit")) {
                li.style.display = "none";
            }
        });
    }
    // For "View All", no need to hide any elements
}

// Listen for changes in the select element
document.querySelector(".floorplan-select").addEventListener("change", filterFloorplan);

// Call the filter function initially to show all elements
filterFloorplan();

// //

// Get the SVG element
var svg = document.querySelector(".svg-content");

// Function to handle zooming on click -old
function zoomToBooth(boothId) {
    // Reset any existing transformations
    svg.removeAttribute("transform");
    // Find the group element by boothId
    var boothGroup = svg.querySelector("#" + boothId);
    if (boothGroup) {
        // Calculate the center of the booth group
        var bbox = boothGroup.getBBox();
        var boothCenterX = bbox.x + bbox.width / 2;
        var boothCenterY = bbox.y + bbox.height / 2;
        // Get the dimensions of the SVG container
        var containerWidth = svg.parentElement.clientWidth;
        var containerHeight = svg.parentElement.clientHeight;
        // Calculate the translation values to center the booth in the container
        var translateX = containerWidth / 2 - boothCenterX;
        var translateY = containerHeight / 2 - boothCenterY;
        // Set the new transformation
        svg.setAttribute("transform", "translate(" + translateX + "," + translateY + ") scale(2)");
    }
}
// Add click event listeners to each booth
var boothIds = [
    "Registration",
    "Cloakroom",
    "Business_Lounge",
    "Speakers_Hall",
    "Networking_Lounge",
    "Coffee_Bar_Lounge",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "B15",
    "B16",
    "B17",
    "B18",
    "B19",
    "B20",
    "B21",
    "B22",
    "B23",
    "B24",
    "B25",
    "B26",
    "B27",
    "B28",
    "B29",
    "B30",
    "B31",
    "B32",
    "B33",
    "B34",
    "B35",
    "B36",
    "B37",
    "B38",
    "B39",
    "B40",
    "B41",
    "B42",
    "B43",
    "B44",
    "B45",
    "B46",
    "B47",
    "B48",
    "B49",
    "B50",
    "B51",
    "B52",
    "B53",
    "B54",
    "B55",
    "B56",
    "B57",
    "B58",
    "B59",
    "B60",
    "B61",
    "B62",
    "B63",
    "B64",
    "B65",
    "B66",
    "B67",
    "B68",
    "B69",
    "B70",
    "B71",
    "B72",
    "B73",
    "B74",
    "B75",
    "B76",
    "B77",
    "B78",
    "B79",
    "B80",
    "B81",
    "B82",
    "B83",
    "B84",
    "B85",
    "B86",
    "B87",
    "B88",
    "B89",
    "B90",
    "B91",
    "B92",
    "B93",
    "B94",
    "B95",
    "B96",
    "B97",
    "B98",
    "B99",
    "B100",
    "B101",
];

boothIds.forEach(function (id) {
    var boothElement = document.getElementById(id);
    if (boothElement) {
        boothElement.addEventListener("click", function () {
            zoomToBooth(id);
        });
    }
});

// //

// Function to handle search input changes
document.getElementById("floorplanName").addEventListener("input", function () {
    var searchValue = this.value.trim().toLowerCase();
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

// floorplan-end
