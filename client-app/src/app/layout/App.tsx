import React, { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { ISession } from "../models/session";
import { render } from "@testing-library/react";
import NavBar from "../../features/nav/NavBar";

interface IState {
  sessions: ISession[];
}

const App = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    axios
      .get<ISession[]>("http://localhost:5000/api/sessions")
      .then((response) => {
        setSessions(response.data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <List>
        {sessions.map((session) => (
          <List.Item key={session.id}>{session.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
