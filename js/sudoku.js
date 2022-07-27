import {
  neighborsArray,
  nums,
  validateSudoku,
  printTable,
} from "./sudoku_utils";

export async function solveSudoku(graph, slowDown, delay) {
  const originTable = graph.map((n) => n && n !== 0);
  if (!validateSudoku(graph, neighborsArray)) {
    printTable(graph, "Sudoku invalid");
    return;
  }
  let counter = 0;
  // 1. Create stack
  let s = [];

  // 2. Push first item to the stack
  s.push({ index: 0, value: 0, graph: Array.from(graph) });

  while (s.length > 0) {
    // 3. Take from the stack
    let t = s.pop();

    counter++;
    if (slowDown) {
      printTable(t.graph, `In progress... ${counter}`, originTable);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // 4. If there are no more unvisited vertices
    if (!t.graph.includes(0)) {
      // Solution is found
      console.log({ result: true, graph: t.graph, counter });
      printTable(t.graph, `Solved in ${counter} iterations`, originTable);
      return;
    }

    // 5. Find next unvisited vertex
    const next = t.graph.indexOf(0, t.index);
    // 6. Push next operation to the stack
    assignAndPush(next, t, s);
  }

  // 13. Stack empty and no solution found
  printTable(graph, "Solution not found");
}

const getAvailableNumbers = (tNeighbor, t) => {
  // 8. Get all neighbors for given vertex
  const tNeighbors = neighborsArray[tNeighbor];
  // 9. Find neighbor values
  const tNeighborsValues = tNeighbors.map((n) => t.graph[n]);
  // 10. Filter the out from candidates array
  return nums.filter((n) => !tNeighborsValues.includes(n));
};

const assignAndPush = (tNeighbor, t, s) => {
  // 7. Get numeric candidates
  const availableNumbers = getAvailableNumbers(tNeighbor, t);
  // 11. For every candidate
  for (let num of availableNumbers) {
    const arrayCopy = Array.from(t.graph);
    arrayCopy[tNeighbor] = num;
    // 12. Push new operation with candidate and copy of a graph
    s.push({ index: tNeighbor, value: num, graph: arrayCopy });
  }
};
