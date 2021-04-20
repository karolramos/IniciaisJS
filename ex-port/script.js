const sectionProjects = document.querySelector(".projects");
const wrpProjects = document.querySelector(".wrp-projects");

let isPressedDown = false;
let cursorXSpace;

sectionProjects.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  cursorXSpace = e.offsetX - wrpProjects.offsetLeft;
  sectionProjects.style.cursor = "grabbing";
});

sectionProjects.addEventListener("mouseup", () => {
  sectionProjects.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

sectionProjects.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  wrpProjects.style.left = `${e.offsetX - cursorXSpace}px`;
  boundCards();
});

function boundCards() {
  const container_rect = sectionProjects.getBoundingClientRect();
  const cards_rect = wrpProjects.getBoundingClientRect();

  if (parseInt(wrpProjects.style.left) > 0) {
    wrpProjects.style.left = 0;
  } else if (cards_rect.right < container_rect.right) {
    wrpProjects.style.left = `-${cards_rect.width - container_rect.width}px`;
  }
}