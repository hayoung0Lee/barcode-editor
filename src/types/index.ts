type NodeType = "Container" | "Text" | "Barcode" | "Qrcode";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

export type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignSelf =
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export interface SizeType {
  width?: string;
  height?: string;
}

export interface MarginType {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface PaddingType {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface flex {
  size?: SizeType;
  margin?: MarginType;
  padding?: PaddingType;
  flex_direction?: FlexDirection;
  flex_grow?: number;
  align_items?: AlignItems;
  justify_content?: JustifyContent;
  align_self?: AlignSelf;
}

export interface text {
  text: string;
  text_size: number;
  text_max_line: number;
  text_align:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  font_weight: string;
  font_family: string;
}

export interface barcode {
  text: string;
}
export interface ContainerLayout {
  type: NodeType;
  flex: flex;
  children: LayoutDefinition[];
}

export interface TextLayout {
  type: NodeType;
  flex: flex;
  text: text;
}

export interface BarcodeLayout {
  type: NodeType;
  flex: flex;
  barcode: barcode;
}

export type LayoutDefinition = ContainerLayout | TextLayout | BarcodeLayout;

export type PathType = string[];

export type CalcChild = any;

export type CalcChildren = CalcChild[];
