import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu vertical>
      {user && (
        <Menu.Item position="right">
          <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
          <Dropdown pointing="top left" text={user.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/username`}
                text="My profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
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
