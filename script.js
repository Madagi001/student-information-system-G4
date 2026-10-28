/**
 * Student Information Management System (SIMS)
 * Standard Production Logic & Data Management
 * Department of Computer Science &bull; SCM Lab Test 1
 */

// Default Seed Records
const DEFAULT_STUDENTS = [
    {
        id: 1729000001,
        name: "Amina Bello Yusuf",
        matric: "NEU/22/23/CSC/2004",
        programme: "B.Sc. Computer Science",
        level: "300 Level",
        email: "amina.yusuf@student.neu.edu.ng",
        registeredAt: "2026-10-15"
    },
    {
        id: 1729000002,
        name: "Bilal Umar Ibrahim",
        matric: "NEU/22/23/CSC/2005",
        programme: "B.Sc. Software Engineering",
        level: "300 Level",
        email: "bilal.ibrahim@student.neu.edu.ng",
        registeredAt: "2026-10-18"
    },
    {
        id: 1729000003,
        name: "Chidera Emmanuel Okonkwo",
        matric: "NEU/22/23/CSC/2006",
        programme: "B.Sc. Cybersecurity",
        level: "300 Level",
        email: "chidera.okonkwo@student.neu.edu.ng",
        registeredAt: "2026-10-20"
    },
    {
        id: 1729000004,
        name: "Dauda Sani Mohammed",
        matric: "NEU/22/23/CSC/2007",
        programme: "B.Sc. Information Technology",
        level: "400 Level",
        email: "dauda.mohammed@student.neu.edu.ng",
        registeredAt: "2026-10-22"
    },
    {
        id: 1729000005,
        name: "Abubakar Adamu Madagi",
        matric: "NEU/22/23/CSC/2001",
        programme: "B.Sc. Computer Science",
        level: "400 Level",
        email: "abubakaradamumadagi001@gmail.com",
        registeredAt: "2026-10-25"
    }
];

// Load Students from Local Storage
function getInitialData() {
    const stored = localStorage.getItem('sims_students');
    if (!stored) {
        localStorage.setItem('sims_students', JSON.stringify(DEFAULT_STUDENTS));
        return [...DEFAULT_STUDENTS];
    }
    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [...DEFAULT_STUDENTS];
    } catch (e) {
        return [...DEFAULT_STUDENTS];
    }
}

let students = getInitialData();

// DOM References
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('students-table-body');
const studentCountElement = document.getElementById('student-count');
const noRecordsMessage = document.getElementById('no-records-message');
const searchInput = document.getElementById('searchInput');
const filterProgramme = document.getElementById('filterProgramme');
const btnExportCsv = document.getElementById('btn-export-csv');
const btnSeedData = document.getElementById('btn-seed-data');

// Modal References
const modal = document.getElementById('student-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const modalOkBtn = document.getElementById('modal-ok-btn');

// Alert Notice Helper
function showAlert(message, isDanger = false) {
    const container = document.getElementById('alert-container');
    if (!container) return;

    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${isDanger ? 'alert-danger' : ''}`;
    alertItem.textContent = message;

    container.appendChild(alertItem);

    setTimeout(() => {
        alertItem.style.opacity = '0';
        alertItem.style.transition = 'opacity 0.25s ease';
        setTimeout(() => alertItem.remove(), 250);
    }, 3200);
}

// Update KPI Metrics
function updateMetrics() {
    const totalElem = document.getElementById('metric-total');
    const progElem = document.getElementById('metric-programmes');
    const latestElem = document.getElementById('metric-latest');

    if (totalElem) totalElem.textContent = students.length;

    if (progElem) {
        const uniqueProgrammes = new Set(students.map(s => s.programme));
        progElem.textContent = uniqueProgrammes.size;
    }

    if (latestElem) {
        if (students.length > 0) {
            latestElem.textContent = students[0].matric;
            latestElem.title = `${students[0].name} (${students[0].matric})`;
        } else {
            latestElem.textContent = 'None';
        }
    }
}

// Filter and Render Table Records
function renderStudentTable() {
    if (!tableBody) return;

    const searchQuery = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const selectedProgramme = filterProgramme ? filterProgramme.value : 'ALL';

    const filtered = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery) ||
            student.matric.toLowerCase().includes(searchQuery) ||
            (student.programme && student.programme.toLowerCase().includes(searchQuery)) ||
            (student.email && student.email.toLowerCase().includes(searchQuery));

        const matchesProgramme = (selectedProgramme === 'ALL') || (student.programme === selectedProgramme);

        return matchesSearch && matchesProgramme;
    });

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        if (noRecordsMessage) noRecordsMessage.style.display = 'block';
        if (studentCountElement) studentCountElement.textContent = '0';
        updateMetrics();
        return;
    }

    if (noRecordsMessage) noRecordsMessage.style.display = 'none';
    if (studentCountElement) studentCountElement.textContent = filtered.length;

    filtered.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color: var(--text-muted);">${index + 1}</td>
            <td><strong>${escapeHtml(student.name)}</strong></td>
            <td><code>${escapeHtml(student.matric)}</code></td>
            <td><span class="badge-tag">${escapeHtml(student.programme)}</span></td>
            <td>${escapeHtml(student.level || '300 Level')}</td>
            <td>${escapeHtml(student.registeredAt || 'N/A')}</td>
            <td style="text-align: right;">
                <div class="row-actions">
                    <button type="button" class="btn-link" onclick="viewStudentDetails(${student.id})">View</button>
                    <button type="button" class="btn-link btn-link-danger" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateMetrics();
}

// View Record Profile in Modal
function viewStudentDetails(id) {
    const student = students.find(s => s.id === id);
    if (!student || !modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="profile-field">
            <span class="k">Full Name</span>
            <span class="v">${escapeHtml(student.name)}</span>
        </div>
        <div class="profile-field">
            <span class="k">Matriculation Number</span>
            <span class="v"><code>${escapeHtml(student.matric)}</code></span>
        </div>
        <div class="profile-field">
            <span class="k">Academic Programme</span>
            <span class="v">${escapeHtml(student.programme)}</span>
        </div>
        <div class="profile-field">
            <span class="k">Study Level</span>
            <span class="v">${escapeHtml(student.level || '300 Level')}</span>
        </div>
        <div class="profile-field">
            <span class="k">Institutional Email</span>
            <span class="v">${escapeHtml(student.email || 'None Provided')}</span>
        </div>
        <div class="profile-field">
            <span class="k">Registration Date</span>
            <span class="v">${escapeHtml(student.registeredAt || 'N/A')}</span>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
}

// Delete Record
function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    if (confirm(`Confirm deletion of record for ${student.name} (${student.matric})?`)) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('sims_students', JSON.stringify(students));
        showAlert(`Record for ${student.matric} removed.`, true);
        renderStudentTable();
    }
}

// Export Records to CSV
function exportToCSV() {
    if (students.length === 0) {
        showAlert('No records available to export.', true);
        return;
    }

    const headers = ['ID', 'Full Name', 'Matriculation Number', 'Programme', 'Level', 'Email', 'Registration Date'];
    const rows = students.map(s => [
        s.id,
        `"${s.name.replace(/"/g, '""')}"`,
        `"${s.matric.replace(/"/g, '""')}"`,
        `"${s.programme.replace(/"/g, '""')}"`,
        `"${(s.level || '').replace(/"/g, '""')}"`,
        `"${(s.email || '').replace(/"/g, '""')}"`,
        `"${s.registeredAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAlert('Student records exported to CSV.');
}

// Reset Default Data
function resetSampleData() {
    if (confirm('Restore default dataset? Any custom additions will be reset.')) {
        students = [...DEFAULT_STUDENTS];
        localStorage.setItem('sims_students', JSON.stringify(students));
        showAlert('Default dataset restored.');
        renderStudentTable();
    }
}

// Helper: Escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Form Submission (Member A & D)
if (studentForm) {
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('studentName');
        const matricInput = document.getElementById('matricNumber');
        const programmeInput = document.getElementById('programme');
        const levelInput = document.getElementById('level');
        const emailInput = document.getElementById('email');

        const name = nameInput.value.trim();
        const matric = matricInput.value.trim().toUpperCase();
        const programme = programmeInput.value;
        const level = levelInput ? levelInput.value : '300 Level';
        const email = emailInput ? emailInput.value.trim() : '';

        // Validation
        if (!name || !matric || !programme) {
            showAlert('Please complete all required fields.', true);
            return;
        }

        // Duplicate Check
        const isDuplicate = students.some(s => s.matric.toUpperCase() === matric);
        if (isDuplicate) {
            showAlert(`Matriculation number "${matric}" is already registered.`, true);
            matricInput.focus();
            return;
        }

        const newStudent = {
            id: Date.now(),
            name: name,
            matric: matric,
            programme: programme,
            level: level,
            email: email,
            registeredAt: new Date().toISOString().split('T')[0]
        };

        students.unshift(newStudent);
        localStorage.setItem('sims_students', JSON.stringify(students));

        showAlert(`Student "${name}" registered successfully.`);
        studentForm.reset();
        renderStudentTable();
    });
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('input', renderStudentTable);
}

if (filterProgramme) {
    filterProgramme.addEventListener('change', renderStudentTable);
}

if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportToCSV);
}

if (btnSeedData) {
    btnSeedData.addEventListener('click', resetSampleData);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOkBtn) {
    modalOkBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    renderStudentTable();
});
