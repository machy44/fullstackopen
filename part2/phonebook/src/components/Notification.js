export const Notification = ({ className, message }) => {
  if (message === null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};
