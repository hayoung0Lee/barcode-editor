const TextNode = ({ layoutDefinition }: any) => {
  return (
    <div
      style={{
        fontSize: layoutDefinition.text.text_size,
        lineHeight: 1.2,
        textAlign: layoutDefinition.text.text_align,
        fontFamily: layoutDefinition.text.font_family,
        fontWeight: layoutDefinition.text.font_weight,
        WebkitLineClamp: layoutDefinition.text.text_max_line,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {layoutDefinition.text.text}
    </div>
  );
};

export default TextNode;
