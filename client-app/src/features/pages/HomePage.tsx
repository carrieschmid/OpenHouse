import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.jpg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Header as="h5" inverted textAlign="left">
              OpenHouse extends teaching and learning beyond the four walls of
              the home. Collaborate with other parents to create a community
              that effectively and efficiently supports young learners.
              OpenHouse provides a structure to connect and organize families to
              share their resources and time with each other.{" "}
              <Link to="/about">Learn more about this unique community.</Link>
            </Header>

            <Button as={Link} to="/sessions" size="huge" inverted>
              Go to sessions!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content={`Welcome to OpenHouse`} />
            <Header as="h5" inverted textAlign="left">
              OpenHouse extends teaching and learning beyond the four walls of
              the home. Collaborate with other parents to create a community
              that effectively and efficiently supports young learners.
              OpenHouse provides a structure to connect and organize families to
              share their resources and time with each other.{" "}
              <Link to="/about">Learn more about this unique community.</Link>
            </Header>
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
