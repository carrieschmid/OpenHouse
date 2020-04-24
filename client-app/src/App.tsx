import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header, Icon } from "semantic-ui-react";

function App() {
  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>OpenHouse</Header.Content>
      </Header>
    </div>
  );
}

export default App;
