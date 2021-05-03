import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../layout/NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
function App() {
  // a unique key prop added to each route component will cause React to recreate the component instance when the route changes.
  // otherwise from edit to create page, the ActivityForm and data on it will be preserved
  const location = useLocation();

  return (
    <>
      <Route path='/' exact component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route path='/activities' exact component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
          </Container>
        </>
      )
      }>
      </Route>
    </>
  );
}

export default observer(App);
