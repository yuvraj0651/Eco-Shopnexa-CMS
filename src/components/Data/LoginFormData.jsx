export const loginFormData = [
  {
    id: 1,
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: 2,
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    id: 3,
    label: "Select Role",
    type: "select",
    name: "role",
    placeholder: "Choose your role",
    required: true,

    options: [
      {
        id: 1,
        label: "Admin",
        value: "admin",
      },
      {
        id: 2,
        label: "Manager",
        value: "manager",
      },
      {
        id: 3,
        label: "Staff",
        value: "staff",
      },
    ],
  },
];
