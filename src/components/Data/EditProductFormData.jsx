export const editFormData = [
  {
    id: 1,
    type: "text",
    label: "title",
    name: "title",
    width: "full",
  },

  {
    id: 2,
    type: "number",
    label: "price",
    name: "price",
    width: "half",
  },

  {
    id: 3,
    type: "number",
    label: "stock",
    name: "stock",
    width: "half",
  },

  {
    id: 4,
    type: "select",
    label: "status",
    name: "status",
    width: "full",

    options: [
      {
        id: 1,
        label: "In Stock",
        value: "In Stock",
      },
      {
        id: 2,
        label: "Low Stock",
        value: "Low Stock",
      },
      {
        id: 3,
        label: "Out Of Stock",
        value: "Out Of Stock",
      },
    ],
  },
];