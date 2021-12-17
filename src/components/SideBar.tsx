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

const OptionSelector = ({
  optionName,
  options,
  selectedValue,
  onClickOption,
}) => {
  return (
    <div>
      <div>{optionName}</div>
      {(options || []).map((opt, index) => {
        return (
          <button
            key={index}
            className={
              opt === selectedValue
                ? styles.selectedOption
                : styles.unSelectedOption
            }
            onClick={() => onClickOption(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

const ContainerSetter = ({ selectedFlex, onUpdateContainer }) => {
  const [size, setSize] = useState(selectedFlex.size);
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
  const [flexGrow, setFlexGrow] = useState(
    selectedFlex.flexGrow ? selectedFlex.flexGrow : 0
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
    setFlexGrow(selectedFlex.flexGrow ? selectedFlex.flexGrow : 0);
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
        <LabelWrapper labelName="MarginTop">
          <input
            value={margin.top}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, top: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="MarginLeft">
          <input
            value={margin.left}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, left: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="MarginRight">
          <input
            value={margin.right}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, right: e.target.value }))
            }
            onBlur={() => onUpdateContainer("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="MarginBottom">
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

      <InputPartition>
        <LabelWrapper labelName="flexGrow">
          <input
            value={flexGrow}
            onChange={(e) =>
              setFlexGrow(
                e.target.value === "" ? "" : Number.parseFloat(e.target.value)
              )
            }
            onBlur={() => onUpdateContainer("flex_grow", flexGrow)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition>
        <OptionSelector
          optionName="FlexDirection"
          options={["row", "column", "row-reverse", "column-reverse"]}
          selectedValue={
            selectedFlex["flex_direction"]
              ? selectedFlex["flex_direction"]
              : "row"
          }
          onClickOption={(opt) => onUpdateContainer("flex_direction", opt)}
        ></OptionSelector>
      </InputPartition>
      <InputPartition>
        <OptionSelector
          optionName="AlignItems"
          options={["flex-start", "flex-end", "center", "baseline", "stretch"]}
          selectedValue={
            selectedFlex["align_items"]
              ? selectedFlex["align_items"]
              : "stretch"
          }
          onClickOption={(opt) => onUpdateContainer("align_items", opt)}
        ></OptionSelector>
      </InputPartition>
      <InputPartition>
        <OptionSelector
          optionName="JustifyContent"
          options={[
            "flex-start",
            "flex-end",
            "center",
            "space-between",
            "space-around",
            "space-evenly",
          ]}
          selectedValue={
            selectedFlex["justify_content"]
              ? selectedFlex["justify_content"]
              : "flex-start"
          }
          onClickOption={(opt) => onUpdateContainer("justify_content", opt)}
        ></OptionSelector>
      </InputPartition>

      <InputPartition>
        <OptionSelector
          optionName="AlignSelf"
          options={[
            "auto",
            "flex-start",
            "flex-end",
            "center",
            "baseline",
            "stretch",
          ]}
          selectedValue={
            selectedFlex["align_self"] ? selectedFlex["align_self"] : "auto"
          }
          onClickOption={(opt) => onUpdateContainer("align_self", opt)}
        ></OptionSelector>
      </InputPartition>
    </>
  );
};

const SideBar = ({ selectedValue, onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.sideBar}>
      SideBar
      <button onClick={R.partial(onAdd, ["Container"])}>onAddContainer</button>
      <button onClick={R.partial(onAdd, ["Barcode"])}>onAddBarcode</button>
      <button onClick={onRemove}>onRemove</button>
      <button onClick={exportLabel}>exportLabel</button>
      {selectedValue &&
        selectedValue["flex"] &&
        selectedValue["type"] === "Container" && ( // container일때만 뭐 설정하게 하기. 나머지는 걍 다 고정시킬거.
          <ContainerSetter
            selectedFlex={selectedValue["flex"]}
            onUpdateContainer={R.partial(onUpdate, ["Container"])}
          />
        )}
    </div>
  );
};

export default SideBar;
