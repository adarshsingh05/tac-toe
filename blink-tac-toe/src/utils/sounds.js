// Sound utility functions
export const playSound = (soundName) => {
  const sounds = {
    place: new Audio("/sounds/place.mp3"),
    win: new Audio("/sounds/win.mp3"),
    select: new Audio("/sounds/select.mp3"),
    remove: new Audio("/sounds/remove.mp3"),
  }

  if (sounds[soundName]) {
    sounds[soundName].currentTime = 0
    sounds[soundName].play().catch((e) => console.log("Audio play error:", e))
  }
}
