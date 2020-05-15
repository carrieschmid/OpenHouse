import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ISession } from "../../../app/models/session";
import { format } from "date-fns";
import SessionListItemAttendees from "./SessionListItemAttendees";

const SessionListItem: React.FC<{ session: ISession }> = ({ session }) => {
  // const host = session.attendees.filter((x) => x.isHost)[0];

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            {/* <Item.Image size="tiny" circular src={host.image} /> */}
            <Item.Content>
              <Item.Header as={Link} to={`/sessions/${session.id}`}>
                {session.title}
              </Item.Header>

              <Item.Meta>{format(session.date, "eeee, MMMM do")}</Item.Meta>
              {/* <Item.Description> Hosted by {host.displayName}</Item.Description> */}
              <Item.Description>
                <span>{session.description}</span>
              </Item.Description>
              {session.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this session"
                  />
                </Item.Description>
              )}
              {session.isGoing && !session.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are going to this session"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        {/* <Icon name="clock" /> */}
        {/* {format(session.date, "eeee, MMMM do ")} */}
        <Icon name="marker" /> {session.address}, {session.city}
      </Segment>
      <Segment secondary>
        <SessionListItemAttendees attendees={session.attendees} />>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/sessions/${session.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default SessionListItem;
