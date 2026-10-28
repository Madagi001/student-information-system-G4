// Student Information Management System - Main Script
// Feature Member A & Member B Integration

// Student Data Storage - with default sample records for immediate testing
const defaultSeedRecords = [
    {
        id: 1,
        name: "Amina Bello Yusuf",
        matric: "NEU/22/23/CSC/2004",
        programme: "B.Sc. Computer Science",
        level: "300 Level",
        email: "amina.yusuf@student.neu.edu.ng",
        registeredAt: "2026-10-15"
    },
    {
        id: 2,
        name: "Bilal Umar Ibrahim",
        matric: "NEU/22/23/CSC/2005",
        programme: "B.Sc. Software Engineering",
        level: "300 Level",
        email: "bilal.ibrahim@student.neu.edu.ng",
        registeredAt: "2026-10-18"
    },
    {
        id: 3,
        name: "Chidera Emmanuel Okonkwo",
        matric: "NEU/22/23/CSC/2006",
        programme: "B.Sc. Cybersecurity",
        level: "300 Level",
        email: "chidera.okonkwo@student.neu.edu.ng",
        registeredAt: "2026-10-20"
    }
];

let students = JSON.parse(localStorage.getItem('sims_students')) || defaultSeedRecords;
localStorage.setItem('sims_students', JSON.stringify(students));

// DOM Elements
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('students-table-body');
const studentCountElement = document.getElementById('student-count');
const noRecordsMessage = document.getElementById('no-records-message');

// Member B: Render Student Records Table
function renderStudentTable(recordList = students) {
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (recordList.length === 0) {
        if (noRecordsMessage) noRecordsMessage.style.display = 'block';
        if (studentCountElement) studentCountElement.textContent = '0';
        return;
    }

    if (noRecordsMessage) noRecordsMessage.style.display = 'none';
    if (studentCountElement) studentCountElement.textContent = recordList.length;

    recordList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(student.name)}</strong></td>
            <td><code>${escapeHtml(student.matric)}</code></td>
            <td><span class="badge badge-programme">${escapeHtml(student.programme)}</span></td>
            <td>${escapeHtml(student.level || '300 Level')}</td>
            <td>${escapeHtml(student.registeredAt || 'N/A')}</td>
            <td class="action-cell">
                <button class="btn btn-sm btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Member B: Delete Student Record
function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    const studentName = student ? student.name : 'this record';

    if (confirm(`Are you sure you want to delete ${studentName}?`)) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('sims_students', JSON.stringify(students));
        renderStudentTable();
    }
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Member A: Form Submission Handler
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

        if (!name || !matric || !programme) {
            alert('Please fill in all required fields (Name, Matriculation Number, and Programme).');
            return;
        }

        const duplicate = students.some(s => s.matric.toUpperCase() === matric);
        if (duplicate) {
            alert(`A student with matriculation number ${matric} is already registered!`);
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

        alert(`Student "${name}" successfully registered!`);
        studentForm.reset();
        renderStudentTable();
    });
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderStudentTable();
});
