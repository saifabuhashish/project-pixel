import * as React from "react";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser, registerUser } from "../httpHelper/authApiService";
import { useToasts } from "react-toast-notifications";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function SignUp({ open, handleClose }) {
  const [isLogin, setisLogin] = useState(false);
  const [visible, setvisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const { addToast } = useToasts();
  const handleSignUpSubmit = (values) => {
    setDisable(true);
    registerUser(values)
      .then((res) => {
        console.log(res, "res");
        localStorage.setItem("accessToken", res?.tokens?.access?.token);
        setDisable(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err, "err");
        setDisable(false);
        addToast(err?.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: "1500",
        });
      });
  };
  const handleSignInSubmit = (values) => {
    setDisable(true);
    loginUser(values)
      .then((res) => {
        setDisable(false);
        localStorage.setItem("accessToken", res?.tokens?.access?.token);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err, "err");
        setDisable(false);
        addToast(err?.response?.data?.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: "1500",
        });
      });
  };
  return (
    <Dialog
      maxWidth={"xs"}
      open={open}
      onClose={() => {
        handleClose();
      }}
      fullWidth
    >
      <DialogTitle
        sx={{
          p: {
            xs: "1rem 0.5rem",
          },
          textAlign: "center",
        }}
      >
        {isLogin ? "Sign In" : "Sign up"}
      </DialogTitle>
      <DialogContent
        sx={{
          p: {
            xs: 1,
          },
        }}
      >
        {isLogin ? (
          <Formik
            enableReinitialize
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Please enter valid Email")
                .required("Email is required.")
                .nullable(),
              password: Yup.string()
                .required("Password is required.")
                .nullable(),
            })}
            onSubmit={(values) => handleSignInSubmit(values)}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  value={values.email}
                  error={errors.email && touched.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
                <TextField
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  label="Password"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  type={visible ? "text" : "password"}
                  value={values.password}
                  error={errors.password && touched.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setvisible(!visible)}
                        >
                          {visible ? (
                            <RemoveRedEyeOutlined />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  className="mt-15"
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  type="submit"
                  disabled={disable}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            enableReinitialize
            initialValues={{
              email: "",
              name: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Please enter valid Email")
                .required("Email is required.")
                .nullable(),
              name: Yup.string().required("Username is required."),
              password: Yup.string()
                .required("Password is required.")
                .matches(
                  PWD_REGEX,
                  "Password must include atleast one lowecase, one uppercase, one number and one special character."
                ),
            })}
            onSubmit={(values) => handleSignUpSubmit(values)}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  value={values.name}
                  error={errors.name && touched.name}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  value={values.email}
                  error={errors.email && touched.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  helperText={errors.email && touched.email ? errors.email : ""}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  type={visible ? "text" : "password"}
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setvisible(!visible)}
                        >
                          {visible ? (
                            <RemoveRedEyeOutlined />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  className="mt-15"
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  type="submit"
                  disabled={disable}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        )}
        <Grid container justifyContent="center">
          <Grid
            item
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setisLogin(!isLogin)}
          >
            {isLogin ? "Create Account" : "Already have an account? Sign in"}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
