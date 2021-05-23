/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import Account from "utils/static/svg/account.svg";
import Email from "utils/static/svg/mail.svg";
import Lock from "utils/static/svg/lock.svg";
import Button from "components/core/Button";

import * as S from "./styled";

const Form = ({ title, formData, buttonData }) => {
  const handleIcon = {
    account: <Account />,
    email: <Email />,
    password: <Lock />,
    confirmPassword: <Lock />,
  };
  const InitialStateSignIn = {
    email: "",
    password: "",
  };

  const InitialStateSignUp = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={title === "Sign in" ? InitialStateSignIn : InitialStateSignUp}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <S.Form onSubmit={handleSubmit}>
          {formData.map(({ type, id, field }) => (
            <S.WrapperInput key={id}>
              <S.Icons>{handleIcon[id]}</S.Icons>
              <input
                type={type}
                name={id}
                onChange={handleChange}
                onBlur={handleBlur}
                value={
                  id === "account"
                    ? values.account
                    : id === "email"
                    ? values.email
                    : id === "password"
                    ? values.password
                    : values.confirmPassword
                }
                placeholder={field}
              />
            </S.WrapperInput>
          ))}
          {errors.password && touched.password && errors.password}
          <Button type="submit" disabled={isSubmitting} text={buttonData.text}/>
        </S.Form>
      )}
    </Formik>
  );
};
Form.propTypes = {
  title: PropTypes.string.isRequired,
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
      field: PropTypes.string,
    }),
  ).isRequired,
  buttonData: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

export default Form;
