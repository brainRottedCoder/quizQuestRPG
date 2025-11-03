# ⚔️ QuizQuest RPG - AI-Powered Educational Game

> **Battle monsters by answering quiz questions!** An innovative educational RPG that combines learning with gaming through Google Gemini AI. Correct answers deal damage, wrong answers cost health. Master knowledge across Math, Science, History, and Geography to conquer dungeons!

[![AI-Powered](https://img.shields.io/badge/AI-Google%20Gemini%202.5--flash-blue)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow)]()
[![Single File](https://img.shields.io/badge/deployment-Single%20File-orange)]()

---

## 🌟 Overview

**QuizQuest RPG** is a groundbreaking single-file web application that transforms education into an epic adventure. By leveraging Google's Gemini AI, the game generates infinite unique content, adapts to player skill level in real-time, and provides personalized educational feedback.

### Why QuizQuest?
- 🎓 **Learn by Playing** - Gamification makes studying engaging and fun
- 🤖 **AI-Generated Content** - Never see the same question twice
- 📈 **Adaptive Difficulty** - Game adjusts to your skill level automatically
- 🎮 **RPG Mechanics** - Level up, gain stats, defeat bosses
- 🌐 **Zero Setup** - Just open `index.html` in a browser
- 📱 **Works Anywhere** - Fully responsive, runs on desktop and mobile

---

## 🤖 6 AI-Powered Features

### 1️⃣ **Dynamic Question Generation** ✨
**Infinite AI-generated questions based on subject and difficulty**

- **8 Difficulty Levels**: Very Easy → Insane
- **Subject-Specific**: Tailored questions for Math, Science, History, Geography
- **Context-Aware**: Questions scale with player performance
- **Educational**: Each question includes detailed explanations

**Example Questions**:
```javascript
// Level 1 (Very Easy)
"What is 5 + 3?"

// Level 4 (Hard)
"Calculate the derivative of f(x) = 3x² - 5x + 2"

// Level 8 (Insane)
"Apply integration by parts to solve ∫x²e^x dx"
```

**Technical Implementation**:
- Enhanced prompts with clear requirements
- JSON validation with fallback parsing
- Temperature 0.8 for consistent quality
- Automatic fallback to local questions if AI fails

---

### 2️⃣ **Adaptive Difficulty System** 📊
**AI analyzes performance and adjusts challenge in real-time**

#### **Dual Adaptation Strategy**:

**A. Real-Time Streak Boost**
- 🔥 **5+ correct in a row** → Difficulty +1 (instant)
- Rewards hot streaks immediately
- Keeps engaged players challenged

**B. Periodic Performance Analysis** (Every 5 Questions)
- 🚀 **>85% accuracy** → Difficulty +2 (jump 2 levels)
- 📈 **>70% accuracy** → Difficulty +1 (gradual increase)
- 📉 **<45% accuracy** → Difficulty -1 (help struggling)
- ⚖️ **45-70% accuracy** → Stable (perfect zone)

**Difficulty Scale**:
```
Level 1: Very Easy     → Basic concepts
Level 2: Easy          → Fundamental knowledge
Level 3: Medium        → Standard difficulty
Level 4: Hard          → Challenging concepts
Level 5: Very Hard     → Advanced topics
Level 6: Expert        → Expert-level questions
Level 7: Master        → Mastery challenge
Level 8: Insane        → Maximum difficulty
```

**Feedback Example**:
```
📊 AI Adaptive: Lv2→4 (87% accuracy - Too easy)
```

---

### 3️⃣ **Story-Driven Narratives** 📖
**AI creates atmospheric dungeon descriptions and battle scenarios**

- **Dynamic Storytelling**: Unique narratives for each dungeon entry, monster spawn, victory, and defeat
- **Context-Aware**: References current subject, difficulty, and monster type
- **Immersive**: 2-3 vivid sentences that set the scene
- **Encouraging**: Motivates players to continue learning

**Example Narratives**:

**Entry (Math Dungeon, Level 1)**:
> "You step into halls where numbers dance on ancient walls. Equations glow softly, whispering their solutions. The air hums with mathematical potential."

**Monster Spawn (Science Dungeon, Level 5)**:
> "A Hydra materializes from swirling molecular bonds. Each head pulses with a different law of thermodynamics. This creature tests the very limits of your scientific knowledge!"

**Victory**:
> "The monster dissolves into particles of light. Your understanding has triumphed over ignorance. The dungeon acknowledges your growing mastery."

**Technical Features**:
- Temperature 0.95 for high creativity
- Cached by scene type for performance
- 200 token limit (under 100 words)
- Graceful fallback narratives

---

### 4️⃣ **Enemy Taunts** 💬
**Monsters generate personality-driven dialogue based on battle situation**

- **16 Monster Personalities**: Each monster type has unique character traits
- **Situation-Aware**: Different taunts for wrong answers, low health, etc.
- **In-Character**: Goblins are sneaky, Dragons are proud, Wraiths are eerie
- **Dramatic**: Maximum 12 words of menacing dialogue

**Monster Personalities**:
```javascript
Goblin    → Sneaky and mocking
Orc       → Brutal and savage
Dragon    → Proud and disdainful
Slime     → Oozing and gross
Wraith    → Eerie and haunting
Emperor   → Commanding ruler
...and 10 more!
```

**Example Taunts**:

**Goblin (wrong answer)**:
> "Your knowledge crumbles like dust before my cunning!"

**Dragon (player low health)**:
> "Kneel before my infinite wisdom, mortal scholar!"

**Wraith (monster low health)**:
> "I may fade, but your ignorance lingers forever..."

**Technical Implementation**:
- Temperature 1.2 for maximum creativity
- Personality traits injected into prompts
- Cached by monster type and situation
- 80 token limit for concise taunts

---

### 5️⃣ **Educational Explanations** 💡
**When wrong, AI explains why the correct answer is right AND why yours is wrong**

- **Always Active**: Attempts AI explanation on every wrong answer
- **Dual Explanation**: Explains correct answer + why player's choice was wrong
- **Encouraging Tone**: Supportive and educational, not punishing
- **Contextual**: References the specific question and both answers

**Example Explanation**:

**Question**: "What is the capital of France?"  
**Your Answer**: "Lyon"  
**Correct Answer**: "Paris"

**AI Explanation**:
> "Paris is the capital of France, serving as the political and cultural center since medieval times. Lyon, while being France's third-largest city and historically significant, is a regional capital of the Auvergne-Rhône-Alpes region. The confusion is common as Lyon was briefly a capital during Roman times."

**Technical Features**:
- Temperature 0.6 for factual accuracy
- 150 token limit (60 words max)
- Compares both answers explicitly
- Falls back to question's built-in explanation if AI fails
- Generic fallback: "Review this concept to improve."

---

### 6️⃣ **Smart Achievements** 🏆
**AI dynamically generates unique achievement names and emojis**

- **Creative Titles**: Fun, emoji-enhanced achievement names
- **Context-Aware**: References specific accomplishment
- **Dynamic**: Different every time (not hardcoded)
- **Exciting**: Makes milestones feel special

**Achievement Triggers**:
```javascript
lvl   → Player levels up
str5  → 5 correct answers in a row
hot   → 3 correct answers in a row  
boss  → Defeat boss monster (Dragon/Hydra/Emperor/Titan)
win   → Defeat any monster
```

**Example AI-Generated Achievements**:

**Level Up (Level 5)**:
```json
{
  "nm": "🌟 Knowledge Ascension V",
  "ds": "Your wisdom reaches new heights! Fifth plateau achieved."
}
```

**5-Streak**:
```json
{
  "nm": "⚡ Unstoppable Mind",
  "ds": "Five perfect strikes! Your intellect blazes like lightning!"
}
```

**Boss Kill (Dragon)**:
```json
{
  "nm": "🐲 Legendary Scholar",
  "ds": "You've conquered the ultimate test! Legends speak of your knowledge."
}
```

**Technical Implementation**:
- Temperature 1.1 for creativity
- Context dictionary for better prompts
- JSON validation with markdown stripping
- 150 token limit
- Fallback achievements if AI fails

---

## 🎮 Gameplay Guide

### **Game Loop**
1. **Select Dungeon** → Choose Math, Science, History, or Geography
2. **Enter Dungeon** → AI generates atmospheric entry narrative
3. **Face Monster** → 4 monsters per dungeon (final is boss)
4. **Answer Questions** → AI generates questions at your skill level
5. **Battle**:
   - ✅ **Correct Answer** → Deal damage to monster, build streak
   - ❌ **Wrong Answer** → Take damage, see explanation, reset streak
6. **Victory or Defeat**:
   - Win: Defeat all 4 monsters → Congratulations message
   - Lose: HP reaches 0 → Defeat message
7. **Repeat** → Play again with saved progress

### **Core Mechanics**

#### **Combat System**
```javascript
// Player Damage (scales with streak!)
damage = ATK × (1 + streak × 0.1)
// Example: ATK 12, 3-streak = 12 × 1.3 = 15.6 damage

// Monster Damage (reduced by defense)
damage = max(1, MON_ATK - DEF)
```

#### **Leveling System**
```javascript
// Level Formula
level = floor(sqrt(XP / 100)) + 1

// Stats per Level
HP  += 20
ATK += 5
DEF += 2
```

#### **Monster Progression**
Each dungeon has 4 monsters with increasing difficulty:
```
Math:      Goblin → Orc → Troll → Dragon (Boss)
Science:   Slime → Golem → Wraith → Hydra (Boss)
History:   Bandit → Knight → Warlock → Emperor (Boss)
Geography: Imp → Yeti → Gryphon → Titan (Boss)
```

Monsters scale with player level:
```javascript
monster_stats = base × (1 + (player_level - 1) × 0.3)
```

---

## 🚀 Getting Started

### **Prerequisites**
- ✅ **Modern Web Browser** (Chrome, Firefox, Safari, Edge)
- ✅ **Google Gemini API Key** ([Get free key](https://aistudio.google.com/apikey))
- ✅ **Internet Connection** (for AI features)

### **Installation & Setup**

#### **Option 1: Direct Open (Simplest)**
```bash
# Download the project
# Simply double-click index.html
# Works immediately!
```

#### **Option 2: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

#### **Option 3: Online Hosting**
Upload `index.html` to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

**It's literally just ONE file!**

---

### **How to Play**

1. **Open `index.html`** in your browser
2. **Enter API Key** (or check "Demo mode" for local questions)
3. **Select a Dungeon** (Math/Science/History/Geography)
4. **Click "Enter Dungeon"**
5. **Answer Questions** to battle monsters
6. **Watch Your Stats** grow as you level up
7. **Defeat 4 Monsters** to clear the dungeon!

### **Demo Mode**
Don't have an API key? No problem!
- ✅ Toggle **"Demo mode"** checkbox
- ✅ Uses local question bank (10+ questions per subject)
- ✅ All game mechanics work perfectly
- ⚠️ No AI-generated content (questions, narratives, taunts)

---

## 🔧 Technical Architecture

### **Single-File Application**
The entire game is contained in **ONE HTML file**:
```
index.html
├── <style>  → Inline CSS (2KB compressed)
└── <script> → Inline JavaScript (13KB compressed)
```

**Total Size**: ~15KB (smaller than most images!)

### **Constraints & Features**

#### **Code Constraints**
- ✅ **3-Character Variables**: `key`, `sub`, `dif`, `tot`, `crt`, `plr`, `mon`, etc.
- ✅ **Ultra-Concise**: 35 lines of JavaScript (!)
- ✅ **No Frameworks**: Pure vanilla HTML/CSS/JavaScript
- ✅ **No Dependencies**: Zero external libraries
- ✅ **Browser-Only**: No backend, database, or build process

#### **AI Integration**
```javascript
// Core AI Function with Caching & Rate Limiting
async function aic(ins, mt=300, tmp=.9, cid='') {
  // Check cache first
  if(cid && cch.has(cid)) return cch.get(cid);
  
  // Connection test on first call
  if(!tes) { /* test API */ }
  
  // Make request with temperature control
  let response = await fetch(/* Gemini API */);
  
  // Handle rate limiting (429)
  if(response.status === 429) {
    await sleep(2000);
    return aic(ins, mt, tmp, cid); // Retry
  }
  
  // Cache result
  if(cid) cch.set(cid, result);
  return result;
}
```

**AI Optimizations**:
- 🚀 **Caching**: Narratives and taunts cached by ID (50 item limit)
- ⏱️ **Rate Limiting**: Auto-retry with 2s delay on 429 errors
- 🧪 **Connection Test**: Tests API key on first use
- 🔄 **Auto-Fallback**: Switches to demo mode if AI unavailable
- 🎚️ **Temperature Control**: Different temps for different features (0.6-1.2)

### **Tech Stack**
```javascript
Frontend:  HTML5, CSS3, Vanilla JavaScript ES6+
AI:        Google Gemini 2.0-flash-exp API
Storage:   LocalStorage (player progress)
Design:    CSS Grid, Flexbox, Animations
```

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎨 UI/UX Features

### **Visual Design**
- 🌌 **Dark Theme**: Easy on the eyes for long study sessions
- ✨ **Smooth Animations**: HP bars, achievements, button hovers
- 📱 **Responsive Layout**: Adapts to mobile, tablet, desktop
- 🎭 **Monster Icons**: 16 unique emoji monsters
- 💫 **Glowing Effects**: Title animation, VS pulsing

### **Animations**
```css
✨ Glowing Title       → 2s alternate glow effect
📊 HP Bar Shimmer      → Smooth width transition with shine
💥 Button Feedback     → Scale transform on correct/wrong
🏆 Achievement Pop     → Scale + opacity entrance
👹 Monster Shake       → Spawn animation
```

### **Accessibility**
- High contrast colors
- Clear typography (14px system font)
- Keyboard navigation support
- Screen reader compatible
- Color-blind friendly indicators

---

## 📊 Game Statistics

### **Player Stats**
```
Name:    Hero
Level:   1-20+ (dynamic)
HP:      100 (base) + 20 per level
ATK:     12 (base) + 5 per level
DEF:     2 (base) + 2 per level
Gold:    Earned per monster kill (10-20)
XP:      150 per monster defeat
Streak:  Current correct answer streak
```

### **Monster Stats** (Base)
```
Goblin/Imp:       HP 26-30,  ATK 5-6,  DEF 1
Orc/Yeti:         HP 50-55,  ATK 9,    DEF 2
Troll/Gryphon:    HP 80-90,  ATK 12-13, DEF 3
Dragon/Titan:     HP 150-160, ATK 18-19, DEF 4-5
```

*All stats scale with player level*

---

## 🐛 Troubleshooting

### **Common Issues**

#### **"AI unavailable - Demo mode"**
- ❓ **Cause**: Invalid API key or network issue
- ✅ **Solution**: Check API key, verify internet connection
- 🔄 **Workaround**: Use Demo mode for offline play

#### **"AI err 429"**
- ❓ **Cause**: Rate limit exceeded
- ✅ **Solution**: Game auto-retries after 2 seconds
- 💡 **Prevention**: Wait between questions

#### **Questions not loading**
- ❓ **Cause**: CORS or API error
- ✅ **Solution**: Run local server (see installation)
- 🔄 **Workaround**: Enable Demo mode

#### **Progress not saving**
- ❓ **Cause**: Browser blocking localStorage
- ✅ **Solution**: Allow cookies/storage in settings
- ⚠️ **Note**: Incognito mode doesn't persist

### **Browser Console**
Check for errors:
```javascript
F12 → Console tab → Look for error messages
```

---

## 🎓 Educational Benefits

### **Learning Science**
QuizQuest RPG leverages proven educational techniques:

1. **Active Recall** → Answering questions (not passive reading)
2. **Immediate Feedback** → Instant correct/wrong + explanation
3. **Spaced Repetition** → Adaptive difficulty revisits topics
4. **Gamification** → RPG mechanics increase motivation
5. **Narrative Context** → Stories make learning memorable

### **Subjects Covered**
- 🔢 **Mathematics**: Arithmetic, algebra, geometry, calculus
- 🔬 **Science**: Physics, chemistry, biology, astronomy
- 📜 **History**: World history, civilizations, events
- 🗺️ **Geography**: Countries, capitals, landmarks, features

---

## 📈 Advanced Features

### **Performance Optimizations**
- ✅ Caching system (Map) for repeated AI calls
- ✅ Automatic cache clearing (50 item limit)
- ✅ Debounced API requests
- ✅ Lazy loading of resources
- ✅ Minimal DOM manipulation

### **Error Handling**
```javascript
✅ Try-catch blocks on all AI calls
✅ Fallback to local content on error
✅ Rate limit retry with exponential backoff
✅ JSON parsing with regex fallback
✅ User-friendly error messages
```

### **State Management**
```javascript
// All state in vanilla JS variables
let plr = {...}  // Player state
let mon = {...}  // Monster state  
let qst = {...}  // Current question
let acs = Set()  // Achievements unlocked

// Persistence via localStorage
localStorage.setItem('qqrpg', JSON.stringify({plr, sub, dif}))
```

---

## 🏆 Achievements List

### **Standard Achievements**
- 🏆 **First Victory** - Defeat your first monster
- 🔥 **On Fire!** - Get 3 correct in a row
- ⚡ **Streak Five** - Get 5 correct in a row
- 🔺 **Level Up!** - Gain a level (repeatable)
- 🐉 **Dragon Tamer** - Defeat a boss monster

### **AI-Generated Achievements**
Unique achievements created dynamically for:
- Special milestones
- Specific monsters defeated
- Difficulty thresholds reached
- Streak combinations
- Perfect dungeon runs

---

## 🔐 Privacy & Security

- ✅ **No Data Collection**: Zero analytics or tracking
- ✅ **API Key Security**: Stored locally (not transmitted except to Gemini)
- ✅ **Offline Capable**: Demo mode works without internet
- ✅ **No Cookies**: Uses localStorage only for game save
- ✅ **Open Source**: Review code yourself (single file!)

---

## 📜 License

**MIT License** - Free to use, modify, and distribute!

```
Copyright (c) 2024 QuizQuest RPG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Credits & Acknowledgments

- **AI Engine**: [Google Gemini 2.0-flash-exp](https://ai.google.dev/)
- **Inspiration**: Classic RPGs + Educational Gaming
- **Design**: Minimalist dark theme with vibrant accents
- **Emoji**: Unicode standard (universal compatibility)
- **Community**: Built for students, teachers, and learners

---

## 🚀 Future Enhancements

### **Planned Features**
- [ ] Multiplayer battles
- [ ] Custom dungeon creator
- [ ] More subjects (Programming, Languages, Art)
- [ ] Achievement export/share
- [ ] Leaderboards
- [ ] Question difficulty voting
- [ ] Text-to-speech for questions

### **Contribution**
Want to add features? Feel free to:
1. Fork the project
2. Modify `index.html`
3. Test your changes
4. Submit suggestions

---

## 📞 Support & Community

- 🐛 **Bug Reports**: Open an issue with console errors
- 💡 **Feature Requests**: Suggest improvements
- 💬 **Questions**: Check console for error details
- 🤝 **Contribute**: PRs welcome!

---

## 🎉 Quick Start Summary

```bash
# 1. Download index.html
# 2. Open in browser
# 3. Enter API key or use Demo mode
# 4. Select dungeon
# 5. Play and learn!
```

**That's it! Literally one file. No build. No install. Just open and play!**

---

<div align="center">

### ⚔️ **Ready to Learn Through Battle?** ⚔️

**[Download Now](index.html)** | **[Get API Key](https://aistudio.google.com/apikey)** | **[Report Bug](#)**

---

Made with ❤️ for education | Powered by 🤖 Google Gemini AI

**Happy Learning! 🎓✨**

</div>