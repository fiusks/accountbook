function ErrorMessage({ text }) {
  console.log(text);
  return (
    <>
      <span style={{ fontSize: "1.6rem", color: "red" }}>{text}</span>
    </>
  );
}

export default ErrorMessage;
