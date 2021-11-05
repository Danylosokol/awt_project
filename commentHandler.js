const music = ["rock", "pop", "hip-hop", "electronic"];

function myFavoriteMusic(value, _, music) {
    console.log('My favorite music is ' + value + ' choosing from ' + music);
}

music.forEach(myFavoriteMusic);