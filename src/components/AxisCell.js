import classes from "./AxisCell.module.css"

export default function AxisCell (props) {
  return (
    <th className={classes.AxisCell}>
      {props.children}
    </th>
  )
}