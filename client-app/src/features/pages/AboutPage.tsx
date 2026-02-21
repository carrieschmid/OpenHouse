import React, { useContext } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const AboutPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  return (
    <Segment>
      <Container text>
        <Header as="h2" content="How to Sign Up and Participate" />
        <p>
          Ready to join the OpenHouse community? Getting started is simple.
          First, create an account and log in. Once you're logged in, navigate
          to the{" "}
          {user ? (
            <Link to={`/profile/${user.username}`}>
              <strong>About</strong> section of your profile
            </Link>
          ) : (
            <strong>About section of your profile</strong>
          )}{" "}
          and submit an application to participate. Our team will review your
          application and connect you with families in your area. From there,
          you'll be able to browse and join sessions, host your own, and start
          collaborating with other parents to support your young learners.
        </p>
      </Container>
    </Segment>
  );
};

export default AboutPage;
