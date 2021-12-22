import styles from "../css/SideBar.module.css";
import FlexSetter from "./FlexSetter";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const SideBar = ({ selectedFlex, onFlexUpdate }) => {
  return (
    <div className={styles.sideBar}>
      <Tabs>
        <TabList>
          <Tab>Flex</Tab>
          <Tab>Contents</Tab>
        </TabList>

        <TabPanel>
          {selectedFlex && (
            <FlexSetter
              selectedFlex={selectedFlex}
              onFlexUpdate={onFlexUpdate}
            />
          )}
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default React.memo(SideBar);
