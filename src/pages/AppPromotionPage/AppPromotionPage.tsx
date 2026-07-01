import React, { useState } from "react";
import { motion } from "framer-motion";
import slLogo from "@/assets/apps/icons/SharedLivingLogo.svg";
import mockup from "@/assets/apps/images/mockup.webp";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function AppPromotionPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registered email:", email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans antialiased flex flex-col justify-between"
    >
      {/* Navbar Layout */}
      <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={slLogo}
            alt="Shared Living Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-bold tracking-tight text-lg">SLE</span>
        </div>

        {/* <nav className="hidden md:flex items-center gap-6 text-lg font-medium text-zinc-500">
          <a href="#accuracy" className="hover:text-zinc-900 transition-colors">
            Is it accurate?
          </a>
          <a href="#pricing" className="hover:text-zinc-900 transition-colors">
            Pricing
          </a>
          <a href="#blog" className="hover:text-zinc-900 transition-colors">
            Blog
          </a>
          <a href="#about" className="hover:text-zinc-900 transition-colors">
            About
          </a>
          <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-medium px-4 h-8 rounded-full shadow-sm">
            Download SLE
          </Button>
        </nav> */}
      </header>

      {/* Main Content Body - Tightened Container */}
      <main className="relative flex-1 max-w-5xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-12 pt-6">
        {/* Left Column: Copy & Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="md:col-span-7 flex flex-col justify-center space-y-5 max-w-md"
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 leading-[1.15] flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Are you tired of tracking and</span>

            <motion.span
              className="inline-flex items-center justify-center cursor-pointer select-none mx-1"
              initial={{ scale: 1, rotate: -10 }}
              whileHover={{ scale: 1.25, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 12,
              }}
            >
              <img
                src={slLogo}
                alt="Shared Living Logo"
                className="h-10 sm:h-12 w-auto object-contain align-middle"
              />
            </motion.span>

            <span className="flex justify-center items-center relative group underline hover:decoration-blue-500 transition-all duration-300 cursor-pointer">
              splitting bills{" "}
              <ReceiptText className="absolute top-0 right-5 rotate-12 group-hover:-top-5 group-hover:right-10 group-hover:-rotate-10  transition-all duration-300" />{" "}
              <ReceiptText className="group-hover:-top-5 group-hover:-rotate-10  transition-all duration-300" />{" "}
              <ReceiptText className="absolute top-3 right-5 -rotate-12 group-hover:-top-5 group-hover:-rotate-10  transition-all duration-300" />{" "}
              ?
            </span>
          </h1>

          <p className="text-zinc-500 text-base font-normal leading-relaxed">
            Keeping track of shared expenses with friends is a hassle. I'm
            building a simple solution to fix exactly that. Join the wishlist
            and get early access when it's ready!
          </p>
          {/* Wishlist Email Subscription Form */}
          <div className="pt-2 w-full">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-zinc-200 h-10 px-3 text-sm shadow-sm focus-visible:ring-zinc-400"
              />
              <Button
                type="submit"
                className="bg-[#0099FF] hover:bg-[#0055FF] text-white font-medium text-sm h-10 px-5 rounded-md shadow-md shadow-indigo-100 transition-all shrink-0"
              >
                Join Wishlist
              </Button>
            </form>
            {/* <p className="text-[11px] text-zinc-400 mt-2 ml-1">
              Currently building. No credit card required.
            </p> */}
          </div>
        </motion.div>

        {/* Right Column: Framer Motion Floating Mockup */}
        <motion.div 
         initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="md:col-span-5 flex justify-center md:justify-end items-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[280px] aspect-[9/19] rounded-[2.2rem]"
          >
            <img
              src={mockup}
              alt="SLE App Preview"
              className="w-full h-full object-cover "
            />
          </motion.div>
        </motion.div>
        <span
          className="sticky w-fit bottom-4 left-4 text-zinc-500 text-sm flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-md shadow-sm shadow-accent/20 hover:bg-accent/20 hover:text-accent transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeft /> Portfolio
        </span>
      </main>
    </motion.div>
  );
}
