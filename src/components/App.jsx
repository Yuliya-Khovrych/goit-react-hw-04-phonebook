import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      return parcedContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    )
      ? Notiflix.Notify.failure(`${newContact.name} is already  in contacts.`)
      : setContacts([...contacts, newContact]);
  };

  const changeFilter = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length > 0 && <h2>Contacts</h2>}
      {contacts.length > 0 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 && (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      )}
    </Section>
  );
};
