document.addEventListener("DOMContentLoaded", function () {
  var colorCount = document.getElementById("colorCount");
  var baseHue = document.getElementById("baseHue");
  var hueValue = document.getElementById("hueValue");
  var generateBtn = document.getElementById("generateBtn");
  var randomBtn = document.getElementById("randomBtn");
  var paletteDisplay = document.getElementById("paletteDisplay");
  var previewBox = document.getElementById("previewBox");

  function hslToHex(h, s, l) {
    l /= 100;
    var a = s * Math.min(l, 1 - l) / 100;
    var f = function (n) {
      var k = (n + h / 30) % 12;
      var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return "#" + f(0) + f(8) + f(4);
  }

  function generatePalette(hue, count) {
    var colors = [];
    var saturation = 70;
    var lightnessStart = 50;
    var lightnessStep = 30 / (count - 1);

    for (var i = 0; i < count; i++) {
      var lightness = lightnessStart + (lightnessStep * i);
      var color = hslToHex(hue, saturation, lightness);
      colors.push(color);
    }
    return colors;
  }

  function generateRandomPalette(count) {
    var colors = [];
    for (var i = 0; i < count; i++) {
      var hue = Math.floor(Math.random() * 360);
      var saturation = 60 + Math.floor(Math.random() * 30);
      var lightness = 40 + Math.floor(Math.random() * 40);
      colors.push(hslToHex(hue, saturation, lightness));
    }
    return colors;
  }

  function renderPalette(colors) {
    paletteDisplay.innerHTML = "";
    colors.forEach(function (color) {
      var colorDiv = document.createElement("div");
      colorDiv.className = "palette-color";
      colorDiv.style.background = color;
      colorDiv.innerHTML = "<span class='color-code'>" + color.toUpperCase() + "</span>";
      colorDiv.addEventListener("click", function () {
        applyColorToPreview(color);
      });
      paletteDisplay.appendChild(colorDiv);
    });
  }

  function applyColorToPreview(color) {
    previewBox.style.borderColor = color;
    var btn = previewBox.querySelector(".btn");
    if (btn) {
      btn.style.background = "linear-gradient(135deg, " + color + ", " + adjustBrightness(color, -20) + ")";
    }
  }

  function adjustBrightness(hex, percent) {
    var num = parseInt(hex.replace("#", ""), 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + percent));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
    var b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }

  if (baseHue && hueValue) {
    baseHue.addEventListener("input", function () {
      hueValue.textContent = baseHue.value + "°";
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", function () {
      var hue = parseInt(baseHue.value);
      var count = parseInt(colorCount.value);
      var colors = generatePalette(hue, count);
      renderPalette(colors);
      if (colors.length > 0) applyColorToPreview(colors[0]);
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener("click", function () {
      var count = parseInt(colorCount.value);
      var colors = generateRandomPalette(count);
      renderPalette(colors);
      if (colors.length > 0) applyColorToPreview(colors[0]);
    });
  }

  // Initial render
  if (generateBtn) generateBtn.click();
});
