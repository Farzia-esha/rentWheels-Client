import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('http://localhost:3000/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTestimonial = {
      customerName: name,
      feedback,
      rating,
      location,
      imageUrl: "https://i.pravatar.cc/150?img=1"
    };

    try {
      await axios.post('http://localhost:3000/testimonials', newTestimonial);

      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your feedback has been submitted.',
        showConfirmButton: false,
        timer: 2000
      });

      setName('');
      setLocation('');
      setFeedback('');
      setRating(5);
      fetchTestimonials(); 
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Customers</span> Say
          </h2>
          <p className="text-lg text-base-content/70">
            Read testimonials from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.imageUrl} alt={testimonial.customerName} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.customerName}</h3>
                    <p className="text-sm text-base-content/70">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <FaStar key={i} className="text-warning" />
                  ))}
                </div>

                <div className="relative">
                  <FaQuoteLeft className="text-4xl text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-base-content/80 italic pl-8">
                    {testimonial.feedback}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-12 max-w-xl mx-auto space-y-4 p-6 bg-base-100 shadow rounded">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="input input-bordered w-full" 
            required 
          />
          <input 
            type="text" 
            placeholder="Location" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            className="input input-bordered w-full" 
            required 
          />
          <textarea 
            placeholder="Your Feedback" 
            value={feedback} 
            onChange={e => setFeedback(e.target.value)} 
            className="textarea textarea-bordered w-full" 
            required 
          />
          <select 
            value={rating} 
            onChange={e => setRating(Number(e.target.value))} 
            className="select select-bordered w-full"
          >
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star</option>)}
          </select>
          <button type="submit" className="btn btn-primary w-full">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
