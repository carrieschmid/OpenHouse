import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import SelectInput from "../../app/common/form/SelectInput";
import { Form, Button, Header } from "semantic-ui-react";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FORM_ERROR } from "final-form";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { isRequired, combineValidators } from "revalidate";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("display name"),
  email: isRequired("email"),
  password: isRequired("password")
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to OpenHouse"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Field name="phone" component={TextInput} placeholder="Phone" />
          <Field name="address" component={TextInput} placeholder="Address" />
          <Field name="city" component={TextInput} placeholder="City" />
          <Field name="state" component={TextInput} placeholder="State" />
          <Field
            name="interests"
            component={SelectInput}
            placeholder="Interests"
            type="interests"
          />
          <Field
            name="bgcheck"
            component={SelectInput}
            placeholder="Background Check"
            type="phone"
          />
          <Field
            name="firstaid"
            component={SelectInput}
            placeholder="First Aid"
            type="firstaid"
          />
          <Field
            name="terms"
            component={SelectInput}
            placeholder="Terms of Agreement"
            type="terms"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <br />

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
