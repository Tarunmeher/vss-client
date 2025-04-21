import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import banner from '../../assets/images/banner3.png'

const galleryImages = [
  import.meta.env.VITE_SERVICE_URL + '/siteimages/class4.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/office.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/boyshostel.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/class2.jpg',
];

export default function EventGallery() {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1
          className="text-4xl font-bold text-center text-gray-800 mb-12 relative pb-2"
          data-aos='fade-down'
        >
          Events & Gallery
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#0077b6] rounded-full"></span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Section */}
          <div className="w-full lg:w-1/2">
            {events.length ? (
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                data-aos="fade-right"
              >
                <img
                  src={events[currentEvent].img}
                  alt={events[currentEvent].title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {events[currentEvent].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {events[currentEvent].desc}
                  </p>
                  <Link to='/Gallery/lcs-events'>
                    <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2">
                      View More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                data-aos="fade-right"
              >
                <img
                  src={`${import.meta.env.VITE_SERVICE_URL}/siteimages/event.jpg`}
                  alt={'No Events are Scheduled'}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Events not Available
                  </h2>
                </div>
              </motion.div>
            )}
          </div>

          {/* Gallery Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-md"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={img}
                      alt="Gallery Item"
                      className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to='/Gallery/lcs-gallery'>
                  <button className="px-6 py-3 bg-[#0077b6] text-white hover:text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all flex items-center gap-2 mx-auto">
                    View Gallery
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}