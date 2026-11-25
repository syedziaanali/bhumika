import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import AmbientBackground from "./components/AmbientBackground";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import QuestionPage from "./components/QuestionPage";
import CinematicTransition from "./components/CinematicTransition";
import LoveLetterPage from "./components/LoveLetterPage";
import StoryTimelinePage from "./components/StoryTimelinePage";
import LittleThingsPage from "./components/LittleThingsPage";
import FinalSurprisePage from "./components/FinalSurprisePage";
import Footer from "./components/Footer";
import { pageTransitionVariants } from "./animations/variants";
import { romanticAudio } from "./utils/musicSynth";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("question");
  const [showYesTransition, setShowYesTransition] = useState(false);
  const [storyUnlocked, setStoryUnlocked] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [userToggledMusic, setUserToggledMusic] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleToggleMusic = useCallback(async () => {
    setUserToggledMusic(true);
    if (isMusicPlaying) {
      romanticAudio.pause();
      setIsMusicPlaying(false);
    } else {
      const started = await romanticAudio.play();
      setIsMusicPlaying(started);
    }
  }, [isMusicPlaying]);

  const handleYesClick = useCallback(async () => {
    // Start romantic melody after user interaction unless user explicitly paused
    if (!userToggledMusic && !isMusicPlaying) {
      const started = await romanticAudio.play();
      if (started) setIsMusicPlaying(true);
    }
    setShowYesTransition(true);
  }, [userToggledMusic, isMusicPlaying]);

  const handleTransitionComplete = useCallback(() => {
    setShowYesTransition(false);
    setStoryUnlocked(true);
    setCurrentPage("letter");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNavigate = useCallback((pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    return () => {
      romanticAudio.pause();
    };
  }, []);

  const ambientIntensity =
    currentPage === "surprise" || currentPage === "question"
      ? "rich"
      : "normal";

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[100dvh] flex flex-col bg-[#210B18] text-[#FFF4F0] selection:bg-[#E8A3B5]/30 selection:text-[#FFF4F0]">
        {/* Global Animated Romantic Background */}
        <AmbientBackground intensity={ambientIntensity} />

        {/* Desktop Custom Luxury Cursor */}
        <CustomCursor />

        {/* Initial Cinematic Loading Screen */}
        <AnimatePresence>
          {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        </AnimatePresence>

        {/* Cinematic Transition Between YES -> Love Letter */}
        <AnimatePresence>
          {showYesTransition && (
            <CinematicTransition onComplete={handleTransitionComplete} />
          )}
        </AnimatePresence>

        {/* Persistent Navigation & Floating Music Player */}
        {!isLoading && (
          <>
            <Navbar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              unlocked={storyUnlocked}
            />
            <MusicPlayer
              isPlaying={isMusicPlaying}
              onToggle={handleToggleMusic}
            />
          </>
        )}

        {/* Active Page Stage */}
        {!isLoading && (
          <main className="relative z-10 flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {currentPage === "question" && (
                <motion.div
                  key="page-question"
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex-1"
                >
                  <QuestionPage onYesClick={handleYesClick} />
                </motion.div>
              )}

              {currentPage === "letter" && (
                <motion.div
                  key="page-letter"
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex-1"
                >
                  <LoveLetterPage onNext={() => handleNavigate("story")} />
                </motion.div>
              )}

              {currentPage === "story" && (
                <motion.div
                  key="page-story"
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex-1"
                >
                  <StoryTimelinePage onNext={() => handleNavigate("moments")} />
                </motion.div>
              )}

              {currentPage === "moments" && (
                <motion.div
                  key="page-moments"
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex-1"
                >
                  <LittleThingsPage onNext={() => handleNavigate("surprise")} />
                </motion.div>
              )}

              {currentPage === "surprise" && (
                <motion.div
                  key="page-surprise"
                  variants={pageTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex-1"
                >
                  <FinalSurprisePage
                    onReplay={() => handleNavigate("question")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        )}

        {/* Minimal Luxury Footer */}
        {!isLoading && (
          <Footer
            showBackToTop={
              currentPage === "story" ||
              currentPage === "moments" ||
              currentPage === "letter"
            }
          />
        )}
      </div>
    </MotionConfig>
  );
}
