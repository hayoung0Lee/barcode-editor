import styles from "../css/SideBar.module.css";
import FlexSetter from "./FlexSetter";
import ContentsForm from "./ContentsForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as R from "ramda";
import { LabelContext, onUpdate, SelectedContext } from "../utils/LabelContext";
import { useContext, useCallback } from "react";

const SideBar = () => {
  const [labelState, dispatch] = useContext(LabelContext);
  const [selectedPath] = useContext<any>(SelectedContext);
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
          <ContentsForm />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SideBar;
