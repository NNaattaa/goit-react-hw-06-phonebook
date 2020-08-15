import React, { Component } from "react";
import { connect } from "react-redux";
import ThemeContext from "../contexts/ThemeContext";
import ContactsActions from "../redux/contacts/contactsActions";
import Filter from "./Filter";
import Layout from "./Layout";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Header from "./Header";
import "../base.css";

class App extends Component {
  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    const { addLocalContacts } = this.props;
    if (savedContacts) {
      return addLocalContacts(JSON.parse(savedContacts));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts !== this.props.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.props.contacts));
    }
  }

  render() {
    const { contacts } = this.props;

    return (
      <ThemeContext>
        <Layout>
          <Header text={"Phonebook"} />
          <ContactForm />
          {contacts.length >= 2 && <Filter />}
          <ContactList />
        </Layout>
      </ThemeContext>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  return {
    contacts: contacts.items,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addLocalContacts: array =>
//       dispatch(ContactsActions.addLocalContacts(array)),
//   };
// };

const mapDispatchToProps = {
  addLocalContacts: ContactsActions.addLocalContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
