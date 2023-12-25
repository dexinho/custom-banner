export const makeBlockDynamic = (block) => {
  let isResizing = false;
  let isDragging = false;

  const resizeHandle = {
    initialX: 0,
    initialWidth: 0,
    initialLeft: 0,
    classList: null,
  };

  const dragHandle = {
    initialX: 0,
    initialLeft: 0,
  };

  const handleMouseMove = (e) => {
    e.preventDefault();

    if (isResizing) {
      const deltaX = e.clientX - resizeHandle.initialX;

      if (resizeHandle.classList.contains("right")) {
        block.style.width = `${resizeHandle.initialWidth + deltaX}px`;
      } else if (resizeHandle.classList.contains("left")) {
        block.style.width = `${resizeHandle.initialWidth - deltaX}px`;
        block.style.left = `${resizeHandle.initialLeft + deltaX}px`;
      }
    } else if (isDragging) {
      const deltaX = e.clientX - dragHandle.initialX;

      block.style.left = `${dragHandle.initialLeft + deltaX}px`;
    }
  };

  const stopResizing = () => {
    isResizing = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const startResizing = (e, handle) => {
    isResizing = true;
    resizeHandle.initialX = e.clientX;
    resizeHandle.initialWidth = block.clientWidth;
    resizeHandle.initialLeft = block.offsetLeft;
    resizeHandle.classList = handle.classList;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const stopDragging = (e) => {
    isDragging = false;

    e.target.classList.remove("c-grabbing");
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopDragging);
  };

  const startDragging = (e) => {
    isDragging = true;
    dragHandle.initialX = e.clientX;
    dragHandle.initialLeft = block.offsetLeft;

    e.target.classList.add("c-grabbing");
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);
  };

  const createResizeHandle = (className) => {
    const handle = document.createElement("div");
    handle.className = `resize-handle resize-handle-toggle ${className}`;
    handle.addEventListener("mousedown", (e) => startResizing(e, handle));
    return handle;
  };

  const rightHandle = createResizeHandle("right");
  const leftHandle = createResizeHandle("left");

  block.prepend(rightHandle);
  block.prepend(leftHandle);

  block.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("resize-handle")) {
      startDragging(e);
    }
  });
};
