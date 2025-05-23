"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EmojiPicker from "./components/emojiPicker"
import GameBoard from "./components/gameBoard"
import HelpModal from "./components/helpModal"
import ThemeToggle from "./components/ThemeToggle"
import PowerUpSystem from "./components/PowerUpSystem"
import { emojiCategories } from "./data/emojiCategories"
import { playSound } from "./utils/sounds"
import FeaturesModal from "./components/FeaturesModal"

function App() {
  const [categories, setCategories] = useState([null, null])
  const [winner, setWinner] = useState(null)
  const [gameHistory, setGameHistory] = useState([])
  const [powerUpActive, setPowerUpActive] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  // Load game history from localStorage on initial load
  useEffect(() => {
    const savedHistory = localStorage.getItem("blinkTacToeHistory")
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save game history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("blinkTacToeHistory", JSON.stringify(gameHistory))
  }, [gameHistory])

  const chooseCategory = (player, categoryName) => {
    playSound("select")
    const category = emojiCategories[categoryName]
    setCategories((prev) => {
      const updated = [...prev]
      updated[player] = { name: categoryName, list: category }
      return updated
    })

    // If both players have chosen categories, start the game
    setCategories((prev) => {
      const updated = [...prev]
      updated[player] = { name: categoryName, list: category }
      if (player === 1 || (player === 0 && updated[1])) {
        setGameStarted(true)
      }
      return updated
    })
  }

  const resetGame = () => {
    setCategories([null, null])
    setWinner(null)
    setPowerUpActive(null)
    setGameStarted(false)
  }

  const handleWin = (winner) => {
    setWinner(winner)
    // Add to game history
    setGameHistory((prev) => [
      ...prev,
      {
        winner: winner + 1,
        categories: [categories[0].name, categories[1].name],
        date: new Date().toISOString(),
      },
    ])
  }

  const handleUsePowerUp = (powerUpId) => {
    setPowerUpActive(powerUpId)
    // Power-up effects are handled in the GameBoard component
  }

  // Render game content based on state
  const renderGameContent = () => {
    if (winner !== null) {
      return (
        <motion.div
          className="flex flex-col items-center justify-center text-center p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: 3, duration: 0.5 }}
          >
            🎉 Player {winner + 1} Wins! 🎉
          </motion.h1>

          <motion.div
            className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Winning with <span className="font-bold">{categories[winner].name}</span> emojis!
            </p>
          </motion.div>

          <motion.button
            onClick={resetGame}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>

          {gameHistory.length > 0 && (
            <motion.div
              className="mt-8 w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Recent Games</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 max-h-40 overflow-y-auto">
                {gameHistory
                  .slice(-5)
                  .reverse()
                  .map((game, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <div className="text-gray-700 dark:text-gray-300">
                        Player {game.winner} won with {game.categories[game.winner - 1]}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(game.date).toLocaleDateString()}</div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )
    }

    if (!categories[0]) {
      return <EmojiPicker player={1} onSelectCategory={(cat) => chooseCategory(0, cat)} />
    }

    if (!categories[1]) {
      return <EmojiPicker player={2} onSelectCategory={(cat) => chooseCategory(1, cat)} />
    }

    return (
      <motion.div
        className="flex flex-col items-center justify-center p-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GameBoard
          playerCategories={categories}
          onWin={handleWin}
          resetGame={resetGame}
          powerUpActive={powerUpActive}
          setPowerUpActive={setPowerUpActive}
        />

        <PowerUpSystem turn={categories[0] && categories[1] ? 1 : 0} onUsePowerUp={handleUsePowerUp} />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <ThemeToggle />

      <AnimatePresence mode="wait">
        <motion.div
          key={gameStarted ? "game" : "intro"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto max-w-4xl"
        >
          {gameStarted ? (
            <div className="p-4">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Blink Tac Toe
              </motion.h1>

              {renderGameContent()}
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                }}
              >
                Blink Tac Toe
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                A fast-paced emoji strategy game
              </motion.p>

              {renderGameContent()}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <HelpModal />
      <FeaturesModal />
    </div>
  )
}

export default App
