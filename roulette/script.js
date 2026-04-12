const hide_header = document.getElementById("hide_header");
const roulette = document.getElementById("roulette");
const roulette_items = document.getElementById("roulette_items");
const roulette_spin = document.getElementById("roulette_spin");
const roulette_result = document.getElementById("Roulette_Result");

const canvas = roulette.getContext("2d");

const color_list = [
  "#dd6666",
  "#66dd66",
  "#6666dd",
  "#66dddd",
  "#dd66dd",
  "#dddd66",
  "#666666",
  "#dddddd",
];
let item_list = [];
let direction = 0;
let target_direction = 0;
let animation_type;
let animation_progress;
let animation_speed;
let animation_seed;

function canvas_default() {
  canvas.strokeStyle = "transparent";
  canvas.fillStyle = "gray";
  // Gray Circle
  canvas.beginPath();
  canvas.arc(300, 300, 250, 0, Math.PI * 2, false);
  canvas.fill();
  // Triangle pin
  canvas.fillStyle = "red";
  canvas.beginPath();
  canvas.moveTo(540, 300);
  canvas.lineTo(570, 317.3);
  canvas.lineTo(570, 282.7);
  canvas.fill();
}

function roulette_main() {
  if (item_list.length === 0) {
    canvas.fillStyle = "#aaaaaa";
    canvas.beginPath();
    canvas.arc(300, 300, 240, 0, Math.PI * 2, false);
    canvas.fill();
    canvas.fillStyle = "black";
    canvas.font = "30px sans-serif";
    canvas.textAlign = "center";
    canvas.fillText("何もないようです…", 300, 300);
    return;
  }
  for (let i = 0; i < item_list.length; i++) {
    canvas.beginPath();
    canvas.fillStyle = color_list[item_list[i].id % color_list.length];
    canvas.arc(
      300,
      300,
      240,
      (Math.PI * 2 * i) / item_list.length + (direction * Math.PI) / 180,
      (Math.PI * 2 * (i + 1)) / item_list.length + (direction * Math.PI) / 180,
      false,
    );
    canvas.lineTo(300, 300);
    canvas.fill();

    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    if (item_list[i].id % color_list.length == 6) {
      canvas.fillStyle = "white";
    } else {
      canvas.fillStyle = "black";
    }
    canvas.font = "30px sans-serif";
    canvas.save();
    canvas.translate(
      150 *
        Math.cos(
          (Math.PI * 2 * (i + 0.5)) / item_list.length +
            (direction * Math.PI) / 180,
        ) +
        300,
      150 *
        Math.sin(
          (Math.PI * 2 * (i + 0.5)) / item_list.length +
            (direction * Math.PI) / 180,
        ) +
        300,
    );
    canvas.rotate(
      (Math.PI * 2 * (i + 0.5)) / item_list.length +
        (direction * Math.PI) / 180,
    );
    canvas.fillText(item_list[i].title, 0, 0);
    canvas.restore();
  }
}

function roulette_draw() {
  canvas.clearRect(0, 0, 600, 600);
  canvas_default();
  roulette_main();
}

roulette_items.addEventListener("change", () => {
  item_list = roulette_items.value.split("\n");
  item_list = item_list.filter((item) => item.trim() !== "");
  let item_history = [];
  let item_number;
  for (let i = 0; i < item_list.length; i++) {
    item_number = item_history.indexOf(item_list[i]);
    if (item_number == -1) {
      item_history.push(item_list[i]);
      item_list[i] = { title: item_list[i], id: item_history.length - 1 };
    } else {
      item_list[i] = { title: item_list[i], id: item_list[item_number].id };
    }
  }
  if (
    item_list.length % color_list.length == 1 &&
    item_list.length > 1 &&
    item_list[item_list.length - 1].id >= color_list.length
  ) {
    item_list[item_list.length - 1].id = 4;
  }
  if (item_list.length % color_list.length == 2 && item_list.length > 2) {
    if (item_list[item_list.length - 1].id >= color_list.length) {
      item_list[item_list.length - 1].id = 6;
    }
    if (item_list[item_list.length - 2].id >= color_list.length) {
      item_list[item_list.length - 2].id = 2;
    }
  }
  roulette_draw();
});

function roulette_animate() {
  if (animation_progress < 3) {
    direction += animation_speed;
  } else {
    if (animation_type == 1) {
      direction +=
        animation_speed - ((animation_progress - 3) * animation_speed) / 7;
    } else if (animation_type == 2) {
      direction += animation_speed - (animation_progress - 3) * animation_speed;
    } else if (animation_type == 3) {
      if (animation_progress < 6) {
        direction += animation_speed;
      } else {
        direction +=
          animation_speed - ((animation_progress - 6) * animation_speed) / 9;
      }
    } else if (animation_type == 4) {
      if (animation_progress < 7) {
        direction +=
          animation_speed -
          ((animation_progress - 3) * (animation_speed - 0.08)) / 4;
      } else {
        direction +=
          -animation_speed + ((animation_progress - 7) * animation_speed) / 8;
      }
    } else if (animation_type == 5) {
      if (animation_progress < 10) {
        direction +=
          animation_speed -
          ((animation_progress - 3) *
            (animation_speed - 0.05 - 0.1 * animation_seed)) /
            7;
      } else if (animation_progress < 12.8 + animation_seed * 2) {
        direction += 0.05 + 0.1 * animation_seed;
      } else {
        direction +=
          0.05 +
          0.1 * animation_seed -
          ((animation_progress - 12.8 - animation_seed * 2) *
            (0.05 + 0.1 * animation_seed)) /
            0.2;
      }
    }
  }
  animation_progress += 0.0075;
  direction %= 360;
  if (direction < 0) direction += 360;
  if (
    (animation_type == 1 && animation_progress < 10) ||
    (animation_type == 2 && animation_progress < 4) ||
    (animation_type == 3 && animation_progress < 15) ||
    (animation_type == 4 && animation_progress < 15) ||
    (animation_type == 5 && animation_progress < 13 + animation_seed * 2)
  ) {
    requestAnimationFrame(roulette_animate);
  } else {
    const result = Math.floor((360 - direction) / (360 / item_list.length));
    roulette_result.innerText = item_list[result].title;
    roulette_result.style.background =
      color_list[item_list[result].id % color_list.length];
    if (item_list[result].id % color_list.length == 6) {
      roulette_result.style.color = "#ffffff";
    } else {
      roulette_result.style.color = "#000000";
    }
  }
  roulette_draw();
}

roulette_spin.addEventListener("click", () => {
  if (item_list.length === 0) return;
  roulette_result.innerText = "抽選中";

  // Animation type 1: Normal spin
  // Animation type 2: Short spin
  // Animation type 3: Long spin
  // Animation type 4: Two spins
  // Animation type 5: Too long spin
  animation_type = Math.ceil(Math.random() * 5);
  animation_progress = 0;
  animation_seed = Math.random();
  animation_speed = 5 + animation_seed * 4;
  requestAnimationFrame(roulette_animate);
});

roulette_draw();
