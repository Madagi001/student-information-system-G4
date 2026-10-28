# Lab Test 1: Assessment & Verification Checklist

**Course:** Software Configuration & Management (SCM)  
**Project:** Student Information Management System (`student-information-system-group1`)  
**Assessment Type:** Group Practical  
**Total Marks Available:** 15 Marks  
**Target Score:** 15/15 (100%)

Use this checklist during your lab test demonstration to verify that every requirement is fulfilled and ready for the lecturer.

---

## 📋 Comprehensive Marking Checklist

### Question 1: Repository Creation and Team Setup (2 Marks)
- [x] **1a. Repository Creation & Collaborators (1.5 Marks)**
  - [x] Repository named `student-information-system-groupname` (or `student-information-system-group1`).
  - [x] Created on GitHub or GitLab by Team Leader (Abubakar Adamu Madagi / `Madagi001`).
  - [x] All 4 team members added as repository collaborators with write access.
  - [x] Course lecturer invited/added as a repository collaborator.
- [x] **1b. Local Cloning & User Configuration (0.5 Mark)**
  - [x] Repository cloned to local machine.
  - [x] `git config user.name "<Member Name>"` configured for team member.
  - [x] `git config user.email "<student-email>"` configured for team member.

---

### Question 2: Project Initialization and Version Control (2 Marks)
- [x] **2a. Required Project Structure (1 Mark)**
  - [x] `index.html` (Application HTML structure)
  - [x] `style.css` (Application stylesheet)
  - [x] `script.js` (Application logic and DOM operations)
  - [x] `README.md` (Project documentation and metadata)
- [x] **2b. Initial Commit and Push (1 Mark)**
  - [x] Files staged with `git add .`
  - [x] Meaningful initial commit message: `"Initialize student information system project group 1"`
  - [x] Committed to `main` branch.
  - [x] Pushed to remote repository via `git push origin main`.

---

### Question 3: Collaborative Feature Development (5 Marks)
- [x] **3a. Registration-Number Feature Branches Created (1 Mark)**
  - [x] **Member A Branch:** `feature/student-registration-NEU/22/23/CSC/2004`
  - [x] **Member B Branch:** `feature/student-records-NEU/22/23/CSC/2005`
  - [x] **Member C Branch:** `feature/table-styling-NEU/22/23/CSC/2006`
  - [x] **Member D Branch:** `feature/form-styling-NEU/22/23/CSC/2007`
  - [x] **Member E Branch:** `feature/documentation-NEU/22/23/CSC/2001`
- [x] **3b. Feature Implementation & Meaningful Commits (2 Marks)**
  - [x] **Member A:** Developed registration form (student name, matriculation number, programme).
  - [x] **Member B:** Developed records table and dynamic JavaScript rendering logic.
  - [x] **Member C:** Added modern responsive CSS styling, zebra striping, and programme badges to table.
  - [x] **Member D:** Added modern CSS styling, focus states, floating hint labels, and buttons to form.
  - [x] **Member E (Team Leader):** Coordinated system integration, added metrics bar, live search, filter, modal viewer, CSV export, and toast notifications.
  - [x] All commits carry meaningful, conventional commit messages.
- [x] **3c. Remote Push of Feature Branches (1 Mark)**
  - [x] All feature branches pushed to GitHub (`git push -u origin <branch-name>`).
  - [x] Branches visible under GitHub repository "Branches" tab.
- [x] **3d. Pull Requests & Code Review (1 Mark)**
  - [x] Pull requests opened for each feature branch against `main`.
  - [x] Pull requests reviewed, approved, and merged with merge commits.

---

### Question 4: Merge Conflict Resolution (3 Marks)
- [x] **4a. Definition and Cause of Merge Conflict (1 Mark)**
  - [x] **Definition:** A merge conflict occurs in Git when two or more branches have made competing modifications to the same lines of code in a file, or one branch modified a file that another branch deleted, preventing Git from automatically combining them.
  - [x] **Cause:** Two developers pull the same base code and independently modify the identical lines of code (or same section) and both commit and attempt to merge into `main` without first rebasing/pulling the other's changes.
- [x] **4b. Conflict Reproduction and Marker Inspection (1 Mark)**
  - [x] Simulated real merge conflict on `index.html` toolbar section.
  - [x] Conflict markers inspected and verified:
    ```html
    <<<<<<< HEAD
    ... current branch content ...
    =======
    ... incoming branch content ...
    >>>>>>> feature/conflict-demo-NEU/22/23/CSC/2009
    ```
- [x] **4c. Conflict Resolution and Resolution Commit (1 Mark)**
  - [x] Conflict reviewed and reconciled: kept both search input and CSV export button.
  - [x] Conflict markers completely removed.
  - [x] Resolution staged with `git add index.html`.
  - [x] Conflict resolution committed with message: `"Resolve merge conflict in index.html by integrating both search filter and CSV export controls"`.
  - [x] Resolution pushed to remote repository.

---

### Question 5: Verification and Submission (3 Marks)
- [x] **5a. Demonstration of Mandatory Git Commands (1 Mark)**
  - [x] `git status` -> Shows clean working tree.
  - [x] `git log --graph --oneline --all` -> Shows complete branching and merge graph.
  - [x] `git branch -a` -> Shows all local and remote branches.
  - [x] `git remote -v` -> Shows fetch and push remote URLs.
- [x] **5b. Application Demonstration (1 Mark)**
  - [x] Form for registering student information is functional.
  - [x] View student records table is functional.
  - [x] High quality, responsive styling is visually appealing and mobile-ready.
  - [x] Real-time search by name/matric number works.
  - [x] Filter by academic programme works.
  - [x] Delete record with confirmation works.
  - [x] Modal popup viewing complete student details works.
  - [x] Export to CSV works.
  - [x] Data persists in `localStorage`.
- [x] **5c. Team Contribution Report & Two Git Benefits (1 Mark)**
  - [x] Contribution report detailed in `SUBMISSION_REPORT.md` and `README.md`.
  - [x] **Benefit 1:** Isolated Parallel Workflows & Traceability (no overwriting colleagues' work).
  - [x] **Benefit 2:** Safe Non-Destructive Code Integration with Rollback & Conflict Resolution.

---

## 📦 Submission Deliverables Checklist (Page 6)
- [x] **Item 6:** GitHub Repository URL provided and accessible.
- [x] **Item 7:** Completed Student Information Management System code and assets.
- [x] **Item 8:** Evidence of branches, commits, and pull requests documented.
- [x] **Item 9:** Evidence of merge-conflict resolution documented.
- [x] **Item 10:** Detailed contribution report (Member Name, Assigned Task, Contribution Made).

---

## 🎯 Verification Quick Command Run
When presenting your project to your lecturer, execute these 4 commands in order:

```bash
# 1. Show working tree is clean
git status

# 2. Show the complete branching and PR merge history
git log --graph --oneline --all

# 3. Show all member feature branches
git branch -a

# 4. Show the remote GitHub repository link
git remote -v
```
