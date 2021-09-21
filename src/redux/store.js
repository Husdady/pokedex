/* Librarys */
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, createStore, applyMiddleware } from 'redux';

/* Reducers */
import loading from './reducers/loading';
import pokemons, { my_pokemons, my_favorites_pokemons } from './reducers/pokemons';

const persistConfig = {
  key: 'root', storage,
  whitelist: ['pokemons', 'my_pokemons', 'my_favorites_pokemons']
}

const reducers = combineReducers({
  loading,
  pokemons,
  my_pokemons,
  my_favorites_pokemons,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const storeRedux = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor }
}

export default storeRedux;
