import { useEffect, useRef, useState } from "react"
import classes from "./Cell.module.css"

export default function Cell (props) {
  const [value, setValue] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef(null)
  const handleLabelClick = () => {
    setIsEditMode(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }
  const finishEdit = () => {
    setIsEditMode(false)
  }
  const handleClickOutsideOfInput = e => {
    if (e.target?.dataset?.cellId !== props.cellId) {
      finishEdit()
    }
  }
  const handleCellInputChange = e => {
    setValue(e.target.value)
  }
  const handleCellInputKeyDown = e => {
    if (e.key === "Enter") {
      setIsEditMode(false)
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideOfInput)
    return () => {
      document.removeEventListener("click", handleClickOutsideOfInput)
    }
  }, [])

  return (
    isEditMode ? (
      <input 
        type="text" 
        value={value}
        className={classes.CellInput}
        ref={inputRef}
        onChange={handleCellInputChange}
        onKeyDown={handleCellInputKeyDown}
        data-cell-id={props.cellId}
      />
    ) : (
      <div
        className={classes.CellLabel}
        onClick={handleLabelClick}
        data-cell-id={props.cellId}
      >
        {value}
      </div>
    )
  )
}