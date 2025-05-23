"use client"

import { useEffect, useState } from "react"
import { checkWinner } from "../utils/checkWinner"
import { playSound } from "../utils/sounds"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function GameBoard({ playerCategories, onWin, resetGame }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(0) // 0 or 1
  const [history, setHistory] = useState([[], []]) // FIFO index list per player
  const [occupied, setOccupied] = useState([new Set(), new Set()])
  const [winningPattern, setWinningPattern] = useState(null)
  const [scores, setScores] = useState([0, 0])
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastPlaced, setLastPlaced] = useState(null)
  const [lastRemoved, setLastRemoved] = useState(null)
  const { width, height } = useWindowSize()

  // Timer for turns
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerActive, setTimerActive] = useState(true)

  // Reset timer when turn changes
  useEffect(() => {
    setTimeLeft(15)
    setTimerActive(true)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          // Auto-switch turn if time runs out
          setTurn((prevTurn) => (prevTurn + 1) % 2)
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [turn])

  const handleClick = (index) => {
    if (board[index] || winningPattern) return

    const newBoard = [...board]
    const emojiList = playerCategories[turn].list
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)]

    const newHistory = [...history]
    const newOccupied = [...occupied]

    // Remove oldest if needed
    if (newHistory[turn].length === 3) {
      const oldestIndex = newHistory[turn].shift()
      newBoard[oldestIndex] = null
      newOccupied[turn].delete(oldestIndex)
      setLastRemoved(oldestIndex)
      playSound("remove")
    } else {
      setLastRemoved(null)
    }

    if (newOccupied[turn].has(index)) return

    newBoard[index] = emoji
    newHistory[turn].push(index)
    newOccupied[turn].add(index)
    setLastPlaced(index)
    playSound("place")

    setBoard(newBoard)
    setHistory(newHistory)
    setOccupied(newOccupied)

    const result = checkWinner(newBoard, newHistory[turn])
    if (result.winner) {
      setWinningPattern(result.winningPattern)
      setScores((prev) => {
        const newScores = [...prev]
        newScores[turn]++
        return newScores
      })
      setShowConfetti(true)
      playSound("win")
      setTimeout(() => {
        onWin(turn)
        setShowConfetti(false)
      }, 3000)
    } else {
      setTurn((turn + 1) % 2)
    }
  }

  const isWinningCell = (index) => {
    return winningPattern && winningPattern.includes(index)
  }

  const getCellOwner = (index) => {
    if (occupied[0].has(index)) return 0
    if (occupied[1].has(index)) return 1
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center w-full"
    >
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}

      <div className="flex justify-between w-full max-w-md mb-6">
        <div
          className={`p-3 rounded-lg ${turn === 0 ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Player 1</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{scores[0]}</div>
          <div className="text-xs">{playerCategories[0].name}</div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-gray-800 dark:text-white">VS</div>
          <motion.div
            className={`mt-2 px-3 py-1 rounded-full ${timerActive ? "bg-yellow-100 dark:bg-yellow-900" : "bg-red-100 dark:bg-red-900"}`}
            animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: timeLeft <= 5 ? Number.POSITIVE_INFINITY : 0, duration: 0.5 }}
          >
            <span
              className={`font-mono font-bold ${timeLeft <= 5 ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}
            >
              {timeLeft}s
            </span>
          </motion.div>
        </div>

        <div
          className={`p-3 rounded-lg ${turn === 1 ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Player 2</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{scores[1]}</div>
          <div className="text-xs">{playerCategories[1].name}</div>
        </div>
      </div>

      <motion.div
        className="relative grid grid-cols-3 gap-2 md:gap-3 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {board.map((cell, index) => {
          const cellOwner = getCellOwner(index)
          const isWinning = isWinningCell(index)
          const isNew = lastPlaced === index
          const wasRemoved = lastRemoved === index

          return (
            <motion.div
              key={index}
              onClick={() => handleClick(index)}
              className={`
                aspect-square flex items-center justify-center rounded-lg cursor-pointer
                text-4xl md:text-5xl shadow-md transition-all duration-300
                ${!cell ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" : ""}
                ${cellOwner === 0 ? "bg-blue-50 dark:bg-blue-950" : ""}
                ${cellOwner === 1 ? "bg-purple-50 dark:bg-purple-950" : ""}
                ${isWinning ? "ring-4 ring-yellow-400 dark:ring-yellow-600" : ""}
              `}
              whileHover={{ scale: cell ? 1 : 1.05 }}
              whileTap={{ scale: cell ? 1 : 0.95 }}
              animate={
                isWinning
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 rgba(250, 204, 21, 0)",
                        "0 0 20px rgba(250, 204, 21, 0.7)",
                        "0 0 0 rgba(250, 204, 21, 0)",
                      ],
                    }
                  : {}
              }
              transition={isWinning ? { repeat: Number.POSITIVE_INFINITY, duration: 1.5 } : {}}
            >
              <AnimatePresence mode="wait">
                {cell && (
                  <motion.div
                    key={`cell-${index}-${cell}`}
                    initial={isNew ? { scale: 0 } : { opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={wasRemoved ? { scale: 0, opacity: 0 } : { opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {cell}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again
      </motion.button>
    </motion.div>
  )
}
