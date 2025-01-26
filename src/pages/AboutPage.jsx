import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutPage = () => {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const useAnimatedSection = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    return [ref, inView];
  };

  const Section = ({ title, children }) => {
    const [ref, inView] = useAnimatedSection();
    return (
      <motion.div
        ref={ref}
        variants={fadeInVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="about-section"
      >
        <div className="inner-layer bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="page px-6 lg:px-20 py-12 text-gray-800">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="page-header text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-blue-700">About the Application</h1>
      </motion.header>

      <div className="content space-y-8">
        <Section title="Overview">
          <p className="text-base leading-6">
            This application allows users to manage and track stock data in real-time. Users can add, update, delete, 
            and view their stock portfolio while leveraging live stock prices fetched from the Alpha Vantage API. Built with 
            React for the frontend and Spring Boot for the backend, the app ensures a seamless user experience with dynamic 
            updates and robust functionality.
          </p>
        </Section>

        <Section title="Tech Stack">
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Frontend:</strong> React, Tailwind CSS</li>
            <li><strong>Backend:</strong> Spring Boot, Java</li>
            <li><strong>Database:</strong> MySQL</li>
            <li><strong>API:</strong> Alpha Vantage (for real-time stock data)</li>
            <li><strong>Tools:</strong> Eclipse IDE, Visual Studio Code</li>
          </ul>
        </Section>

        <Section title="Features">
          <ul className="list-disc ml-5 space-y-1">
            <li>Add, update, and delete stock details.</li>
            <li>Display real-time stock prices using the Alpha Vantage API.</li>
            <li>Calculate total portfolio value dynamically.</li>
            <li>Responsive UI designed with Tailwind CSS.</li>
          </ul>
        </Section>

        <Section title="Extensions">
          <ul className="list-disc ml-5 space-y-1">
            <li>Axios: For API requests in the frontend.</li>
            <li>RestTemplate: For API requests in the backend.</li>
            <li>Tailwind CSS: For responsive and modern UI design.</li>
          </ul>
        </Section>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="page-footer text-center mt-16"
      >
        <p className="text-sm text-gray-500">Built with ❤️ by ANIKET_.</p>
      </motion.footer>
    </div>
  );
};

export default AboutPage;
