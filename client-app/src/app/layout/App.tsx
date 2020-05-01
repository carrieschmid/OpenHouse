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
import HomePage from "../../features/home/HomePage";
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
      <Route exact path="/" component={HomePage} />
      {/* hit a page with route and anything else, this will match */}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/sessions"
                  component={SessionDashboard}
                />
                <PrivateRoute path="/sessions/:id" component={SessionDetails} />
                <PrivateRoute
                  key={location.key}
                  path={["/createSession", "/manage/:id"]}
                  component={SessionForm}
                />
                <PrivateRoute path="/login" component={LoginForm} />
                <Route component={NotFound} />
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
