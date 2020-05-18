import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { ISession } from "../../../app/models/session";
import { format } from "date-fns/esm";

const SessionDetailedInfo: React.FC<{ session: ISession }> = ({ session }) => {
  return (
    <div>
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{session.description}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(session.date, "eeee do MMMM")},</span>

              {session.timeblock}
              {/* {format(session.date!, "h h")} */}
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {session.address}, {session.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    </div>
  );
};
export default SessionDetailedInfo;
