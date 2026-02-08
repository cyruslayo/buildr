# Levin Study Vault - Setup Obsidian Vault Structure

<objective>
Create a custom Obsidian vault structure optimized for studying Michael Levin's 400+ academic papers on regenerative biology, bioelectricity, and morphogenesis. This vault will integrate with NotebookLM and Claude Code to support non-academic learners in mastering complex biological concepts through progressive knowledge building.
</objective>

<context>
**Subject:**  Michael Levin - developmental biologist researching bioelectricity, regenerative medicine, and basal cognition
**Scale:** 400+ papers spanning developmental biology, bioelectricity, xenobots, cancer suppression, collective intelligence
**User Profile:** Non-academic background, seeking to deeply understand Levin's work
**Tools:** Obsidian MD (knowledge management), NotebookLM (AI Q&A), Claude Code (automation/analysis)
**Methodology:** Context Engineering approach - structured information architecture for progressive learning
</context>

<vault_structure>
Create the following folder hierarchy in a new Obsidian vault:

```
levin-research/
├── 00-meta/
│   ├── README.md (vault overview, how to use this system)
│   ├── HOME.md (★ START HERE - main dashboard)
│   ├── learning-roadmap.md (progressive learning path)
│   ├── research-questions.md (evolving questions to explore)
│   ├── onboarding/ (Week 0 - complete before main system)
│   │   ├── README.md (module overview)
│   │   ├── 01-welcome.md
│   │   ├── 02-knowledge-check.md
│   │   ├── 03-learning-strategies.md
│   │   ├── 04-first-paper-walkthrough.md
│   │   ├── 05-tool-setup-test.md
│   │   └── 06-readiness-quiz.md
│   ├── daily-plans/ (auto-generated study plans)
│   ├── progress/ (XP tracking, streaks)
│   │   ├── xp-log.md
│   │   ├── streak-tracker.md
│   │   └── level-progress.md
│   └── learning-journal-template.md
│
├── 10-papers/
│   ├── by-year/ (papers organized chronologically)
│   ├── by-topic/ (symbolic links to papers by research area)
│   ├── to-process/ (inbox for newly downloaded papers)
│   └── tier-metadata.json (progressive unlock tracking)
│
├── 20-literature-notes/
│   ├── summaries/ (AI-generated paper summaries)
│   ├── key-quotes/ (extracted quotes with context)
│   └── methodology-notes/ (experimental methods explained)
│
├── 30-concept-notes/
│   ├── 00-unsorted/ (★ NEW - emergent categorization)
│   ├── bioelectricity/ (voltage gradients, ion channels, bioelectric code)
│   ├── morphogenesis/ (pattern formation, developmental biology)
│   ├── regeneration/ (limb regeneration, planaria, repair mechanisms)
│   ├── basal-cognition/ (cellular intelligence, decision-making)
│   ├── cancer-geometry/ (tumor suppression, bioelectric normalization)
│   └── xenobots/ (living robots, synthetic morphology)
│
├── 40-connection-maps/
│   ├── concept-graphs/ (Mermaid diagrams linking concepts)
│   ├── paper-relationships/ (citation networks, idea evolution)
│   └── cross-domain-links/ (connections to AI, physics, philosophy)
│
├── 50-study-guides/
│   ├── foundational/ (Prerequisites: cell biology, embryology basics)
│   │   ├── cell-biology-primer.md
│   │   ├── electricity-basics.md
│   │   └── biology-for-engineers.md
│   ├── methods-encyclopedia/ (★ NEW - experimental techniques)
│   │   ├── voltage-clamp-explained.md
│   │   ├── xenopus-model-organism.md
│   │   └── planaria-regeneration-assays.md
│   ├── intermediate/ (Core Levin concepts explained simply)
│   └── advanced/ (Cutting-edge work, open research questions)
│
├── 60-notebooklm-resources/
│   ├── source-sets/ (grouped papers for NotebookLM upload)
│   ├── generated-summaries/ (NotebookLM outputs)
│   ├── qa-sessions/ (saved Q&A conversations)
│   └── embedded-summaries/ (★ NEW - summaries in Obsidian format)
│
└── 70-templates/
    ├── paper-summary-template.md
    ├── concept-note-template.md (200-word atomic version)
    ├── connection-map-template.md
    └── active-recall-template.md (★ NEW)
```
</vault_structure>

<implementation_steps>
1. **Create vault directory:**
   - Navigate to desired location (suggest: `C:\AI2025\levin-research\`)
   - Initialize as Obsidian vault (can be done manually or via script)

2. **Generate folder structure:**
   - Create all folders listed above using PowerShell/Bash script
   - Ensure consistent naming (lowercase, hyphens)

3. **Create foundational documents:**
   - `00-meta/README.md` - System overview, workflow instructions
   - `00-meta/learning-roadmap.md` - Suggested reading order (beginner → advanced)
   - `00-meta/research-questions.md` - Seed questions to guide exploration

4. **Create templates:**
   - `70-templates/paper-summary-template.md` - Standardized paper notes structure
   - `70-templates/concept-note-template.md` - Atomic concept notes
   - `70-templates/connection-map-template.md` - Linking concepts visually

5. **Configure Obsidian settings (`.obsidian/` folder):**
   - Enable community plugins: Dataview, Templater, Excalidraw (for diagrams)
   - Set default template folder to `70-templates/`
   - Configure daily notes in `00-meta/` (for learning journal)

6. **Create topic taxonomy:**
   - In `10-papers/by-topic/`, create subfolders for Levin's research areas:
     - bioelectricity, morphogenesis, regeneration, cancer, xenobots, cognition, computational-biology
</implementation_steps>

<template_contents>
### paper-summary-template.md
```markdown
---
paper_id: 
title: 
authors: 
year: 
journal: 
doi: 
status: [to-read, reading, summarized, integrated]
topics: []
difficulty: [foundational, intermediate, advanced]
---

## One-Sentence Summary


## Key Contributions
- 

## Core Concepts
- 

## Methodology
### Experimental Approach


### Key Findings


## Connections to Other Work
- Related papers: 
- Builds on: 
- Challenges: 

## Questions & Confusions
- 

## NotebookLM Prompts
- [ ] Upload to NotebookLM for Q&A
- [ ] Generate study guide
- [ ] Extract key quotes

## Personal Notes

```

### concept-note-template.md (★ UPDATED - Atomic + Three-Tier Definitions)
```markdown
---
concept: 
aliases: []
category: [bioelectricity, morphogenesis, regeneration, cognition, etc.]
difficulty: [foundational, intermediate, advanced]
mastery_level: [new, learning, mastered, needs-review]
last_reviewed: 
sources: []
srs_next_review: 
---

## ELI15 Explanation (Max 100 words)
<!-- Use analogies, avoid jargon -->


## Intermediate Explanation (ELI Undergrad, Max 150 words)
<!-- Assumes basic biology, introduces technical terms -->


## Technical Definition (Max 150 words)
<!-- Full precision, domain language -->


## Why This Matters
<!-- Real-world impact, Levin's perspective -->


## Key Papers
- [[Paper-Name-Year]] - 

## Visual Representation
<!-- Mermaid diagram or link to Excalidraw -->

## Connections
**Prerequisites:** [[concept-1]], [[concept-2]]  
**Related:** [[concept-3]]  
**Enables:** [[concept-4]]

## Active Recall Prompts
- [ ] Explain this concept from memory (no notes)
- [ ] Draw a diagram without looking
- [ ] How does this connect to [[related-concept]]?

---
**Word Count Check:** {{WORD_COUNT}} / 200  
*Last reviewed:* {{DATE}}  
*SRS next review:* {{srs_next_review}}
```

### active-recall-template.md (★ NEW)
```markdown
---
date: {{DATE}}
type: active-recall-session
concepts_tested: []
score: 
---

## Today's Active Recall Tasks

### Task 1: Explain Without Notes
**Concept:** [[concept-name]]  
**Time limit:** 5 minutes  
**Record:**

**Self-Assessment:**
- [ ] 90%+ accurate
- [ ] 70-90% accurate  
- [ ] <70% accurate (needs review)

### Task 2: Draw from Memory
**Concept:** [[concept-name]]  
**Draw:** [Attach image or Excalidraw]

**Comparison to source:**
- [ ] All key elements included
- [ ] Missing some details
- [ ] Needs complete review

### Task 3: Apply to Novel Scenario
**Concept:** [[concept-name]]  
**Scenario:** [Describe situation]  
**Your prediction/explanation:**

---
**Session Summary:**
- Concepts mastered: 
- Concepts needing review: 
- XP earned: {{XP}}
```
</template_contents>

<output>
Create the vault at: `C:\AI2025\levin-research\`

Generate:
- Complete folder structure (all directories listed in vault_structure)
- `00-meta/README.md` (system overview with usage instructions)
- `00-meta/learning-roadmap.md` (progressive learning path with suggested paper order)
- `70-templates/paper-summary-template.md` (copy contents above)
- `70-templates/concept-note-template.md` (copy contents above)
- PowerShell script: `setup-vault.ps1` (automates folder creation)
</output>

<success_criteria>
- [ ] All 7 top-level folders created with subdirectories
- [ ] README.md clearly explains the vault workflow
- [ ] Templates are ready for use (validate with Obsidian's template plugin)
- [ ] Learning roadmap includes at least 10 foundational papers to start with
- [ ] Vault opens cleanly in Obsidian with no errors
</success_criteria>

<verification>
1. Open vault in Obsidian - confirm no folder structure errors
2. Test templates by creating a sample paper note
3. Verify all folders are present: `Get-ChildItem -Recurse -Directory`
4. Confirm README.md renders correctly in Obsidian
</verification>
