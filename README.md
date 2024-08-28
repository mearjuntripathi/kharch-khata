# Project Documentation

## Overview

This project is a web application designed to manage financial transactions related to borrowing and giving among users. It provides functionalities for tracking borrowed and given amounts, viewing user details, and managing expenses. The application allows users to add and update records for borrowing and giving, and view summary information including incomplete amounts.

## Features

1. **User Management**
   - Add, update, and view user details.
   - Each user can have a list of borrowed and given items.

2. **Borrowing Management**
   - Track items borrowed by users, including amount, date, and completion status.
   - View a list of all borrowed items and their details.

3. **Giving Management**
   - Track items given to users, including amount, date, and completion status.
   - View a list of all given items and their details.

4. **Expense Management**
   - Track and view expenses with associated amounts.

5. **Summary Views**
   - View the total incomplete borrowed and given amounts for each user.
   - Display the total amounts for borrowed and given items on the home page.

## Technologies Used

- **Frontend:**
  - **React:** JavaScript library for building user interfaces. It enables the creation of reusable UI components and manages the application's state.
  - **React Router DOM:** For routing and navigation within the application.
  - **CSS:** Used for styling the components and providing a responsive layout.

- **Backend:**
  - **Local Storage:** Used for storing user data and application state in the browser.

## File Structure

- **`src/`**
  - **`Components/`**
    - `AddBorrow.jsx`: Component for adding a borrowed item.
    - `AddGive.jsx`: Component for adding a given item.
    - `UpdateBorrow.jsx`: Component for updating borrowed items.
    - `UpdateGive.jsx`: Component for updating given items.
    - `BorrowPopup.jsx`: Component for displaying a list of borrowed items.
    - `GivePopup.jsx`: Component for displaying a list of given items.
    - `AddUserPopup.jsx`: Component for adding new users.
  - **`pages/`**
    - `Home.jsx`: The main page displaying summary information and links to other pages.
    - `User.jsx`: Page for viewing and managing details of a specific user.
    - `Users.jsx`: Page for listing all users and their incomplete amounts.
  - **`style/`**
    - `home.css`: Styling for the home page.
    - `user.css`: Styling for the user details page.
    - `users.css`: Styling for the users list page.
  - **`App.jsx`**: Main application component that sets up routing.
  - **`index.js`**: Entry point for the React application.

## Key Components

### `Home.jsx`

- Displays summary information for borrowed, given amounts, and expenses.
- Contains buttons to navigate to the users page and open popups for borrowed and given items.

### `Users.jsx`

- Lists all users with their incomplete borrowed and given amounts.
- Allows adding new users through a popup.

### `User.jsx`

- Shows details for a specific user, including lists of borrowed and given items.
- Provides options to add and update borrowed and given items.

### `AddBorrow.jsx`, `AddGive.jsx`, `UpdateBorrow.jsx`, `UpdateGive.jsx`

- Components for adding and updating borrowed and given items.
- Include forms for inputting item details such as name, amount, and date.

### `BorrowPopup.jsx`, `GivePopup.jsx`

- Popups displaying lists of borrowed and given items.
- Allows viewing details of the items.

### `AddUserPopup.jsx`

- Popup for adding new users to the application.

## How It Works

1. **Loading Data:**
   - Data is loaded from local storage on component mount using the `useEffect` hook.

2. **User Management:**
   - Users are added and managed through popups. User data is stored in local storage.

3. **Borrowing and Giving:**
   - Users can add, update, and view borrowed and given items. Items are stored in local storage with their details.

4. **Viewing Incomplete Amounts:**
   - The application calculates incomplete borrowed and given amounts using JavaScript array methods (`filter`, `reduce`) and displays them on the users page.

5. **Expense Tracking:**
   - Expenses are tracked separately and displayed on the home page.

## Running the Application

1. **Installation:**
   - Clone the repository.
   - Navigate to the project directory.
   - Run `npm install` to install dependencies.

2. **Development Server:**
   - Run `npm start` to start the development server.
   - Open `http://localhost:3000` in a browser to view the application.

3. **Build:**
   - Run `npm run build` to create a production build of the application.

## Troubleshooting

- **Error: Cannot read properties of undefined (reading 'map')**
  - Ensure data is properly initialized and passed to components.
  - Verify that local storage data is correctly formatted and parsed.

