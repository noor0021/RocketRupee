# 🧪 RocketRupee Testing Scenarios

## Quick Test (2 minutes)

### Happy Path
1. ✅ Splash screen appears and auto-advances
2. ✅ Onboarding shows 4 screens + name input
3. ✅ Dashboard loads with user name
4. ✅ Click any navigation item → page loads
5. ✅ Complete one mission → earn XP

**Expected:** Smooth flow with no errors

---

## Detailed Testing Scenarios

### 1. First-Time User Experience

#### Scenario 1.1: Fresh Start
```
STEPS:
1. Open app for first time
2. Wait for splash screen (3 sec)
3. Click through onboarding (4 slides)
4. Enter name: "Alex"
5. Click "Start Your Journey"

EXPECTED:
- Splash animation plays completely
- Onboarding slides transition smoothly
- Name is required (button disabled if empty)
- Dashboard shows "Welcome back, Alex!"
- XP = 0, Level = 1
- No missions completed
```

#### Scenario 1.2: Name Validation
```
STEPS:
1. Reach name input screen
2. Try to submit without entering name
3. Enter name with spaces: "  "
4. Enter valid name: "Test User"

EXPECTED:
- Button disabled when empty
- Button disabled for whitespace-only
- Button enabled for valid name
- App continues after valid submission
```

### 2. Mission Completion

#### Scenario 2.1: First Mission
```
STEPS:
1. Complete onboarding
2. Navigate to Missions page
3. Click "Start Your First SIP"
4. Read mission intro
5. Click "Start Mission"
6. Select answer
7. Click "Complete Mission"

EXPECTED:
- Mission modal opens with animation
- XP reward shown: +100 XP
- Badge shown: SIP Starter
- Confetti animation plays
- Mission marked complete
- Dashboard updates: 100 XP, Level 1
- Profile shows badge
```

#### Scenario 2.2: Progressive Unlock
```
STEPS:
1. Complete Mission 1
2. Try to click Mission 3 (should be locked)
3. Complete Mission 2
4. Mission 3 should now be unlocked

EXPECTED:
- Mission 2 clickable after Mission 1
- Mission 3 locked (grayed out)
- Lock icon shown
- "Complete previous mission" message
- Unlock happens automatically
```

#### Scenario 2.3: Repeat Mission
```
STEPS:
1. Complete Mission 1
2. Navigate back to missions
3. Try to click completed Mission 1

EXPECTED:
- Mission shows "Completed" badge
- Mission is NOT clickable
- Green checkmark icon
- XP not awarded again
```

### 3. XP & Leveling System

#### Scenario 3.1: Level Up
```
STEPS:
Using devHelpers.addXP(500) or complete missions totaling 500 XP

EXPECTED:
- Level increases from 1 to 2
- Level-up modal appears
- Confetti animation plays continuously
- Modal shows "Level Up! 2"
- Progress bar resets for next level
```

#### Scenario 3.2: XP Progress
```
STEPS:
1. Start at 0 XP
2. Complete Mission 1 (+100 XP)
3. Check dashboard progress bar

EXPECTED:
- Progress bar: 20% (100/500)
- Next level: "Level 2"
- Visual animation on XP increase
```

#### Scenario 3.3: Multiple Missions
```
STEPS:
Complete missions 1-6 (total: 1200 XP)

EXPECTED:
- Level 1: 0-499 XP
- Level 2: 500-999 XP
- Level 3: 1000-1499 XP
- Final: Level 3 with 1200 XP (40% to Level 4)
```

### 4. SIP Simulator

#### Scenario 4.1: Basic Calculation
```
INPUTS:
- Monthly: ₹5,000
- Years: 10
- Return: 12%

EXPECTED:
- Total Invested: ₹6,00,000
- Total Wealth: ~₹11,61,695
- Total Returns: ~₹5,61,695
- Growth Multiple: ~1.94x
- Chart shows growth curve
```

#### Scenario 4.2: Extreme Values
```
TEST 1 - Maximum:
- Monthly: ₹50,000
- Years: 30
- Return: 20%

TEST 2 - Minimum:
- Monthly: ₹500
- Years: 1
- Return: 1%

EXPECTED:
- Calculations accurate
- Chart displays correctly
- No crashes or errors
- Numbers formatted with commas
```

#### Scenario 4.3: Slider Interaction
```
STEPS:
1. Move monthly slider
2. Observe real-time update
3. Move years slider
4. Move return rate slider

EXPECTED:
- All values update instantly
- Chart re-renders smoothly
- No lag or delay
- Animations smooth
```

### 5. Leaderboard

#### Scenario 5.1: Initial View
```
STEPS:
1. Complete onboarding
2. Navigate to Leaderboard

EXPECTED:
- Shows 8-9 users (mock data)
- User appears in list
- User's rank card at top
- Sorted by XP (highest first)
- Top 3 have special icons
```

#### Scenario 5.2: Rank Update
```
STEPS:
1. Check initial rank
2. Complete missions to gain XP
3. Return to leaderboard

EXPECTED:
- Rank improves with XP
- User's card highlights in green
- XP updates correctly
- Level recalculates
```

### 6. Profile & Badges

#### Scenario 6.1: New User Profile
```
STEPS:
1. Complete onboarding
2. Navigate to Profile

EXPECTED:
- Avatar shows
- Level 1, 0 XP
- Progress bar: 0%
- No badges (empty state)
- No mission history
- "Complete missions to earn badges"
```

#### Scenario 6.2: Badge Collection
```
STEPS:
1. Complete missions with badges
2. Check profile

EXPECTED:
- Each badge shows icon
- Badge name displayed
- Badge description shown
- Purple gradient card
- Animated entrance
```

#### Scenario 6.3: Mission History
```
STEPS:
1. Complete 3 missions
2. Check profile → Recent Activity

EXPECTED:
- Shows last 5 completed missions
- Newest first (sorted by date)
- Each shows: title, date, XP earned
- Green checkmark icons
```

### 7. Streak System

#### Scenario 7.1: Daily Streak
```
STEPS:
Using devHelpers.setStreak(7)

EXPECTED:
- Dashboard shows "7 days"
- Flame icon displayed
- Stats card updates
- Badge unlocks at 7 days (future feature)
```

#### Scenario 7.2: Streak Reset
```
SIMULATION:
- User logs in Day 1: streak = 1
- User logs in Day 2: streak = 2
- User skips Day 3
- User logs in Day 4: streak = 1

EXPECTED:
- Streak increments daily
- Streak resets on skip
- No negative streaks
```

### 8. Navigation

#### Scenario 8.1: Bottom Navigation
```
STEPS:
1. Click each nav item (Home, Missions, Simulator, Leaderboard, Profile)
2. Observe active state
3. Navigate back and forth

EXPECTED:
- Active tab highlighted in green
- Smooth transitions
- URL updates correctly
- Page content loads
- No flashing or jumps
```

#### Scenario 8.2: Deep Linking
```
STEPS:
1. Manually enter URL: /missions
2. Enter: /simulator
3. Enter: /invalid-url

EXPECTED:
- Valid routes load correctly
- Invalid routes → 404 page
- 404 has "Return to Dashboard" button
- Navigation works from 404
```

### 9. Data Persistence

#### Scenario 9.1: Refresh Test
```
STEPS:
1. Complete onboarding
2. Complete 2 missions
3. Refresh browser
4. Check dashboard

EXPECTED:
- User still logged in
- Name remembered
- XP preserved
- Missions still completed
- Streak maintained (if same day)
```

#### Scenario 9.2: Clear Data
```
STEPS:
Using devHelpers.resetApp()

EXPECTED:
- All localStorage cleared
- App resets to splash screen
- New onboarding required
- Fresh start
```

### 10. Animations & Performance

#### Scenario 10.1: Splash Screen
```
TIMING:
- Stars appear: immediate
- Rocket appears: 0.5s
- Rocket lifts: 2s
- Rocket launches: 2s
- Total: ~3.5s

EXPECTED:
- Smooth 60fps animations
- No stuttering
- Auto-advances after completion
```

#### Scenario 10.2: Confetti
```
TRIGGER POINTS:
- Mission completion
- Level up

EXPECTED:
- Confetti falls from top
- Multi-colored (green, orange, yellow)
- Lasts 2-3 seconds
- No performance impact
- Cleans up after
```

### 11. Responsive Design

#### Scenario 11.1: Mobile (375px)
```
CHECKS:
- Bottom nav visible
- Cards stack vertically
- Text readable
- Buttons touch-friendly
- Sliders work with touch
- Charts resize correctly
```

#### Scenario 11.2: Tablet (768px)
```
CHECKS:
- Grid layouts: 2 columns
- More horizontal space
- Charts larger
- Stats grid: 4 columns
```

#### Scenario 11.3: Desktop (1440px)
```
CHECKS:
- Max-width containers
- Centered layout
- Charts full-width
- Comfortable reading
```

### 12. Edge Cases

#### Scenario 12.1: Long Names
```
STEPS:
Enter name: "ThisIsAReallyLongNameThatShouldStillWork"

EXPECTED:
- Name truncates if needed
- No layout breaking
- Readable in all contexts
```

#### Scenario 12.2: Special Characters
```
STEPS:
Try names with: emojis, symbols, numbers

EXPECTED:
- App handles gracefully
- No crashes
- Stores correctly
```

#### Scenario 12.3: Rapid Clicking
```
STEPS:
1. Click mission multiple times rapidly
2. Click nav items quickly
3. Spam slider movements

EXPECTED:
- No duplicate actions
- No crashes
- Smooth handling
```

---

## Automated Test Checklist

- [ ] Splash screen auto-advances
- [ ] Onboarding requires name
- [ ] Dashboard loads after onboarding
- [ ] Missions unlock progressively
- [ ] XP calculation correct
- [ ] Level-up at 500 XP intervals
- [ ] SIP calculator accuracy
- [ ] Charts render correctly
- [ ] Leaderboard sorts by XP
- [ ] Profile shows correct data
- [ ] Bottom nav highlights active
- [ ] 404 page for invalid routes
- [ ] LocalStorage persistence
- [ ] Animations play smoothly
- [ ] Responsive on all sizes
- [ ] No console errors

---

## Performance Benchmarks

**Target Metrics:**
- Initial load: < 2s
- Page transitions: < 300ms
- Animation frame rate: 60fps
- Memory usage: < 100MB
- Mission complete: < 1s total time

**Test Tools:**
- Chrome DevTools → Performance
- Lighthouse audit
- Manual stopwatch timing

---

## Bug Report Template

```
BUG: [Title]
SEVERITY: [Critical/High/Medium/Low]
STEPS TO REPRODUCE:
1. 
2. 
3. 

EXPECTED:
ACTUAL:
BROWSER:
DEVICE:
SCREENSHOT:
```

---

Ready to test! 🧪🚀
