import React, { useEffect, useContext, useState } from "react";
import { Grid, Button, Loader } from "semantic-ui-react";
import SessionList from "./SessionList";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import SessionFilters from "./SessionFilters";

export const SessionDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadSessions,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.sessionStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadSessions().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading sessions...." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <SessionList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          as={NavLink}
          to="/createSession"
          positive
          content="Create Session"
        />
        <SessionFilters />
      </Grid.Column>

      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(SessionDashboard);
