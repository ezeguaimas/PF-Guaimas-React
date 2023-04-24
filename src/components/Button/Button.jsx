import styles from "./button.css";

const Button = (props) => {
  const styleButton = {
    backgroundColor: props.color,
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={styles.btn}
      style={styleButton}
    >
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;
