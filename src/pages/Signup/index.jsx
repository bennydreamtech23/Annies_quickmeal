import { useState, useEffect } from "react";
import { axiosClient, oauth, baseURL } from "../../api";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/login.scss";
import logo from "../../assets/logo.jpg";

const Signup = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
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
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        password: true,
      });
    }
    if (Object.keys(formErrors).length === 0) {
      setTouched({
        email: false,
        firstName: false,
        lastName: false,
        username: false,
        password: false,
      });
      setIsLoading(true);
      const { email, firstName, lastName, username, password } = formValues;
      try {
        const customerData = {
          email,
          first_name: firstName,
          last_name: lastName,
          username,
          password,
        };
        const url = `${baseURL}/customers`;
        const response = await axiosClient.post(url, customerData, {
          params: oauth.authorize({ url, method: "POST" }),
        });
        console.log("Customer created:", response.data);
        toast.success("Customer created");
        setTimeout(() => {
          navigate("/login");

          setFormValues({});
          setFormErrors({});
          event.target.reset();
        }, 2000); // 2-second delay (adjust as needed)
      } catch (error) {
        console.error("Error creating customer:", error);
        toast.error("error creating customer", error.response);
        // Handle error or display error message
      }
    }
  };
  return (
    <>
      <Helmet>
        <title> AnniesQuickMeal</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        <meta name="description" content="AnniesQuickmeal food ecommerce" />
        <link rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>
      <ToastContainer />
      <main className="flex justify-items-center login-container">
        <div className="bg-red-700 flex flex-col p-5 items-center justify-items-center text-white lg:w-1/3 w-full">
          <div className="w-100 h-100 bg-red-50 rounded-full border-none p-3 mt-8">
            <img
              src={logo}
              alt="annies_quickmeal"
              className="w-20 h-20 object-cover object-center rounded-full border-0"
            />
          </div>
          <div className="mt-20 text-center">
            <p className="leading-7 text-base">
              "When you rise in the morning, give thanks for the light, for your
              life, for your strength. Give thanks for your food and for the joy
              of living. If you see no reason to give thanks, the fault lies in
              yourself."
            </p>
            <h3 className="mt-8 font-bold text-xl">Tecumseh</h3>
          </div>
        </div>

        <div className="lg:w-2/3 w-full lg:px-48 px-12 py-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="font-bold text-gray-500 text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email || ""}
                className="border-2 border-red-700 rounded-full p-3"
                onChange={handleChange}
              />
              <div className="text-red-500 text-sm">
                {touched.email && formErrors.email}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label
                htmlFor="firstName"
                className="font-bold text-gray-500 text-lg"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formValues.firstName || ""}
                onChange={handleChange}
                className="border-2 border-red-700 rounded-full p-3"
              />
              <div className="text-red-500 text-sm">
                {touched.firstName && formErrors.firstName}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <label
                htmlFor="lastName"
                className="font-bold text-gray-500 text-lg"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formValues.lastName || ""}
                onChange={handleChange}
                className="border-2 border-red-700 rounded-full p-3"
              />
              <div className="text-red-500 text-sm">
                {touched.lastName && formErrors.lastName}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
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
                className="border-2 border-red-700 rounded-full p-3"
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
                className="border-2 border-red-700 rounded-full p-3"
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
                  <div
                    aria-label="Loading..."
                    role="status"
                    className="h-8 w-8"
                  >
                    <svg className=" animate-spin" viewBox="3 3 18 18">
                      <path
                        className="fill-slate-100"
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                      ></path>
                      <path
                        className="fill-slate-100"
                        d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "Create an Account"
                )}
              </button>
            </div>
          </form>
          <div className="mt-5 flex flex-col items-center justify-items-center">
            <h5 className=" text-gray-500 text-sm">
              Already have an account?
              <Link className="font-bold ml-2 text-sm text-red-800" to="/login">
                Login
              </Link>
            </h5>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
