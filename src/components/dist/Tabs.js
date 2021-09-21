/* React */
import { Component, Fragment } from 'react';

/* JS */
import { getKey, setKey } from '@assets/js/localStorage';
import { CURRENT_TAB } from '@assets/js/keys';

class Tabs extends Component {

  static defaultProps = {
    keepChanges: false
  }

  state = {
    activeTab: this.props.children[0].props.label
  }

  handleShowContentTab = label => {
    if (label !== this.state.activeTab) {
      this.setState({ activeTab: label })
      this.props.keepChanges && setKey(CURRENT_TAB, label);
    }
  };

  componentDidMount() {
    if (this.props.keepChanges) {
      const tabStorage = getKey(CURRENT_TAB);
      if (tabStorage) {
        this.setState({ activeTab: tabStorage })
      }
    }
  }

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const tabItems = children.map((tab, i) => {
      const { label } = tab.props;
      const handleOnTab = () => this.handleShowContentTab(label);
      return (
        <Tab key={i} label={tab.props.children} isActive={activeTab === label} onClick={handleOnTab} />
      )
    });

    const tabContent = children.map((tab, i) => {
      if (tab.props.label !== activeTab) return null;
      return (
        <Fragment key={i}>{tab.props.component}</Fragment>
      );
    });

    return (
      <div className="tabs">
        <ul className="tab-list">
          {tabItems}
        </ul>
        <div className="tab-content">
          {tabContent}
        </div>
      </div>
    );
  }
}

class Tab extends Component {
  render() {
    const isActive = this.props.isActive ? 'active' : 'desactive';
    const activeClass = `tab-item pointer ${isActive}`;
    return (
      <li onClick={this.props.onClick} className={activeClass}>
        {this.props.label}
      </li>
    );
  }
}

export default Tabs;
