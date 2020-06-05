import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileSessions from "./ProfileSessions";
import ProfileDescription from "./ProfileDescription";

const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Sessions",
    render: () => <ProfileSessions />
  }
  // {
  //   menuItem: "Followers",
  //   render: () => <Tab.Pane>Followers content</Tab.Pane>
  // },
  // {
  //   menuItem: "Following",
  //   render: () => <Tab.Pane>Following content</Tab.Pane>
  // }
];
interface IProps {
  setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
