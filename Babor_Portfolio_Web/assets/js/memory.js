(function () {
  var gridEl = document.getElementById("memory-grid");
  var movesEl = document.getElementById("memory-moves");
  var startBtn = document.getElementById("memory-start");
  if (!gridEl) return;

  var icons = ["★", "◆", "●", "▲", "■", "♥", "♦", "♣"];
  var cards = [];
  var flipped = [];
  var moves = 0;
  var pairs = 0;

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function newGame() {
    var n = 8;
    var vals = [];
    for (var i = 0; i < n; i++) { vals.push(icons[i]); vals.push(icons[i]); }
    cards = shuffle(vals.slice());
    flipped = [];
    moves = 0;
    pairs = 0;
    if (movesEl) movesEl.textContent = moves;
    render();
  }

  function render() {
    gridEl.innerHTML = "";
    cards.forEach(function(val, i) {
      var card = document.createElement("div");
      card.className = "memory-card";
      card.setAttribute("data-index", i);
      card.setAttribute("data-val", val);
      card.textContent = flipped.indexOf(i) !== -1 || cards[i] === null ? val : "?";
      if (flipped.indexOf(i) !== -1) card.classList.add("flipped");
      if (cards[i] === null) card.classList.add("matched");
      card.addEventListener("click", function () {
        var idx = parseInt(card.getAttribute("data-index"), 10);
        if (cards[idx] === null || flipped.length === 2 || flipped.indexOf(idx) !== -1) return;
        flipped.push(idx);
        card.classList.add("flipped");
        card.textContent = val;
        if (flipped.length === 2) {
          moves++;
          if (movesEl) movesEl.textContent = moves;
          var a = cards[flipped[0]], b = cards[flipped[1]];
          if (a === b) {
            cards[flipped[0]] = null;
            cards[flipped[1]] = null;
            pairs++;
            document.querySelectorAll(".memory-card").forEach(function(c) {
              if (c.getAttribute("data-index") == flipped[0] || c.getAttribute("data-index") == flipped[1])
                c.classList.add("matched");
            });
            flipped = [];
            if (pairs === 8) setTimeout(function() { alert("You won in " + moves + " moves!"); }, 200);
          } else {
            setTimeout(function() {
              flipped.forEach(function(idx) {
                var c = gridEl.querySelector("[data-index=\"" + idx + "\"]");
                if (c) { c.classList.remove("flipped"); c.textContent = "?"; }
              });
              flipped = [];
            }, 600);
          }
        }
      });
      gridEl.appendChild(card);
    });
  }

  if (startBtn) startBtn.addEventListener("click", newGame);
  newGame();
})();
