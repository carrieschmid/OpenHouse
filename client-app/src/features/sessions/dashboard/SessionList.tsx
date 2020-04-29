import React, { useContext, Fragment } from "react";
import { Item, Image, Label } from "semantic-ui-react";
// import { observer } from "mobx-react-lite";
// import ActivityListItem from "./ActivityListItem";
// import { RootStoreContext } from "../../../app/stores/rootStore";
// import format from "date-fns/esm/format";

const SessionList: React.FC = () => {
  //   const rootStore = useContext(RootStoreContext);
  //   const { activitiesByDate } = rootStore.activityStore;
  return (
    <Item.Group>
      <Item>
        <Item.Image size="tiny" src="/images/wireframe/image.png" />

        <Item.Content>
          <Item.Header as="a">Header</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default SessionList;
