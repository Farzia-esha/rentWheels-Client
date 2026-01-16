import React from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">
          We'd love to hear from you
        </p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        
        {/* Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Get In Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or need help? Reach out to us anytime.
          </p>

          <ul className="space-y-4 text-gray-700">
            <li>
              <strong> Address:</strong> Dhaka, Bangladesh
            </li>
            <li>
              <strong> Email:</strong> support@rentwheels.com
            </li>
            <li>
              <strong> Phone:</strong> +880 1234 567890
            </li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-4"
        >
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full border px-4 py-3 rounded focus:outline-purple-600"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full border px-4 py-3 rounded focus:outline-purple-600"
          />
          <textarea
            required
            rows="5"
            placeholder="Your Message"
            className="w-full border px-4 py-3 rounded focus:outline-purple-600"
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded font-semibold hover:bg-purple-800 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
