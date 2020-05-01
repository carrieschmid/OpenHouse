import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import SessionDetailedHeader from "./SessionDetailedHeader";
import SessionDetailedInfo from "./SessionDetailedInfo";
import SessionDetailedChat from "./SessionDetailedChat";
import SessionDetailedSidebar from "./SessionDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";
interface DetailParams {
  id: string;
}

const SessionDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { session, loadSession, loadingInitial } = rootStore.sessionStore;

  useEffect(() => {
    loadSession(match.params.id);
  }, [loadSession, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading Session..." />;

  if (!session) return <h2> Not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <SessionDetailedHeader session={session} />
        <SessionDetailedInfo session={session} />
        <SessionDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <SessionDetailedSidebar attendees={session.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(SessionDetails);
