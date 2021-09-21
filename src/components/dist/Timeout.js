/* React */
import { Component, Fragment } from 'react';

/* Librarys */
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* CSS */
import '@css/styles.timeout.css';

const styles = {
  icon: {
    marginRight: 6
  },
  reconnecting: {
    marginBottom: -5
  },
  loading: {
    marginRight: 8
  }
}

class Timeout extends Component {

  static defaultProps = {
    status: 408,
    title: 'Se agotó el tiempo de conexión, vuelve a intentarlo más tarde o intenta recargar la página.'
  }

  state = {
    loading: false
  }

  showLoading = () => this.setState({ loading: true });
  hideLoading = () => this.setState({ loading: false });

  render() {
    return (
      <div id="timeout-connection">
        <div className="wrap">
          <h2 className="error">{this.props.status}</h2>
          <span className="message">{this.props.title}</span>
          <button onClick={this.props.onReconnect} className="flex reload-page pointer border-none">
            {
              this.state.loading
                ? (
                  <div className="wrap-reconnecting align-center">
                    <div className="loading" style={styles.loading} />
                    <span style={styles.reconnecting}>Reconectando...</span>
                  </div>
                )
                : (
                  <Fragment>
                    <FontAwesomeIcon icon={faRedoAlt} size="lg" style={styles.icon} />
                    <span style={styles.reconnecting}>Volver a cargar</span>
                  </Fragment>
                )
            }
          </button>
        </div>
      </div>
    );
  }
}

export default Timeout;