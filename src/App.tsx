import React, { Component } from "react";

// import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <ProjectListScreen /> */}
        <LoginScreen />
      </div>
    );
  }
}
