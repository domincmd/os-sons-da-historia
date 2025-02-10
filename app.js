const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('.popup-title');
const popupContent = popup.querySelector('.popup-content');
const backgroundDarkener = document.querySelector('.background-darkener');

let currentScrollIndex = 0;
const amountOfSections = 5;

function scrollToCurrentIndex() {
  const targetElement = document.getElementById(currentScrollIndex.toString());
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function openPopup(text) {
  popup.style.display = 'block';
  backgroundDarkener.style.display = 'block';
  popupTitle.innerHTML = popupTextContent[text][0];
  popupContent.innerHTML = popupTextContent[text][1];
}

function closePopup() {
  popup.style.display = 'none';
  backgroundDarkener.style.display = 'none';
}

scrollToCurrentIndex(); // First scroll to the top

document.addEventListener('keydown', (event) => {
  if (popup.style.display === 'block') return;

  if (event.key === 'ArrowUp') {
    currentScrollIndex = Math.max(currentScrollIndex - 1, 0);
  } else if (event.key === 'ArrowDown') {
    currentScrollIndex = Math.min(currentScrollIndex + 1, amountOfSections);
  }

  setTimeout(() => {
    scrollToCurrentIndex(); // Scroll after 10ms to avoid rapid scrolling
  }, 10);
});

// Detect scroll wheel movement
document.addEventListener('wheel', (event) => {
  if (popup.style.display === 'block') return;

  if (event.deltaY > 0) { // Scrolling down
    currentScrollIndex = Math.min(currentScrollIndex + 1, amountOfSections);
  } else { // Scrolling up
    currentScrollIndex = Math.max(currentScrollIndex - 1, 0);
  }
  scrollToCurrentIndex();
});

// Detect touch gestures (for mobile/touch screens)
let touchStartY = 0;

document.addEventListener('touchstart', (event) => {
  if (popup.style.display === 'block') return;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
  if (popup.style.display === 'block') return;
  const touchEndY = event.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (deltaY > 30) { // Swipe up
    currentScrollIndex = Math.min(currentScrollIndex + 1, amountOfSections);
  } else if (deltaY < -30) { // Swipe down
    currentScrollIndex = Math.max(currentScrollIndex - 1, 0);
  }

  scrollToCurrentIndex();
});

function changeSong(element) {
  const params = new URLSearchParams();
  const song = element.querySelector('.music-title').textContent;
  const author = element.querySelector('.music-author').textContent;
  const objectSection = element.parentNode.className.split(' ').at(-1);
  console.log(objectSection);
  params.set('song', song);
  params.set('author', author);
  params.set('section', objectSection);

  const currentUrl = window.location.href.split('/').slice(0, -1).join('/');
  window.location.href = `${currentUrl}/music-player/music.html?${params.toString()}`;
}

function swipeSong(object, side) {
  const objectSection = object.className.split(' ').at(-1);
  console.log(objectSection);

  const movingMusicContainer = document.querySelector(`.moving-music-container.${objectSection}`);
  console.log(movingMusicContainer);

  // Calculate maxMusicContainer based on children count (assuming 3 items per view)
  const childCount = movingMusicContainer.children.length;
  const itemsPerPage = 3;
  const groups = Math.floor(childCount / itemsPerPage);
  const maxMusicContainer = (childCount % itemsPerPage === 0) ? groups - 1 : groups;

  console.log(maxMusicContainer);

  let currentMusicContainer = Number(
    getComputedStyle(movingMusicContainer)
      .getPropertyValue('--index')
      .trim()
  );

  console.log([0, maxMusicContainer, currentMusicContainer]);

  if (side === 'right') { // Swipe right moves index upwards
    currentMusicContainer = Math.min(currentMusicContainer + 1, maxMusicContainer);
  } else {
    currentMusicContainer = Math.max(currentMusicContainer - 1, 0);
  }

  movingMusicContainer.style.setProperty('--index', currentMusicContainer);
  movingMusicContainer.style.transform = `translateX(${currentMusicContainer * -100}%)`;
}
