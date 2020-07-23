import React, { Component } from "react";
import { uuid } from "uuidv4";
import styleApp from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm.js";
import Filter from "./components/Filter/Filter.js";
import ContactList from "./components/ContactList/ContactList.js";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const lastContacts = localStorage.getItem("contacts");
    if(lastContacts) {     
      this.setState({
        contacts: JSON.parse(lastContacts)
      })
    }    
  }

  componentDidUpdate(prevProps, prevState) {  
    if(prevState.contacts !== this.state.contacts) {      
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: uuid(),
      name: name,
      number: number,
    };
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  removeContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  contactsFilter = (event) => {
    const filter = event.target.value;
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={styleApp.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts}/>

        {contacts.length > 1 && (
          <Filter contactsFilter={this.contactsFilter} value={filter} />
        )}
        <h2>Contacts</h2>
        {filteredContacts.length > 0 &&
          filteredContacts.map((contact) => (
            <ContactList
              key={contact.id}
              {...contact}
              removeContact={this.removeContact}
            />
          ))}
      </div>
    );
  }
}

export default App;
