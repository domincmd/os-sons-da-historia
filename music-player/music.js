const musicCard = document.querySelector(".music-card");
const musicTitle = document.querySelector(".music-title");
const musicAuthor = document.querySelector(".music-author");
const musicImg = document.querySelector(".music-img");
const musicDuration = document.querySelector(".duration");
const currentTime = document.querySelector(".current-time");
const seekSlider = document.querySelector(".seek-slider");
const audio = document.querySelector(".music");
const playIconImg = document.querySelector(".play-icon-img");
const params = new URLSearchParams(window.location.search);
const title = document.querySelector("title");
const iframe = document.querySelector("iframe")
const infoContainer = document.querySelector(".info-container")

const song = params.get("song");
const author = params.get("author");
const section = params.get("section");

console.log(song);
console.log(author);
console.log(section);






let playing = false;

function startPlaying() {
    playing = true;
    audio.play();
    playIconImg.src = "../images/assets/pause-button.svg";
}

function stopPlaying() {
    playing = false;
    audio.pause();
    playIconImg.src = "../images/assets/play-button.svg";
}

seekSlider.addEventListener("mousedown", () => {
    stopPlaying()
})

seekSlider.addEventListener("mouseup", () => {
    startPlaying()
})

function formatSeconds(duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    let seconds = duration % 60;

    let formattedHours = hours > 0 ? String(hours).padStart(2, "0") : "";
    let formattedMinutes = String(minutes).padStart(2, "0");
    let formattedSeconds = String(seconds).padStart(2, "0");

    return hours > 0 
        ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` 
        : `${formattedMinutes}:${formattedSeconds}`;
}



musicCard.style.background = `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5)), ${sectionColors[section]}`;
musicTitle.textContent = song;
musicAuthor.textContent = author;
musicImg.src = "../images"+musicImages[song]+"-card.jpg";
audio.src = "../music-files"+musicImages[song].replace("/musics", "")+".mp3"
document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), ${sectionColors[section]}`;
title.textContent = "Os Sons da História: " + song
iframe.src = `../music-info/${section}/${song}.html`
infoContainer.style.backgroundColor = sectionColors[section]


setTimeout(() => {seekSlider.value = 0}, 10)


audio.addEventListener("loadedmetadata", () => {
    setTimeout(() => {
        globalThis.audioDuration = Math.round(audio.duration);
        musicDuration.textContent = formatSeconds(globalThis.audioDuration);
    }, 100)
});

seekSlider.addEventListener("input", function (event) {
    const newValue = Number(event.target.value);
    const newTime = Math.round((newValue / 100) * globalThis.audioDuration);
    
    audio.currentTime = newTime;
    
    currentTime.textContent = formatSeconds(newTime);
    console.log(newTime);
});

function playClick() {
    if (!playing && audio.currentTime < globalThis.audioDuration) {
        startPlaying()
    } else if (playing) {
        stopPlaying()
    }
}

audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatSeconds(Math.round(audio.currentTime));
    seekSlider.value = (audio.currentTime / globalThis.audioDuration) * 100;
});
