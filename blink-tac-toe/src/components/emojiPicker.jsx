"use client"

import { useState } from "react"
import { emojiCategories } from "../data/emojiCategories"
import { playSound } from "../utils/sounds"
import { motion } from "framer-motion"

export default function EmojiPicker({ onSelectCategory, player }) {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const handleCategorySelect = (category) => {
    playSound("select")
    onSelectCategory(category)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        Player {player}, choose a category:
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md">
        {Object.keys(emojiCategories).map((category) => {
          // Get a sample emoji from the category
          const sampleEmoji = emojiCategories[category][0]

          return (
            <motion.button
              key={category}
              onClick={() => handleCategorySelect(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative overflow-hidden rounded-xl p-4 h-32
                flex flex-col items-center justify-center
                bg-white dark:bg-gray-700 shadow-md
                transition-all duration-300
                ${hoveredCategory === category ? "ring-4 ring-purple-400 dark:ring-purple-600" : ""}
              `}
            >
              <span className="text-4xl mb-2">{sampleEmoji}</span>
              <span className="font-medium text-gray-800 dark:text-white">{category}</span>

              {/* Background animation */}
              {hoveredCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-900 dark:to-blue-900 opacity-20 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
