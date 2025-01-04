import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-full px-6 py-24 min-h-screen bg-gradient-to-b from-[#f7f9fc] to-white text-center lg:px-[320px] flex flex-col items-center shadow-xl rounded-xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <h1 className="text-[#d6482b] text-4xl font-extrabold leading-tight mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
          ABOUT US
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
          Welcome to bidspirit, the ultimate destination for online auctions
          and bidding excitement. Founded in 2024, we are dedicated to
          providing a dynamic and user-friendly platform for buyers and
          sellers to connect, explore, and transact in a secure and seamless
          environment.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="text-[#333] text-2xl font-semibold mb-4 md:text-3xl">
          Our Mission
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          At bidspirit, our mission is to revolutionize the way people buy and
          sell items online. We strive to create an engaging and trustworthy
          marketplace that empowers individuals and businesses to discover
          unique products, make informed decisions, and enjoy the thrill of
          competitive bidding.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-[#333] text-2xl font-semibold mb-4 md:text-3xl">
          Our Values
        </h3>
        <ul className="space-y-6 max-w-3xl mx-auto">
          {values.map((element) => (
            <li key={element.id} className="text-lg sm:text-xl md:text-2xl text-gray-700">
              <span className="text-black font-bold">{element.title}</span>:{" "}
              {element.description}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-[#333] text-2xl font-semibold mb-4 md:text-3xl">
          Our Story
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          Founded by T.M. Threemavithana, bidspirit was born out of a passion for
          connecting people with unique and valuable items. With years of
          experience in the auction industry, our team is committed to
          creating a platform that offers an unparalleled auction experience
          for users worldwide.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mb-12"
      >
        <h3 className="text-[#333] text-2xl font-semibold mb-4 md:text-3xl">
          Join Us
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          Whether you're looking to buy, sell, or simply explore, bidspirit
          invites you to join our growing community of auction enthusiasts.
          Discover new opportunities, uncover hidden gems, and experience the
          thrill of winning your next great find.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 1 }}
      >
        <p className="text-[#d6482b] text-xl font-bold mt-8">
          Thank you for choosing bidspirit. We look forward to being a part of
          your auction journey!
        </p>
      </motion.div>
    </section>
  );
};

export default About;
