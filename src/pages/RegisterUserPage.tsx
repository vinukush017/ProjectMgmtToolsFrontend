import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import loginScreen from "../images/Security On-bro.svg";
import axios from "../utilis/axiosInstance";
import * as Yup from "yup";

const validationSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post("/users/register", values);
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };
  return (
    <Formik
      initialValues={{ userName: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({}) => (
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
              <h1>Register</h1>
              <div>
                <Field name="userName" type="text" placeholder="Username" />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <Field name="email" type="email" placeholder="Email" />{" "}
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit">Register</button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
