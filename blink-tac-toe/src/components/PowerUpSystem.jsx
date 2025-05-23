"use client"

import { useState, useEffect } from "react"
import { Zap, Shield, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"

// This is a unique feature I'm adding - a power-up system to make the game more strategic
export default function PowerUpSystem({ turn, onUsePowerUp }) {
  const [powerUps, setPowerUps] = useState([
    { id: 0, name: "Extra Turn", icon: <RotateCcw />, description: "Take another turn", cooldown: 0, maxCooldown: 3 },
    {
      id: 1,
      name: "Block Opponent",
      icon: <Shield />,
      description: "Block a cell from opponent",
      cooldown: 0,
      maxCooldown: 4,
    },
    {
      id: 2,
      name: "Double Place",
      icon: <Zap />,
      description: "Place two emojis in one turn",
      cooldown: 0,
      maxCooldown: 5,
    },
  ])

  // Decrease cooldowns each turn
  useEffect(() => {
    setPowerUps((prev) =>
      prev.map((powerUp) => ({
        ...powerUp,
        cooldown: Math.max(0, powerUp.cooldown - 1),
      })),
    )
  }, [turn])

  const handleUsePowerUp = (id) => {
    // Check if power-up is available
    const powerUp = powerUps.find((p) => p.id === id)
    if (powerUp.cooldown > 0) return

    // Set cooldown
    setPowerUps((prev) => prev.map((p) => (p.id === id ? { ...p, cooldown: p.maxCooldown } : p)))

    // Trigger power-up effect
    playSound("select")
    onUsePowerUp(id)
  }

  return (
    <motion.div
      className="flex justify-center gap-2 mt-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {powerUps.map((powerUp) => (
        <motion.button
          key={powerUp.id}
          onClick={() => handleUsePowerUp(powerUp.id)}
          disabled={powerUp.cooldown > 0}
          className={`
            relative flex flex-col items-center justify-center p-2 rounded-lg
            ${
              powerUp.cooldown === 0
                ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white cursor-pointer"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
            transition-all duration-300 flex-1
          `}
          whileHover={powerUp.cooldown === 0 ? { scale: 1.05, y: -2 } : {}}
          whileTap={powerUp.cooldown === 0 ? { scale: 0.95 } : {}}
        >
          <div className="text-lg mb-1">{powerUp.icon}</div>
          <div className="text-xs font-medium">{powerUp.name}</div>

          {/* Cooldown overlay */}
          <AnimatePresence>
            {powerUp.cooldown > 0 && (
              <motion.div
                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {powerUp.cooldown}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  )
}
