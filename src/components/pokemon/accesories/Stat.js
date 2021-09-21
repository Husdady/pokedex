/* React */
import { PureComponent } from 'react';

const stat_style = {
  width: 30,
  heigth: 30,
  marginRight: 5
}

export default class Stat extends PureComponent {
  render () {
    const { name, title, icon, value } = this.props;
    const stat_name = `${name}-stat`
    return (
      <span className="stat" title={title}>
        <img src={icon} style={stat_style} alt={stat_name} />
        <span>{value}</span>
      </span>
    )
  }
}