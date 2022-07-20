import * as React from "react";

import { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../httpHelper/authApiService";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme({
  borderRadius: "8",
});

export default function SignUp() {
  const [visible, setvisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const handleSubmit = (values) => {
    setDisable(false);
    registerUser(values)
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
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
                .matches(PWD_REGEX, "Phone number is not valid."),
            })}
            onSubmit={(values) => handleSubmit(values)}
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
                />
                <Typography variant="caption" sx={{ color: "#d32f2f" }}>
                  {errors.name && touched.name ? errors.name : ""}
                </Typography>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  className="mt-15"
                  value={values.email}
                  error={errors.email && touched.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                />
                <Typography variant="caption" sx={{ color: "#d32f2f" }}>
                  {errors.email && touched.email ? errors.email : ""}
                </Typography>
                <TextField
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
                <Typography variant="caption" sx={{ color: "#d32f2f" }}>
                  {errors.password && touched.password ? errors.password : ""}
                </Typography>
                <Button
                  variant="contained"
                  className="mt-15"
                  fullWidth
                  type="submit"
                  disabled={disable}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
