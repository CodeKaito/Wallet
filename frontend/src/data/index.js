import {
  randomPrice,
  randomCreatedDate,
  randomUpdatedDate,
  randomStatusOptions,
  randomJobTitle,
} from "@mui/x-data-grid-generator";

export const DataTransactions = [
  {
    id: 1,
    category: randomJobTitle(),
    label: randomStatusOptions(),
    amount: randomPrice(),
    date: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    category: randomJobTitle(),
    label: randomStatusOptions(),
    amount: randomPrice(),
    date: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    category: randomJobTitle(),
    label: randomStatusOptions(),
    amount: randomPrice(),
    date: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    category: randomJobTitle(),
    label: randomStatusOptions(),
    amount: randomPrice(),
    date: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    category: randomJobTitle(),
    label: randomStatusOptions(),
    amount: randomPrice(),
    date: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

export const DataBarChart = [
  {
    month: "Jan",
    House: 137,
    Food: 96,
    Transportation: 72,
    Personal: 140,
  },
  {
    month: "Feb",
    House: 55,
    Food: 28,
    Transportation: 58,
    Personal: 29,
  },
  {
    month: "Mar",
    House: 109,
    Food: 23,
    Transportation: 34,
    Personal: 152,
  },
  {
    month: "Apr",
    House: 133,
    Food: 52,
    Transportation: 43,
    Personal: 83,
  },
  {
    month: "May",
    House: 81,
    Food: 80,
    Transportation: 112,
    Personal: 35,
  },
  {
    month: "Jun",
    House: 66,
    Food: 111,
    Transportation: 167,
    Personal: 18,
  },
  {
    month: "Jul",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
  {
    month: "Aug",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
  {
    month: "Sept",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
  {
    month: "Oct",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
  {
    month: "Nov",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
  {
    month: "Dec",
    House: 80,
    Food: 47,
    Transportation: 158,
    Personal: 49,
  },
];

export const DataPieChart = [
  {
    id: "hack",
    label: "hack",
    value: 239,
  },
  {
    id: "make",
    label: "make",
    value: 170,
  },
  {
    id: "go",
    label: "go",
    value: 322,
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
  },
];

export const DataPieChart2 = [
  {
    id: "python",
    label: "python",
    value: 190,
    color: "hsl(115, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 221,
    color: "hsl(47, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 141,
    color: "hsl(265, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 248,
    color: "hsl(216, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 340,
    color: "hsl(154, 70%, 50%)",
  },
];

export const DataLineData = [
  {
    id: "Income",
    data: [
      {
        x: "Jan",
        y: 1650,
      },
      {
        x: "Feb",
        y: 1800,
      },
      {
        x: "Mar",
        y: 1600,
      },
      {
        x: "Apr",
        y: 216,
      },
      {
        x: "May",
        y: 35,
      },
      {
        x: "Jun",
        y: 236,
      },
      {
        x: "Jul",
        y: 88,
      },
      {
        x: "Aug",
        y: 232,
      },
      {
        x: "Sep",
        y: 281,
      },
      {
        x: "Oct",
        y: 1,
      },
      {
        x: "Nov",
        y: 35,
      },
      {
        x: "Dec",
        y: 14,
      },
    ],
  },
  {
    id: "Expenses",
    data: [
      {
        x: "Jan",
        y: 2256,
      },
      {
        x: "Feb",
        y: 1500,
      },
      {
        x: "Mar",
        y: 3400,
      },
      {
        x: "Apr",
        y: 1300,
      },
      {
        x: "May",
        y: 1650,
      },
      {
        x: "Jun",
        y: 2250,
      },
      {
        x: "Jul",
        y: 3300,
      },
      {
        x: "Aug",
        y: 1890,
      },
      {
        x: "Sep",
        y: 2400,
      },
      {
        x: "Oct",
        y: 2870,
      },
      {
        x: "Nov",
        y: 1300,
      },
      {
        x: "Dec",
        y: 2100,
      },
    ],
  },
];

export const expensesData = {
  House: [
    "Monthly rent",
    "Mortgage payments",
    "Water bills",
    "Gas bills",
    "Electricity bills",
    "Property taxes",
    "Home maintenance and repairs",
    "Furniture expenses",
    "Home insurance",
    "Household toiletries and supplies",
  ],
  Food: [
    "Grocery shopping expenses",
    "Dining out (restaurants, cafes, fast food)",
    "Specialty food expenses (organic, gluten-free, etc.)",
    "Alcoholic beverages expenses",
    "Snacks and sweets",
    "Pet food expenses",
    "Special occasion food expenses (parties, dinners)",
    "Food delivery service subscriptions",
    "Ready-made or pre-packaged meals",
    "Cooking ingredients (spices, condiments, etc.)",
  ],
  Transportation: [
    "Vehicle fuel",
    "Vehicle maintenance and repairs",
    "Car insurance",
    "Public transportation payments (tickets, passes)",
    "Purchase of a new or used vehicle",
    "Vehicle taxes and registration fees",
    "Toll road fees",
    "Car or bike rentals",
    "Ride-sharing or car-sharing services",
    "Private transportation services",
  ],
  Personal: [
    "Clothing and accessories",
    "Personal care products",
    "Medical expenses",
    "Health insurance",
    "Recreational and entertainment activities",
    "Gym memberships",
    "Books and magazines",
    "Electronics and gadgets",
    "Hobbies and interests",
    "Travel expenses",
  ],
};
