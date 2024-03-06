const keys = document.querySelectorAll(".key");
let currentKeyIndex = 0;
let practiceCount = 0;

function highlightKey() {
  keys[currentKeyIndex].classList.add("highlighted");
}

function resetKeys() {
  keys.forEach((key) => {
    key.classList.remove("highlighted", "correct", "incorrect");
  });
}

function handleKeyPress(event) {
  const pressedKey = event.keyCode;
  const highlightedKey = parseInt(keys[currentKeyIndex].dataset.key);

  if (pressedKey === highlightedKey) {
    keys[currentKeyIndex].classList.add("correct");
    currentKeyIndex++;
    if (currentKeyIndex < keys.length) {
      resetKeys();
      highlightKey();
    } else {
      practiceCount++;
      document.getElementById(
        "practice-count"
      ).innerText = `Practice Count: ${practiceCount}`;
      currentKeyIndex = 0;
      resetKeys();
      highlightKey();
      if (practiceCount >= 10) {
        shuffleKeys();
      }
    }
  } else {
    keys.forEach((key) => {
      if (parseInt(key.dataset.key) === pressedKey) {
        key.classList.add("incorrect");
      }
    });
  }
}

function shuffleKeys() {
  const shuffledKeys = Array.from(keys).sort(() => Math.random() - 0.5);
  shuffledKeys.forEach((key, index) => {
    key.style.order = index + 1;
  });
}

document.addEventListener("keydown", handleKeyPress);

highlightKey();
