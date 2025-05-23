"use client"

import { useState } from "react"
import { X, HelpCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Help"
      >
        <HelpCircle className="h-6 w-6" />
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center">
                  <Info className="mr-2 h-6 w-6" />
                  How to Play
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <motion.div
                  className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Game Setup</h3>
                  <p className="text-gray-700 dark:text-gray-300">🎮 Each player selects an emoji category</p>
                </motion.div>

                <motion.div
                  className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-1">Gameplay</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="mr-2">👣</span>
                      <span>Only 3 emojis allowed per player on board</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🧼</span>
                      <span>4th emoji replaces the oldest (FIFO)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">⏱️</span>
                      <span>15 seconds per turn - act fast!</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-1">Winning</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="mr-2">🏆</span>
                      <span>3 in a row wins (emoji must belong to same player)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎲</span>
                      <span>No draws possible - keep playing until someone wins!</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <motion.button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
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
