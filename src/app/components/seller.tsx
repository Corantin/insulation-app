import { useState } from "react";

export default function RepJobForm() {
  const [formState, setFormState] = useState({
    clientName: "",
    clientEmail: "",
    quote: "",
    numBags: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // normally you'd send this to your backend
    setSubmitted(true);
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 text-white rounded-xl shadow-md">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              name="clientName"
              value={formState.clientName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="clientEmail">Client Email</label>
            <input
              id="clientEmail"
              name="clientEmail"
              value={formState.clientEmail}
              onChange={handleChange}
              placeholder="jane@example.com"
              type="email"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="quote">Quote Details</label>
            <textarea
              id="quote"
              name="quote"
              value={formState.quote}
              onChange={handleChange}
              placeholder="Description of the work and estimate..."
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="numBags">Number of Insulation Bags</label>
            <input
              id="numBags"
              name="numBags"
              value={formState.numBags}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 12"
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-pink-400 text-pink-300 hover:bg-pink-700 hover:text-white">
            Create Job
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-green-400 text-lg mb-2">
            ✅ Job created successfully!
          </p>
          <button
            className="border border-pink-400 text-pink-300 hover:bg-pink-700"
            onClick={() => setSubmitted(false)}>
            Create Another
          </button>
        </div>
      )}
    </div>
  );
}
