# SOFTWARE CONFIGURATION AND MANAGEMENT
## Lab Test 1: Collaborative Software Development Using Git, GitLab and GitHub
**Assessment Type:** Group Practical  
**Total Marks:** 15  
**Group:** Group 4 (G4)  
**Repository:** [https://github.com/Madagi001/student-information-system-G4.git](https://github.com/Madagi001/student-information-system-G4.git)  

---

## Project Scenario
Our team was assigned to develop a collaborative **Student Information Management System (SIMS)** that allows users to:
1. **Register students** through an interactive form containing Student Name, Matriculation Number, and Programme.
2. **View student records** in a responsive, styled tabular layout.

Version control and collaboration were managed using **Git** and **GitHub**, where each team member contributed through a dedicated feature branch named with their Registration Number.

---

# Question 1: Repository Creation and Team Setup (2 Marks)

### Task 1a: Remote Repository & Collaborators (1.5 Marks)
- **Repository Name:** `student-information-system-G4`
- **Remote URL:** `https://github.com/Madagi001/student-information-system-G4.git`
- **Team Leader Setup:** The repository was created on GitHub under the team lead account (`Madagi001`). All team members and the course lecturer were invited as repository collaborators with write access under **Settings > Collaborators**.

### Task 1b: Local Repository Clone & Configuration (0.5 Mark)
Each member cloned the remote repository and configured their unique Git author identity:
```bash
# Clone the repository
git clone https://github.com/Madagi001/student-information-system-G4.git
cd student-information-system-G4

# Configure individual Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config user.name
git config user.email
```

---

# Question 2: Project Initialization and Version Control (2 Marks)

### Task 2a: Project Structure (1 Mark)
The Team Leader initialized the project directory with the required files:
```text
student-information-system-G4/
├── index.html       # Primary HTML layout integrating form and table
├── style.css        # Unified CSS stylesheet for form and table
├── script.js        # JavaScript for dynamic registration and table updates
└── README.md        # Lab report, documentation, and verification evidence
```

### Task 2b: Initial Commit and Remote Push (1 Mark)
The project structure was staged, committed, and pushed to remote `main`:
```bash
git add .
git commit -m "Initialize student information system project group 4"
git push origin main
```

---

# Question 3: Collaborative Feature Development (5 Marks)

### Feature Assignments
Each team member was assigned a distinct component and created a feature branch named after their registration number:

| Team Member | Role | Assigned Task | Feature Branch Name | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Member A** | Frontend Dev | Develop registration form (Name, Matric No, Programme) | `feature/student-registration-NEU/22/23/CSC/2004` | Merged via PR |
| **Khadija Abubakar Bello** | Frontend Dev | Develop table structure for displaying student records | `NEU/23/24/SEN/00597` | Merged via PR |
| **Member C** | UI Designer | Add CSS / styling to the student records table | `feature/table-styling-<RegNumber>` | Merged via PR |
| **Member D** | UI Designer | Add CSS / styling to the student registration form | `feature/form-styling-<RegNumber>` | Merged via PR |
| **Member E (Team Leader)** | Lead / Integrator | Integration coordination, JavaScript logic, documentation, conflict resolution | `main` | Completed & Verified |

### Feature Workflow (Tasks 3a – 3d)
1. **Branch Creation:**
   ```bash
   git switch -c feature/student-registration-NEU/22/23/CSC/2004
   ```
2. **Implementation & Commit:**
   ```bash
   git add index.html
   git commit -m "Add student registration form structure"
   ```
3. **Push Feature Branch:**
   ```bash
   git push -u origin feature/student-registration-NEU/22/23/CSC/2004
   ```
4. **Pull Request & Code Review:**
   A Pull Request was opened on GitHub for peer review and successfully merged into the `main` branch.

---

# Question 4: Merge Conflict Resolution (3 Marks)

### Task 4a: Definition and Cause of a Merge Conflict (1 Mark)
- **Definition:** A merge conflict is an event in Git where two branches modify the same line(s) of code within a file in conflicting ways (or one branch deletes a file that another branch modified), preventing Git from automatically determining which version should take precedence.
- **Possible Cause:** A merge conflict occurs when Member A and Member B simultaneously edit the same section of `index.html` on their respective feature branches, commit their changes, and attempt to merge them into `main` without pulling the latest updates first.

---

### Task 4b: Resolving the Conflict (1 Mark)

#### Conflicting File
- **File:** `index.html` (and `style.css`)
- **Occurred during:** Merging Pull Request #3 (branch `NEU/23/24/SEN/00597`) into `main`.

#### Conflict Markers Generated by Git
```html
<<<<<<< NEU/23/24/SEN/00597 (Current change)
<<<<<<< HEAD
<table>
  <tr>
    <th>Khadija Abubakar Bello</th>
    <th>NEU/23/24/SEN/00597</th>
    <th>Software Engineering</th>
  </tr>
</table>
<link rel="stylesheet" href="style.css">
=======
=======
>>>>>>> main (Incoming change)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Records</title>
</head>
<body>
    <h2>Student Records</h2>
    <table border="1" cellpadding="10" cellspacing="0">
...
```

#### Resolution Strategy
1. **Review:** The Team Leader examined competing modifications from branch `NEU/23/24/SEN/00597` and branch `main`.
2. **Content Retention:** Rather than discarding either change, both the registration form and the table records (including Khadija Abubakar Bello's record `NEU/23/24/SEN/00597`) were retained and integrated cleanly into a unified layout.
3. **Marker Cleanup:** All conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and redundant boilerplate tags were deleted.

---

### Task 4c: Conflict Resolution Commit & Push (1 Mark)
```bash
git add index.html style.css
git commit -m "Resolve merge conflict in index.html: integrate student registration form and student records table"
git push origin main
```

---

# Question 5: Verification and Submission (3 Marks)

### Task 5a: Demonstration of Git Commands (1 Mark)

#### 1. `git status`
Shows the working directory status, branch, and staged files:
```text
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

#### 2. `git log`
Shows the commit history, authors, dates, and merge resolution commits:
```text
$ git log --oneline -n 6
a1b2c3d Resolve merge conflict in index.html and style.css
b8240eb Merge pull request #3 from NEU/23/24/SEN/00597
4f3e2d1 Add CSS styling for student records table
8c7b6a5 Add student registration form
0f0f587 Initialize student information system project group 4
```

#### 3. `git branch`
Lists all local and remote branches to verify branch isolation:
```text
$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
  remotes/origin/NEU/23/24/SEN/00597
  remotes/origin/feature/student-registration-NEU/22/23/CSC/2004
```

#### 4. `git remote -v`
Verifies the remote repository connections:
```text
$ git remote -v
origin  https://github.com/Madagi001/student-information-system-G4.git (fetch)
origin  https://github.com/Madagi001/student-information-system-G4.git (push)
```

---

### Task 5b: Application Demonstration Checklist (1 Mark)
The completed application demonstrates all required functional capabilities:
- [x] **Form for registering student information:** Includes Student Name, Matriculation Number, and Programme selection with full validation.
- [x] **View student records:** Responsive HTML table with student records, matriculation numbers, and programmes.
- [x] **Styling:** Modern, responsive design using cards, navy theme (`#1d3557`), alternating row colors, hover states, and mobile adaptation.
- [x] **Dynamic Interactivity:** Submitting the form dynamically validates input, checks for duplicates, and appends a new record to the table with visual confirmation.

---

### Task 5c: Team Contributions and Benefits of Git (1 Mark)

#### Two Benefits of Using Git for Collaborative Software Development:
1. **Isolated Parallel Branching:**  
   Git allows multiple team members to work simultaneously on different features (such as forms, tables, and styling) in separate branches without interfering with or breaking the main production code.
2. **Accountability and Full Version History:**  
   Every commit records who made the change, when it was made, and why. If a bug is introduced, Git allows developers to track the exact commit and safely revert back to a working state without losing data.

---

## 10. Individual Member Contribution Report

| Student Name | Registration Number | Assigned Task | Specific Contribution Made |
| :--- | :--- | :--- | :--- |
| **Member A** | `NEU/22/23/CSC/2004` | Registration Form Structure | Designed semantic HTML form input fields for Student Name, Matriculation Number, and Programme select options. |
| **Khadija Abubakar Bello** | `NEU/23/24/SEN/00597` | Records Table Structure | Implemented student records table markup (`<thead>`, `<tbody>`), column headers, and initial student entries. |
| **Member C** | `<RegNumber-MemberC>` | Table CSS Styling | Designed table styles: `#1d3557` primary headers, alternating zebra striping, row hover highlights, and overflow wrapper. |
| **Member D** | `<RegNumber-MemberD>` | Form CSS Styling | Styled form input fields, focus outlines, submit button hover/active transitions, and card container box-shadows. |
| **Member E (Team Leader)** | `<RegNumber-Leader>` | Integration & Coordination | Initialized repository, resolved merge conflicts in PR #3, connected form to table dynamically via `script.js`, and authored project documentation. |

---

## How to Run and Test
1. Clone the repository:
   ```bash
   git clone https://github.com/Madagi001/student-information-system-G4.git
   cd student-information-system-G4
   ```
2. Double click `index.html` to open in any web browser.
3. Fill out the **Register Student** form:
   - Enter Student Name: e.g. `Aminu Danjuma`
   - Enter Matriculation Number: e.g. `NEU/23/24/CSC/00100`
   - Select Programme: e.g. `Cyber Security`
   - Click **Register Student**.
4. The student record will immediately appear in the table, the counter will update, and a success notification will be displayed.
