import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import SessionDashboard from "../../features/sessions/dashboard/SessionDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import HomePage from "../../features/pages/HomePage";
import SessionForm from "../../features/sessions/form/SessionForm";
import LoginForm from "../../features/user/LoginForm";
import SessionDetails from "../../features/sessions/details/SessionDetails";
import { ToastContainer } from "react-toastify";
//Toast not working, looking at section 133
import NotFound from "./NotFound";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
//observer takes another component as it's parameter and returns a new component with extra powers to observe observables
import ModalContainer from "../common/modals/ModalContainer";
import PrivateRoute from "./PrivateRoute";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <Fragment>
      <ModalContainer />

      <ToastContainer position="bottom-right" />
      <NavBar />
      <Route exact path="/" component={HomePage} />

      {/* hit a page with route and anything else, this will match */}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                {/* <Switch /> component will only render the first route that matches/includes the path. Once it finds the first route that matches the path, it will not look for any other matches. Not only that, it allows for nested routes to work properly, which is something that <Router /> will not be able to handle. */}

                <Route exact path="/sessions" component={SessionDashboard} />
                <Route path="/sessions/:id" component={SessionDetails} />
                <Route
                  key={location.key}
                  path={["/createSession", "/manage/:id"]}
                  component={SessionForm}
                />
                <Route path="/login" component={LoginForm} />
                {/* <PrivateRoute path="/members" component={MemberDashboard} /> */}
                {/* <PrivateRoute path="/about" component={AboutPage} /> */}
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
//now App is observer of SessionStore
