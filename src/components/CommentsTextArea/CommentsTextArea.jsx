import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";

export default function CommentsTextArea({ comments = [] }) {
  const [commentText, setCommentText] = useState("");
  const { courseName } = useParams();
  const { isLoggedIn } = useContext(AuthContext);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText) {
      swal("Please enter your comment");
      return;
    }
    try {
      const body = {
        courseShortName: courseName,
        body: commentText,
        score: 5,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 201) {
        swal({
          title: "Your comment has been submitted",
          icon: "success",
          button: "OK",
        });
        setCommentText("");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (err) {
      console.error(err);
      swal({
        title: "Error",
        text: "Please check your information and try again",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-4 mt-10 md:mt-30 mb-8 md:mb-10 font-roboto">
      {/* Comments Header */}
      <div className="flex items-center gap-x-2 mb-4">
        <svg className="w-10 h-10 text-orange-300">
          <use href="#icon-comment" />
        </svg>
        <span className="text-lg md:text-2xl font-bold text-zinc-700 dark:text-white">
          Comments
        </span>
      </div>

      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            No comments have been added yet.
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="border-dashed border w-full border-gray-300 p-3 md:p-10 bg-white rounded-2xl mb-4 dark:bg-zinc-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-x-9">
                <div className="flex self-start items-center gap-x-2 md:gap-x-9">
                  <span className="text-lg font-bold text-zinc-700 dark:text-white">
                    {comment.creator ? comment.creator.name : "Anonymous User"}
                  </span>
                  <span className="text-sm md:text-base text-gray-500 dark:text-gray-300">
                    {comment.creator
                      ? comment.creator.role === "ADMIN"
                        ? "Admin"
                        : "User"
                      : "Anonymous"}
                  </span>
                  <span className="text-sm md:text-base text-gray-500 dark:text-gray-300">
                    {comment.createdAt.slice(0, 10)}
                  </span>
                </div>
                <div className="flex self-end items-center gap-x-2 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-1 xxs:px-6 xxs:py-2 bg-orange-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Link
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-300 text-base md:text-lg font-bold"
                    to="#"
                  >
                    Reply
                  </Link>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg font-normal">
                {comment.body}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Comment Rules */}
      <div className="flex flex-col gap-y-2 mb-4 md:mb-8">
        <span className="text-zinc-700 dark:text-white text-lg md:text-xl font-bold mb-4 md:mb-6">
          Comment Rules
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          <svg className="w-5 h-5 text-green-500 inline-block mx-2">
            <use href="#icon-check" />
          </svg>
          Please use the Q&A section for support requests. Comments unrelated to
          troubleshooting will not be approved.
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          <svg className="w-5 h-5 text-green-500 inline-block mx-2">
            <use href="#icon-check" />
          </svg>
          Off-topic comments will not be approved.
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          <svg className="w-5 h-5 text-green-500 inline-block mx-2">
            <use href="#icon-check" />
          </svg>
          Questions about bug fixes should be asked in the troubleshooting
          section.
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          <svg className="w-5 h-5 text-green-500 inline-block mx-2">
            <use href="#icon-check" />
          </svg>
          Avoid submitting duplicate comments.
        </span>
      </div>

      {/* Comment Form */}
      {isLoggedIn ? (
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-zinc-700 dark:text-white text-lg md:text-2xl font-bold">
              Your Comment *
            </span>
            <textarea
              className="textarea outline-none focus:outline-none border-gray-200 rounded-2xl my-4 md:my-8 w-full h-32 md:h-48 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-300 w-fit self-end text-white text-lg md:text-xl px-8 py-3 rounded-2xl hover:bg-orange-400 transition-colors"
            onClick={submitComment}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="alert alert-info mt-3">
          You need to be logged in to submit a comment.
          <Link to="/login" className="alert-link p-3">
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}
