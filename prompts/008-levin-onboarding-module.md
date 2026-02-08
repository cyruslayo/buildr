# Levin Study Vault - Onboarding & Learning Foundations (NEW)

<objective>
Create Week 0 onboarding module that teaches non-academics HOW to learn from scientific papers, validates prerequisite knowledge, and provides a guided walkthrough of the first paper. Prevents cognitive overload and builds learning confidence before tackling the full 400-paper corpus.
</objective>

<context>
**Addresses Expert Critiques:**
- ❌ **Missing**: Metacognitive scaffolding (Dr. Chen)
- ❌ **Missing**: Prerequisite validation (Dr. Tran)
- ❌ **Missing**: Onboarding tutorial (James Park)
- ❌ **Missing**: Emotional anchoring (Dr. Okafor)

**Prerequisites:** Vault structure from prompt 003
**Duration:** Week 0 (before any papers are read)
**Outcome:** User confidence + validated readiness for Levin's work
</context>

<onboarding_structure>
Create folder: `00-meta/onboarding/` with modules:

```
00-meta/onboarding/
├── README.md (module overview, time estimates)
├── 01-welcome.md (set expectations, motivation check)
├── 02-knowledge-check.md (prerequisite assessment)
├── 03-learning-strategies.md (how to read papers)
├── 04-first-paper-walkthrough.md (guided annotation)
├── 05-tool-setup-test.md (NotebookLM, Obsidian practice)
└── 06-readiness-quiz.md (unlock main system)
```

</onboarding_structure>

<module_contents>

### 01-welcome.md
```markdown
# Welcome to the Levin Research Vault 🧬

## What You're About to Do

You're embarking on a journey to understand Michael Levin's groundbreaking work on bioelectricity, regeneration, and cellular intelligence—**without a formal biology background**. This is ambitious, challenging, and absolutely doable.

## Reality Check ⏱️

**Time Investment:**
- Week 0 (Onboarding): 5-8 hours
- Weeks 1-12: 8-10 hours/week
- Total to foundation mastery: ~100-120 hours

**Difficulty Curve:**
```
Difficulty
    ↑
  Hard |                    ╱─────
       |                  ╱
Medium |         ╱────────
       |       ╱
  Easy |─────╱
       └─────────────────────────→
       Week 0  Week 2  Week 8  Month 6
```

## Motivation Check 💭

**Before you begin, answer honestly:**

1. **Why do you want to learn Levin's work?**
   - [ ] General curiosity (⚠️ May not sustain 100+ hours)
   - [ ] Specific research question (✅ Good driver)
   - [ ] Career application (✅ Strong motivation)
   - [ ] Deep fascination (✅ Excellent)

2. **What excites you most?** (Pick one to anchor your learning)
   - [ ] Bioelectricity as a "software layer" for life
   - [ ] Regenerating limbs and organs
   - [ ] Cellular intelligence and collective behavior
   - [ ] Cancer as a bioelectric/geometric problem
   - [ ] Xenobots (living programmable robots)

3. **What's your learning style?**
   - [ ] Visual (diagrams, graphs, animations)
   - [ ] Verbal (reading, discussions, teaching others)
   - [ ] Kinesthetic (building models, experiments)

**Your answers will customize your learning path.**

---

## What Makes This Hard (And How We'll Handle It)

### Challenge 1: Vocabulary Cliff
**Problem:** Papers use terms like "membrane voltage," "morphogenetic field," "gap junctions" without explanation.  
**Solution:** We've pre-built a glossary and will walk through 50 core terms before you read your first paper.

### Challenge 2: Implicit Knowledge
**Problem:** Papers assume you know what a Xenopus is, why planaria are used, how voltage clamps work.  
**Solution:** Methods Encyclopedia provides context for every experimental system.

### Challenge 3: Information Overload
**Problem:** 400 papers is overwhelming.  
**Solution:** You'll start with **exactly 10 carefully selected papers**. More unlock only after demonstrating comprehension.

### Challenge 4: Motivation Valleys
**Problem:** Sometimes learning is hard and you'll want to quit.  
**Solution:** We've built in XP, streaks, and micro-wins to keep you going. Plus a "Feeling Stuck?" rescue system.

---

## Commit or Quit?

**This is your last exit ramp before investing serious time.**

If you're ready, proceed to [[02-knowledge-check]] to validate your starting knowledge.

If you're not sure, that's fine! Close this vault and come back when the curiosity is irresistible.

**Remember:** You don't need perfect motivation. You just need enough curiosity to start.

---

*Estimated time: 10 minutes*
```

---

### 02-knowledge-check.md
```markdown
# Knowledge Prerequisite Check

## Purpose
Levin's work builds on foundational concepts from biology, physics, and computer science. This assessment identifies gaps so we can fill them BEFORE you get confused mid-paper.

**This is NOT a test.** There are no wrong answers. We're just calibrating your starting point.

---

## Section 1: Cell Biology Basics (Essential)

### Q1: What is a cell membrane?
- [ ] A. The outer skin of an organism
- [ ] B. A lipid bilayer that separates cell interior from exterior
- [ ] C. The nucleus where DNA is stored
- [ ] D. I don't know

### Q2: What does "polarized" mean for a cell membrane?
- [ ] A. The membrane has different charges on inside vs outside
- [ ] B. The membrane is aligned with magnetic poles
- [ ] C. The cell is dividing
- [ ] D. I don't know

### Q3: What are ion channels?
- [ ] A. Waterways in cells
- [ ] B. Proteins that allow charged particles to cross membranes
- [ ] C. Energy storage units
- [ ] D. I don't know

**Scoring Section 1:**
- 3/3 correct → ✅ Skip biology primer
- 1-2 correct → ⚠️ Read cell biology primer (30 mins)
- 0 correct → ⚠️ Start with full biology foundations module (2 hours)

---

## Section 2: Physics/Electricity Basics (Important)

### Q4: Voltage is:
- [ ] A. The same as current
- [ ] B. Potential difference between two points
- [ ] C. Power consumption
- [ ] D. I don't know

### Q5: Positive and negative charges:
- [ ] A. Attract each other
- [ ] B. Repel each other
- [ ] C. Have no interaction
- [ ] D. I don't know

**Scoring Section 2:**
- 2/2 correct → ✅ You're good
- 0-1 correct → ⚠️ Read electricity primer (20 mins)

---

## Section 3: Computer Science Concepts (For Analogies)

### Q6: In computing, "hardware" vs "software" means:
- [ ] A. Physical components vs instructions/programs
- [ ] B. Difficult vs easy code
- [ ] C. Old vs new technology
- [ ] D. I don't know

### Q7: An "emergent property" is:
- [ ] A. A property that appears from interactions, not predictable from parts alone
- [ ] B. A new feature in software
- [ ] C. A rare genetic mutation
- [ ] D. I don't know

**Scoring Section 3:**
- This section helps with analogies but isn't required
- If you got 0/2, we'll use different analogies

---

## Your Learning Path Recommendation

**Based on your scores, here's your personalized start:**

### If you scored 7-9 total:
→ Proceed directly to [[03-learning-strategies]]  
→ Estimated onboarding time: 4 hours

### If you scored 4-6 total:
→ Read these primers first:
- `50-study-guides/foundational/cell-biology-primer.md`
- `50-study-guides/foundational/electricity-basics.md`  
→ Then proceed to [[03-learning-strategies]]  
→ Estimated onboarding time: 6 hours

### If you scored 0-3 total:
→ Start with full foundations module:
- `50-study-guides/foundational/biology-for-engineers.md`  
→ This is OK! Many successful learners start here  
→ Estimated onboarding time: 8 hours

---

**Don't skip the recommended primers!** They save time by preventing confusion later.

---

*Estimated time: 15 minutes*
```

---

### 03-learning-strategies.md
```markdown
# How to Learn from Scientific Papers (Non-Academic Edition)

## The Truth About Reading Papers

**Myth:** You read a paper start-to-finish like a novel, understanding everything.  
**Reality:** Experts skim, skip, and re-read strategically. You will too.

## The Three-Pass Method (Adapted for Levin's Work)

### Pass 1: The Scout (5-10 minutes)
**Goal:** Decide if this paper is worth reading deeply right now.

1. Read title and abstract
2. Look at figures (they often tell the whole story)
3. Read conclusion section
4. Skim introduction for key claims

**Decision point:**
- Not essential right now? → Save for later, move on
- Core to current learning goal? → Proceed to Pass 2

### Pass 2: The Explorer (30-60 minutes)
**Goal:** Understand the main contributions without getting stuck in details.

**What to read:**
- Introduction (fully)
- Method NAMES (not details yet)
- Results section WITH figures
- Discussion section

**What to SKIP for now:**
- Detailed methodology (unless you're replicating)
- Statistical analysis details
- Most of the references section

**Active strategies:**
- Annotate in PDF: ✅ (I get this) | ❓ (confused) | ⭐ (important)
- Ask NotebookLM: "Explain this finding like I'm a computer scientist"
- Create 3-5 concept notes for new terms

### Pass 3: The Archaeologist (1-2 hours, only for key papers)
**Goal:** Deep mastery, could explain to someone else.

**Now read:**
- Methodology in detail
- Supplementary materials
- Referenced papers (for context)

**Active strategies:**
- Draw diagrams from memory
- Predict next experiments
- Write a teaching summary

---

## Annotation Strategy

### Use 4-Color Code (in PDF or on paper):

- 🟢 **Green:** Core concepts I understand
- 🟡 **Yellow:** Important but need to review
- 🔴 **Red:** Confused, need help
- 🔵 **Blue:** Connections to other papers

### Ask These Questions While Reading:

1. **What problem does this solve?** (Every paper answers a question)
2. **How did they test it?** (Experiments, models, observations?)
3. **What's the key evidence?** (Usually 1-2 crucial figures)
4. **What does this MEAN?** (Why should anyone care?)
5. **What are they NOT saying?** (Limitations, caveats)

---

## Common Pitfalls (And How to Avoid Them)

### Pitfall 1: Getting Stuck on One Sentence
**Symptom:** Re-reading the same paragraph 5 times.  
**Fix:** Highlight it, ask NotebookLM, move on. Come back later with fresh eyes.

### Pitfall 2: Perfectionism
**Symptom:** "I must understand EVERYTHING before continuing."  
**Fix:** 70% comprehension is excellent. Some papers require prerequisites you don't have yet.

### Pitfall 3: Passive Reading
**Symptom:** Eyes moving over words but nothing sticking.  
**Fix:** Take notes by hand, talk out loud, draw diagrams.

### Pitfall 4: No Spaced Repetition
**Symptom:** "I read this paper but remember nothing."  
**Fix:** Review your notes at 1 day, 3 days, 7 days intervals.

---

## Your Reading Rhythm (Recommended)

### Monday (New Content Day - 2 hours)
- Pass 1 on 3-4 papers → Select 1 for deep read
- Pass 2 on selected paper
- Create concept notes for new terms

### Tuesday (Consolidation Day - 1 hour)
- Review yesterday's concept notes
- Ask NotebookLM clarifying questions
- Connect to previous papers

### Wednesday (New Content Day - 2 hours)
- Repeat Monday's process

### Thursday (Consolidation Day - 1 hour)
- Active recall: Explain Monday's concepts from memory
- Update knowledge graphs

### Friday (New Content Day - 2 hours)
- Repeat Monday's process

### Saturday (Testing Day - 1 hour)
- Quiz yourself (see [[06-readiness-quiz]] for format)
- Identify weak spots

### Sunday (Reflection - 30 mins)
- Update learning journal
- Plan next week's focus area

---

## Tools Cheat Sheet

### When to Use What:

| Task | Tool | Why |
|------|------|-----|
| First read of paper | PDF viewer + annotation | Mark up as you go |
| "I don't understand this" | NotebookLM Q&A | AI tutor always available |
| Remember this concept | Obsidian concept note | For long-term retention |
| See connections | Obsidian graph view | Visual pattern recognition |
| Daily planning | CLI: `levin study` | Personalized recommendations |
| Track progress | HOME.md dashboard | Motivation via visible wins |

---

## Ready to Read Your First Paper?

Proceed to [[04-first-paper-walkthrough]] for a guided experience.

---

*Estimated time: 20 minutes to read, lifetime to master*
```

---

### 04-first-paper-walkthrough.md
```markdown
# Your First Paper: Guided Walkthrough

## The Paper We'll Read Together

**Levin, M. (2014). "Molecular bioelectricity: how endogenous voltage potentials control cell behavior and instruct pattern regulation in vivo."**

**Why this one?**
- Overview paper (not too technical)
- Levin's clearest explanation of bioelectric code
- Foundation for everything else

**Where to find it:**
→ `10-papers/by-year/2014/Levin-2014-Molecular-Bioelectricity.pdf`

---

## Pass 1: The Scout (Follow Along)

### Step 1: Read the Title Out Loud
"Molecular bioelectricity: how endogenous voltage potentials control cell behavior and instruct pattern regulation in vivo."

**Let's decode:**
- "Molecular bioelectricity" = Electricity at the cell level
- "Endogenous" = Made by the body itself (not external)
- "Voltage potentials" = Electrical charges across cell membranes
- "Control cell behavior" = Tells cells what to do
- "Pattern regulation" = Shapes and structures in the body
- "in vivo" = In living organisms (not in a dish)

**One-sentence summary:** This paper explains how cells use built-in electrical signals to control what they become and how they organize into body patterns.

### Step 2: Read the Abstract (Slowly)

[Copy abstract here when implementing]

**After reading, answer:**
1. What's the main claim? → [Voltage gradients act as instructive signals]
2. What's one piece of evidence? → [Manipulating voltage changes outcomes]
3. What's one application? → [Regenerative medicine, cancer]

### Step 3: Look at Figure 1

[Describe Figure 1]

**What you should see:**
- Diagram showing voltage gradients across tissue
- Before/after manipulation images

**What this figure MEANS:**
Changing voltage → changing what cells build

---

## Pass 2: The Explorer (Guided)

### Read Introduction (Pages 1-3)

**As you read, fill in:**

1. **The Big Question:** What problem is Levin trying to solve?  
   → Write answer: ___________________

2. **The Key Insight:** What's his novel claim?  
   → Write answer: ___________________

3. **Why It Matters:** What could we DO with this knowledge?  
   → Write answer: ___________________

### Examine Each Figure

**For each figure, complete this table:**

| Figure # | What's Being Shown | Key Result | My Confusion |
|----------|-------------------|------------|--------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Read Results Section

**Highlight these on your PDF:**
- 🟢 Experimental evidence for voltage control
- 🔵 Connections to previous work
- 🟡 Technical terms to look up later

### Create Your First Concept Note

**Let's create: [[Bioelectric-Code]]**

Use template at `70-templates/concept-note-template.md`

**Guided fill-in:**
- **Simple Explanation:** Cells use electrical patterns like software code to decide what to build
- **Technical Definition:** [Copy from paper]
- **Why It Matters:** Allows regeneration without changing genes
- **Key Papers:** This one!

---

## Pass 3: Questions to Ask NotebookLM

**Upload this paper to NotebookLM, ask:**

1. "Explain bioelectric code using a computer programming analogy"
2. "What's the difference between bioelectric signals and nerve signals?"
3. "What are the biggest unknowns Levin mentions?"
4. "If I wanted to regenerate a limb, how would bioelectricity help?"

**Copy answers to:** `60-notebooklm-resources/qa-sessions/first-paper-qa.md`

---

## Reflection (Required)

### Answer in your learning journal:

1. **What was the "aha!" moment for you?**  
   → 

2. **What's still confusing?**  
   → 

3. **How does this connect to something you already know?**  
   → (Hint: Think about your CS background)

4. **On a scale of 1-10, how interesting was this?**  
   → [If <6, consider if this topic is right for you]

5. **How confident do you feel explaining bioelectric code to a friend?**  
   - [ ] 25% (barely)
   - [ ] 50% (basic idea)
   - [ ] 75% (pretty good)
   - [ ] 90% (could teach it)

---

## Next Steps

✅ You've completed your first paper!

**Progress unlocked:**
- +100 XP
- Badge: "First Paper Read"
- Concept: [[Bioelectric-Code]] created

**What's next:**
→ [[05-tool-setup-test]] - Practice your workflow
→ Then [[06-readiness-quiz]] - Unlock the full system

---

*Estimated time: 2-3 hours (this gets faster with practice)*
```

---

### 06-readiness-quiz.md
```markdown
# System Unlock: Readiness Quiz

## Purpose
You've completed onboarding. This quiz verifies you're ready to tackle the full 400-paper corpus independently.

**Pass threshold:** 7/10 correct

---

## Comprehension Questions (Paper-Specific)

### Q1: What does "bioelectric code" mean?
[Multiple choice]

### Q2: Levin's main claim is that voltage gradients:
[Multiple choice]

### Q3: In the eye induction experiment, what happened when researchers manipulated voltage?
[Multiple choice]

---

## Meta-Learning Questions (Strategy)

### Q4: You encounter a sentence with 5 unfamiliar terms. What should you do FIRST?
- [ ] A. Re-read it 10 times until it makes sense
- [ ] B. Highlight it, look up 1-2 key terms, move on
- [ ] C. Give up and skip the paper
- [ ] D. Ask NotebookLM to explain the whole sentence

### Q5: The Three-Pass Method says to:
- [ ] A. Read the paper three times word-for-word
- [ ] B. Scout → Explore → Archaeologist (increasing depth)
- [ ] C. Read only three pages
- [ ] D. Share with three friends

---

## Tool Proficiency Questions

### Q6: To create a new concept note, you should:
- [ ] A. Use the template at `70-templates/concept-note-template.md`
- [ ] B. Write freeform text
- [ ] C. Copy-paste from the paper
- [ ] D. Let AI generate it

### Q7: If you're feeling stuck and don't understand a concept, your FIRST step is:
- [ ] A. Give up
- [ ] B. Ask NotebookLM to explain it simply
- [ ] C. Read 10 more papers hoping it becomes clear
- [ ] D. Email Michael Levin

---

## Self-Assessment Questions

### Q8: On a scale of 1-10, how confident are you in reading scientific papers?
[1-10 slider]

### Q9: What's your biggest concern going forward?
[Free text]

### Q10: Complete this sentence: "I'm learning Levin's work because..."
[Free text - for motivation anchoring]

---

## Scoring

### 7-10 correct: ✅ READY
🎉 **Welcome to the full system!**

**You've unlocked:**
- Access to first 10 foundational papers
- Daily study plan generator
- XP and leveling system
- Full NotebookLM integration

**Next step:** Run `levin study` to get your first daily plan

---

### 4-6 correct: ⚠️ ALMOST THERE
You're close! Review these areas:
- [List weak areas based on answers]

**Recommended:** Re-read [[03-learning-strategies]] and retry quiz

---

### 0-3 correct: ❌ NOT YET READY
Don't worry! This just means you need more foundation work.

**Recommended path:**
1. Re-do [[02-knowledge-check]] with primers
2. Re-read first paper with more NotebookLM support
3. Retry quiz in 3-5 days

**Remember:** Slow and steady wins. Better to be over-prepared than overwhelmed.

---

*Estimated time: 20 minutes*
```

</module_contents>

<implementation_steps>
1. **Create onboarding folder structure:**
   - `00-meta/onboarding/` with 6 modules

2. **Generate prerequisite materials:**
   - `50-study-guides/foundational/cell-biology-primer.md`
   - `50-study-guides/foundational/electricity-basics.md`
   - `50-study-guides/foundational/biology-for-engineers.md`

3. **Set up unlock mechanism in prompt 007:**
   - User must pass readiness quiz to access full system
   - Daily plan generator checks `onboarding-completed` flag

4. **Integrate with existing prompts:**
   - Modify `003-levin-vault-setup.md` to include onboarding folder
   - Modify `007-levin-master-orchestration.md` to run onboarding check on first use

</implementation_steps>

<output>
Create in vault:

**Onboarding Modules:**
- `00-meta/onboarding/README.md`
- `00-meta/onboarding/01-welcome.md`
- `00-meta/onboarding/02-knowledge-check.md`
- `00-meta/onboarding/03-learning-strategies.md`
- `00-meta/onboarding/04-first-paper-walkthrough.md`
- `00-meta/onboarding/05-tool-setup-test.md`
- `00-meta/onboarding/06-readiness-quiz.md`

**Foundation Primers:**
- `50-study-guides/foundational/cell-biology-primer.md`
- `50-study-guides/foundational/electricity-basics.md`
- `50-study-guides/foundational/biology-for-engineers.md`

**Integration Script:**
- `scripts/check-onboarding-status.py` (validates completion)

</output>

<success_criteria>
- [ ] All 6 onboarding modules created and readable
- [ ] Knowledge check correctly routes users to appropriate primers
- [ ] First paper walkthrough provides clear guidance
- [ ] Readiness quiz gates access to full system (users must pass)
- [ ] Foundation primers cover cell biology, electricity, basic biology
- [ ] Onboarding completion tracked (unlocks daily plan generator)
</success_criteria>

<verification>
1. New user starts system → directed to `00-meta/onboarding/01-welcome.md`
2. Takes knowledge check → correctly routed based on scores
3. Completes first paper walkthrough → creates concept note successfully
4. Passes readiness quiz → unlocks full system access
5. Run `levin study` → generates first daily plan only after onboarding complete
</verification>
