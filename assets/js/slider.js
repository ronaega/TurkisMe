const slider = document.querySelector(".slider");
const act = document.querySelector(".program-list");
const firstprogramWidth = act.querySelector(".program").offsetWidth;
const arrowBtn = document.querySelectorAll(".slider .btn-slide");
const actChildrens = [...act.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of programs that can fit in the act at once
let programPerView = Math.round(act.offsetWidth / firstprogramWidth);

// Insert copies of the last few programs to beginning of act for infinite scrolling
actChildrens.slice(-programPerView).reverse().forEach(program => {
    act.insertAdjacentHTML("afterbegin", program.outerHTML);
});

// Insert copies of the first few programs to end of act for infinite scrolling
actChildrens.slice(0, programPerView).forEach(program => {
    act.insertAdjacentHTML("beforeend", program.outerHTML);
});

// Scroll the act at appropriate postition to hide first few duplicate programs on Firefox
act.classList.add("no-transition");
act.scrollLeft = act.offsetWidth;
act.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the act left and right
arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        act.scrollLeft += btn.id == "left-slide" ? -firstprogramWidth : firstprogramWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    act.classList.add("dragging");
    // Records the initial cursor and scroll position of the act
    startX = e.pageX;
    startScrollLeft = act.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the act based on the cursor movement
    act.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    act.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the act is at the beginning, scroll to the end
    if(act.scrollLeft === 0) {
        act.classList.add("no-transition");
        act.scrollLeft = act.scrollWidth - (2 * act.offsetWidth);
        act.classList.remove("no-transition");
    }
    // If the act is at the end, scroll to the beginning
    else if(Math.ceil(act.scrollLeft) === act.scrollWidth - act.offsetWidth) {
        act.classList.add("no-transition");
        act.scrollLeft = act.offsetWidth;
        act.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over act
    clearTimeout(timeoutId);
    if(!slider.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the act after every 2500 ms
    timeoutId = setTimeout(() => act.scrollLeft += firstprogramWidth, 2500);
}
autoPlay();

act.addEventListener("mousedown", dragStart);
act.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
act.addEventListener("scroll", infiniteScroll);
slider.addEventListener("mouseenter", () => clearTimeout(timeoutId));
slider.addEventListener("mouseleave", autoPlay);
