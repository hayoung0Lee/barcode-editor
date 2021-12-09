interface flex {
    size: {
        width: string,
        height: string,
    },
    margin: {
        top: string,
        right: string,
        bottom: string,
        padding: string,
    },
    flex_direction: "row" | "column" | "row-reverse" | "column-reverse",
    flex_grow: number,
    align_items: "flex-start" | "flex-end" | "center" | "baseline" | "stretch",
    justify_content: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",
    align_self: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
}

type NodeType = "Container" | "Text" | "Barcode" | "Qrcode";

export interface Node {
    type: NodeType,
    flex: flex,
    children: Node[],
    [property: string]: any // text, barcode, qrcode
    // text: {},
    // barcode: {},
    // qrcode: {}
}

