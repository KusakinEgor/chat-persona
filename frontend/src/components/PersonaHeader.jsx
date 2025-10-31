import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-gradient-to-r from-orange-200/20 to-white/10 border-b border-orange-200/20">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center w-full">

        {/* Левая колонка: логотип */}
        <div className="flex flex-col cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
          <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
            ChatPersona
          </h1>
          <span className="text-sm text-white/80">Your smart assistant</span>
        </div>

        {/* Центральная колонка: навигация */}
        <div className="flex-1 flex justify-center">
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-base font-medium transition-colors duration-200 ${
                  location.pathname === link.path ? "text-orange-400" : "text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300 ${
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Правая колонка: кнопка и иконка */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <FaUserCircle className="text-white/80 hover:text-orange-400 transition-colors duration-200 cursor-pointer" size={28} />
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>
        </div>

      </div>
    </header>
  );
}
