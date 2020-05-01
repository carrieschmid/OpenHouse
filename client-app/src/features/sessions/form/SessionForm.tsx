import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, GridColumn, Grid } from "semantic-ui-react";
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
      <GridColumn width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={session}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                  <Field
                    component={SelectInput}
                    options={timeblock}
                    name="timeblock"
                    time={true}
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
                      ? () => history.push(`/activities${session.id}`)
                      : () => history.push("/activities")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(SessionForm);
