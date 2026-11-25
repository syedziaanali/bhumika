import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { NAV_PAGES } from "../data/storyData";
import { LUXURY_EASE } from "../animations/variants";

export default function Navbar({
  currentPage,
  onNavigate,
  unlocked,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close mobile menu on Esc key or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none"
      style={{
        paddingTop: "max(0.65rem, env(safe-area-inset-top, 0.65rem))",
      }}
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between pointer-events-auto">
        {/* Brand Badge */}
        <motion.button
          type="button"
          onClick={() => unlocked && handleSelect("question")}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          className={`flex items-center gap-1.5 sm:gap-2 rounded-full luxury-glass-soft px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm tracking-wide text-[#FFF4F0] ${
            unlocked ? "cursor-pointer hover:border-[#D8B878]/45" : "cursor-default"
          }`}
          aria-label="For My Bhumika Home"
        >
          <Heart className="w-3.5 h-3.5 text-[#E8A3B5] fill-[#E8A3B5] shrink-0" />
          <span className="font-serif-display italic text-[#FFF4F0] whitespace-nowrap">
            For Bhumika
          </span>
          <span className="hidden xs:inline text-[#D8B878]/70 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] pl-1.5 border-l border-[#D8B878]/25 whitespace-nowrap">
            By Ziaan
          </span>
        </motion.button>

        {/* Desktop Navigation Pill (unlocked after saying YES) */}
        {unlocked && (
          <motion.nav
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
            aria-label="Story navigation"
            className="hidden md:flex items-center gap-1 rounded-full luxury-glass px-2 py-1.5"
          >
            {NAV_PAGES.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                    active
                      ? "text-[#210B18] font-medium"
                      : "text-[#FFF4F0]/80 hover:text-[#FFF4F0]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E8A3B5] to-[#D8B878] shadow-[0_0_20px_rgba(232,163,181,0.45)]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </motion.nav>
        )}

        {/* Mobile Menu Trigger (unlocked after saying YES) */}
        {unlocked && (
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center gap-1.5 rounded-full luxury-glass px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs text-[#FFF4F0] cursor-pointer active:scale-95 transition-transform"
          >
            <span className="uppercase tracking-[0.16em] text-[10px] sm:text-[11px] text-[#D8B878]">
              {NAV_PAGES.find((p) => p.id === currentPage)?.shortLabel || "Menu"}
            </span>
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#E8A3B5]" />
            ) : (
              <Menu className="w-4 h-4 text-[#E8A3B5]" />
            )}
          </motion.button>
        )}
      </div>

      {/* Mobile Dropdown Backdrop & Navigation Drawer */}
      <AnimatePresence>
        {unlocked && mobileMenuOpen && (
          <>
            {/* Backdrop for click outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#12040D]/75 backdrop-blur-sm z-30 pointer-events-auto md:hidden"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: LUXURY_EASE }}
              className="relative z-40 md:hidden mx-auto max-w-sm mt-2 rounded-2xl luxury-glass p-2.5 shadow-2xl pointer-events-auto border border-[#D8B878]/35"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_PAGES.map((item, idx) => {
                  const active = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-[#E8A3B5]/25 to-[#D8B878]/20 border border-[#D8B878]/45 text-[#FFF4F0]"
                          : "text-[#FFF4F0]/85 hover:bg-[#FFF4F0]/5 active:bg-[#FFF4F0]/10"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-[10px] text-[#D8B878] font-mono">
                          0{idx + 1}
                        </span>
                        <span className="font-medium tracking-wide">
                          {item.label}
                        </span>
                      </span>
                      {active && (
                        <Heart className="w-3.5 h-3.5 text-[#E8A3B5] fill-[#E8A3B5]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
