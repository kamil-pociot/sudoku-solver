import { GRID_SIZE, SUBGRID_SIZE } from "./config";
import { readOnlyTable } from "./table";

const neighbors = (index) => {
  const length = GRID_SIZE;
  const n = SUBGRID_SIZE;

  const x = index % length;
  const y = Math.floor(index / length);

  const xFactor = Math.floor(x / n);
  const yFactor = Math.floor(y / n);

  const result = [];

  for (let i = xFactor * n; i < xFactor * n + n; i++) {
    for (let j = yFactor * n; j < yFactor * n + n; j++) {
      const calculatedIndex = j * length + i;
      if (calculatedIndex !== index) {
        result.push(calculatedIndex);
      }
    }
  }

  for (let i = 0; i < length; i++) {
    if (i < xFactor * n || i >= xFactor * n + n) {
      const calculatedIndex = y * length + i;
      result.push(calculatedIndex);
    }
    if (i < yFactor * n || i >= yFactor * n + n) {
      const calculatedIndex = i * length + x;
      result.push(calculatedIndex);
    }
  }

  return result;
};

const buildNeighborsArray = (n) => {
  return new Array(n).fill(0).map((_, index) => neighbors(index));
};

export const nums = [...Array(GRID_SIZE).keys()].map((i) => i + 1);
export const neighborsArray = buildNeighborsArray(Math.pow(GRID_SIZE, 2));

export const validateSudoku = (graph, neigh) => {
  for (let i = 0; i < graph.length; i++) {
    if (graph[i] !== 0) {
      const iNeighbors = neigh[i];
      const iNeighborsValues = iNeighbors.map((n) => graph[n]);
      const availableNumbers = nums.filter(
        (n) => !iNeighborsValues.includes(n)
      );

      if (!availableNumbers.includes(graph[i])) {
        return false;
      }
    }
  }
  return true;
};

export const printTable = (graph, header, originTable) => {
  const container = document.getElementById("solution-container");
  container.innerHTML = "";
  container.appendChild(readOnlyTable(graph, header, originTable));
};
