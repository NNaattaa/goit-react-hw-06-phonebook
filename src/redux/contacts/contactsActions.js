import { createAction } from "@reduxjs/toolkit";

const addLocalContacts = createAction("contacts/addFromLocalStor");
const addContact = createAction("contacts/add");
const removeContact = createAction("contacts/remove");
const changeFilter = createAction("filter/change");

export default { addLocalContacts, addContact, removeContact, changeFilter };
