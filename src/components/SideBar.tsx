import styles from "../css/SideBar.module.css";
import FlexSetter from "./FlexSetter";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as R from "ramda";
import { LabelContext, onUpdate } from "../utils/LabelContext";
import { useContext, useCallback } from "react";

const SideBar = ({ selectedPath }) => {
  const [labelState, dispatch] = useContext(LabelContext);
  const selectedFlex = R.path([...selectedPath, "flex"], labelState);

  const memoizedFlexUpdate = useCallback(
    R.partial(onUpdate, [{ selectedPath, dispatch, action: "UPDATE_FLEX" }]),
    [selectedPath]
  );

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
              onFlexUpdate={memoizedFlexUpdate}
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
