import React, { useContext, Fragment } from "react";
import {
  Container,
  Segment,
  Header,
  Button,
  Image,
  Menu,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
// import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";

export const HomePage: React.FC = () => {
  // const rootStore = useContext(RootStoreContext);
  // const { loadSessions, loadingInitial } = rootStore.sessionStore;
  // const { isLoggedIn, user } = rootStore.userStore;
  // const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Fragment>
          <Grid>
            <Grid.Column width={10}></Grid.Column>

            <Grid.Column width={2}>
              <Image
                // size="massive"
                src="/assets/logo.jpg"
                alt="logo"
                style={{ marginBottom: 12 }}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h1" inverted>
                Open House
              </Header>
            </Grid.Column>
          </Grid>
        </Fragment>
      </Container>
    </Segment>
  );
};

export default HomePage;
