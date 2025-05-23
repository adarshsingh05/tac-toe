"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Clock, Zap, History, Volume2, Award, Palette } from "lucide-react"

export default function FeaturesModal() {
  const [isOpen, setIsOpen] = useState(false)

  const features = [
    {
      id: 1,
      title: "Power-Up System",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      description: "Use strategic abilities during gameplay. Each power-up has a cooldown period after use.",
      instructions: [
        "Extra Turn: Allows you to take another turn immediately",
        "Block Opponent: Prevents your opponent from placing on a cell of your choice",
        "Double Place: Place two emojis in a single turn",
      ],
      color: "yellow",
    },
    {
      id: 2,
      title: "Turn Timer",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      description: "Each player has 15 seconds to make a move, adding excitement and pressure.",
      instructions: [
        "Timer resets after each turn",
        "If time runs out, turn automatically passes to the other player",
        "Timer turns red when 5 seconds or less remain",
      ],
      color: "blue",
    },
    {
      id: 3,
      title: "Game History",
      icon: <History className="h-5 w-5 text-purple-500" />,
      description: "Track your game results over time.",
      instructions: [
        "Game results are saved automatically",
        "View your last 5 games after a match ends",
        "History persists even if you close the browser",
      ],
      color: "purple",
    },
    {
      id: 4,
      title: "Sound Effects",
      icon: <Volume2 className="h-5 w-5 text-green-500" />,
      description: "Audio feedback enhances the gaming experience.",
      instructions: [
        "Different sounds for placing emojis, selections, and wins",
        "Unique sound when an emoji is removed from the board",
        "Make sure your device volume is on to enjoy the full experience",
      ],
      color: "green",
    },
    {
      id: 5,
      title: "Animations",
      icon: <Sparkles className="h-5 w-5 text-pink-500" />,
      description: "Smooth visual effects make gameplay more engaging.",
      instructions: [
        "Emojis animate when placed or removed",
        "Winning combinations pulse and glow",
        "Confetti celebration when a player wins",
      ],
      color: "pink",
    },
    {
      id: 6,
      title: "Theme Toggle",
      icon: <Palette className="h-5 w-5 text-indigo-500" />,
      description: "Switch between light and dark mode based on your preference.",
      instructions: [
        "Click the sun/moon icon in the top-right corner",
        "Your preference is saved for future visits",
        "Automatically detects your system preference on first visit",
      ],
      color: "indigo",
    },
    {
      id: 7,
      title: "Score Tracking",
      icon: <Award className="h-5 w-5 text-orange-500" />,
      description: "Keep track of wins for both players during your session.",
      instructions: [
        "Scores are displayed at the top of the game board",
        "Scores reset when you start a new game session",
        "Watch your score grow as you master the game!",
      ],
      color: "orange",
    },
  ]

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Features"
      >
        <Sparkles className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  Extra Features & How To Use Them
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    className={`p-4 rounded-lg bg-${feature.color}-50 dark:bg-${feature.color}-900/20 border border-${feature.color}-200 dark:border-${feature.color}-800`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="mr-3">{feature.icon}</div>
                      <h3 className={`font-bold text-${feature.color}-700 dark:text-${feature.color}-400 text-lg`}>
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{feature.description}</p>
                    <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to use:</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {feature.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-xs">•</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
