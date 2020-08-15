import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import contactsActions from "./contactsActions";

const AddContactsFromLocal = (state, { payload }) => [...state, ...payload];
const AddNewContact = (state, { payload }) => [...state, payload];
const removeContact = (state, { payload }) =>
  state.filter(({ id }) => id !== payload);

const items = createReducer([], {
  [contactsActions.addLocalContacts]: AddContactsFromLocal,
  [contactsActions.addContact]: AddNewContact,
  [contactsActions.removeContact]: removeContact,
});

const filter = createReducer("", {
  [contactsActions.changeFilter]: (state, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items,
  filter,
});

export default contactsReducer;
