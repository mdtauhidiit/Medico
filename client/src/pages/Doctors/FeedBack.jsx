import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import formateDate from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const FeedBack = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <section>
      <div className="mb-[30px] border-collapse">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor">
          All reviews: {totalRating}
        </h4>
        {reviews.map((review, index) => {
          return (
          <div key={index} className="flex justify-between gap-10 mb-[30px] mt-3 p-5 rounded-md gradient__background">
            <div className="flex gap-3">
              <div className="w-[40px] h-[40px] rounded-full border-2 border-purple-200">
                <img className="w-full h-full rounded-full" src={review.user?.photo} alt="" />
              </div>
              <div className="">
                <h5 className="text-[16px] leading-6 gradient__text font-bold">
                  {review.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor ">
                  {formateDate(review?.createdAt)}
                </p>
                <p className="text__para mt-1 font-medium text-[15px]">
                  {review.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067ff" />
              ))}
            </div>
          </div>
          )
        })}
      </div>

      {!showFeedbackForm && (
        <div className="">
          <button className="btn  bg-slate-950 border-2 border-purple-200" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </section>
  );
};

export default FeedBack;
