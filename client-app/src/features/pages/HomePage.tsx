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
            <Image
              size="medium"
              src="/assets/leoandmaisie.jpg"
              alt="Leo and Maisie"
              style={{ marginBottom: 12 }}
            />

            <Grid.Column width={2}>
              <Image
                // size="massive"
                src="/assets/logo.jpg"
                alt="logo"
                style={{ marginBottom: 12 }}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Fragment>
                <Header as="h1">OpenHouse</Header>
                <Header as="h3" textAlign="left">
                  OpenHouse extends teaching and learning beyond the four walls
                  of the home. Collaborate with other parents to create a
                  community that effectively and efficiently supports young
                  learners. OpenHouse provides a structure to connect and
                  organize families to share their resources and time with each
                  other. Learn more about this unique community.
                </Header>
              </Fragment>
            </Grid.Column>
          </Grid>
        </Fragment>
      </Container>
    </Segment>
  );
};

export default HomePage;
