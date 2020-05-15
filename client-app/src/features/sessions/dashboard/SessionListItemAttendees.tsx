//add event host feature here

import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/session";

interface IProps {
  attendees: IAttendee[];
}

const SessionListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item key={attendee.username}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default SessionListItemAttendees;
