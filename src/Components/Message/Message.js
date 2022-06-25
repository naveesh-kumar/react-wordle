import React from "react";
import "./Message.css";

const Message = ({ message }) => {
  const [show, setShow] = React.useState(false);

  /**
   * delay by 3000 ms
   */
  React.useEffect(() => {
    let timerId = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <>{show && <div className="message">{message}</div>}</>;
};
export default Message;
