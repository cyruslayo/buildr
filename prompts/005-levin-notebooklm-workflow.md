# Levin Study Vault - NotebookLM Integration Workflow

<objective>
Create a systematic workflow for using Google NotebookLM to generate AI-powered summaries, study guides, and Q&A sessions for Michael Levin's papers. Organize NotebookLM outputs back into the Obsidian vault and create a feedback loop for progressive learning.
</objective>

<context>
**Prerequisites:** 
- Prompts 003 (vault setup) and 004 (paper scraper) completed
- Papers organized in `10-papers/by-topic/`
- NotebookLM account (free at notebooklm.google.com)

**NotebookLM Capabilities:**
- Upload up to 50 sources per notebook (PDFs, docs, web pages)
- Generate summaries, study guides, briefing documents
- Interactive Q&A with sources
- Create "Audio Overviews" (podcast-style explanations)

**Learning Strategy:**
- Start with foundational topics (basic bioelectricity) before advanced (basal cognition)
- Group papers thematically for NotebookLM notebooks (e.g., "Bioelectricity Fundamentals")
- Extract insights → create concept notes → build knowledge graphs
</context>

<workflow_design>
### Phase 1: Create Topic-Based NotebookLM Projects

**Topic Groupings (aligned with Levin's research areas):**

1. **Foundations** (start here)
   - Basic bioelectricity papers (voltage gradients, ion channels)
   - Developmental biology fundamentals
   - ~15-20 papers

2. **Regeneration** 
   - Limb regeneration (salamanders, Xenopus)
   - Planaria head/tail regeneration
   - Bioelectric controls of pattern
   - ~25-30 papers

3. **Morphogenesis & Pattern Formation**
   - Gap junctions, voltage patterns
   - Left-right asymmetry
   - Craniofacial development
   - ~30-35 papers

4. **Cancer as Geometry Problem**
   - Bioelectric tumor suppression
   - Oncogene normalization
   - Membrane voltage and cancer
   - ~20-25 papers

5. **Basal Cognition & Intelligence**
   - Cellular decision-making
   - Collective intelligence
   - Computational boundaries
   - ~25-30 papers

6. **Xenobots & Synthetic Morphology**
   - Living robots
   - Self-assembly
   - Emergent behavior
   - ~15-20 papers

7. **Advanced/Cross-Domain**
   - AI parallels, philosophy of mind
   - Evolution of cognition
   - ~Remaining papers

### Phase 2: NotebookLM Processing Workflow

For each topic grouping:

1. **Create Notebook:**
   - Name: "Levin - [Topic] - [Date]"
   - Upload 20-30 papers (stay under 50 source limit)

2. **Generate Core Materials:**
   - **Study Guide:** Ask NotebookLM to create a beginner-friendly study guide
   - **FAQ:** "Generate 20 frequently asked questions about these papers with answers"
   - **Concept Map:** "List all key concepts and how they relate to each other"
   - **Audio Overview:** Generate podcast (great for reviewing while commuting)

3. **Interactive Q&A Session:**
   - Ask foundational questions (What is bioelectric code? How do cells communicate?)
   - Ask comparative questions (How does this differ from genetic control?)
   - Ask application questions (What are clinical implications?)
   - Save transcripts of valuable Q&A exchanges

4. **Export & Organize:**
   - Copy NotebookLM outputs to `60-notebooklm-resources/generated-summaries/[Topic]/`
   - Create index note linking to all outputs

### Phase 3: Automated Organization Script

Create: `scripts/process-notebooklm-outputs.py`

```python
# Automates organizing NotebookLM exports into vault

class NotebookLMProcessor:
    def __init__(self, vault_path):
        self.vault = Path(vault_path)
        self.nlm_dir = self.vault / "60-notebooklm-resources"
    
    def process_study_guide(self, topic, study_guide_text):
        """
        Convert NotebookLM study guide into Obsidian note
        Extract key concepts → create links to concept notes
        """
        # Parse study guide sections
        # Create internal links [[concept-name]]
        # Save to 50-study-guides/intermediate/
        pass
    
    def extract_concepts_from_faq(self, faq_text):
        """
        Parse FAQ to identify core concepts
        Create stub concept notes in 30-concept-notes/
        """
        # Use regex to extract Q&A pairs
        # Identify concepts mentioned
        # Generate concept-note-template instances
        pass
    
    def create_qa_index(self, topic, qa_transcript):
        """
        Create searchable index of Q&A sessions
        Link questions to relevant paper notes
        """
        # Format as Obsidian note with backlinks
        # Tag with topic
        pass
```

</workflow_design>

<implementation_steps>
1. **Prepare source sets:**
   - Create `60-notebooklm-resources/source-sets/` subfolders for each topic
   - Copy/symlink relevant PDFs from `10-papers/by-topic/[TOPIC]/`
   - Create README in each source-set with:
     - List of papers included
     - Suggested NotebookLM prompts
     - Learning objectives for this topic

2. **Create processing script:**
   - `scripts/process-notebooklm-outputs.py` (automated organization)
   - `scripts/requirements.txt` (add: openai, anthropic for future AI enhancements)

3. **Create workflow documentation:**
   - `00-meta/notebooklm-workflow.md` (step-by-step instructions)
   - Include:
     - How to create notebooks
     - Best prompts for each output type
     - How to export and organize results

4. **Create prompt templates:**
   - `60-notebooklm-resources/prompt-templates.md`
   - Best prompts for:
     - Study guides ("Create a study guide for a non-biologist...")
     - Concept extraction ("List all technical terms with simple definitions...")
     - Q&A strategies ("Explain [concept] like I'm a computer scientist...")

5. **Establish learning log:**
   - `00-meta/learning-journal.md` (daily notes template)
   - Track:
     - Papers read today
     - NotebookLM insights
     - New concepts understood
     - Questions for deeper research

</implementation_steps>

<example_prompts>
### For NotebookLM Study Guides
```
Create a comprehensive study guide for these papers on bioelectricity in development. 
Structure it for someone with a computer science background but no formal biology training.
Include:
1. Key concepts with simple analogies
2. Experimental methods explained 
3. Major findings and why they matter
4. Connections between papers (chronological development of ideas)
5. Glossary of technical terms
```

### For FAQ Generation
```
Generate 25 frequently asked questions about these papers, organized by difficulty:
- 10 foundational questions (What is...? How does...?)
- 10 intermediate questions (Why does...? What's the relationship between...?)
- 5 advanced questions (What are implications...? How might this apply to...?)

For each question, provide a clear answer citing specific papers.
```

### For Concept Mapping
```
Analyze these papers and create a hierarchical concept map showing:
1. Core concepts (3-5 most important ideas)
2. Supporting concepts (detailed mechanisms)
3. Applications/implications
4. Relationships between concepts (prerequisite knowledge, builds upon, contradicts, etc.)

Format as a structured outline I can convert to a knowledge graph.
```
</example_prompts>

<output>
Create in vault:

**Scripts:**
- `scripts/process-notebooklm-outputs.py` (automated organizer)
- Updated `scripts/requirements.txt`

**Documentation:**
- `00-meta/notebooklm-workflow.md` (complete workflow guide)
- `60-notebooklm-resources/prompt-templates.md` (best prompts)

**Source Sets (for each topic 1-7):**
- `60-notebooklm-resources/source-sets/01-foundations/`
  - `README.md` (papers list, learning objectives)
  - Symlinks to ~20 foundational papers
- [Repeat for topics 2-7]

**Output Storage:**
- `60-notebooklm-resources/generated-summaries/[topic]/`
  - `study-guide.md`
  - `faq.md`
  - `concept-map.md`
  - `qa-session-[date].md`

**Learning Tools:**
- `00-meta/learning-journal.md` (daily reflection template)
</output>

<success_criteria>
- [ ] 7 source-set folders created with paper collections (foundations → advanced)
- [ ] Each source-set has README with learning objectives
- [ ] `notebooklm-workflow.md` clearly explains the process (non-technical user could follow)
- [ ] Prompt templates cover: study guides, FAQs, concept maps, Q&A strategies
- [ ] Processing script successfully converts NotebookLM output into Obsidian notes
- [ ] Example outputs created for at least 1 topic (e.g., "Foundations")
- [ ] Learning journal template integrated with daily notes
</success_criteria>

<verification>
1. **Test workflow manually:**
   - Upload `source-sets/01-foundations/` to NotebookLM
   - Generate study guide using prompt template
   - Export and save to `generated-summaries/foundations/`
   - Run processing script to organize

2. **Validate outputs:**
   - Study guide is readable and well-structured in Obsidian
   - Concept links are created correctly [[bioelectric-code]]
   - FAQ answers cite specific papers

3. **Check integration:**
   - Verify symlinks in source-sets point to actual PDFs
   - Confirm daily notes template includes learning journal section
</verification>

<tips_for_non_academics>
**Recommended Learning Path:**

1. **Week 1:** Upload Foundations source-set to NotebookLM
   - Generate study guide + audio overview
   - Listen to audio overview while reviewing visuals
   - Read study guide, create concept notes for unfamiliar terms

2. **Week 2:** Interactive Q&A with Foundations notebook
   - Ask "What is...?" questions for each term
   - Request analogies ("Explain bioelectric code like it's software")
   - Save valuable Q&A exchanges

3. **Week 3:** Move to Regeneration topic
   - Build on foundational concepts
   - Compare/contrast with Foundations
   - Create connection maps between topics

**Key Strategy:** Use NotebookLM as a "smart tutor" who has read all 400 papers. Ask it to:
- Explain jargon in simple terms
- Connect ideas across papers
- Highlight historical development of concepts
- Suggest analogies from computer science/engineering
</tips_for_non_academics>
