import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import contactsActions from "../redux/contacts/contactsActions";
import withThemeContext from "./hoc/withTheme";

const Container = styled.div`
  margin-bottom: 3rem;
  max-width: 54rem;
  box-shadow: ${(props) => props.shadow};
  padding: 1.4rem 1.6rem;
  background-color: snow;
`;

const Label = styled.label`
  font-size: 2rem;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 2.2rem;
  width: 100%;
  margin-top: 0.4rem;
  padding: 1.4rem 1.2rem 1.2rem;
  border-radius: 0.6rem;
  background-color: ${(props) => props.backGroundColor};
  &:focus {
    border-color: #1d2bcc;
  }
`;

function Filter({ value, onChangeFilter, theme }) {
  return (
    <Container shadow={theme.config.mainShadowBox}>
      <Label>
        Find contacts by name
        <Input
          backGroundColor={theme.config.inputColor}
          type="text"
          value={value}
          onChange={({ target: { value } }) => onChangeFilter(value)}
        />
      </Label>
    </Container>
  );
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onChangeFilter: str => dispatch(filterActions.changeFilter(str)),
//   };
// };

const mapDispatchToProps = {
  onChangeFilter: contactsActions.changeFilter,
};

export default connect(null, mapDispatchToProps)(withThemeContext(Filter));
