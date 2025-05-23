🚀 Blink Tac Toe – A Twisted Emoji Game

A fun and interactive 2-player game that puts a unique spin on the classic Tic Tac Toe using emoji categories and a “vanishing emoji” mechanic. Built with React.js, Vite, and styled using Tailwind CSS.

blink-tac-toe/
├── public/
├── src/
│   ├── assets/             # Images & static assets
│   ├── components/         # Reusable React components
│   ├── data/               # Emoji categories and constants
│   ├── pages/              # Page components like Home, Game, Help
│   ├── styles/             # Tailwind and global CSS
│   ├── utils/              # Utility functions (e.g., winner checker)
│   ├── App.jsx
│   └── main.jsx
├── README.md
├── index.html
├── package.json
└── tailwind.config.js


🧠 Game Rules
🎲 Gameplay

    3x3 Tic Tac Toe board

    Turn-based play: Player 1 → Player 2 → repeat

    Players are assigned a random emoji from their selected category per turn

    The board never fully fills due to the vanishing rule

🎭 Emoji Categories

Each player chooses a category (e.g., Animals, Food, Sports, Faces, etc.).
Example:
Animals: ["🐶", "🐱", "🐵"]
Food: ["🍕", "🍟", "🍔"]
🔄 Vanishing Rule

    Max 3 emojis per player on the board

    On placing a 4th emoji:

        The oldest emoji disappears

        The new emoji cannot be placed in the location of the vanished one

🏆 Winning

    First to align 3 of their emojis in a row (horizontally, vertically, or diagonally) wins

🔚 Game Over

    Game ends on a win

    “Play Again” button resets the board

✨ Features

    Emoji category selection before gameplay

    Random emoji assignment per turn

    Dynamic turn indication

    Animated vanishing emojis

    Win detection with highlighted line

    Help modal for new players

    Responsive design (mobile + desktop)

    Clean modular code with React components

🛠️ Tech Stack
Tool	Purpose
React	UI library
Vite	Build tool
Tailwind CSS	Utility-first CSS styling
React Router	Routing for multi-page feel
🔄 Vanishing Feature Logic

    Each player’s emoji placements are tracked as a queue

    When queue length > 3:

        Oldest emoji coordinates are removed

        New emoji is placed only if it doesn’t reuse that cell

    Managed using:

    playerMoves[player].push(newMove);
    if (playerMoves[player].length > 3) {
      const vanished = playerMoves[player].shift();
      clearCell(vanished);
    }

📌 How to Run Locally

# Clone the repository
git clone https://github.com/adarshsingh05/internshipProject
cd blink-tac-toe

# Install dependencies
npm install

# Run the development server
npm run dev

🧪 Testing

Currently, manual UI testing is used. A future improvement would be to include unit tests with Jest or Vitest.
🚧 Improvements for Future

Add multiplayer via WebSockets

Add sound effects

Include score tracker for multiple rounds

Mobile-first UI refinements

    Dark mode toggle

👨‍💻 Author

Adarsh – GitHub 
📃 License

MIT License – Feel free to use and modify this project!