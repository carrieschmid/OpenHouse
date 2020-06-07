import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.jpg" alt="logo" style={{ marginRight: 10 }} />
          OpenHouse
        </Menu.Item>
        <Menu.Item name="Sessions" as={NavLink} to="/sessions" />
        <Menu.Item>
          {/* <Button
            as={NavLink}
            to="/createSession"
            positive
            content="Create Session"
          /> */}
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);

// import React, { useContext, Fragment } from "react";
// import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import { RootStoreContext } from "../../app/stores/rootStore";
// import LoginForm from "../user/LoginForm";
// import RegisterForm from "../user/RegisterForm";

// const NavBar = () => {
//     // const token = window.localStorage.getItem("jwt");
//   const rootStore = useContext(RootStoreContext);
//   const { user, logout } = rootStore.userStore;
//   // const { isLoggedIn, user } = rootStore.userStore;
//   const { openModal } = rootStore.modalStore;
//   return (
//     <Menu
//       fixed="top"
//       style={{ marginBottom: 200 }}
//       // inverted
//     >
//       <Container>
//         <Menu.Item name="Homepage" as={Link} to="/">
//           <img
//             src="/assets/logo.jpg"
//             alt="logo"
//             style={{ marginRight: "10px" }}
//           />
//         </Menu.Item>
//         <Menu.Item name="Sessions" as={Link} to="/sessions" />
//         {/* <Menu.Item name="Members" /> */}

//         {user ? (
//           <Menu.Item position="right">
//             <Image
//               avatar
//               spaced="right"
//               src={user.image || "/assets/user.png"}
//             />
//             <Dropdown pointing="top left" text={user.displayName}>
//               <Dropdown.Menu>
//                 <Dropdown.Item
//                   as={Link}
//                   to={`/profile/${user.username}`}
//                   text="My profile"
//                   icon="user"
//                 />
//                 <Dropdown.Item onClick={logout} text="Logout" icon="power" />
//               </Dropdown.Menu>
//             </Dropdown>
//           </Menu.Item>
//         ) : (
//           <Fragment>
//             <Menu.Item
//               position="right"
//               onClick={() => openModal(<LoginForm />)}
//               size="huge"
//               // inverted
//             >
//               Login
//             </Menu.Item>
//             <Menu.Item
//               onClick={() => openModal(<RegisterForm />)}
//               to="/register"
//               size="huge"
//               // inverted
//             >
//               Register
//             </Menu.Item>
//           </Fragment>
//         )}
//       </Container>
//     </Menu>
//   );
// };

// export default NavBar;
