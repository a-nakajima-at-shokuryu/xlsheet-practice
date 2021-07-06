import { evaluate } from "mathjs";
import { selector } from "recoil";
import { CellValueState } from "./CellValueState";
import { getEquationExpressionFromState } from "../utils/getEquationExpressionFromState";
import { memoize } from "../utils/memoize";

export const EvaluatedCellValueState = (cellId) => 
  memoize(`evaluatedCell_${cellId}`, () => 
    selector({
      key: `evaluatedCell_${cellId}`, 
      get: ({ get }) => {
        const value = get(CellValueState(cellId))

        if (value.startsWith("=")) {
          try {
            const evaluatedExpression = getEquationExpressionFromState(
              get, 
              value.slice(1)
            )

            if (evaluatedExpression === "!ERROR") {
              return "!ERROR"
            }

            return evaluate(evaluatedExpression)
          } catch {
            return value 
          }
        }

        return value
      }
    })
  )