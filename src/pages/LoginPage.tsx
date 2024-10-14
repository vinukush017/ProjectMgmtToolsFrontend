import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import loginScreen from "../images/Security On-bro.svg";
import axiosInstance from "../utilis/axiosInstance";
import * as Yup from "yup";

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required("Email or Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ emailOrUsername: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const response = await axiosInstance.post("/users/login", {
            emailOrUsername: values.emailOrUsername,
            password: values.password,
          });

          const token = response.data.token;
          setToken(token);
          navigate("/");
        } catch (error) {
          console.log("errr", error);
        }
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {() => (
        <Form className="container">
          <div className="halfImg">
            <img
              src={loginScreen}
              alt="Login Illustration"
              style={{
                height: "500px",
                width: "500px",
                objectFit: "cover",
                overflow: "hidden",
                transform: "scale(1.2) translateX(50px)",
                transition: "transform 0.3s ease",
                borderRadius: "8px",
              }}
            />
          </div>
          <div className="halfForm">
            <div className="form-card">
              <h1>Login</h1>
              <div>
                <Field
                  name="emailOrUsername"
                  type="text"
                  placeholder="Enter Email or Username"
                />
                <ErrorMessage
                  name="emailOrUsername"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
              <button type="submit">Login</button>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
