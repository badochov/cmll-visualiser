let tile = 75,
  edges = [
    [1.5, 0],
    [1.5, 1.5],
    [0.5, 2.5],
    [2.5, 2.5],
    [1.5, 3.5],
    [1.5, 5],
  ],
  corners = [
    [
      [2.5, 3.5],
      [3.5, 3.5],
      [2.5, 4.5],
    ],
    [
      [2.5, 1.5],
      [3.5, 1.5],
      [2.5, 1.25],
    ],
    [
      [0.5, 1.5],
      [0.25, 1.5],
      [0.5, 1.25],
    ],
    [
      [0.5, 3.5],
      [0.25, 3.5],
      [0.5, 4.5],
    ],
  ],
  cor = [
    [[0, 1, 2], 0],
    [[0, 2, 3], 0],
    [[0, 3, 4], 0],
    [[0, 4, 1], 0],
  ],
  cp = [0, 1, 2, 3],
  colors = [
    $("#top").spectrum("get").toHexString(),
    $("#front").spectrum("get").toHexString(),
    $("#right").spectrum("get").toHexString(),
    $("#back").spectrum("get").toHexString(),
    $("#left").spectrum("get").toHexString(),
  ];
(lineWidth = (tile * 2) / 50),
  (arrowWidth = (tile * 2) / 50),
  (color = $("#flipped").spectrum("get").toHexString()),
  (arrowColor = $("#arrow").spectrum("get").toHexString()),
  (frameColor = $("#frame").spectrum("get").toHexString()),
  (bgColor = $("#bg").spectrum("get").toHexString());

function restore() {
  ctx.clearRect(0, 0, 4 * tile, 6 * tile + lineWidth);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 4 * tile, 6 * tile + lineWidth);
  drawCube();
  cube = JSON.parse(JSON.stringify(cubeStencil));
}
function drawCube() {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = frameColor;

  for (let i = 0; i < edges.length; i++) {
    drawTile(edges[i][0], edges[i][1]);
  }
  for (let i = 0; i < corners.length; i++) {
    drawCorner(i);
  }

  ctx.beginPath();
  ctx.stroke();
}
function drawTile(x, y) {
  ctx.strokeRect(x * tile, y * tile + lineWidth / 2, tile, tile);
}
function fillTile(n) {
  ctx.fillStyle = color;
  ctx.fillRect(
    edges[n][0] * tile + lineWidth / 2,
    edges[n][1] * tile + lineWidth,
    tile - lineWidth,
    tile - lineWidth
  );
}
function fillCorner(n) {
  if (n % 2 == 0) {
    a = 2;
    b = 1;
  } else {
    b = 2;
    a = 1;
  }
  ctx.fillStyle = colors[cor[cp[n]][0][(0 + cor[cp[n]][1]) % 3]];
  ctx.fillRect(
    corners[n][0][0] * tile + lineWidth / 2,
    corners[n][0][1] * tile + lineWidth,
    tile - lineWidth,
    tile - lineWidth
  );

  ctx.fillStyle = colors[cor[cp[n]][0][(a + cor[cp[n]][1]) % 3]];
  ctx.fillRect(
    corners[n][1][0] * tile + lineWidth / 2,
    corners[n][1][1] * tile + lineWidth,
    tile * 0.25 - lineWidth,
    tile - lineWidth
  );

  ctx.fillStyle = colors[cor[cp[n]][0][(b + cor[cp[n]][1]) % 3]];
  ctx.fillRect(
    corners[n][2][0] * tile + lineWidth / 2,
    corners[n][2][1] * tile + lineWidth,
    tile - lineWidth,
    tile * 0.25 - lineWidth
  );
}
function drawCorner(n) {
  drawTile(corners[n][0][0], corners[n][0][1]);
  ctx.strokeRect(
    corners[n][1][0] * tile,
    corners[n][1][1] * tile + lineWidth / 2,
    tile * 0.25,
    tile
  );
  ctx.strokeRect(
    corners[n][2][0] * tile,
    corners[n][2][1] * tile + lineWidth / 2,
    tile,
    tile * 0.25
  );
}
function drawCross() {
  ctx.clearRect(0, 0, 4 * tile, 6 * tile + lineWidth);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 4 * tile, 6 * tile + lineWidth);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(4 * tile, 6 * tile + lineWidth);
  ctx.moveTo(0, 6 * tile + lineWidth);
  ctx.lineTo(4 * tile, 0);
  ctx.closePath();

  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";

  ctx.stroke();

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = frameColor;
}
function drawArrow(start, end) {
  let s = edges[start],
    e = edges[end],
    c = Math.sqrt(Math.pow(s[1] - e[1], 2) + Math.pow(s[0] - e[0], 2)),
    sin = (-s[0] + e[0]) / c,
    pom = s[1] - e[1] < 0 ? -1 : 1,
    pom2 = s[1] - e[1] < 0 ? tile / 2 : 0;

  ctx.beginPath();
  ctx.moveTo(s[0] * tile + tile / 2, s[1] * tile + tile / 2);

  ctx.lineTo(e[0] * tile + tile / 2, e[1] * tile + tile / 2);

  ctx.translate(e[0] * tile + tile / 2, e[1] * tile + tile / 2);
  ctx.rotate(Math.asin(sin) * pom);
  ctx.translate(-(e[0] * tile + tile / 2), -(e[1] * tile + tile / 2));

  ctx.moveTo(e[0] * tile + tile / 2, e[1] * tile + tile / 2);
  ctx.lineTo(e[0] * tile + (5 * tile) / 8, e[1] * tile + (3 * tile) / 4 - pom2);
  ctx.moveTo(e[0] * tile + tile / 2, e[1] * tile + tile / 2);
  ctx.lineTo(e[0] * tile + (3 * tile) / 8, e[1] * tile + (3 * tile) / 4 - pom2);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = arrowColor;
  ctx.lineWidth = arrowWidth;
  ctx.closePath();
  ctx.stroke();
}
