import classes from "./Column.module.css"

export default function Column(props) {
  return (
    <td className={classes.Column}>
      {props.children}
    </td>
  )
}