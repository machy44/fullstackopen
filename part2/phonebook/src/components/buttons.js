export const Button = ({ children, handleClick }) => {
  return <button onClick={handleClick}>{children}</button>;
};

export const DeleteButton = (props) => {
  return <Button {...props}>delete</Button>;
};
