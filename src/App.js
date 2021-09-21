/* React */
import { Component, Suspense, lazy, Fragment } from 'react';

/* Components */
import Footer from '@dist/Footer';

/* Librarys */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

/* Routes */
const Home = lazy(() => import('@routes/Home'));
const Pokemon = lazy(() => import('@routes/Pokemon'));
const Pokemon404 = lazy(() => import('@routes/Pokemon404'));

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Suspense fallback={null}>
            <Switch>
              <Route path="/pokemon-no-encontrado" component={Pokemon404} />
              <Page path="/" exact component={Home} />
              <Page path="/:pokemon" exact component={Pokemon} />
              <Redirect to="/pokemon-no-encontrado" />
            </Switch>
          </Suspense>
        </Router>
      </Fragment>
    )
  }
}

class Page extends Component {
  render() {
    return (
      <Fragment>
        <Route {...this.props} />
        <Footer />
      </Fragment>
    )
  }
}