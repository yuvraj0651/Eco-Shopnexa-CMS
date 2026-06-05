export const registerFormData = [
  {
    id: 1,
    label: "Full Name",
    type: "text",
    name: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: 2,
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: 3,
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    id: 4,
    label: "Confirm Password",
    type: "password",
    name: "confirmPass",
    placeholder: "Confirm your password",
    required: true,
  },
  {
    id: 5,
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
