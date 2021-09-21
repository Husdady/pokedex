import { Component, Fragment } from 'react';
// import { Detector } from "react-detect-offline";
import { NetworkDetector } from 'react-network-status';

class NetworkStatus extends Component {
  state = {
    isConnected: null,
    isOffline: false
  }

  // onNetworkStatusChange = status => status !== this.state.isConnected && this.setState({ isConnected: status, isOffline: !status });

  onNetworkStatusChange = status => {
    if (![undefined, this.state.isConnected].includes(status)) {
      console.log(status);
      this.setState({ isConnected: status, isOffline: !this.state.isConnected });
    }
  }

  componentDidMount() {
    this.onNetworkStatusChange();
  }

  render() {
    const { isConnected, isOffline } = this.state;

    return (
      <Fragment>
        <NetworkDetector
          onChange={this.onNetworkStatusChange}
        />
        {
          isConnected
            ? this.props.children
            : !isConnected && isOffline
            && this.props.offlineComponent
        }
      </Fragment>
      // <Detector
      //   render={status => {
      //     console.log(status)
      //     return null;
      //   }}
      // />
    );
  }
}

export default NetworkStatus;