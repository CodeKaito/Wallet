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
    id: "japan",
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
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
