import Navbar from "./NavBar/NavBar";

function Header(params) {
  return (
    <header
      style={{
        borderRadius: "10px",
        paddingBlock: "1%",
        backgroundColor: "#141414",
        maxWidth: "100vw",
      }}
    >
      <Navbar />
    </header>
  );
}

export default Header;
