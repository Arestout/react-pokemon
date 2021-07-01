import React, { Suspense, lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { AnimatePresence } from 'framer-motion';

import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
// import { PokemonListPage } from './pages/PokemonPage/PokemonListPage';
// import PokemonDetailsPage from 'pages/PokemonDetailsPage';
import './App.styles.scss';
import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner';

const PokemonListPage = lazy(() =>
  import(
    /* webpackChunkName: "pokemon-list",  webpackPrefetch: true */ 'pages/PokemonListPage'
  )
);
const PokemonDetailsPage = lazy(() =>
  import(
    /* webpackChunkName: "pokemon-details",  webpackPrefetch: true */ 'pages/PokemonDetailsPage'
  )
);

export const App: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Suspense fallback={<Spinner />}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={PokemonListPage} />
              <Route path="/page/:page" component={PokemonListPage} />
              <Route path="/pokemon/:name" component={PokemonDetailsPage} />
              <Route>
                <ErrorMessage errorMessage="404. Page not found" />
              </Route>
            </Switch>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
};

function ErrorFallback({ error }: FallbackProps) {
  // eslint-disable-next-line
  console.log('Error: ', error.message);
  return <ErrorMessage errorMessage="Please refresh the page and try again." />;
}
