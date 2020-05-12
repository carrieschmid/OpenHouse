import React, { useContext } from "react";
import { Segment, Item, Button, Image, Header } from "semantic-ui-react";
import { ISession } from "../../../app/models/session";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";

const sessionImageStyle = {
  filter: "brightness(30%)"
};

const sessionImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const SessionDetailedHeader: React.FC<{ session: ISession }> = ({
  session
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendSession, cancelAttendance, loading } = rootStore.sessionStore;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${session.category}.jpg`}
          fluid
          style={sessionImageStyle}
        />
        <Segment basic style={sessionImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={session.title}
                  style={{ color: "white" }}
                />
                {/* <p>{format(session.date, "eee,  MMM do ")}</p> */}
                {/* <p>
                  Hosted by <strong>Bob</strong>
                </p> */}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {session.isHost ? (
          <Button
            as={Link}
            to={`/manage/${session.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        ) : session.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendSession} color="teal">
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};
export default observer(SessionDetailedHeader);
