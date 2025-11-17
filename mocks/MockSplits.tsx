export const mockSplits = [
  {
    title: "Dinner with Friends",
    amount: 120.5,
    description: "Italian restaurant dinner last Friday",
    status: "open",
    category: "Food & Drink",
    due_date: "2025-11-10",
    participants: [
      { name: "Alice", paid: true },
      { name: "Bob", paid: false },
      { name: "John", paid: true },
    ],
  },
  {
    title: "Concert Tickets",
    amount: 200,
    description: "Rock concert tickets for Saturday night",
    status: "paid",
    category: "Entertainment",
    due_date: "2025-11-25",
    participants: [
      { name: "Alice", paid: false },
      { name: "John", paid: false },
    ],
  },
  {
    title: "Office Supplies",
    amount: 75.75,
    description: "Shared purchase of pens, paper, and markers",
    status: "paid",
    category: "Work",
    due_date: "2025-11-15",
    participants: [
      { name: "Emma", paid: true },
      { name: "Liam", paid: true },
    ],
  },
  {
    title: "Weekend Trip",
    amount: 450,
    description: "Airbnb rental and groceries for the trip",
    status: "cancelled",
    category: "Travel",
    due_date: "2025-12-01",
    participants: [
      { name: "John", paid: false },
      { name: "Alice", paid: true },
      { name: "Bob", paid: false },
    ],
  },
  {
    title: "Gym Membership",
    amount: 60,
    description: "Monthly membership fee split among friends",
    status: "paid",
    category: "Health",
    due_date: "2025-11-18",
    participants: [
      { name: "Emma", paid: true },
      { name: "John", paid: true },
    ],
  },
];
