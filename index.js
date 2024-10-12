document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("student-form");
    const tableBody = document.querySelector("#student-table tbody");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Display existing students
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });

    // Add student functionality
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let student = {
            name: document.getElementById("studentName").value.trim(),
            id: document.getElementById("studentID").value.trim(),
            email: document.getElementById("email").value.trim(),
            contact: document.getElementById("contact").value.trim()
        };

        if (!validateStudent(student)) {
            alert("Please provide valid details.");
            return;
        }

        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));

        addStudentToTable(student, students.length - 1);
        form.reset();
    });

    // Edit or delete student functionality
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            editStudent(e.target.dataset.index);
        } else if (e.target.classList.contains("delete")) {
            deleteStudent(e.target.dataset.index);
        }
    });

    // Add student to table
    function addStudentToTable(student, index) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    // Edit student
    function editStudent(index) {
        let student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        tableBody.innerHTML = "";
        students.forEach((student, idx) => addStudentToTable(student, idx));
    }

    // Delete student
    function deleteStudent(index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        tableBody.innerHTML = "";
        students.forEach((student, idx) => addStudentToTable(student, idx));
    }

    // Validate inputs
    function validateStudent(student) {
        const nameRegex = /^[a-zA-Z ]+$/;
        const idRegex = /^[0-9]+$/;
        const contactRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return (
            nameRegex.test(student.name) &&
            idRegex.test(student.id) &&
            contactRegex.test(student.contact) &&
            emailRegex.test(student.email)
        );
    }
});
