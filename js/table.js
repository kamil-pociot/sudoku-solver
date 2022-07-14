export const readOnlyTable = (graph, title, originTable) => {
  return table(title, graph, readOnlyElement, originTable);
};

export const formTable = (graph, title) => {
  const form = document.createElement("form");
  form.setAttribute("id", "sudoku-form");

  const tableElement = table(title, graph, inputElement);
  form.appendChild(tableElement);

  const submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");

  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-container");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "slow-down");
  checkbox.classList.add("form-checkbox");

  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", "slow-down");
  checkboxLabel.innerText = "Slow down (delay ";

  const delayInput = document.createElement("span");
  delayInput.classList.add("span-input");
  delayInput.setAttribute("id", "span-input");
  delayInput.setAttribute("role", "textbox");
  delayInput.setAttribute("contenteditable", "true");
  delayInput.innerText = "1";

  delayInput.addEventListener("keydown", (e) => {
    // prettier-ignore
    const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', "Backspace", "ArrowLeft", "ArrowRight"]
    console.log(e.key, e.code);
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      e.target.blur();
    }
  });

  const delayLabel = document.createElement("p");
  delayLabel.innerText = "ms)";

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkboxLabel);
  checkboxContainer.appendChild(delayInput);
  checkboxContainer.appendChild(delayLabel);
  submitContainer.appendChild(checkboxContainer);

  const solveButton = document.createElement("button");
  solveButton.setAttribute("type", "submit");
  solveButton.classList.add("solve-button");
  solveButton.innerText = "Solve!";

  submitContainer.appendChild(solveButton);
  form.appendChild(submitContainer);
  return form;
};

const table = (title, graph, cellElement, originTable) => {
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.innerText = title;
  table.appendChild(caption);
  for (let i = 0; i < 3; i++) {
    const colgroup = document.createElement("colgroup");
    colgroup.innerHTML = "<col><col><col>";
    table.appendChild(colgroup);
  }
  for (let i = 0; i < 3; i++) {
    const tbody = document.createElement("tbody");
    for (let k = 0; k < 3; k++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 9; j++) {
        const index = (i * 3 + k) * 9 + j;
        const value = graph[index];
        const addedValue = originTable ? !originTable[index] : false;
        const td = cellElement(value, index, addedValue);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  }
  return table;
};

const readOnlyElement = (innerText, _, addedValue) => {
  const td = document.createElement("td");
  if (addedValue) {
    td.classList.add("added-value-cell");
  }
  if (innerText !== 0) {
    td.innerText = innerText;
  }
  return td;
};

const inputElement = (innerText, index) => {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.setAttribute("id", `input-${index}`);
  input.classList.add("sudoku-input");
  if (innerText !== 0) {
    input.value = innerText;
  }
  td.appendChild(input);
  return td;
};
