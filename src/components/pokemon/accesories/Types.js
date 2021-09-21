import { Component } from 'react';

const getTypes = types => types.map((type, i) => (
  <span key={i} className={`type ${type}`}>{type}</span>
));

class Types extends Component {
    render() {
      const { items } = this.props;
      const all_types = getTypes(items);
      return (
        <div className="types">{all_types}</div>
      );
    }
  }
 
export default Types;
