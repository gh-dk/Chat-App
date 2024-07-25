import React from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"; // Imported Switch
import Home from "./component/home";
import Users from "./component/users";
import Nav from "./component/nav";
import Message from "./component/message";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="viewPage">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/chats" />} />
            <Route path="/chats" component={Home} />
            <Route path="/people" component={Home} />
            <Route path="/group" component={Home} />
            <Route path="/users" component={Users} />
          </Switch>
          <Message />
        </div>
        <NavWrapper />
      </BrowserRouter>
    </>
  );
}

function NavWrapper() {
  const location = useLocation();
  console.log(location);
  return <Nav currentPath={location.pathname} />;
}
