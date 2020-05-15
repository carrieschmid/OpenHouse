import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import SessionListItem from "./SessionListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import format from "date-fns/esm/format";

const SessionList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { sessionsByDate } = rootStore.sessionStore;
  return (
    <Fragment>
      {sessionsByDate.map(([group, sessions]) => (
        <Fragment key={group}>
          {/* <Label size="large" color="blue">
            {format(group, "eeee, MMMM do")}
          </Label> */}
          <Item.Group divided>
            {sessions.map((session) => (
              <SessionListItem key={session.id} session={session} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(SessionList);
