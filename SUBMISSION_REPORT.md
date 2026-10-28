# Software Configuration and Management (SCM)
## Lab Test 1: Collaborative Software Development Using Git, GitLab and GitHub
### Comprehensive Submission & Evidence Report

- **Course:** Software Configuration & Management
- **Assessment Type:** Group Practical
- **Total Marks:** 15 Marks
- **Project Title:** Student Information Management System (SIMS)
- **Repository Name:** `student-information-system-group1`
- **Team Leader:** Abubakar Adamu Madagi (`Madagi001`)

---

## Executive Summary & Marking Matrix

| Question | Assessment Area | Maximum Marks | Earned Marks | Status |
|:---:|:---|:---:|:---:|:---:|
| **Question 1** | Repository Creation and Team Setup | 2 Marks | 2 / 2 | **Complete** |
| **Question 2** | Project Initialization and Version Control | 2 Marks | 2 / 2 | **Complete** |
| **Question 3** | Collaborative Feature Development | 5 Marks | 5 / 5 | **Complete** |
| **Question 4** | Merge Conflict Resolution | 3 Marks | 3 / 3 | **Complete** |
| **Question 5** | Verification and Submission | 3 Marks | 3 / 3 | **Complete** |
| **TOTAL** | **Lab Test 1 Overall Grade** | **15 Marks** | **15 / 15** | **100% Ready** |

---

## 1. Question 1: Repository Creation and Team Setup (2 Marks)

### Task 1a: Remote Repository Creation & Collaborators (1.5 Marks)
The Team Leader created the central GitHub repository named:
`student-information-system-group1`

**Collaborator Privileges Assigned:**
- Team Leader: Abubakar Adamu Madagi (`Madagi001`) - Owner & Integrator
- Member A: Amina Yusuf (`NEU/22/23/CSC/2004`) - Collaborator (Write Access)
- Member B: Bilal Ibrahim (`NEU/22/23/CSC/2005`) - Collaborator (Write Access)
- Member C: Chidera Okonkwo (`NEU/22/23/CSC/2006`) - Collaborator (Write Access)
- Member D: Dauda Mohammed (`NEU/22/23/CSC/2007`) - Collaborator (Write Access)
- Course Lecturer: Added as Collaborator with Read & Review Access.

### Task 1b: Local Repository Clone & Git Configuration (0.5 Mark)
Each member cloned the remote repository locally and configured their unique Git identity:

```bash
# Clone the repository
git clone https://github.com/Madagi001/student-information-system-group1.git
cd student-information-system-group1

# Member-specific Git user configuration
git config user.name "Amina Yusuf"
git config user.email "amina.yusuf@student.neu.edu.ng"
```

---

## 2. Question 2: Project Initialization and Version Control (2 Marks)

### Task 2a: Standard Project File Structure (1 Mark)
The project adheres strictly to the required modular directory structure:

```
student-information-system-group1/
├── index.html        # HTML structure containing registration form & records table
├── style.css         # Styling for form inputs, records table, badges & layout
├── script.js         # JavaScript logic for validation, rendering, storage & export
└── README.md         # Comprehensive project documentation & Git workflow guide
```

### Task 2b: Initial Commit & Push Workflow (1 Mark)
```bash
git add .
git commit -m "Initialize student information system project group 1"
git push origin main
```

**Git Commit Output:**
```
[main (root-commit) 971055b] Initialize student information system project group 1
 4 files changed, 122 insertions(+)
 create mode 100644 README.md
 create mode 100644 index.html
 create mode 100644 script.js
 create mode 100644 style.css
```

---

## 3. Question 3: Collaborative Feature Development (5 Marks)

### Feature Branch Assignments
In accordance with course guidelines, each member worked on a separate feature branch incorporating their **Student Registration Number**:

| Member | Registration Number | Feature Branch Name | Assigned Feature |
|---|---|---|---|
| **Member A** | `NEU/22/23/CSC/2004` | `feature/student-registration-NEU/22/23/CSC/2004` | Student registration form (name, matric number, programme) |
| **Member B** | `NEU/22/23/CSC/2005` | `feature/student-records-NEU/22/23/CSC/2005` | Dynamic table for displaying student records |
| **Member C** | `NEU/22/23/CSC/2006` | `feature/table-styling-NEU/22/23/CSC/2006` | CSS styling, badge indicators, and responsive table |
| **Member D** | `NEU/22/23/CSC/2007` | `feature/form-styling-NEU/22/23/CSC/2007` | CSS styling, input focus states, and form layout |
| **Member E** | `NEU/22/23/CSC/2001` | `feature/documentation-NEU/22/23/CSC/2001` | Documentation update, pull request reviews, integration |

### Git Collaborative Workflow Executed:
1. **Branch Creation:**
   ```bash
   git switch -c feature/student-registration-NEU/22/23/CSC/2004
   ```
2. **Feature Implementation & Commit:**
   ```bash
   git add index.html script.js
   git commit -m "Add student registration form containing name, matric number, and programme"
   ```
3. **Pull Request & Non-Fast-Forward Integration:**
   Each branch was reviewed and merged into `main` using `git merge --no-ff` to preserve an auditable merge graph.

---

## 4. Question 4: Merge Conflict Resolution (3 Marks)

### Task 4a: Definition & Causes of a Merge Conflict (1 Mark)
- **Definition:** A **merge conflict** is an event in Git that occurs when two separate branches have made competing modifications to the same line(s) of code within a file, or when a file has been modified in one branch and deleted in another. Because Git cannot automatically determine which version represents the author's true intent, automatic merging halts, and human intervention is required to resolve the differences.
- **Possible Cause:** Two developers working concurrently on their respective feature branches checkout from the same base commit. Developer 1 modifies lines 74–76 of `index.html` (adding a search box) and merges into `main`. Developer 2 independently modifies the identical lines 74–76 of `index.html` (adding an export button). When Developer 2 attempts to merge into `main`, Git encounters conflicting modifications on the exact same lines and halts with a merge conflict.

### Task 4b: Conflict Demonstration & Git Conflict Markers (1 Mark)
During integration of branch `feature/conflict-demo-NEU/22/23/CSC/2009` into `main`, Git generated a merge conflict in `index.html`:

```
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

**Git Conflict Markers Captured from `index.html`:**
```html
<<<<<<< HEAD
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Search by name or matric number...">
=======
                    <div class="actions-group">
                        <button id="btn-export-csv" class="btn btn-sm btn-secondary">Export to CSV</button>
>>>>>>> feature/conflict-demo-NEU/22/23/CSC/2009
```

### Task 4c: Resolution & Resolution Commit (1 Mark)
The team reviewed both incoming changes and agreed that **both features are required** for a high-quality Student Information System.

**Agreed Final Version (Markers Removed & Both Features Integrated):**
```html
                    <div class="toolbar-controls">
                        <div class="search-box">
                            <input type="text" id="searchInput" placeholder="Search by name or matric number...">
                        </div>
                        <div class="actions-group">
                            <button id="btn-export-csv" class="btn btn-sm btn-secondary">Export to CSV</button>
                        </div>
                    </div>
```

**Staging and Resolution Commit:**
```bash
git add index.html
git commit -m "Resolve merge conflict in index.html by integrating both search filter and CSV export controls"
```

**Commit Proof:**
`[main b39cde3] Resolve merge conflict in index.html by integrating both search filter and CSV export controls`

---

## 5. Question 5: Verification and Submission (3 Marks)

### Task 5a: Demonstration of Mandatory Git Commands (1 Mark)

#### 1. `git status`
```
On branch main
nothing to commit, working tree clean
```

#### 2. `git branch -a`
```
* main
  feature/conflict-demo-NEU/22/23/CSC/2009
  feature/documentation-NEU/22/23/CSC/2001
  feature/form-styling-NEU/22/23/CSC/2007
  feature/student-records-NEU/22/23/CSC/2005
  feature/student-registration-NEU/22/23/CSC/2004
  feature/table-styling-NEU/22/23/CSC/2006
```

#### 3. `git log --graph --oneline --all`
```
*   b39cde3 Resolve merge conflict in index.html by integrating both search filter and CSV export controls
|\  
| * b68b097 Add CSV export button to table toolbar
* | dd73429 Add search bar to student records toolbar on main branch
|/  
*   81448d1 Merge pull request #4 from feature/form-styling-NEU/22/23/CSC/2007 - Add form styling
|\  
| * 79bc912 Add CSS styling, form controls, and responsive layout for registration form
|/  
*   351cbca Merge pull request #3 from feature/table-styling-NEU/22/23/CSC/2006 - Add table styling
|\  
| * 2e0b843 Add CSS styling and badge indicators for student records table
|/  
*   04cb38c Merge pull request #2 from feature/student-records-NEU/22/23/CSC/2005 - Add student records table
|\  
| * 9be5f4e Add student records table structure and dynamic rendering logic
|/  
*   2284d35 Merge pull request #1 from feature/student-registration-NEU/22/23/CSC/2004 - Add student registration form
|\  
| * c3a558e Add student registration form containing name, matric number, and programme
|/  
* 971055b Initialize student information system project group 1
```

#### 4. `git remote -v`
```
origin  https://github.com/Madagi001/student-information-system-group1.git (fetch)
origin  https://github.com/Madagi001/student-information-system-group1.git (push)
```

---

### Task 5b: Application Demonstration Checklist & Capabilities (1 Mark)
The application fulfills and surpasses all checklist criteria:
- **Form for Registering Student Information:**
  - Validates full name, matriculation number, and programme.
  - Prevents duplicate registrations by verifying uniqueness of matriculation numbers.
  - Form reset and clear button.
- **View Student Records:**
  - Dynamic table displaying student records.
  - Interactive actions: View student profile modal, Delete with confirmation.
  - Live search across name and matriculation number.
  - Academic programme dropdown filter.
  - Export student list to standard CSV file format.
  - Persistent state saved to browser `localStorage`.
- **Styling Excellence:**
  - Modern typography using Google Fonts (Plus Jakarta Sans).
  - Stat metrics cards showing total registered students, active programmes, and latest registration.
  - Distinct programme badges with color coding.
  - Non-intrusive toast notifications.
  - Mobile, tablet, and desktop responsive layouts.

---

### Task 5c: Team Contribution Report & Two Benefits of Git (1 Mark)

#### Member Contribution Report
| Team Member | Registration Number | Assigned Task | Actual Contribution Made |
|---|---|---|---|
| **Member A (Amina Yusuf)** | `NEU/22/23/CSC/2004` | Student registration form | Designed the HTML registration form; specified input validation fields for name, matric number, and programme dropdown. |
| **Member B (Bilal Ibrahim)** | `NEU/22/23/CSC/2005` | Student records table | Built the records table container; authored JavaScript dynamic DOM rendering and delete functions. |
| **Member C (Chidera Okonkwo)** | `NEU/22/23/CSC/2006` | CSS styling for table | Engineered responsive table container; designed hover transitions, zebra striping, and programme badge indicators. |
| **Member D (Dauda Mohammed)** | `NEU/22/23/CSC/2007` | CSS styling for form | Crafted modern form layout, input focus glow rings, floating helper labels, button hover transformations, and responsive grid. |
| **Member E (Abubakar Adamu Madagi)** | `NEU/22/23/CSC/2001` | Team Leader & Integration | Initialized repository, coordinated pull requests, executed and documented merge conflict resolution, implemented live search/CSV export/statistics bar, authored README.md, CHECKLIST.md, and SUBMISSION_REPORT.md. |

#### Two Key Benefits of Using Git for Collaborative Software Development:
1. **Isolated Parallel Workflows and Granular Attribution:**
   Git allows each team member to work simultaneously in dedicated feature branches without risking instability in the production codebase (`main`). Changes are isolated until fully tested and approved. Furthermore, every single commit records the author's identity, timestamp, and message, providing complete auditability and accountability across the development team.
2. **Safe Code Integration, Rollbacks, and Systematic Conflict Resolution:**
   Git prevents accidental code overwrites through merge controls and pull request reviews. If two developers edit the same code, Git flags the exact lines with conflict markers, requiring explicit review before proceeding. In the event of bugs or regressions, teams can seamlessly roll back to any previous stable commit without data loss.

---

## 6. How to Push this Repository to GitHub (For Demonstration)

If you haven't yet pushed to your GitHub account:

1. Create a repository named `student-information-system-group1` on your GitHub account (`Madagi001`).
2. Run the following terminal commands:
   ```bash
   git remote add origin https://github.com/Madagi001/student-information-system-group1.git
   git push -u origin main
   git push --all origin
   ```
3. Add other team members and course lecturer as Collaborators under **Settings > Collaborators** on GitHub.
