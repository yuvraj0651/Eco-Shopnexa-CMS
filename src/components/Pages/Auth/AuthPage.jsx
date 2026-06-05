import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../API/Auth/AuthThunk";
import { loginFormData } from "../../Data/LoginFormData";
import { registerFormData } from "../../Data/RegisterFormData";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Switch } from "@/components/UI/switch";
import ThemeContext from "@/components/context/Theme/ThemeContext";
import FormFields from "./FormFields";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    role: "",
  });

  const [loginError, setLoginError] = useState({});
  const [registerError, setRegisterError] = useState({});

  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false,
  });

  const { toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const loginChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginError((prev) => ({ ...prev, [name]: "" }));
  };

  const registerChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setRegisterError((prev) => ({ ...prev, [name]: "" }));
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validateLoginForm = () => {
    const loginErrors = {};

    if (!loginData.email.trim()) {
      loginErrors.email = "Email is required";
    } else if (!emailRegex.test(loginData.email)) {
      loginErrors.email = "Invalid email address";
    }

    if (!loginData.password.trim()) {
      loginErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      loginErrors.password = "Password must be at least 6 characters";
    }

    if (!loginData.role) {
      loginErrors.role = "Role is required";
    }

    return loginErrors;
  };

  const validateRegisterForm = () => {
    const registerErrors = {};

    if (!registerData.fullName.trim()) {
      registerErrors.fullName = "Full name is required";
    } else if (registerData.fullName.trim().length < 3) {
      registerErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!registerData.email.trim()) {
      registerErrors.email = "Email is required";
    } else if (!emailRegex.test(registerData.email)) {
      registerErrors.email = "Invalid email address";
    }

    if (!registerData.password.trim()) {
      registerErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      registerErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.confirmPass.trim()) {
      registerErrors.confirmPass = "Confirm password is required";
    } else if (registerData.password !== registerData.confirmPass) {
      registerErrors.confirmPass = "Passwords do not match";
    }

    if (!registerData.role) {
      registerErrors.role = "Role is required";
    }

    return registerErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginValidateErr = validateLoginForm();
    setLoginError(loginValidateErr);

    if (Object.keys(loginValidateErr).length === 0) {
      dispatch(loginUser(loginData))
        .unwrap()
        .then(() => {
          toast.success("User Logged In Successfully");

          setLoginData({
            email: "",
            password: "",
            role: "",
          });

          setLoginError({});
          navigate("/home");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const registerValidateErr = validateRegisterForm();
    setRegisterError(registerValidateErr);

    if (Object.keys(registerValidateErr).length === 0) {
      dispatch(registerUser(registerData))
        .unwrap()
        .then(() => {
          toast.success("User Registered Successfully");

          setRegisterData({
            fullName: "",
            email: "",
            password: "",
            confirmPass: "",
            role: "",
          });

          setRegisterError({});
          setActiveTab("login");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="mt-8 justify-end mr-16 hidden lg:flex">
        <Switch onClick={toggleTheme} />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <div className="flex w-full flex-col justify-between px-6 py-8 sm:px-10 lg:w-[40%] lg:px-16 lg:py-10">
          <div className="flex items-center justify-between lg:justify-normal">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
                <span className="text-xl font-black text-white">E</span>
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Eco Shopnexa CMS
                </h1>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Ecommerce Admin Dashboard
                </p>
              </div>
            </div>
            <div className="block lg:hidden mr-2">
              <Switch onClick={toggleTheme} />
            </div>
          </div>

          <div className="mt-14 flex-1 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Premium Ecommerce CMS
              </div>

              <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Manage your ecommerce business smarter.
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">
                Powerful analytics, premium inventory management, smart orders
                tracking and modern ecommerce tools.
              </p>
            </div>

            <div className="relative mt-14 hidden h-[350px] lg:block">
              <div className="absolute left-0 top-0 w-[260px] rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Revenue
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                      ₹2.4L
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-600">
                    +22%
                  </div>
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <div className="h-10 w-3 rounded-full bg-emerald-200" />
                  <div className="h-16 w-3 rounded-full bg-emerald-300" />
                  <div className="h-20 w-3 rounded-full bg-emerald-400" />
                  <div className="h-28 w-3 rounded-full bg-emerald-500" />
                  <div className="h-16 w-3 rounded-full bg-emerald-300" />
                </div>
              </div>

              <div className="absolute right-10 top-10 w-[240px] rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Orders
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                      1,250
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    ↗
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Growth
                    </span>

                    <span className="text-sm font-semibold text-emerald-600">
                      +18%
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 w-[380px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Sales Analytics
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Weekly overview
                    </p>
                  </div>

                  <button className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                    Weekly
                  </button>
                </div>

                <div className="mt-8 flex h-40 items-end gap-3">
                  <div className="h-[40%] flex-1 rounded-t-3xl bg-emerald-200" />
                  <div className="h-[60%] flex-1 rounded-t-3xl bg-emerald-300" />
                  <div className="h-[85%] flex-1 rounded-t-3xl bg-emerald-500" />
                  <div className="h-[70%] flex-1 rounded-t-3xl bg-emerald-400" />
                  <div className="h-[95%] flex-1 rounded-t-3xl bg-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Trusted by modern ecommerce businesses.
          </div>
        </div>
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-[60%] lg:px-16">
          <div className="w-full max-w-2xl rounded-[10px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
            <div>
              <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Welcome Back
              </div>

              <h2 className="mt-5 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
                {activeTab === "login"
                  ? "Sign in to your dashboard."
                  : "Create your admin account."}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Access analytics, manage products, monitor orders and grow your
                ecommerce business.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                type="button"
                aria-label="Login Tab Button"
                onClick={() => setActiveTab("login")}
                className={`px-4 py-3 text-sm ${
                  activeTab === "login"
                    ? "bg-white font-semibold text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                aria-label="Register Tab Button"
                onClick={() => setActiveTab("register")}
                className={`px-4 py-3 text-sm ${
                  activeTab === "register"
                    ? "bg-white font-semibold text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Register
              </button>
            </div>

            {activeTab === "login" && (
              <form
                id="login-form"
                onSubmit={handleLoginSubmit}
                className="mt-8 space-y-5"
              >
                {loginFormData.map((field) => (
                  <FormFields
                    key={field.id}
                    field={field}
                    value={loginData[field.name]}
                    error={loginError[field.name]}
                    onChange={loginChangeHandler}
                    showPassword={showPassword.login}
                    togglePassword={() => togglePassword("login")}
                  />
                ))}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-emerald-600"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  form="login-form"
                  disabled={loading.login}
                  className="h-14 w-full rounded-2xl bg-emerald-500 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
                >
                  {loading.login
                    ? "Logging You In..."
                    : "Continue To Dashboard"}
                </button>
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

                  <span className="text-xs uppercase tracking-widest text-slate-400">
                    Or continue with
                  </span>

                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800">
                    Google
                  </button>

                  <button className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800">
                    Github
                  </button>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Don&apos;t have an account?
                    <button
                      onClick={() => setActiveTab("register")}
                      className="ml-2 font-semibold text-emerald-600"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </form>
            )}
            {activeTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="mt-8 space-y-5">
                {registerFormData.map((field) => (
                  <FormFields
                    key={field.id}
                    field={field}
                    value={registerData[field.name]}
                    error={registerError[field.name]}
                    onChange={registerChangeHandler}
                    showPassword={
                      field.name === "password"
                        ? showPassword.register
                        : showPassword.confirm
                    }
                    togglePassword={() =>
                      togglePassword(
                        field.name === "password" ? "register" : "confirm",
                      )
                    }
                  />
                ))}
                <button
                  disabled={loading.register}
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-emerald-500 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
                >
                  {loading.register
                    ? "Creating Account..."
                    : "Create Your Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
