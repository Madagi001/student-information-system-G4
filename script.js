// ========================================================
// Student Information Management System - Main Script
// Feature Integration (Member E - Team Leader)
// Handles dynamic student registration and record display
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form") || document.getElementById("registrationForm");
    const studentNameInput = document.getElementById("student-name") || document.getElementById("studentName");
    const matricNumberInput = document.getElementById("matric-number") || document.getElementById("matricNumber");
    const programmeSelect = document.getElementById("programme");
    const tableBody = document.getElementById("student-table-body");
    const feedbackBox = document.getElementById("feedback");
    const recordCountBadge = document.getElementById("record-count");

    if (!studentForm || !tableBody) return;

    // Helper: Update record count badge
    function updateRecordCount() {
        if (!recordCountBadge) return;
        const count = tableBody.querySelectorAll("tr").length;
        recordCountBadge.textContent = `${count} Student${count === 1 ? "" : "s"} Registered`;
    }

    // Helper: Show status message
    function showFeedback(message, type = "success") {
        if (!feedbackBox) return;
        feedbackBox.textContent = message;
        feedbackBox.className = `feedback-message ${type}`;
        feedbackBox.style.display = "block";

        setTimeout(() => {
            feedbackBox.style.display = "none";
        }, 4000);
    }

    // Handle student registration form submission
    studentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const studentName = studentNameInput ? studentNameInput.value.trim() : "";
        const matricNumber = matricNumberInput ? matricNumberInput.value.trim().toUpperCase() : "";
        const programme = programmeSelect ? programmeSelect.value.trim() : "";

        // Validation
        if (!studentName || !matricNumber || !programme) {
            showFeedback("Please fill out all required fields (*).", "error");
            return;
        }

        // Check for duplicate matriculation number
        const existingRows = tableBody.querySelectorAll("tr");
        for (let row of existingRows) {
            const existingMatric = row.children[2]?.textContent.trim().toUpperCase();
            if (existingMatric === matricNumber) {
                showFeedback(`A student with matriculation number ${matricNumber} already exists.`, "error");
                matricNumberInput.focus();
                return;
            }
        }

        // Create new table row
        const newRowIndex = existingRows.length + 1;
        const newRow = document.createElement("tr");
        newRow.classList.add("row-new");

        newRow.innerHTML = `
            <td>${newRowIndex}</td>
            <td>${studentName}</td>
            <td>${matricNumber}</td>
            <td>${programme}</td>
        `;

        tableBody.appendChild(newRow);

        // Reset form and update metrics
        studentForm.reset();
        if (programmeSelect.tagName === "SELECT") {
            programmeSelect.selectedIndex = 0;
        }
        updateRecordCount();
        showFeedback(`Student "${studentName}" registered successfully!`, "success");
    });

    // Initialize initial count
    updateRecordCount();
});
