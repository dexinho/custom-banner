import { utBtns, utilityTools } from "./querySelectors.js";

export const handleUtBtns = () => {
  utBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "ut-toggle-btn") {
        utilityTools.classList.toggle("ut-toggle");
        btn.firstElementChild.classList.toggle("fa-arrow-left");
      }
    });
  });
};
