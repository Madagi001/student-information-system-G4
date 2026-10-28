/**
 * Student Information Management System (SIMS)
 * Software Configuration & Management - Lab Test 1
 * Team Leader Integration & Feature Polishing
 */

// Initial Seed Data for immediate testing and grading demonstration
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

// Initialize State from LocalStorage
function getStoredStudents() {
    const data = localStorage.getItem('sims_students');
    if (!data) {
        localStorage.setItem('sims_students', JSON.stringify(DEFAULT_STUDENTS));
        return [...DEFAULT_STUDENTS];
    }
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [...DEFAULT_STUDENTS];
    } catch (e) {
        return [...DEFAULT_STUDENTS];
    }
}

let students = getStoredStudents();

// DOM Cache
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('students-table-body');
const studentCountElement = document.getElementById('student-count');
const noRecordsMessage = document.getElementById('no-records-message');
const searchInput = document.getElementById('searchInput');
const filterProgramme = document.getElementById('filterProgramme');
const btnExportCsv = document.getElementById('btn-export-csv');
const btnSeedData = document.getElementById('btn-seed-data');

// Modal Elements
const modal = document.getElementById('student-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const modalOkBtn = document.getElementById('modal-ok-btn');

// Toast Notification Helper
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✅';
    if (type === 'danger') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Badge CSS Class Resolver
function getBadgeClass(programme) {
    if (!programme) return 'badge-default';
    if (programme.includes('Computer Science')) return 'badge-cs';
    if (programme.includes('Software Engineering')) return 'badge-se';
    if (programme.includes('Cybersecurity')) return 'badge-cy';
    if (programme.includes('Information Technology')) return 'badge-it';
    if (programme.includes('Data Science')) return 'badge-ds';
    return 'badge-default';
}

// Update Dashboard Statistics Cards
function updateDashboardStats() {
    const totalElem = document.getElementById('stat-total-students');
    const progElem = document.getElementById('stat-total-programmes');
    const latestElem = document.getElementById('stat-latest-student');

    if (totalElem) totalElem.textContent = students.length;

    if (progElem) {
        const uniqueProgrammes = new Set(students.map(s => s.programme));
        progElem.textContent = uniqueProgrammes.size;
    }

    if (latestElem) {
        if (students.length > 0) {
            latestElem.textContent = students[0].name;
            latestElem.title = `${students[0].name} (${students[0].matric})`;
        } else {
            latestElem.textContent = 'None';
        }
    }
}

// Filter and Render Students in Table
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
        updateDashboardStats();
        return;
    }

    if (noRecordsMessage) noRecordsMessage.style.display = 'none';
    if (studentCountElement) studentCountElement.textContent = filtered.length;

    filtered.forEach((student, index) => {
        const row = document.createElement('tr');
        const badgeClass = getBadgeClass(student.programme);

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(student.name)}</strong></td>
            <td><code>${escapeHtml(student.matric)}</code></td>
            <td><span class="badge ${badgeClass}">${escapeHtml(student.programme)}</span></td>
            <td>${escapeHtml(student.level || '300 Level')}</td>
            <td>${escapeHtml(student.registeredAt || 'N/A')}</td>
            <td class="action-cell">
                <button class="btn btn-sm btn-view" onclick="viewStudentDetails(${student.id})">View</button>
                <button class="btn btn-sm btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateDashboardStats();
}

// View Student Profile in Modal
function viewStudentDetails(id) {
    const student = students.find(s => s.id === id);
    if (!student || !modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="modal-profile-row">
            <span class="label">Full Name:</span>
            <span class="val">${escapeHtml(student.name)}</span>
        </div>
        <div class="modal-profile-row">
            <span class="label">Matriculation Number:</span>
            <span class="val"><code>${escapeHtml(student.matric)}</code></span>
        </div>
        <div class="modal-profile-row">
            <span class="label">Academic Programme:</span>
            <span class="val">${escapeHtml(student.programme)}</span>
        </div>
        <div class="modal-profile-row">
            <span class="label">Level of Study:</span>
            <span class="val">${escapeHtml(student.level || '300 Level')}</span>
        </div>
        <div class="modal-profile-row">
            <span class="label">Student Email:</span>
            <span class="val">${escapeHtml(student.email || 'None Provided')}</span>
        </div>
        <div class="modal-profile-row">
            <span class="label">Registration Date:</span>
            <span class="val">${escapeHtml(student.registeredAt || 'N/A')}</span>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
}

// Delete Student Record with Confirmation
function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    if (confirm(`Are you sure you want to delete student "${student.name}" (${student.matric})?`)) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('sims_students', JSON.stringify(students));
        showToast(`Record for ${student.name} deleted successfully!`, 'danger');
        renderStudentTable();
    }
}

// Export Records to CSV (Question 4 integration feature)
function exportToCSV() {
    if (students.length === 0) {
        showToast('No records available to export!', 'warning');
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

    showToast('Student records exported to CSV successfully!', 'success');
}

// Reset Sample Data
function resetSampleData() {
    if (confirm('Reset records back to default sample dataset?')) {
        students = [...DEFAULT_STUDENTS];
        localStorage.setItem('sims_students', JSON.stringify(students));
        showToast('Sample dataset restored successfully!', 'success');
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

// Form Submission (Member A & Member D)
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
            showToast('Please fill all mandatory fields marked with *', 'danger');
            return;
        }

        // Duplicate Check
        const isDuplicate = students.some(s => s.matric.toUpperCase() === matric);
        if (isDuplicate) {
            showToast(`Error: Matric Number "${matric}" already exists!`, 'danger');
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

        // Add to top of list
        students.unshift(newStudent);
        localStorage.setItem('sims_students', JSON.stringify(students));

        showToast(`Student "${name}" registered successfully!`, 'success');
        studentForm.reset();
        renderStudentTable();
    });
}

// Event Listeners for Filters, Search, Modal, and Exports
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

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
    renderStudentTable();
});
