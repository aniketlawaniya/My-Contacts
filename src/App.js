import "./styles.css";
import React, { useState } from "react";
import data from "./data";
import { nanoid } from "nanoid";
import Contact from "./Contact";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";

export default function App() {
  const [input, setInput] = useState("");
  const [myData, setMyData] = useState(
    data.map((elem) => ({
      ...elem,
      id: nanoid(),
      isShown: false
    }))
  );
  const [form, setForm] = useState(false);
  const [contact, setContact] = useState({
    id: nanoid(),
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });
  //Setting logic for filling the form
  const handleChangeForm = (e) => {
    setContact((prevContact) => {
      return {
        ...prevContact,
        [e.target.name]: e.target.value
      };
    });
  };
  //The form appears when showForm changes
  const showForm = () => setForm((prevForm) => !prevForm);
  const [textForm, setTextForm] = useState(false);
  //Logic for submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(contact).filter((elem) => elem !== "").length === 5) {
      setMyData((prevMyData) => [...prevMyData, contact]);
      setForm(false);
      e.target.reset();
      setTextForm(false);
    } else {
      setTextForm(true);
    }
  };
  const show = (id) => {
    setMyData((prevMyData) =>
      prevMyData.map((elem) =>
        elem.id === id
          ? {
              ...elem,
              isShown: !elem.isShown
            }
          : { ...elem, isShown: false }
      )
    );
  };
  //Deleting items
  const deleteItem = (id) => {
    console.log("deleted", id);
    setMyData((prevMyData) => prevMyData.filter((elem) => elem.id !== id));
  };
  //Setting logic for search input
  const handleChange = (e) => setInput(e.target.value);
  const contactEls = myData
    .filter((elem) =>
      input === ""
        ? elem
        : elem.first_name.toLowerCase().includes(input.toLowerCase()) ||
          elem.last_name.toLowerCase().includes(input.toLowerCase())
    )
    .map((elem) => (
      <Contact
        delete={deleteItem}
        firstName={elem.first_name}
        lastName={elem.last_name}
        email={elem.email}
        phone={elem.phone}
        key={nanoid()}
        id={elem.id}
        show={show}
        isShown={elem.isShown}
      />
    ));
  return (
    <div className="App">
      <div className="container">
        <h1 className="main-text">My contacts</h1>
        <button onClick={showForm} className="btn">
          <AiOutlineUserAdd className="icon" />
          Add a new contact
        </button>
        <form onSubmit={handleSubmit} className={form ? "form active" : "form"}>
          <AiOutlineClose onClick={showForm} className="close-icon" />
          <input
            onChange={handleChangeForm}
            name="first_name"
            className="text-input"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={handleChangeForm}
            name="last_name"
            className="text-input"
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={handleChangeForm}
            name="phone"
            className="text-input"
            type="text"
            placeholder="Phone"
          />
          <input
            onChange={handleChangeForm}
            name="email"
            className="text-input"
            type="text"
            placeholder="Email"
          />
          <button className="addBtn btn">Send</button>
          {textForm && (
            <span className="formText">Please fiil in the form</span>
          )}
        </form>
        <input
          className="text-input"
          onChange={handleChange}
          type="text"
          placeholder="Search..."
        />
        <ul className="contact-list">{contactEls}</ul>
      </div>
    </div>
  );
}
