import React from "react";

const Contact = () => {
  return (
    <section className="px-5 xl:px-0 ">
    <div className="px-6 py-6 ml-10 mr-10 md:mx-auto mb-10 max-w-[680px] mt-12 gradient__background ">
      <h2 className="gradient__text text-[44px] leading-[48px] font-[700] text-center">Contact US</h2>
      <p className="mb-6  text__para font-light text-center text-gray-400">
        Got a technical issue? Want to send feedback about a beta feauture? Let
        us Know.
      </p>
      <form action="" className="">
        <div className="mb-2">
          <label htmlFor="email" className="form__label">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="form__input mt-1"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="subject" className="form__label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Let us know how can we help?"
            className="form__input mt-1"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="form__label">
            Your Message
          </label>
          <textarea
            rows="5"
            type="text"
            id="message"
            placeholder="Leave a comment...."
            className="form__input mt-1"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className=" border-2 border-purple-300 btn rounded-full sm:w-fit bg-slate-950 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </section>
  );
};

export default Contact;
