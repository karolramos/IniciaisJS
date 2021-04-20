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
  boundProjects();
});

function boundProjects() {
  const sectionProjects_rect = sectionProjects.getBoundingClientRect();
  const wrpProjects_rect = wrpProjects.getBoundingClientRect();

  if (parseInt(wrpProjects.style.left) > 0) {
    wrpProjects.style.left = 0;
  } else if (wrpProjects_rect.right < sectionProjects_rect.right) {
    wrpProjects.style.left = `-${wrpProjects_rect.width - sectionProjects_rect.width}px`;
  }
}