# ✨ Blink Tac Toe ✨



## 🎮 Overview

Blink Tac Toe is an innovative take on the classic Tic-Tac-Toe game, featuring emojis instead of X's and O's. Players select emoji categories and strategically place them on the board to create winning combinations. With a unique "blinking" mechanic where only the last 3 emojis per player remain on the board, the game offers a fresh and dynamic experience that keeps players engaged.

![image](https://github.com/user-attachments/assets/e69beae7-496f-45d2-a9d1-db2800324f03)

## ✨ Features

- 🎭 **Emoji Categories**: Choose from various emoji themes (Animals, Food, Sports, etc.)
- 🔄 **Blinking Mechanic**: Only the last 3 emojis per player remain on the board
- ⏱️ **Turn Timer**: 15 seconds per turn to add excitement
- 🎯 **Power-Up System**: Strategic abilities to turn the tide of the game
- 🌓 **Dark/Light Mode**: Beautiful UI in both light and dark themes
- 📊 **Score Tracking**: Keep track of wins across multiple rounds
- 📱 **Responsive Design**: Play on any device - mobile, tablet, or desktop
- 🎵 **Sound Effects**: Audio feedback enhances the gaming experience
- 🎆 **Animations**: Smooth, engaging visual effects throughout gameplay
- 📜 **Game History**: Track your past games and results

## 🚀 How to Run

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/blink-tac-toe.git
   cd blink-tac-toe
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open your browser and navigate to:
   \`\`\`
   http://localhost:3000
   \`\`\`

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

## 📁 Folder Structure

\`\`\`
blink-tac-toe/
├── app/                    # Next.js app directory
│   ├── page.tsx            # Main page component
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── EmojiPicker.jsx     # Emoji category selection
│   ├── GameBoard.jsx       # Main game board
│   ├── HelpModal.jsx       # Game instructions
│   ├── ThemeToggle.jsx     # Dark/light mode toggle
│   ├── PowerUpSystem.jsx   # Power-up mechanics
│   └── FeaturesModal.jsx   # Features showcase
├── data/                   # Data files
│   └── emojiCategories.js  # Emoji categories and lists
├── utils/                  # Utility functions
│   ├── checkWinner.js      # Winner detection logic
│   └── sounds.js           # Sound effect utilities
├── public/                 # Static assets
│   └── sounds/             # Game sound effects
├── App.js                  # Main application component
└── README.md               # Project documentation
\`\`\`

## 📝 How to Play

### Game Setup
1. 🎮 Player 1 selects an emoji category (Animals, Food, Sports, etc.)
2. 🎮 Player 2 selects a different emoji category
3. 🎲 The game begins with Player 1's turn

### Gameplay Rules
- 👆 Players take turns placing emojis on the board
- ⏱️ Each player has 15 seconds to make a move
- 👣 Only 3 emojis per player can be on the board at once
- 🧼 When a player places a 4th emoji, their oldest emoji is removed (FIFO)
- 🏆 Get 3 of your emojis in a row (horizontally, vertically, or diagonally) to win
- 🎲 No draws possible - play continues until someone wins

### Power-Ups
- ⚡ **Extra Turn**: Take another turn immediately
- 🛡️ **Block Opponent**: Prevent your opponent from placing on a cell of your choice
- ⚡⚡ **Double Place**: Place two emojis in a single turn

## 🛠️ Technologies Used

- **React**: UI library for building the game interface
- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library for UI elements
- **React Confetti**: For celebration animations
- **Local Storage API**: For persisting game history

## 🌟 Extra Features Explained

### Power-Up System
The game includes a strategic power-up system that allows players to gain advantages during gameplay. Each power-up has a cooldown period after use, requiring strategic timing.

### Turn Timer
A 15-second timer adds pressure and excitement to each turn. The timer turns red when 5 seconds or less remain, and if time runs out, the turn automatically passes to the other player.

### Theme Toggle
Switch between light and dark mode based on your preference. The theme setting is saved for future visits and automatically detects your system preference on first visit.

### Animations
- Emojis animate when placed or removed from the board
- Winning combinations pulse and glow
- Confetti celebration when a player wins
- Smooth transitions between game states

### Score Tracking
The game keeps track of wins for both players during your session, displayed prominently at the top of the game board.

### Game History
Track your game results over time. The last 5 games are displayed after a match ends, and history persists even if you close the browser.

### Sound Effects
Audio feedback enhances the gaming experience with different sounds for placing emojis, selections, and wins.

## 🔮 Future Improvements

- 🌐 Online multiplayer functionality
- 🤖 AI opponents with different difficulty levels
- 🏆 Tournament mode for multiple rounds
- 🎨 Custom emoji pack creator
- 🏅 Achievements system
- 📊 Enhanced statistics and leaderboards

## 🙏 Acknowledgments

- Emoji designs provided by various emoji standards
- Inspiration from classic Tic-Tac-Toe and modern strategy games


