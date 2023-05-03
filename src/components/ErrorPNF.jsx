import error404 from "./Img/error404.png";

function ErrorPNF() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ERROR 404: Page Not Found</h1>
      <img
        src={error404}
        alt="error404"
        style={{
          width: "20%",
          height: "20%",
          display: "block",
          margin: "auto",
        }}
      />
    </div>
  );
}

export default ErrorPNF;
