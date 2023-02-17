import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

savedTime();

player.on('timeupdate', throttle(onSaveCurrentTime, 1000));

function onSaveCurrentTime(data) {
  const currentTime = data.seconds;
  localStorage.setItem(STORAGE_KEY, currentTime);
}

function savedTime() {
  const savedCurrentTime = localStorage.getItem(STORAGE_KEY);

  if (savedCurrentTime) {
    const parseSavedCurrentTime = savedCurrentTime;

    player
      .setCurrentTime(parseSavedCurrentTime)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;

          default:
            break;
        }
      });
  }
}
