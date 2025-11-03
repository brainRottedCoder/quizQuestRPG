# QuizQuest RPG ⚔️

An AI-powered educational RPG where players battle monsters by answering quiz questions. Correct answers deal damage, wrong answers cost health. The game uses **Google Gemini 2.5-flash** to generate infinite content and personalize the learning experience.

## 🎮 Features

### 6 AI-Powered Features
1. **Dynamic Question Generation** - Infinite AI-generated questions based on subject and difficulty
2. **Adaptive Difficulty** - AI analyzes win rate every 5 questions and adjusts challenge
3. **Story-Driven Narratives** - AI creates atmospheric dungeon descriptions and battle scenarios
4. **Enemy Taunts** - Monsters generate personality-driven dialogue based on battle situation
5. **Educational Explanations** - When wrong, AI explains why the correct answer is right
6. **Smart Achievements** - AI dynamically generates unique achievement names and emojis

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/apikey))

### Installation
1. Download/clone this project
2. Open `index.html` in your browser
3. Enter your Gemini API key
4. Select a dungeon (Math, Science, History, Geography)
5. Start battling monsters!

### Demo Mode
If you don't have an API key or encounter CORS issues, toggle **Demo mode** to use local fallback questions.

## 🎯 Gameplay

- **Choose a dungeon** category (Math, Science, History, Geography)
- **Face progressively harder monsters** (Goblin → Orc → Troll → Dragon Boss)
- **Answer questions to attack** - Correct = damage, Wrong = take damage
- **Build streaks** - 5 correct in a row unlocks achievement and bonus damage
- **Level up** - Gain XP, increase stats, unlock new power
- **Defeat 4 monsters** per dungeon run to win

## 🔧 Technical Details

### Constraints Met
- ✅ **No Frameworks/Libraries** - Pure vanilla HTML, CSS, JavaScript
- ✅ **3-Character Variable Names** - All variables max 3 chars (plr, mon, qst, etc.)
- ✅ **Browser-Based** - Runs entirely in-browser, no backend needed
- ✅ **AI Integration** - Google Gemini 2.5-flash for content generation

### Game Mechanics
- **Damage Formula**: `Player ATK × (1 + streak × 0.1)`
- **Level Formula**: `level = floor(sqrt(xp/100)) + 1`
- **Stats per Level**: +20 HP, +5 ATK, +2 DEF
- **Monster Scaling**: `base × (1 + (level-1) × 0.3)`

### Tech Stack
- HTML5 (structure)
- CSS3 (styling, animations, gradients)
- Vanilla JavaScript (game logic)
- Google Gemini API (AI features)
- Fetch API (HTTP requests)
- JSON (data format)

## 🎨 Enhanced UI Features
- Glowing title animation
- Smooth HP bar transitions with shimmer effect
- Pulsing VS indicator
- Monster shake animations on spawn
- Correct/wrong answer feedback animations
- Achievement pop-up animations
- Loading progress bar
- Hover effects on all interactive elements
- Responsive design for mobile

## 📝 File Structure
```
quiz-project/
├── index.html    # Main HTML structure
├── style.css     # Enhanced styles with animations
├── app.js        # Game logic with Gemini integration
└── README.md     # This file
```

## 🐛 Troubleshooting

**CORS Errors**: Some browsers block direct API calls. Use demo mode or run a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server
```

**API Key Invalid**: Make sure you've enabled Gemini API in Google AI Studio and copied the key correctly.

**Questions Not Loading**: Check browser console for errors. Toggle demo mode if AI is unavailable.

## 🎓 Educational Value
This game helps students learn through:
- Active recall (answering questions)
- Immediate feedback (right/wrong)
- Spaced repetition (adaptive difficulty)
- Gamification (RPG mechanics)
- Narrative context (immersive learning)

## 🏆 Achievements
- **First Victory** - Complete your first monster
- **Streak Five** - Get 5 correct answers in a row
- **Dragon Tamer** - Defeat a boss monster
- **Level Up** - Gain a level
- Plus AI-generated unique achievements!

## 📜 License
MIT License - Feel free to use and modify!

## 🙏 Credits
- Powered by Google Gemini 2.5-flash
- Built with vanilla web technologies
- Designed for educational hackathons


api key:AIzaSyA2P-t0D40ZIfFUHZehe_A2iSVVnZ81xN0