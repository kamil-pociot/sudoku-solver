import "regenerator-runtime/runtime";
import { formTable, readOnlyTable } from "./table";
import { solveSudoku } from "./sudoku";
import { options } from "./options";

window.onload = () => {
  const renderFormTable = (graph) => {
    const tableContainer = document.getElementById("puzzle-container");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(
      formTable(graph, "Choose existing or enter you own:")
    );

    document.getElementById("sudoku-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const arr = Array.from(e.target.querySelectorAll("td > input")).map(
        (el) => (el.value ? parseInt(el.value) : 0)
      );
      const slowDown = e.target.querySelector("#slow-down").checked;
      const delay = e.target.querySelector("#span-input").innerText;
      solveSudoku(arr, slowDown, delay)
        .then(() => console.log("success"))
        .catch((error) => console.warn(error));
    });

    Array.from(document.getElementsByClassName("sudoku-input")).forEach(
      (input) => {
        input.addEventListener("input", (e) => {
          const id = e.target.id;
          const prefix = id.slice(0, 6);
          const index = parseInt(id.slice(6));
          if (index < 80) {
            const nextId = `${prefix}${index + 1}`;
            document.getElementById(nextId).select();
          }
        });
      }
    );
  };

  const optionsSelect = document.getElementById("sudoku-select");
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionsSelect.setAttribute("value", "123");
    optionElement.innerText = option.name;
    optionsSelect.appendChild(optionElement);
  });

  optionsSelect.addEventListener("change", (e) => {
    renderFormTable(options[e.target.options.selectedIndex].graph);
  });

  const solutionContainer = document.getElementById("solution-container");
  solutionContainer.innerHTML = "";
  solutionContainer.appendChild(
    readOnlyTable(new Array(81).fill(0), "Pending...")
  );

  renderFormTable(options[0].graph);
};
