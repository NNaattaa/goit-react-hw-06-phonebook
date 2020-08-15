import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import { Formik } from "formik";
import ContactsActions from "../redux/contacts/contactsActions";
import Notification from "./Notification";
import withThemeContext from "./hoc/withTheme";

const Form = styled.form`
  margin-bottom: 3.4rem;
  max-width: 54rem;
  box-shadow: ${(props) => props.shadow};
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: snow;
`;

const Label = styled.label`
  font-size: 2.4rem;
  cursor: pointer;
  ${(props) =>
    props.error &&
    css`
      color: red;
    `}
`;

const Input = styled.input`
  font-size: 2.2rem;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.4rem 1.2rem 1.2rem;
  border-radius: 0.6rem;
  background-color: ${(props) => props.backGroundColor};
  &:focus {
    border-color: #1d2bcc;
  }
  ${(props) =>
    props.isValid &&
    css`
      border: 0.3rem solid lightgreen;
    `}
  ${(props) =>
    props.error &&
    css`
      border: 0.3rem solid red;
    `}
`;

const Button = styled.button`
  display: block;
  font-size: 2rem;
  margin: 0 auto;
  width: 100%;
  padding: 1.8rem;
  border-radius: 1rem;
  background-color: #1d2bcc;
  cursor: pointer;
  color: snow;
  &:hover,
  &:focus {
    background-color: #404fff;
    color: snow;
    border-color: #333333;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    outline: none;
  }
  &:active {
    background-color: #7883ff;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 2rem;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func,
  };

  state = {
    apearNotice: false,
    notice: null,
  };

  addContact = (name, number) => {
    const { contacts, onAddContact } = this.props;
    const checkedForName = contacts.find((contact) => name === contact.name);
    if (checkedForName) {
      this.setState({
        notice: `${name} is already in contacts`,
        apearNotice: true,
      });

      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2400
      );
    }
    const numberCheck = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
    const checkedNumber = numberCheck.test(number);
    if (!checkedNumber) {
      this.setState({
        notice: "Hey! This is not a real number :)",
        apearNotice: true,
      });
      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2400
      );
    }
    const newContact = {
      id: uuid(),
      name,
      number,
    };
    onAddContact(newContact);
  };

  render() {
    const { notice, apearNotice } = this.state;
    const { theme } = this.props;
    return (
      <>
        <Notification message={notice} apearNotice={apearNotice} />
        <Formik
          initialValues={{ name: "", number: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = <ErrorText>Name is Required</ErrorText>;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            this.addContact(values.name, values.number);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} shadow={theme.config.mainShadowBox}>
              {errors.name ? (
                <Label error>
                  Name
                  <Input
                    error
                    type="text"
                    name="name"
                    backGroundColor={theme.config.inputColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
                </Label>
              ) : (
                <Label>
                  Name
                  {touched.name ? (
                    <Input
                      isValid
                      type="text"
                      name="name"
                      backGroundColor={theme.config.inputColor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="name"
                      backGroundColor={theme.config.inputColor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  )}
                  {errors.name && touched.name && errors.name}
                </Label>
              )}

              <Label>
                Number
                <Input
                  type="tel"
                  name="number"
                  backGroundColor={theme.config.inputColor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.number}
                />
                {errors.number && touched.number && errors.number}
              </Label>
              <Button type="submit" disabled={isSubmitting}>
                Add contact
              </Button>
            </Form>
          )}
        </Formik>
      </>
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
//     onAddContact: obj => dispatch(ContactsActions.addContact(obj)),
//   };
// };

const mapDispatchToProps = {
  onAddContact: ContactsActions.addContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withThemeContext(ContactForm));
