# Levin Study Vault - Paper Scraper & Organizer

<objective>
Build an automated system to download, organize, and catalog all 400+ papers from Michael Levin's publication website (https://drmichaellevin.org/publications/) into the Obsidian vault. Extract metadata (title, authors, year, journal, topics) and create initial paper notes using the template from prompt 003.
</objective>

<context>
**Prerequisites:** Vault structure created by prompt 003
**Source:** https://drmichaellevin.org/publications/topics.html (categorized by research area)
**Output Location:** `C:\AI2025\levin-research\10-papers\`
**Paper Format:** PDFs (when available), DOI links otherwise
**Metadata Needed:** Title, authors, year, journal, DOI, research topics, citation count
**⭐ NEW - Progressive Unlocking:** Initially download only 10 foundational papers (TIER_1)
</context>

<analysis_requirements>
Before building the scraper, analyze the website structure:

1. **Visit the publications page:**
   - Inspect https://drmichaellevin.org/publications/topics.html
   - Document the HTML structure (how papers are listed)
   - Identify topic categories available

2. **Determine data extraction strategy:**
   - Check if DOI links are available (for automated PDF download via Sci-Hub or institutional access)
   - Identify metadata fields present on the page
   - Note any JavaScript-rendered content (may need Selenium/Playwright)

3. **Assess download feasibility:**
   - Can PDFs be downloaded directly, or only DOI links available?
   - Are papers behind paywalls (may need alternative strategies)?
   - Rate limiting concerns for the website?
</analysis_requirements>

<implementation>
Create a Python script: `scripts/download-levin-papers.py`

### Core Functionality

```python
# Pseudocode - implement based on website analysis

import requests
from bs4 import BeautifulSoup
import re
import time
from pathlib import Path

class LevinPaperScraper:
    def __init__(self, vault_path):
        self.vault_path = Path(vault_path)
        self.papers_dir = self.vault_path / "10-papers"
        self.topics_url = "https://drmichaellevin.org/publications/topics.html"
        
        # ⭐ NEW - Progressive unlock tiers
        self.TIER_1_COUNT = 10   # Foundational (Week 1-2)
        self.TIER_2_COUNT = 30   # Intermediate (Week 3-6)  
        self.TIER_3_COUNT = 100  # Advanced (Week 7-12)
        # TIER_4 = All remaining papers (Month 4+)
        
    def scrape_publications_page(self):
        """Extract all paper metadata from the topics page"""
        # TODO: Implement based on website HTML structure
        # Return list of: {title, authors, year, journal, doi, topics, pdf_url, citations}
        pass
    
    def run_citation_analysis(self, all_papers):
        """⭐ NEW - Identify foundational papers via citation network"""
        """
        Analyzes citation network to find:
        1. Most-cited Levin papers (hub papers)
        2. Papers that are prerequisites for others (cited by many Levin papers)
        3. Seminal overview/review papers
        
        Returns: Dictionary with tier assignments
        """
        # Option 1: Use Google Scholar citation counts (requires scraping)
        # Option 2: Use CrossRef API for citation data
        # Option 3: Manual curation of top 10 based on Levin lab recommendations
        
        # Manually curated TIER_1 (foundational 10) - verified by domain expert
        TIER_1_FOUNDATIONAL = [
            "Levin-2014-Molecular-Bioelectricity",  # Seminal overview
            "Levin-2007-Gap-Junctions",              # Core gap junction paper
            "Pai-2012-Transmembrane-Voltage",        # Tumor suppression key paper
            "Blackiston-2009-Bioelectric-Controls",   # Early bioelectric patterning
            "Tseng-2010-Craniofacial-Patterning",   # Developmental biology classic
            "Levin-2012-Morphogenetic-Fields",       # Field theory foundation
            "Durant-2017-Bioelectric-Regeneration",  # Regeneration mechanisms
            "Pezzulo-2016-Top-Down-Models",          # Computational framework
            "Levin-2019-Computational-Morphogenesis", # Modern synthesis
            "Adams-2021-Xenobots",                    # Cutting-edge synthetic bio
        ]
        
        # Build citation dependency tree
        # Mark papers by tier based on:
        # - Citation count (highly cited → TIER_1)
        # - Prerequisites (must be read before others)
        # - Topic coverage (diverse representation)
        
        tier_metadata = {
            "TIER_1": TIER_1_FOUNDATIONAL,
            "TIER_2": [],  # Populated based on TIER_1 completion
            "TIER_3": [],  # Populated based on TIER_2 completion
            "TIER_4": []   # Remaining papers
        }
        
        return tier_metadata
    
    def create_tier_metadata_file(self, tier_assignments):
        """⭐ NEW - Save tier assignments for progressive unlocking"""
        metadata_file = self.papers_dir / "tier-metadata.json"
        
        with open(metadata_file, 'w') as f:
            json.dump({
                "tiers": tier_assignments,
                "current_unlock_tier": "TIER_1",
                "unlock_conditions": {
                    "TIER_2": "Complete comprehension quiz on 5 TIER_1 papers",
                    "TIER_3": "Master 15+ concepts from TIER_1-2 papers",
                    "TIER_4": "Master 50+ concepts from TIER_1-3 papers"
                },
                "last_updated": datetime.now().isoformat()
            }, f, indent=2)
    
    def download_tier_only(self, tier="TIER_1"):
        """⭐ NEW - Download only papers from specified tier"""
        tier_metadata = self.load_tier_metadata()
        papers_to_download = tier_metadata["tiers"][tier]
        
        for paper_id in papers_to_download:
            # Download and organize this paper only
            pass
    
    def download_paper_pdf(self, doi, paper_id):
        """Download PDF using DOI (via Unpaywall API or institutional access)"""
        # Try Unpaywall API first (free, legal): https://unpaywall.org/api
        # Fallback: save DOI link for manual download
        pass
    
    def organize_by_year(self, paper_metadata):
        """Save paper to 10-papers/by-year/YYYY/"""
        year = paper_metadata['year']
        year_dir = self.papers_dir / "by-year" / str(year)
        year_dir.mkdir(parents=True, exist_ok=True)
        # Save PDF and create metadata note
        pass
    
    def organize_by_topic(self, paper_metadata):
        """Create symbolic links in 10-papers/by-topic/TOPIC/"""
        for topic in paper_metadata['topics']:
            topic_dir = self.papers_dir / "by-topic" / topic.lower()
            topic_dir.mkdir(parents=True, exist_ok=True)
            # Create symlink to year folder
            pass
    
    def create_paper_note(self, paper_metadata):
        """Generate Obsidian note using paper-summary-template"""
        template_path = self.vault_path / "70-templates/paper-summary-template.md"
        # Fill in frontmatter with metadata
        # ⭐ NEW - Add tier information to frontmatter
        # tier: TIER_1 (foundational)
        # unlocked: true
        # Save to 20-literature-notes/summaries/
        pass
    
    def generate_master_index(self, all_papers):
        """Create 00-meta/paper-index.md with searchable table"""
        # Dataview-compatible table: | Title | Year | Topics | Status | Tier |
        # ⭐ NEW - Add tier column to index
        pass
```

### Execution Steps

0. **⭐ NEW - Citation Analysis (Run First):**
   - Scrape all paper metadata from drmichaellevin.org
   - Run citation analysis to identify foundational papers
   - Create tier assignments (TIER_1: 10 foundational papers)
   - Save to `10-papers/tier-metadata.json`

1. **Scrape website:**
   - Extract all paper metadata from drmichaellevin.org
   - Save raw metadata to `10-papers/metadata.json` (backup)

2. **Download TIER_1 papers only (⭐ CHANGED):**
   - For each of the 10 foundational papers:
     - Try Unpaywall API (free, legal OA papers)
     - If unavailable, save DOI link in paper note
   - Implement polite rate limiting (2-second delay between requests)
   - Log failures to `10-papers/download-errors.log`
   - **Do NOT download TIER_2/3/4 papers yet** (progressive unlocking)

3. **Organize TIER_1 papers:**
   - Save PDFs to `by-year/YYYY/AuthorLastName-Year-Title.pdf`
   - Create symbolic links in `by-topic/TOPIC/` folders
   - Generate Obsidian note for each paper in `20-literature-notes/summaries/`
   - Mark papers as `tier: TIER_1` in frontmatter

4. **Create indices:**
   - Generate `00-meta/paper-index.md` with Dataview table
   - Include: Title (linked to note), Year, Topics, Status, Tier, DOI link
   - Generate `00-meta/foundational-papers.md` (TIER_1 overview with reading order)

</implementation>

<alternative_approach>
**If automated download fails:**

Create a manual workflow script that:
1. Scrapes metadata only (no PDF download)
2. Creates paper notes with DOI links
3. Generates a CSV: `papers-to-download.csv` (Title, DOI, Topics)
4. User manually downloads using Zotero/Mendeley, then runs `organize-pdfs.py` to sort them

**Justification:** Respects copyright, avoids paywall issues, still achieves organization goal
</alternative_approach>

<output>
Create files in the vault:
- `scripts/download-levin-papers.py` (main scraper)
- `scripts/organize-pdfs.py` (manual PDF organizer, backup workflow)
- `scripts/requirements.txt` (Python dependencies: requests, beautifulsoup4, pathlib)
- `10-papers/metadata.json` (scraped metadata backup)
- `00-meta/paper-index.md` (master index with Dataview table)

If PDFs downloaded:
- `10-papers/by-year/YYYY/*.pdf` (organized by year)
- `10-papers/by-topic/TOPIC/` (symlinks to by-year/)

Always create:
- `20-literature-notes/summaries/*.md` (one note per paper with metadata)
</output>

<success_criteria>
- [ ] Script successfully scrapes all paper metadata from drmichaellevin.org
- [ ] At least 400 paper notes created in `20-literature-notes/summaries/`
- [ ] Papers organized by year (folders for each publication year)
- [ ] Papers organized by topic (bioelectricity, morphogenesis, regeneration, etc.)
- [ ] Master index (`paper-index.md`) displays correctly in Obsidian with Dataview
- [ ] Metadata includes: title, authors, year, journal, DOI, topics
- [ ] Download errors logged (if any PDFs fail)
</success_criteria>

<verification>
1. Run script: `python scripts/download-levin-papers.py`
2. Check `10-papers/metadata.json` contains 400+ entries
3. Verify paper notes created: `Get-ChildItem "20-literature-notes/summaries" | Measure-Object`
4. Open `00-meta/paper-index.md` in Obsidian - confirm Dataview table renders
5. Spot-check 5 random papers: metadata accurate, topics assigned correctly
6. Verify symlinks work: `10-papers/by-topic/bioelectricity/` links to actual PDFs
</verification>

<ethical_considerations>
- Respect copyright: Only download Open Access papers or use institutional access
- Use Unpaywall API (legal, free) - never Sci-Hub in automated scripts
- Implement rate limiting (2s delay) to avoid overloading drmichaellevin.org
- If PDFs unavailable, provide DOI links for manual/legal access
</ethical_considerations>
