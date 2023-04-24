function Flex(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "5px",
        padding: "3px",
        justifyContent: "space-around",
      }}
    >
      {props.children}
    </div>
  );
}

export default Flex;
