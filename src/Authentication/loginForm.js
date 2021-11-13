import React, { useState } from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const Form = () => {
  const [SelectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <div className="tab_container">
        <AppBar style={{ background: "#FFFFFF" }} position="static">
          <Tabs
            value={SelectedTab}
            onChange={handleChange}
            indicatorColor="inherit"
            textColor="primary"
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: "#00BFA5",
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Create Account" />
          </Tabs>
        </AppBar>

        {SelectedTab === 0 ? (
          <Login />
        ) : (
          <CreateAccount
            state={{
              state: SelectedTab,
              method: setSelectedTab,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
