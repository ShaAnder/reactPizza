// ---- IMPORTS ---- //

import React from "react";
import ReactDom from "react-dom/client";
//css
import "./index.css";

import { pizzaData } from "./data";

// ---- APP ---- //

/**
 * App Initialization
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// ---- COMPONENTS ---- //

/**
 * Header component, renders our main page title
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

/**
 * Menu component, calls pizza component mapped for every item in
 * pizzaData and then conditionally renders each.
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function Menu() {
  // set a pizza and number of pizzas const to check if they exist
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu!</h2>
      {/* conditionally render the pizza if it's available */}
      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from.All from
            our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {/* map over the data, create a pizza component and key for each item*/}
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later!</p>
      )}
    </main>
  );
}

/**
 * Pizza component, creates the pizzas in an li format for the menu, we * pass in the pizza object as a prop for each pizza item in the data
 * @param {*} pizzaObj -> destructured prop coming from menu
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function Pizza({ pizzaObj }) {
  return (
    // terniary operator to dynamically determine which pizzas are sold out
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt="Spinaci" />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* Check if pizza is sold out, if true change price with sold out, */}
        <span>{pizzaObj.soldOut ? "Sold Out" : `$ ${pizzaObj.price}`}</span>
      </div>
    </li>
  );
}

/**
 * Footer for pizza app, shows the opening time msg and order buttons, * conditionally rendered. 12-22 -> open any other time closed message
 * @param {*} props -> pizza object items passed in from Menu
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function Footer() {
  // Get our hour, openings / closings
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  // calculate if open or not
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    // pass opening / closing hours to order component
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00!
        </p>
      )}
    </footer>
  );
}

/**
 * Small component for holding extra JSX as the main footer component
 * was getting too crowded
 * @param {*} props
 * @returns jsx markup for component rendering
 * @author ShaAnder
 */
function Order({ closeHour, openHour }) {
  // return this (only shows if it's closed)
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online!
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// ---- SETUP ---- //

/**
 * Root rendering, to initialize react app
 */
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
