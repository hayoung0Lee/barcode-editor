const font = "Roboto,Noto Sans KR,Noto Sans SC,Noto Sans TC,Noto Sans JP";

const barcode = {
    type: "Container",
    flex: {
        size: {
            width: "100%",
            height: "100%",
        },
        padding: {
            top: "8",
            right: "8",
            bottom: "8",
            left: "8",
        },
        flex_direction: "column",
    },
    children: [
        {
            type: "Text",
            text: {
                text: "{{name}}",
                text_size: 10,
                text_max_line: 1,
                text_align: "left",
                font_family: font,
                font_weight: "bold",
            },
        },
        {
            type: "Text",
            text: {
                text: "{{attr}}",
                text_size: 10,
                text_max_line: 2,
                text_align: "left",
                font_family: font,
            },
        },
        {
            type: "Barcode",
            flex: {
                margin: {
                    top: "5",
                    right: "0",
                    bottom: "5",
                    left: "0",
                },
                flex_grow: 1,
            },
            barcode: {
                text: "{{barcode}}",
            },
        },
        {
            type: "Text",
            text: {
                text: "{{barcode}}",
                text_size: 8,
                text_max_line: 1,
                text_align: "center",
                font_family: font,
            },
        },
    ],
};

const qrcode = {
    type: "Container",
    flex: {
        size: {
            width: "100%",
            height: "100%",
        },
        padding: {
            top: "8",
            right: "8",
            bottom: "8",
            left: "8",
        },
        align_items: "center",
        flex_direction: "row",
    },
    children: [
        {
            type: "Qrcode",
            flex: {
                size: { width: "60", height: "100%" },
                margin: { right: "5" },
            },
            qrcode: {
                text: "{{barcode}}",
                level: "low",
            },
        },
        {
            type: "Container",
            flex: {
                size: { width: "0" },
                flex_direction: "column",
                flex_grow: 1,
            },
            children: [
                {
                    type: "Text",
                    flex: {
                        margin: {
                            bottom: "5",
                        },
                    },
                    text: {
                        text: "{{name}}",
                        text_size: 10,
                        text_max_line: 1,
                        text_align: "left",
                        font_weight: "bold",
                        font_family: font,
                    },
                },
                {
                    type: "Text",
                    text: {
                        text: "{{attr}}",
                        text_size: 10,
                        text_max_line: 10,
                        text_align: "left",
                        font_family: font,
                    },
                },
            ],
        },
    ],
};

export { barcode, qrcode }