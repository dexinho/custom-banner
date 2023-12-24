import { customHeader } from "./querySelectors.js";

export const createGrid = (density) => {
  for (let i = 0; i < density; i++) {
    const headerElement = document.createElement("div");
    const headerWidth = parseInt(getComputedStyle(customHeader).width, 10);

    headerElement.className = "header-elements";

    headerElement.style.width = headerWidth / density + "px";
    headerElement.style.left = (i * headerWidth) / density + "px";
    headerElement.style.position = "absolute";

    customHeader.append(headerElement);
  }

  makeGridElementsSelectable();
};

const makeGridElementsSelectable = () => {
  const headerElements = document.querySelectorAll(".header-elements");

  let isMouseDown = false;
  headerElements.forEach((element) => {
    const handleMouseOver = (event) => {
      event.preventDefault();
      if (isMouseDown) {
        toggleElements(event.target);
      }
    };

    const handleMouseDown = (event) => {
      event.preventDefault();
      isMouseDown = true;
      event.target.classList.toggle("selected");

      document.addEventListener("mouseup", () => {
        isMouseDown = false;
        console.log(isMouseDown);
      });
    };

    const toggleElements = (target) => {
      target.classList.toggle("selected");
    };

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mousedown", handleMouseDown);
  });
};
