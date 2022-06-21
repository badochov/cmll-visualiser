function burger() {
  $("#menu").slideToggle("slow", function () {});
}
$("#arrow").spectrum({
  color:
    localStorage.getItem("arr") != null ? localStorage.getItem("arr") : "red",
  change: (c) => {
    arrowColor = c.toHexString();
    localStorage.setItem("arr", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#bg").spectrum({
  color:
    localStorage.getItem("bg") != null ? localStorage.getItem("bg") : "#fafafa",
  change: (c) => {
    bgColor = c.toHexString();
    localStorage.setItem("bg", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#frame").spectrum({
  color:
    localStorage.getItem("frame") != null
      ? localStorage.getItem("frame")
      : "black",
  change: (c) => {
    frameColor = c.toHexString();
    localStorage.setItem("frame", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#front").spectrum({
  color:
    localStorage.getItem("front") != null
      ? localStorage.getItem("front")
      : "lime",
  change: (c) => {
    colors[1] = c.toHexString();
    localStorage.setItem("front", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#right").spectrum({
  color:
    localStorage.getItem("right") != null
      ? localStorage.getItem("right")
      : "orange",
  change: (c) => {
    colors[2] = c.toHexString();
    localStorage.setItem("right", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#left").spectrum({
  color:
    localStorage.getItem("left") != null ? localStorage.getItem("left") : "red",
  change: (c) => {
    colors[4] = c.toHexString();
    localStorage.setItem("left", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#back").spectrum({
  color:
    localStorage.getItem("back") != null
      ? localStorage.getItem("back")
      : "blue",
  change: (c) => {
    colors[3] = c.toHexString();
    localStorage.setItem("back", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#top").spectrum({
  color:
    localStorage.getItem("top") != null
      ? localStorage.getItem("top")
      : "yellow",
  change: (c) => {
    colors[0] = c.toHexString();
    localStorage.setItem("top", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
$("#flipped").spectrum({
  color:
    localStorage.getItem("flip") != null
      ? localStorage.getItem("flip")
      : "lightblue",
  change: (c) => {
    color = c.toHexString();
    localStorage.setItem("flip", c.toHexString());
    generateState();
  },
  showInput: true,
  clickoutFiresChange: true,
  preferredFormat: "hex",
});
function restoreDefaults() {
  localStorage.clear();
  $("#flipped").spectrum("set", "lightblue");
  color = "lightblue";
  $("#top").spectrum("set", "yellow");
  colors[0] = "yellow";
  $("#back").spectrum("set", "blue");
  colors[3] = "blue";
  $("#left").spectrum("set", "red");
  colors[4] = "red";
  $("#right").spectrum("set", "orange");
  colors[2] = "orange";
  $("#front").spectrum("set", "lime");
  colors[1] = "lime";
  $("#frame").spectrum("set", "black");
  frameColor = "black";
  $("#bg").spectrum("set", "#fafafa");
  bgColor = "#fafafa";
  $("#arrow").spectrum("set", "red");
  arrowColor = "red";
  generateState();
}
$("#eo").click(function () {
  if ($(this).is(":checked")) {
    drawEO = true;
    $(".edge").show();
  } else {
    drawEO = false;
    $(".edge").hide();
  }
});
$("#ep").click(function () {
  if ($(this).is(":checked")) {
    drawEP = true;
    $(".arrow").show();
  } else {
    drawEP = false;
    $(".arrow").hide();
  }
});
$("#cll").click(function () {
  if ($(this).is(":checked")) {
    drawCMLL = true;
    $(".face").show();
  } else {
    drawCMLL = false;
    $(".face").hide();
  }
});
