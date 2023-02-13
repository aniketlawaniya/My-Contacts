import { RiContactsBook2Line, RiDeleteBin6Line } from "react-icons/ri";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineArrowDown,
  AiOutlineArrowUp
} from "react-icons/ai";
export default function Contact(props) {
  const styles = {
    display: props.isShown ? "block" : "none"
  };
  return (
    <>
      <li className="contact">
        {props.firstName} {props.lastName}
        <div className="controls">
          {!props.isShown ? (
            <AiOutlineArrowDown
              onClick={() => props.show(props.id)}
              className="icon-main"
            />
          ) : (
            <AiOutlineArrowUp
              onClick={() => props.show(props.id)}
              className="icon-main"
            />
          )}
          <RiDeleteBin6Line
            onClick={() => props.delete(props.id)}
            className="icon-del"
          />
        </div>
      </li>
      <div style={styles} className="contact-info">
        <p className="contact-phone">
          <AiOutlinePhone className="icon" />
          {props.phone}
        </p>
        <p className="contact-email">
          <AiOutlineMail className="icon" />
          {props.email}
        </p>
      </div>
    </>
  );
}
