const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const queueList = document.getElementById('queue');

const tracks = [
  {
    title: 'Lost in the Light',
    artist: 'The Echo',
    src: 'music1.mp3',
    cover: 'cover.webp'
  },
  {
    title: 'Sky Dreamer',
    artist: 'Nova',
    src: 'music2.mp3',
    cover: 'cover2.jpg'
  }
];



let currentTrack = 0;

function loadTrack(index) {
  const track = tracks[index];
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
  audio.src = track.src;
  updateQueueUI();
  
  
}

function playPauseTrack() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function updateTime() {
  progress.value = audio.currentTime;
  progress.max = audio.duration;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = isNaN(audio.duration) ? '0:00' : formatTime(audio.duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('loadedmetadata', updateTime);

function updateQueueUI() {
  queueList.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.classList.toggle('active', index === currentTrack);
    li.innerHTML = `
      <i class="fa-solid fa-music"></i>
      <div>
        <strong>${track.title}</strong>
        <span style="font-size: 13px; color: #aaa;">${track.artist}</span>
      </div>
    `;
    li.addEventListener('click', () => {
      currentTrack = index;
      loadTrack(currentTrack);
      audio.play();
      
      playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    });
    queueList.appendChild(li);
  });
}

playBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

loadTrack(currentTrack);

