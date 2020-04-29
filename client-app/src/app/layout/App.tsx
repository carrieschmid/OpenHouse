import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { ISession } from "../models/session";
import { render } from "@testing-library/react";
import NavBar from "../../features/nav/NavBar";
import SessionDashboard from "../../features/sessions/dashboard/SessionDashboard";

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
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <SessionDashboard sessions={sessions} />
      </Container>
    </Fragment>
  );
};

export default App;
