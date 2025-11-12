import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ahmed Rahman',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Amazing service! The booking process was smooth and the car was in excellent condition. Highly recommended!',
      location: 'Dhaka'
    },
    {
      name: 'Fatima Sultana',
      image: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'Best car rental experience ever! The support team was very helpful and responsive. Will definitely use again.',
      location: 'Chittagong'
    },
    {
      name: 'Karim Hossain',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 4,
      text: 'Great variety of cars to choose from. The prices are competitive and the service is top-notch.',
      location: 'Sylhet'
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-base-content/70">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning" />
                  ))}
                </div>

                <div className="relative">
                  <FaQuoteLeft className="text-4xl text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-base-content/80 italic pl-8">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

