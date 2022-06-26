import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Message.css";
import { faFaceSadTear, faTrophy } from "@fortawesome/free-solid-svg-icons";

const Message = ({ result, word }) => {
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

  if (result === "lost") {
    return (
      <>
        {show && (
          <div className="message">
            You lost <FontAwesomeIcon icon={faFaceSadTear} />, the word is {word.toUpperCase()}
          </div>
        )}
      </>
    );
  }

  if (result === "won") {
    return (
      <>
        {show && (
          <div className="message">
            You won <FontAwesomeIcon icon={faTrophy} />
          </div>
        )}
      </>
    );
  }
};
export default Message;
