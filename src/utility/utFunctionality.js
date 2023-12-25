import {
  utBtns,
  utilityTools,
  utOptionTitle,
  utOptionTool,
  utSelect,
  utSelectedOptionDiv,
  customHeader,
  utDensityBtn,
  utDensityInput,
  utInsertBtn,
} from "./querySelectors.js";
import { createGrid, removeGrid } from "./gridManagement.js";
import { makeBlockDynamic } from "./makeBlockDynamic.js";
import { BANNER_STATES } from "./globalVar.js";

export const handleUtFunctionality = () => {
  handleUtBtns();
  handleUtSelection();
  handleUtDensity();
  handleInsert();
};

const handleUtBtns = () => {
  utBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "ut-toggle-btn") {
        utSelect.value = "SELECT";

        utilityTools.classList.toggle("ut-toggle");
        btn.firstElementChild.classList.toggle("fa-arrow-left");
        customHeader.classList.toggle("border-blue");
        utSelectedOptionDiv.classList.add("display-none");
        BANNER_STATES.isUtOn = !BANNER_STATES.isUtOn;
        handleGridDisplay();
      } else if (btn.id === "ut-reset-range-btn") removeSelection();
    });
  });
};

const removeSelection = () => {
  const selected = document.querySelectorAll(".selected");
  selected.forEach((el) => el.classList.remove("selected"));
};

const handleUtSelection = () => {
  utSelect.addEventListener("change", () => {
    if (utSelect.value === "SELECT") {
      utSelectedOptionDiv.classList.add("display-none");
      return;
    }

    utSelectedOptionDiv.classList.remove("display-none");
    utOptionTool.innerHTML = "";

    if (utSelect.value === "image") {
      utOptionTitle.textContent = "IMAGE URL";
      const input = document.createElement("input");
      input.type = "text";
      utOptionTool.append(input);
    } else if (utSelect.value === "html") {
      utOptionTitle.textContent = "HTML:";
      const textarea = document.createElement("textarea");
      utOptionTool.append(textarea);
    }
  });
};

const handleUtDensity = () => {
  utDensityBtn.addEventListener("click", () => {
    createGrid(utDensityInput.value);
  });
};

const handleInsert = () => {
  utInsertBtn.addEventListener("click", () => {
    const selectedOption = utOptionTool.firstElementChild;

    if (selectedOption.nodeName === "INPUT") {
      const selectedElements = document.querySelectorAll(".selected");
      const elements = [...selectedElements];

      if (elements.length === 0) {
        alert("Please select the range before insertion!");
        return;
      }

      const img = document.createElement("img");
      img.src = selectedOption.value;
      img.className = "banner-pic c-grab";

      const blockHolder = createHolder({
        startX: elements.at(0).getBoundingClientRect().left,
        endX: elements.at(-1).getBoundingClientRect().right,
      });

      blockHolder.append(img);

      makeBlockDynamic(blockHolder);
    }
  });
};

const createHolder = ({ startX, endX }) => {
  const containerPadding = parseInt(getComputedStyle(container).padding, 10);
  const headerBorderWidth = parseInt(
    getComputedStyle(customHeader).borderLeft,
    10
  );
  const blockHolder = document.createElement("div");
  const removeBannerElementBtn = document.createElement("button");

  blockHolder.className = "banner-element";
  removeBannerElementBtn.className =
    "remove-banner-element remove-banner-element-toggle";

  const holderWidth = Number(endX) - Number(startX);

  blockHolder.style.position = "absolute";
  blockHolder.style.left = `${startX - containerPadding - headerBorderWidth}px`;
  blockHolder.style.width = `${holderWidth}px`;

  removeBannerElementBtn.textContent = "X";

  customHeader.append(blockHolder);
  blockHolder.append(removeBannerElementBtn);

  removeSelection();
  handlBannerElementRemove(removeBannerElementBtn);
  handleElementMouseOver(blockHolder);

  return blockHolder;
};

const handleResizeHandles = () => {
  const resizeHandles = document.querySelectorAll(".resize-handle-toggle");
  resizeHandles.forEach((handle) => handle.classList.toggle("resize-handle"));
};

const handleElementMouseOver = (element) => {
  element.addEventListener("mouseover", () => {
    const leftHandle = element.firstElementChild;
    const rightHandle = leftHandle.nextElementSibling;

    if (BANNER_STATES.isUtOn) {
      leftHandle.classList.toggle("resize-handle");
      rightHandle.classList.toggle("resize-handle");
    }
  });
  element.addEventListener("mouseout", () => {
    const leftHandle = element.firstElementChild;
    const rightHandle = leftHandle.nextElementSibling;

    if (BANNER_STATES.isUtOn) {
      leftHandle.classList.toggle("resize-handle");
      rightHandle.classList.toggle("resize-handle");
    }
  });
};

const handleGridDisplay = () => {
  const gridElements = document.querySelectorAll(".grid-element");
  const removeBannerBtns = document.querySelectorAll(
    ".remove-banner-element-toggle"
  );

  removeBannerBtns.forEach((btn) =>
    btn.classList.toggle("remove-banner-element")
  );

  if (gridElements.length === 0) {
    createGrid(utDensityInput.value);
  } else removeGrid();

  handleResizeHandles();
};

const handlBannerElementRemove = (element) => {
  element.addEventListener("click", () => {
    customHeader.removeChild(element.parentElement);
  });
};
