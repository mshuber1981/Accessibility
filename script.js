/* Variables */
const heading = document.querySelector("#heading");
const form = document.querySelector("#form");
const form_input = document.querySelector("#form_input");
const list = document.querySelector("#list");
const sc_feedback = document.querySelector("#sc_feedback");

/* Functions */
function generateID() {
  let idPrefix = "task_num_";
  let tasks = document.querySelectorAll("#list > li");
  if (tasks.length == 0) {
    return `${idPrefix}0`;
  }
  return idPrefix + tasks.length;
} // Gemerate an ID for each task

function addElement(tagName, textNode, parent, attribute = null) {
  let node = document.createElement(tagName);
  if (textNode != null) {
    let customTextNode = document.createTextNode(textNode);
    node.appendChild(customTextNode);
  }
  if (attribute != null) {
    node.setAttribute(attribute[0], attribute[1]);
  }

  parent.appendChild(node);
  return node;
} // Add element to DOM https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

function addTask(task) {
  let newID = generateID();
  let taskItem = addElement("li", "", list, ["class", "task"]);
  let theCheckbox = addElement("input", null, taskItem, ["type", "checkbox"]);
  let label = addElement("label", task, taskItem, ["for", newID]);
  theCheckbox.setAttribute("id", newID);
  let deleteButton = addElement("button", "Delete", taskItem, [
    "class",
    "delete_task",
  ]);
} // Add a task

function deleteTask(theTarget) {
  list.removeChild(theTarget);
} // Delete a task https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild

function removeValue(input) {
  input.value = "";
} // Clear input value after submit

function screenReaderFeedback(task, feedback = "added") {
  sc_feedback.textContent = `${task} ${feedback}`;
} // Add screen reader text

function moveFocus(element) {
  element.focus();
} // Move focus after a task is deleted

function hasClassName(element, className) {
  if (element.classList.contains(className)) {
    return true;
  }
  return false;
} // Determine if the delete_task class is present https://developer.mozilla.org/en-US/docs/Web/API/Element/classList , https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains

/* Event listeners */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let task = form_input.value;
  addTask(task);
  removeValue(form_input);
  screenReaderFeedback(task);
}); // Form submit

list.addEventListener("click", function (e) {
  if (hasClassName(e.target, "delete_task")) {
    const li = e.target.closest("li"); // Find the parent <li> https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    const taskName = e.target.previousElementSibling.textContent; // Get the task text https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling , https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    deleteTask(li);
    moveFocus(heading);
    screenReaderFeedback(taskName, "removed");
  }
}); // Delete task
