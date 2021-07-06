import { CellValueState } from "../store/CellValueState"
import { cellIdtoMatrixIndices } from "./cellIdToMatrixIndices"

export const getEquationExpressionFromState = (
  getState, 
  expression, 
  notAllowedCellIds = [], 
) => {
  const filterFoundCells = notAllowedCellIds.filter((cellId) => 
    expression.includes(cellId) 
  )

  if (filterFoundCells.length) {
    return "!ERROR"
  }

  const cellValues = [
    ...Array.from(expression.matchAll(/[A-Z]+[0-9]+/gi)), 
  ]
    .map(regexOutput => regexOutput[0])
    .map(cellId => {
      const { row, column } = cellIdtoMatrixIndices(cellId) 

      let value = "" 

      try {
        value = getState(CellValueState(`${row},${column}`)) || 0

        if (value.startsWith("=")) {
          notAllowedCellIds.push(cellId) 
          value = getEquationExpressionFromState(
            getState, 
            value.slice(1), 
            notAllowedCellIds, 
          )
        }
      } catch {}

      return {
        cellId, 
        value, 
      }
    })

  const evaluatedExpression = cellValues.reduce(
    (finalExpression, cellValue) => 
      finalExpression.replaceAll(cellValue.cellId, cellValue.value.toString()), 
    expression 
  )

  // Evaluatee expression needs to be added between brackets to avoid issues cased 
  // by Mathematical operation priority 
  return `(${evaluatedExpression})` 
}