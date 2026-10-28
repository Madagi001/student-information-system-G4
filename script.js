// Student Information Management System - Main Script
// Feature Member A: Student Registration Form Functionality

// Student Data Storage
let students = JSON.parse(localStorage.getItem('sims_students')) || [];

// DOM Elements
const studentForm = document.getElementById('student-form');

// Member A: Handle student registration submission
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

        // Validate required fields
        if (!name || !matric || !programme) {
            alert('Please fill in all required fields (Name, Matriculation Number, and Programme).');
            return;
        }

        // Check for duplicate matriculation number
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
            registeredAt: new Date().toLocaleDateString()
        };

        students.push(newStudent);
        localStorage.setItem('sims_students', JSON.stringify(students));

        alert(`Student "${name}" successfully registered!`);
        studentForm.reset();

        // If table rendering function exists (from Member B), invoke it
        if (typeof renderStudentTable === 'function') {
            renderStudentTable();
        }
    });
}
