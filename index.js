const customHeader = document.querySelector("#custom-header");
const insertBtn = document.querySelector("#insert-btn");
const imgInput = document.querySelector('#img-input')

for (let i = 0; i < 10; i++) {
  const headerElement = document.createElement("div");
  const headerWidth = parseInt(getComputedStyle(customHeader).width, 10);

  headerElement.className = "header-elements";

  headerElement.style.width = headerWidth / 10 + "px";
  headerElement.style.border = "1px solid red";

  customHeader.append(headerElement);
}

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

insertBtn.addEventListener("click", () => {
  const selectedElements = document.querySelectorAll(".selected");
  const elements = [...selectedElements];

  let startY = elements.at(0).getBoundingClientRect().top
  
  let startX = elements.at(0).getBoundingClientRect().left;
  let endX = elements.at(-1).getBoundingClientRect().right;

  const img = document.createElement('img')

  img.style.position = 'absolute'
  img.src = imgInput.value
  const imgWidth = Number(endX) - Number(startX)

  console.log(imgWidth)

  customHeader.append(img)
  img.style.top = startY
  img.style.left = startX
  img.style.width = `${imgWidth}px`
});
