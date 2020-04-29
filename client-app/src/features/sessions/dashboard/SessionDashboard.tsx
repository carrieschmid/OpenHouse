import React, { useEffect, useContext } from "react";
import { Grid, List } from "semantic-ui-react";
import SessionList from "./SessionList";
// import { observer } from "mobx-react-lite";
// import { LoadingComponent } from "../../../app/layout/LoadingComponent";
// import { RootStoreContext } from "../../../app/stores/rootStore";
import { ISession } from "../../../app/models/session";

interface IProps {
  sessions: ISession[];
}

const SessionDashboard: React.FC<IProps> = ({ sessions }) => {
  // const rootStore = useContext(RootStoreContext);
  // const { loadActivities, loadingInitial } = rootStore.activityStore;

  // useEffect(() => {
  //     loadActivities();
  // }, [loadActivities]);

  // if (loadingInitial) return <LoadingComponent content="Loading activities." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <SessionList />
        {/* <List>
          {sessions.map((session) => (
            <List.Item key={session.id}>{session.title}</List.Item>
          ))}
        </List> */}
      </Grid.Column>
      {/* <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column> */}
    </Grid>
  );
};

export default SessionDashboard;
