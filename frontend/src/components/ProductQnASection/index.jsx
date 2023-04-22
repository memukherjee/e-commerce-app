import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalButton from "../ModalButton";
import { timeSince } from "../../utils/timeFormater";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../contexts/userContext";

export default function ProductQnASection({
  product,
  setModalChild,
  open,
  QnAs,
  loading,
  setSelectedQuestion,
}) {
  const [questionQuery, setQuestionQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(-1);
  const { user } = useContext(UserContext);
  return loading ? (
    <div className="flex justify-center items-center">
      <ClipLoader color={"#0f4c75"} loading={true} size={150} />
    </div>
  ) : (
    <div className="w-full text-left">
      <h1 className="text-xl md:text-2xl text-center md:text-left font-bold text-cyan-900 mb-2">
        <span className="underline underline-offset-4">
          Looking for a specific info?
        </span>
      </h1>
      {QnAs.length > 0 && (
        <div className="search-question-input text-gray-500 bg-gray-100 flex justify-between items-center gap-x-8 px-8">
          <input
            type="text"
            value={questionQuery}
            onChange={(e) => setQuestionQuery(e.target.value)}
            placeholder="Search for a question"
            className="h-12 border-0 bg-transparent outline-none grow placeholder-gray-400 placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-300 focus:placeholder:opacity-0"
          />
          <span>
            <i className="fas fa-search"></i>
          </span>
        </div>
      )}
      <h2 className="text-lg md:text-3/4xl text-center md:text-left font-semibold text-gray-500 mt-4 mb-2">
        Customer questions & answers
      </h2>
      {QnAs.length === 0 && (
        <span className="text-base md:text-lg font-medium text-gray-400 text-center mx-auto block">
          No questions asked yet. Be the first one to ask a question.
        </span>
      )}
      <div className=" qnas flex flex-col gap-y-4">
        {QnAs.filter((qna) =>
          qna?.question.toLowerCase().includes(questionQuery.toLowerCase())
        ).map((qna) => (
          <div key={qna?.id} className="qna">
            <div
              className="qna-header"
              onClick={() =>
                setExpandedQuestion(expandedQuestion === qna?.id ? -1 : qna?.id)
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-500 flex items-center">
                  Q: {qna?.question}
                  {qna?.userId === user?.id && (
                    <span className="text-[.65rem] font-normal ml-2 bg-gray-400 text-white shadow shadow-gray-400 px-1 rounded-md">
                      by You
                    </span>
                  )}
                </h3>
                <span>
                  <span className="text-[.5rem] md:text-base text-gray-500">
                    {timeSince(new Date(qna?.date + " " + qna?.time)) + " ago"}
                  </span>

                  <motion.span
                    className="ml-2 inline-block text-gray-500"
                    animate={{
                      rotate: expandedQuestion === qna?.id ? 180 : 0,
                    }}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </motion.span>
                </span>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {expandedQuestion === qna?.id && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="qna-body pl-4 md:pl-8"
                >
                  {qna?.answer?.length > 0 && (
                    <div className="answers mb-2">
                      {qna?.answer?.map((ans, index) => (
                        <div key={index} className="flex items-center gap-x-4">
                          <p className="text-base md:text-lg text-gray-500">
                            <span className="inline-block rotate-90 mr-2">
                              <i className="fa-solid fa-turn-up"></i>
                            </span>
                            {ans?.answer}
                          </p>
                          <span className="text-[.5rem] md:text-base text-gray-400">
                            {timeSince(new Date(ans?.date + " " + ans?.time)) +
                              " ago"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="qna-action">
                    {user && qna?.userId !== user?.id && (
                      <ModalButton
                        open={open}
                        onClick={() => {
                          setSelectedQuestion(qna);
                          setModalChild("addAnswer");
                          open();
                        }}
                        className="text-[.4rem] md:text-base font-medium px-2 py-0.5 rounded-xl text-green-500 shadow-sm shadow-green-500 hover:text-white hover:bg-green-500 transition-colors"
                      >
                        Answer
                      </ModalButton>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {user && (
        <ModalButton
          open={open}
          onClick={() => {
            setModalChild("addQuestion");
            open();
          }}
          className="text-base md:text-lg font-medium px-2 py-0.5 rounded-sm text-cyan-900 shadow-md border border-cyan-900 hover:text-white hover:bg-cyan-900 transition-colors mt-4"
        >
          Haven't found what you're looking for? Ask a question
        </ModalButton>
      )}
    </div>
  );
}
