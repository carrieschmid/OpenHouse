import React, { useState, useContext, useEffect } from "react";
import {
  Segment,
  Form,
  Button,
  GridColumn,
  Grid,
  Divider,
  Header,
  Table,
  Item
} from "semantic-ui-react";
import { SessionFormValues } from "../../../app/models/session";
import { v4 as uuid } from "uuid";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/categoryOptions";
import { timeblock } from "../../../app/common/options/timeblockOptions";
import { combinedDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required." }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("City"),
  address: isRequired("Address"),
  date: isRequired("Date"),
  timeblock: isRequired("Timeblock")
});

interface DetailParams {
  id: string;
}

const SessionForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createSession,
    editSession,
    submitting,
    loadSession
  } = rootStore.sessionStore;

  const [session, setSession] = useState(new SessionFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadSession(match.params.id)
        .then((session) => setSession(new SessionFormValues(session)))
        .finally(() => setLoading(false));
    }
  }, [loadSession, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combinedDateAndTime(values.date, values.time);
    const { date, time, ...session } = values;
    session.date = dateAndTime;
    // combined date and tim enot working
    if (!session.id) {
      let newSession = {
        ...session,
        id: uuid()
      };
      createSession(newSession);
    } else {
      editSession(session);
    }
  };

  return (
    <Grid>
      <GridColumn width={16}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={session}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    session.id
                      ? () => history.push(`/session${session.id}`)
                      : () => history.push("/sessions")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />

                <Header as="h3">Create Session</Header>
                <Divider horizontal />
                <Field
                  name="title"
                  placeholder="Title"
                  value={session.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  value={session.description}
                  rows={3}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={session.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={session.date}
                  />
                  {/* <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={session.time}
                  /> */}
                  <Field
                    component={SelectInput}
                    options={timeblock}
                    name="timeblock"
                    placeholder="Timeblock"
                    value={session.timeblock}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="address"
                  placeholder="Address"
                  value={session.address}
                />

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={session.city}
                />

                <Divider horizontal />
                <Header as="h3">Add Schedule</Header>
                <Divider horizontal />

                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={2}>Playtime</Table.Cell>
                      <Table.Cell>
                        Activities of choice in open play areas
                      </Table.Cell>
                      <Table.Cell>9am-10am</Table.Cell>
                    </Table.Row>

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
                  </Table.Body>

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
                  </Table.Row>
                </Table>
                <Divider horizontal />
              </Form>
            )}
          />
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(SessionForm);
