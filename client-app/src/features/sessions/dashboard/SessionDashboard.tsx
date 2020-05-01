import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import SessionList from "./SessionList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

export const SessionDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadSessions, loadingInitial } = rootStore.sessionStore;

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  if (loadingInitial) return <LoadingComponent content="Loading activities." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <SessionList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Session filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(SessionDashboard);
