import { readOnlyTable } from "./table";
import { neighborsArray, nums, validateSudoku } from "./sudoku_utils";

const OPTIMIZATIONS = false;

export async function solveSudoku(graph, slowDown, delay) {
  const originTable = graph.map((n) => n && n !== 0);
  if (!validateSudoku(graph, neighborsArray)) {
    printTable(graph, "Sudoku invalid");
    return;
  }
  let counter = 0;
  let s = [];

  s.push({ index: 0, value: 0, graph: Array.from(graph) });

  while (s.length > 0) {
    let t = s.pop();

    counter++;
    if (slowDown) {
      printTable(t.graph, `In progress... ${counter}`, originTable);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!t.graph.includes(0)) {
      console.log({ result: true, graph: t.graph, counter });
      printTable(t.graph, `Solved in ${counter} iterations`, originTable);
      return;
    }

    const next = t.graph.indexOf(0, t.index);
    assignAndPush(next, t, s);
  }

  printTable(graph, "Solution not found");
}

function getAvailableNumbers(tNeighbor, t) {
  const tNeighbors = neighborsArray[tNeighbor];
  const tNeighborsValues = tNeighbors.map((n) => t.graph[n]);
  if (OPTIMIZATIONS) {
  }
  return nums.filter((n) => !tNeighborsValues.includes(n));
}

const assignAndPush = (tNeighbor, t, s) => {
  const availableNumbers = getAvailableNumbers(tNeighbor, t);
  for (let num of availableNumbers) {
    const arrayCopy = Array.from(t.graph);
    arrayCopy[tNeighbor] = num;
    s.push({ index: tNeighbor, value: num, graph: arrayCopy });
  }
};

function printTable(graph, header, originTable) {
  const container = document.getElementById("solution-container");
  container.innerHTML = "";
  container.appendChild(readOnlyTable(graph, header, originTable));
}
