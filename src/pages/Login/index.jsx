import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { siteURL } from "../../api";
import "../../styles/login.scss";
import logo from "../../assets/logo.jpg";

const Login = () => {
  const [formValues, setFormValues] = useState({});
  const [touched, setTouched] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  useEffect(() => {
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsButtonDisabled(Object.keys(errors).length > 0);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setTouched({
        username: true,
        password: true,
      });
    }
    if (Object.keys(formErrors).length === 0) {
      setTouched({
        username: false,
        password: false,
      });
      setIsLoading(true);
      const { username, password } = formValues;
      try {
        const customerData = {
          username,
          password,
        };
        const url = `${siteURL}/wp-json/jwt-auth/v1/token`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        });

        if (response.ok) {
          const data = await response.json();
          const { token, user_role } = data;

          // Store the username, token, and role in local storage
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          localStorage.setItem("user_role", user_role);

          // Show success toast notification
          toast.success("Login successful!");

          // Delay navigation after toast notification
          setTimeout(() => {
            if (user_role === "customer") {
              history("/shop"); // Navigate to admin dashboard
            } else {
              history("/admin_dashboard"); // Navigate to shop
            }

            -setFormValues({});
            setFormErrors({});
            event.target.reset();
          }, 2000); // 2-second delay (adjust as needed)
        } else {
          throw new Error(response);
        }
      } catch (error) {
        const errorMessage = error.response;
        toast.error(errorMessage); // Show error toast notification
        console.log(error.response); // Show error toast notification
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>AnniesQuickMeal</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        <meta name="description" content="AnniesQuickmeal food ecommerce" />
        <link rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>
      <ToastContainer />
      <main className="flex justify-items-center login-container">
        <div className="bg-red-700 flex flex-col p-5 items-center justify-items-center text-white lg:w-1/3 w-full login-left-container">
          <div className="w-100 h-100 bg-red-50 rounded-full border-none p-3 mt-8">
            <img
              src={logo}
              alt="annies_quickmeal"
              className="w-20 h-20 object-cover object-center rounded-full border-0"
            />
          </div>
          <div className="mt-12 text-center">
            <p className="leading-7 text-base">
              "Our minds are like our stomachs; they are whetted by the change
              of their food, and variety supplies both with fresh appetite"
            </p>
            <h3 className="mt-8 font-bold text-xl">Quintilian</h3>
          </div>
        </div>
        <div className="lg:w-2/3 w-full lg:px-48 px-12">
          <form onSubmit={handleSubmit} className="mt-12">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="username"
                className="font-bold text-gray-500 text-lg"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formValues.username || ""}
                onChange={handleChange}
                className="border-2 border-red-800 rounded-full p-3"
              />
              <div className="text-red-500 text-sm">
                {touched.username && formErrors.username}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label
                htmlFor="password"
                className="font-bold text-gray-500 text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password || ""}
                onChange={handleChange}
                className="border-2 border-red-800 rounded-full p-3"
              />
              <div className="text-red-500 text-sm">
                {touched.password && formErrors.password}
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center justify-items-center">
              <button
                type="submit"
                className={`bg-red-700 text-white px-5 py-2 border-0 rounded-full hover:bg-red-500${
                  isButtonDisabled ? "disabled-button" : ""
                }`}
                disabled={isButtonDisabled}
              >
                {isLoading ? (
                  <img
                   
                    width="30"
                    src="/cart-spinner.gif"
                    alt="spinner"
                  />
                ) : (
                  "Login"
                )}
              </button>
              <div className="mt-5 text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-800">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
