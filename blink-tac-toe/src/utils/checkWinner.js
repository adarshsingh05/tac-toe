export function checkWinner(board, playerEmojis) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  // Find the winning pattern if it exists
  for (const pattern of winPatterns) {
    if (pattern.every((index) => playerEmojis.includes(index))) {
      return { winner: true, winningPattern: pattern }
    }
  }

  return { winner: false, winningPattern: null }
}
