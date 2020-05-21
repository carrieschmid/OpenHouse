import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { ISession } from "../../../app/models/session";

const SessionLesson: React.FC<{ session: ISession }> = ({ session }) => {
  return (
    <div>
      <h2> Session Schedule</h2>
      <Segment.Group attached="top">
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Playtime</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              <p>Activities of choice in open play areas</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>9am-10am</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Activity</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              <span>{session.activity1}</span>
            </Grid.Column>
            <Grid.Column width={3}>
              <p>9am-11:30am</p>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Playtime</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              Activities of choice in open play areas
            </Grid.Column>
            <Grid.Column width={4}>
              <p>11:30am-12:30am</p>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Lunch</h5>
            </Grid.Column>
            <Grid.Column width={9}>Everyone brings lunch from home</Grid.Column>
            <Grid.Column width={4}>
              <p>12:30am-1:30am</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Playtime</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              Activities of choice in open play areas
            </Grid.Column>
            <Grid.Column width={4}>
              <p>1:30am-2:30am</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Activity</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              <span>{session.activity1}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>2:30pm-4pm</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Column width={3}>
              <h5>Playtime</h5>
            </Grid.Column>
            <Grid.Column width={9}>
              <span> Activities of choice in open play areas</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>4pm-5pm</p>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    </div>
  );
};
export default SessionLesson;

{
  /* <Table.Cell width={2}>Playtime</Table.Cell>
    <Table.Cell>
        
                      </Table.Cell>
    <Table.Cell>9am-9am</Table.Cell>
                    </Table.Row >

    <Table.Row>
        <Table.Cell>Activity </Table.Cell>
        <Table.Cell>
            Open with warm-up activity or brief group conversation,
            review expectations
                        <Divider horizontal />
            <Field
                name="activity1"
                placeholder="Description of activity, needed materials, mid-activty snack, etc."
                value={session.activity1}
                rows={3}
                component={TextAreaInput}
            />
            <Divider horizontal />
            Close with reflection time
                      </Table.Cell>
        <Table.Cell>10am-11:30am</Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Cell width={2}> Playtime</Table.Cell>
        <Table.Cell>
            Activities of choice in open play areas
                      </Table.Cell>
        <Table.Cell>11:30am-12:30pm</Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Cell width={2}> Lunch</Table.Cell>
        <Table.Cell>Everybody brings lunch from home</Table.Cell>
        <Table.Cell>12:30am-1:30pm</Table.Cell>
    </Table.Row>
                  </Table.Body >

    <Table.Row>
        <Table.Cell width={2}>Playtime</Table.Cell>
        <Table.Cell>
            Activities of choice in open play areas
                    </Table.Cell>
        <Table.Cell>1:30pm-2:30pm</Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Cell>Activity </Table.Cell>
        <Table.Cell>
            Open with warm-up activity or brief group conversation,
            review expectations
                      <Divider horizontal />
            <Field
                name="activity2"
                placeholder="Description of activity, needed materials, mid-activty snack, etc."
                value={session.activity2}
                rows={3}
                component={TextAreaInput}
            />
            <Divider horizontal />
            Close with reflection time
                    </Table.Cell>
        <Table.Cell>2:30pm-4pm</Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Cell width={2}>Playtime</Table.Cell>
        <Table.Cell>
            Activities of choice in open play areas
                    </Table.Cell>
        <Table.Cell>4pm-5pm</Table.Cell>
    </Table.Row> */
}
