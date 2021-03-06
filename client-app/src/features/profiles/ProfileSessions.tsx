import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserSession } from "../../app/models/profile";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";

const panes = [
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } }
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserSessions,
    profile,
    loadingSessions,
    userSessions
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserSessions(profile!.username);
  }, [loadUserSessions, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "past";
        break;
      case 2:
        predicate = "hosting";
        break;
      default:
        predicate = "future";
        break;
    }
    loadUserSessions(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingSessions}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Sessions"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userSessions.map((session: IUserSession) => (
              <Card as={Link} to={`/sessions/${session.id}`} key={session.id}>
                <Image
                  src={`/assets/categoryImages/${session.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{session.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(session.date), "do LLL")}</div>
                    <div>{format(new Date(session.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
