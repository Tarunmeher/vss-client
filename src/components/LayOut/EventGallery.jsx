import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const galleryImages = [
  import.meta.env.VITE_SERVICE_URL + '/siteimages/class4.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/skill.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/explore.jpg',
  import.meta.env.VITE_SERVICE_URL + '/siteimages/achive.jpg',
];

export default function EventGallery() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const getEvents = async () => {
      try {
        const currentUrl = window.location.href;
        let url = import.meta.env.VITE_SERVICE_URL;
        if (currentUrl.includes("https")) {
          url = url.replace("http", "https");
        }

        const res = await fetch(`${url}/getEvents`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          // Accessing the results array from your API response
          setEvents(data.results || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setEvents([]);
      }
    };
    getEvents();
  }, []);

  // Helper to format date (e.g., "Aug 15")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-[#f0f8ff] to-[#e0f2fe] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 relative pb-4"
          data-aos="fade-down"
        >
          Events & Gallery
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#0077b6] rounded-full"></span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Events Section - Shows Max 3 Records */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Events
            </h2>
            
            <div className="space-y-4">
              {events.length > 0 ? (
                <>
                  {events.slice(0, 3).map((event) => (
                    <motion.div
                      key={event.id}
                      className="group bg-white rounded-xl shadow-md overflow-hidden flex hover:shadow-xl transition-all duration-300 border border-gray-100"
                      data-aos="fade-up"
                    >
                      {/* Date Badge */}
                      <div className="bg-[#0077b6] text-white w-20 flex flex-col items-center justify-center p-2 text-center shrink-0">
                        <span className="text-xs uppercase font-medium">
                           {new Date(event.scheduled_date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-2xl font-bold">
                          {new Date(event.scheduled_date).getDate()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-800 group-hover:text-[#0077b6] transition-colors line-clamp-1">
                            {event.event_name.toUpperCase()}
                          </h3>
                          <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                            {new Date(event.scheduled_date).toDateString()+ " - " +event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-6">
                    <Link to="/Gallery/vss-events">
                      <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all">
                        Show All Events →
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
                  No upcoming events at the moment.
                </div>
              )}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 h-full flex flex-col"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">
                Gallery Highlights
              </h2>
              <div className="grid grid-cols-2 gap-4 flex-grow">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-md aspect-video"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={img}
                      alt="Gallery Preview"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/Gallery/vss-gallery">
                  <button className="w-full bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
                    Browse All Photos
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