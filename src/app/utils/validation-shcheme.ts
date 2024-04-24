import * as Yup from 'yup';

export const SignupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail.com$/, 'Must be a valid Gmail address')
    .required('Can’t be empty'),
  
  password: Yup.string()
    .min(6, 'min 6 characters')
    .required('Can’t be empty'),
  
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat password is required'),
});
