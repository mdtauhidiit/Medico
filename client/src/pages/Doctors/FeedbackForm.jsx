import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating && !reviewText) {
        setLoading(false);
        return toast.error("Rating & Review fields are required");
      }
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success(result.message);
      window.location.reload();
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form action="">
      <div className="">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          Rate your overall experience?
        </h3>
        <div className="">
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                type="button"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          Share your feedback or suggestions*
        </h3>
        <textarea
          className="border border-solid form__input focus:outline w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          onChange={(e) => setReviewText(e.target.value)}
        >
          {reviewText}
        </textarea>
        <button className="btn bg-slate-950 border-2 border-purple-200" type="submit" onClick={handleSubmit}>
          {loading ? <HashLoader size={25} color="#fff" /> : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
