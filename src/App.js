import React, { useState } from "react";
import bgMobile from "./image/bg-main-mobile.png";
import bgDesktop from "./image/bg-main-desktop.png";
import logo from "./image/card-logo.svg";
import tick from "./image/icon-complete.svg";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameError, setNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [dateError, setDateError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Please enter a valid name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (cardNumber.trim() === "") {
      setCardNumberError("Please enter a valid card number");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (date.trim() === "") {
      setDateError("Please enter a valid expiration date");
      isValid = false;
    } else {
      setDateError("");
    }

    if (cvc.trim() === "") {
      setCvcError("Please enter a valid CVC");
      isValid = false;
    } else {
      setCvcError("");
    }

    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setConfirmed(true);
    }
  };

  function ThankYou() {
    const handleContinue = () => {
      setConfirmed(false);
      setName("");
      setCardNumber("");
      setDate("");
      setCvc("");
    };

    return (
      <>
        <div className="flex flex-col items-center justify-center lg:h-screen">
          <img src={tick} alt="" className="block mx-auto" />
          <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
            Thank You!
          </h1>
          <p className="text-slate-400 text-center">
            We have added your card details
          </p>

          <button
            onClick={handleContinue}
            className="btn block mx-auto mt-10 w-full"
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <section>
        <div className="absolute -z-10">
          <pictures>
            <source media="(min-width: 1024px)" srcSet={bgMobile}></source>
            <img src={bgDesktop} alt="" />
          </pictures>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 lg:grid lg:grid-cols-1 ">
            <article className="front-card p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />
              <div>
                <h1 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {confirmed ? cardNumber : ""}
                </h1>
                <ul className="flex item-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {confirmed ? name : ""}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                    {confirmed ? date : ""}
                  </li>
                </ul>
              </div>
            </article>
            <article className="back-card relative lg:ml-20">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {confirmed ? cvc : ""}
              </p>
            </article>
          </div>
          <div>
            {!confirmed && (
              <form
                className="flex flex-col justify-center gap-8 lg:h-screen max-w-lg"
                onSubmit={handleFormSubmit}
              >
                <div>
                  <label
                    htmlFor="cardholder_name"
                    className="block uppercase tracking-wider text-slat-800 mb-2 text-sm"
                  >
                    Cardholder Name
                  </label>
                  <input
                    className="border-2 border-slate-300 py-3 px-4 rounded-outline-none w-full"
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Shital Janvalkar"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  {nameError && <p className="text-red-500">{nameError}</p>}
                </div>

                <div>
                  <label
                    htmlFor="card_number"
                    className="block uppercase tracking-wider text-slat-800 mb-2 text-sm"
                  >
                    Card Number
                  </label>
                  <input
                    className="border-2 border-slate-300 py-3 px-4 rounded-outline-none w-full"
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9101 1112"
                    maxLength={19}
                    required
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  ></input>
                  {cardNumberError && (
                    <p className="text-red-500">{cardNumberError}</p>
                  )}
                </div>

                <article className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <label
                      htmlFor="expiry_date"
                      className="block uppercase tracking-wider text-slat-800 mb-2 text-sm"
                    >
                      exp.date (MM/YY)
                    </label>
                    <input
                      className="border-2 border-slate-300 py-3 px-4 rounded-outline-none w-full"
                      type="month"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    ></input>
                    {dateError && <p className="text-red-500">{dateError}</p>}
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="cvc"
                      className="block uppercase tracking-wider text-slat-800 mb-2 text-sm"
                    >
                      CVC
                    </label>
                    <input
                      className="border-2 border-slate-300 py-3 px-4 rounded-outline-none w-full"
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    ></input>
                    {cvcError && <p className="text-red-500">{cvcError}</p>}
                  </div>
                </article>
                <button type="submit" className="btn">
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou />}
          </div>
        </div>
      </section>
    </>
  );
}
