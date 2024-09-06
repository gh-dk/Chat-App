import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/home";
import Users from "./component/users";
import Nav from "./component/nav";
import Message from "./component/message";
import Auth from "./component/auth";
import { Bigprofile } from "./component/Bigprofile";
import ProtectedRoute from "./ProtectedRoute"; // Your custom ProtectedRoute component
import "./App.css";

export default function App() {
  return (
      <BrowserRouter>
        <div className="viewPage">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/chats" />} />
            <ProtectedRoute path="/chats" component={Home} />
            {/* <ProtectedRoute path="/chats/:chatname" component={Home} /> */}
            <ProtectedRoute path="/people" component={Home} />
            <ProtectedRoute path="/group" component={Home} />
            <ProtectedRoute path="/users" component={Users} />
            <Route path="/auth" component={Auth} />
          </Switch>
          <Message />
          <Bigprofile />
        </div>
        <Nav />
      </BrowserRouter>

  );
}
