import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
// import { observer } from "mobx-react-lite";
// import { Link, NavLink } from "react-router-dom";
// import { RootStoreContext } from "../../app/stores/rootStore";

// import React from "./node_modules/react";
// import { Menu, Container, Button } from "./node_modules/semantic-ui-react";
// import { observer } from "./node_modules/mobx-react-lite";
// import { Link } from "./node_modules/react-router-dom";

const NavBar = () => {
  //   const rootStore = useContext(RootStoreContext);
  //   const { user, logout } = rootStore.userStore;
  return (
    <Menu vertical>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.jpg"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item name="About" />
        <Menu.Item name="Sessions" />
        <Menu.Item name="Members" />

        <Menu.Item>
          <Button positive content="Create Session" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
