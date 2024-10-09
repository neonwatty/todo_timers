let containers = document.querySelectorAll(".timer-container");
resetTimerDrag();

export function resetTimerDrag() {
  containers = document.querySelectorAll(".timer-container");
  containers.forEach((container) => {
    container.removeEventListener("dragstart", dragStart);
    container.addEventListener("dragstart", dragStart);

    container.removeEventListener("dragend", dragEnd);
    container.addEventListener("dragend", dragEnd);

    container.removeEventListener("dragover", dragOver);
    container.addEventListener("dragover", dragOver);

    container.removeEventListener("drop", drop);
    container.addEventListener("drop", drop);

    container.removeEventListener("drop", removeDragOverEffect);
    container.addEventListener("drop", removeDragOverEffect);

    container.removeEventListener("dragover", addDragOverEffect);
    container.addEventListener("dragover", addDragOverEffect);

    container.removeEventListener("dragleave", removeDragOverEffect);
    container.addEventListener("dragleave", removeDragOverEffect);
  });
}

function addDragOverEffect(e) {
  e.target.closest(".timer-container").classList.add("hover");
}

function removeDragOverEffect(e) {
  e.target.closest(".timer-container").classList.remove("hover");
}

function dragStart(e) {
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.clearData();
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const source = document.getElementById(data);
  const target = e.target.closest(".timer-container");

  if (target.id != source.id) {
    // Get the parent element of either node
    const parent = target.parentNode;

    // move target to before source
    parent.insertBefore(source, target);
  }
}
