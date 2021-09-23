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
    title: 'Se agotó el tiempo de conexión, vuelve a intentarlo más tarde o intenta recargar la página.',
    renderButton: true
  }

  state = {
    loading: false
  }

  showLoading = () => this.setState({ loading: true });
  hideLoading = () => this.setState({ loading: false });

  timer = (func, ) => setTimeout(func, 5000);

  onReconnect = () => {
    this.showLoading();
    this.maita = () => setTimeout(this.props.onReconnect, 500);
    this.maita2 = () => setTimeout(this.hideLoading, 1000);
    this.maita();
    this.maita2();
  }

  componentWillUnmount() {
    clearTimeout(this.maita);
    clearTimeout(this.maita2);
  }

  render() {
    const { title, status, renderButton } = this.props;
    return (
      <div id="timeout-connection">
        <div className="wrap">
          <h2 className="error">{status}</h2>
          <span className="message">{title}</span>
          {
            renderButton
            && (
              <button onClick={this.onReconnect} className="flex reload-page pointer border-none">
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
            )
          }
        </div>
      </div>
    );
  }
}

export default Timeout;
