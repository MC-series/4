// Main Js:

  // Image Slidder Code:
const wrapper = document.querySelector(".slid-wrapper");
const carousel = document.querySelector(".slid-carousel");
const firstCardWidth = carousel.querySelector(".slid-card").offsetWidth;
const arrowBtns = document.querySelectorAll(".slid-wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 10000);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

  const slidCards = document.querySelectorAll(".slid-card");

  const handleCardClick = (event) => {
    const previouslySelected = document.querySelector(".slid-card.selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }

    const currentCard = event.currentTarget;
    currentCard.classList.add("selected");
  }



    // Images Welcome Code:
  slidCards.forEach(card => {
    card.addEventListener("click", handleCardClick);
  });

    const stack = document.querySelector(".prestacked");
    const cards = Array.from(stack.children)
      .reverse()
      .filter((child) => child.classList.contains("precard"));
    
    cards.forEach((card) => stack.appendChild(card));
    
    function moveCard() {
      const lastCard = stack.lastElementChild;
      if (lastCard.classList.contains("precard")) {
        lastCard.classList.add("preswap");
    
        setTimeout(() => {
          lastCard.classList.remove("preswap");
          stack.insertBefore(lastCard, stack.firstElementChild);
        }, 1200);
      }
    }
    


    let autoplayInterval = setInterval(moveCard, 200);
    
    stack.addEventListener("click", function (e) {
      const card = e.target.closest(".precard");
      if (card && card === stack.lastElementChild) {
        card.classList.add("preswap");
    
        setTimeout(() => {
          card.classList.remove("preswap");
          stack.insertBefore(card, stack.firstElementChild);
          resetAutoplay();
        }, 1200);
      }
    });
    
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(moveCard, 200);
    }


    //Scroll Code:
    
      document.addEventListener('DOMContentLoaded', function() {
    // Select the button
    const button = document.querySelector('.preexplore');

    // Select the target div to scroll to
    const targetDiv = document.querySelector('.slid-carousel');

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Scroll to the target div
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


    //Scroll Code:
    document.addEventListener('DOMContentLoaded', function() {
    // Select the button
    const button = document.querySelector('.explore');

    // Select the target div to scroll to
    const targetDiv = document.querySelector('.content');
    
    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Scroll to the target div
        targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});



    // Audio Code:
    const audioPlayers = document.querySelectorAll('audio');

    // Add event listeners to each audio element
    audioPlayers.forEach(audio => {
      audio.addEventListener('play', function() {
        // Pause all other audio elements
        audioPlayers.forEach(otherAudio => {
          if (otherAudio !== audio && !otherAudio.paused) {
            otherAudio.pause();
          }
        });
      });
    });



    document.addEventListener('DOMContentLoaded', function() {
      const hours = document.querySelectorAll('.hour');
    
      function hideAll() {
          hours.forEach(hour => hour.style.display = 'none');
          document.querySelector('.secret').style.display = 'none';
      }
    
      function showElement(containerSelector, targetSelector) {
          hideAll();
          const container = document.querySelector(containerSelector);
          const target = document.querySelector(targetSelector);
    
          if (container && target) {
              container.style.display = 'block';
              target.style.display = 'block';
              target.scrollIntoView({ behavior: 'smooth' });
          }
      }
    
      document.getElementById('serie').addEventListener('click', function() {
          showElement('.secret', '#serieContent');
      });
    
      document.getElementById('music').addEventListener('click', function() {
          showElement('.secret', '#musicContent');
      });
    
      document.getElementById('actor').addEventListener('click', function() {
          showElement('.secret', '#actorContent');
      });
    });
    

    // Script to make links in iframe open in the top window
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const links = iframeDoc.querySelectorAll('a');
                links.forEach(link => {
                    link.setAttribute('target', '_top'); // Make links open in the top window
                });
            } catch (error) {
                console.error('Error accessing iframe content:', error);
            }
        });
    });



    

    