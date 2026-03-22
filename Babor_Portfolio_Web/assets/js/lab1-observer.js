document.addEventListener("DOMContentLoaded", function () {
  var observeBtn = document.getElementById("observeBtn");
  var resetBtn = document.getElementById("resetBtn");
  var observerDisplay = document.getElementById("observerDisplay");
  var clickCount = document.getElementById("clickCount");
  var moveCount = document.getElementById("moveCount");
  var keyCount = document.getElementById("keyCount");

  var stats = {
    clicks: 0,
    moves: 0,
    keys: 0
  };

  var isObserving = false;
  var clickHandler, moveHandler, keyHandler;

  function updateDisplay() {
    observerDisplay.innerHTML = "<p class='observer-message'>Observing interactions... Click anywhere, move your mouse, or press keys!</p>";
    clickCount.textContent = stats.clicks;
    moveCount.textContent = stats.moves;
    keyCount.textContent = stats.keys;
  }

  function startObserving() {
    if (isObserving) return;
    isObserving = true;
    observeBtn.textContent = "Observing...";
    observeBtn.disabled = true;

    clickHandler = function () {
      stats.clicks++;
      updateDisplay();
    };

    moveHandler = function () {
      stats.moves++;
      updateDisplay();
    };

    keyHandler = function () {
      stats.keys++;
      updateDisplay();
    };

    document.addEventListener("click", clickHandler);
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("keydown", keyHandler);
  }

  function resetObserver() {
    stats.clicks = 0;
    stats.moves = 0;
    stats.keys = 0;
    isObserving = false;
    observeBtn.textContent = "Start Observing";
    observeBtn.disabled = false;
    observerDisplay.innerHTML = "<p class='observer-message'>Click 'Start Observing' to begin tracking interactions.</p>";
    updateDisplay();

    if (clickHandler) document.removeEventListener("click", clickHandler);
    if (moveHandler) document.removeEventListener("mousemove", moveHandler);
    if (keyHandler) document.removeEventListener("keydown", keyHandler);
  }

  if (observeBtn) observeBtn.addEventListener("click", startObserving);
  if (resetBtn) resetBtn.addEventListener("click", resetObserver);
});
