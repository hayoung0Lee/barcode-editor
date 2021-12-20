import { useEffect, useState } from "react";
import OptionSelector from "./OptionSelector";
import LabelWrapper from "./LabelWrapper";
import InputPartition from "./InputPartition";

const FlexSetter = ({ selectedFlex, onFlexUpdate }) => {
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
    setSize(selectedFlex.size);
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
    setFlexGrow(selectedFlex.flex_grow ? selectedFlex.flex_grow : 0);
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
            onBlur={() => onFlexUpdate("size", size)}
          />
        </LabelWrapper>
        <LabelWrapper labelName={"Height"}>
          <input
            value={size.height}
            onChange={(e) =>
              setSize((prev) => ({ ...prev, height: e.target.value }))
            }
            onBlur={() => onFlexUpdate("size", size)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Flex Grow">
          <input
            type="number"
            value={flexGrow}
            onChange={(e) =>
              setFlexGrow(
                e.target.value === "" ? "" : Number.parseFloat(e.target.value)
              )
            }
            onBlur={() => onFlexUpdate("flex_grow", flexGrow)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition title="Margin">
        <LabelWrapper labelName="Top">
          <input
            value={margin.top}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, top: e.target.value }))
            }
            onBlur={() => onFlexUpdate("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Left">
          <input
            value={margin.left}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, left: e.target.value }))
            }
            onBlur={() => onFlexUpdate("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Right">
          <input
            value={margin.right}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, right: e.target.value }))
            }
            onBlur={() => onFlexUpdate("margin", margin)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Bottom">
          <input
            value={margin.bottom}
            onChange={(e) =>
              setMargin((prev) => ({ ...prev, bottom: e.target.value }))
            }
            onBlur={() => onFlexUpdate("margin", margin)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition title="Padding">
        <LabelWrapper labelName="Top">
          <input
            value={padding.top}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, top: e.target.value }))
            }
            onBlur={() => onFlexUpdate("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Left">
          <input
            value={padding.left}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, left: e.target.value }))
            }
            onBlur={() => onFlexUpdate("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Right">
          <input
            value={padding.right}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, right: e.target.value }))
            }
            onBlur={() => onFlexUpdate("padding", padding)}
          />
        </LabelWrapper>
        <LabelWrapper labelName="Bottom">
          <input
            value={padding.bottom}
            onChange={(e) =>
              setPadding((prev) => ({ ...prev, bottom: e.target.value }))
            }
            onBlur={() => onFlexUpdate("padding", padding)}
          />
        </LabelWrapper>
      </InputPartition>
      <InputPartition title="Flex Direction">
        <OptionSelector
          options={["row", "column", "row-reverse", "column-reverse"]}
          selectedValue={
            selectedFlex["flex_direction"]
              ? selectedFlex["flex_direction"]
              : "row"
          }
          onClickOption={(opt) => onFlexUpdate("flex_direction", opt)}
        ></OptionSelector>
      </InputPartition>
      <InputPartition title="Align Items">
        <OptionSelector
          options={["stretch", "flex-start", "flex-end", "center", "baseline"]}
          selectedValue={
            selectedFlex["align_items"]
              ? selectedFlex["align_items"]
              : "stretch"
          }
          onClickOption={(opt) => onFlexUpdate("align_items", opt)}
        ></OptionSelector>
      </InputPartition>
      <InputPartition title="Justify Content">
        <OptionSelector
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
          onClickOption={(opt) => onFlexUpdate("justify_content", opt)}
        ></OptionSelector>
      </InputPartition>
      <InputPartition title="Align Self">
        <OptionSelector
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
          onClickOption={(opt) => onFlexUpdate("align_self", opt)}
        ></OptionSelector>
      </InputPartition>
    </>
  );
};

export default FlexSetter;
