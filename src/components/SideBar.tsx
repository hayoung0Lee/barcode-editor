import styles from "./SideBar.module.css";
import * as R from "ramda";
import { useEffect, useState } from "react";

const InputPartition = ({ children }) => {
  return <div className={styles.inputPartition}>{children}</div>;
};

const LabelWrapper = ({ labelName, children }) => {
  return (
    <div>
      <label>
        {labelName}
        {children}
      </label>
    </div>
  );
};
const ContainerSetter = ({ selectedFlex, onUpdateContainer }) => {
  const [size, setSize] = useState(
    selectedFlex.size ? selectedFlex.size : { width: "100", height: "100" }
  );
  const [margin, setMargin] = useState(
    selectedFlex.margin
      ? selectedFlex.margin
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }
  );
  const [padding, setPadding] = useState(
    selectedFlex.padding
      ? selectedFlex.padding
      : {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }
  );

  useEffect(() => {
    setSize(
      selectedFlex.size ? selectedFlex.size : { width: "100", height: "100" }
    );
    setMargin(
      selectedFlex.margin
        ? selectedFlex.margin
        : {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }
    );
    setPadding(
      selectedFlex.padding
        ? selectedFlex.padding
        : {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }
    );
  }, [selectedFlex]);
  return (
    <>
      <InputPartition>
        <LabelWrapper labelName={"Width"}>
          <input
            value={size.width}
            onChange={(e) =>
              setSize((prev) => ({ ...prev, width: e.target.value }))
            }
            onBlur={() => onUpdateContainer("size", size)}
          />
        </LabelWrapper>
        <LabelWrapper labelName={"Height"}>
          <input
            value={size.height}
            onChange={(e) =>
              setSize((prev) => ({ ...prev, height: e.target.value }))
            }
            onBlur={() => onUpdateContainer("size", size)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition>
        <LabelWrapper labelName="Top">
          <input
            value={margin.top}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, top: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Left">
          <input
            value={margin.left}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, left: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Right">
          <input
            value={margin.right}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, right: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Bottom">
          <input
            value={margin.bottom}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, bottom: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition>
        <LabelWrapper labelName="PaddingTop">
          <input
            value={padding.top}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, top: e.target.value }))
            }
            onBlur={() => onUpdateContainer("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="PaddingLeft">
          <input
            value={padding.left}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, left: e.target.value }))
            }
            onBlur={() => onUpdateContainer("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="PaddingRight">
          <input
            value={padding.right}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, right: e.target.value }))
            }
            onBlur={() => onUpdateContainer("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="PaddingBottom">
          <input
            value={padding.bottom}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, bottom: e.target.value }))
            }
            onBlur={() => onUpdateContainer("padding", padding)}
          />
        </LabelWrapper>
      </InputPartition>
    </>
  );
};

const SideBar = ({ selectedValue, onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.sideBar}>
      SideBar
      <button onClick={onAdd}>onAdd</button>
      <button onClick={onRemove}>onRemove</button>
      <button onClick={exportLabel}>exportLabel</button>
      <ContainerSetter
        selectedFlex={selectedValue["flex"]}
        onUpdateContainer={R.partial(onUpdate, ["Container"])}
      />
    </div>
  );
};

export default SideBar;
