import { useState } from "react"
import { numberToChar } from "../utils/numberToChar"
import AxisCell from "./AxisCell"
import Cell from "./Cell"
import Column from "./Column"
import Row from "./Row"
import classes from "./Sheet.module.css"

export default function Sheet (props) {
  const [columnsCount, setColumnsCount] = useState(10)
  const [rowsCount, setRowsCount] = useState(20)
  
  return (
    <div className={classes.SheetWrapper}>
      <table className={classes.Sheet}>
        <tbody>
          {[...Array(columnsCount + 1)].map((column, columnIndex) => (
            columnIndex !== 0 ? (
              <AxisCell key={columnIndex}>
                {numberToChar(columnIndex - 1)}
              </AxisCell>
            ) : (
              <AxisCell key={columnIndex} />
            )
          ))}
          {[...Array(rowsCount)].map((row, rowIndex) => (
            <Row key={rowIndex}>
              <AxisCell>
                {rowIndex + 1}
              </AxisCell>
              {[...Array(columnsCount)].map((column, columnIndex) => (
                <Column key={columnIndex}>
                  <Cell cellId={`${rowIndex},${columnIndex}`} />
                </Column>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  )
}