import React from "react";
import Link from "next/Link";
import NewPrompt from "@app/new-prompt/page";

const Form = ({ type, newPrompt, setNewPrompt, submit, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={newPrompt.prompt}
            onChange={(e) =>
              setNewPrompt({ ...newPrompt, prompt: e.target.value })
            }
            placeholder="Write the prompt here....."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{' '}
            <span className="font-normal">(#webdevelopment, #quote, #product)</span>
          </span>
          <input
            value={newPrompt.tag}
            onChange={(e) =>
              setNewPrompt({ ...newPrompt, tag: e.target.value })
            }
            placeholder="Write your tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/' className="text-gray-400 text-base">
            Cancel
            </Link>
            <button type='submit' disabled={submit} className='px-5 py-2 text-base bg-primary-orange text-white rounded-full'>{submit? `${type}...`: type}</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
