class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addStudent(student) {
        const existingStudent = this.students.find(s => s.id === student.id);
        if (existingStudent) {
            alert("Student ID đã tồn tại. Vui lòng chọn ID khác.");
            return false;
        }
        this.students.push(student);
        this.save();
        return true;
    }

    updateStudent(updatedStudent) {
        this.students = this.students.map(student => 
            student.id === updatedStudent.id ? updatedStudent : student
        );
        this.save();
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.save();
    }

    save() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    getAllStudents() {
        return this.students;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const studentManager = new StudentManager();

    const studentForm = document.getElementById('studentForm');
    const studentIdField = document.getElementById('studentId');
    const nameField = document.getElementById('name');
    const genderField = document.getElementById('gender');
    const dobField = document.getElementById('dob');
    const hometownField = document.getElementById('hometown');
    const studentsList = document.getElementById('studentsList');

    function renderStudents() {
        studentsList.innerHTML = '';
        const students = studentManager.getAllStudents();
        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button class="edit" onclick="editStudent('${student.id}')">Sửa</button>
                    <button class="delete" onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            `;
            studentsList.appendChild(tr);
        });
    }

    window.editStudent = function(id) {
        const student = studentManager.getAllStudents().find(student => student.id === id);
        studentIdField.value = student.id;
        studentIdField.disabled = true; 
        nameField.value = student.name;
        genderField.value = student.gender;
        dobField.value = student.dob;
        hometownField.value = student.hometown;
    };

    window.deleteStudent = function(id) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            studentManager.deleteStudent(id);
            renderStudents();
        }
    };

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = studentIdField.value.trim();
        const name = nameField.value.trim();
        const gender = genderField.value.trim();
        const dob = dobField.value.trim();
        const hometown = hometownField.value.trim();

        const student = new Student(id, name, gender, dob, hometown);

        if (studentIdField.disabled) { 
            studentManager.updateStudent(student);
            alert('Thông tin sinh viên đã được cập nhật thành công!');
            studentIdField.disabled = false; 
        } else {
            if (studentManager.addStudent(student)) { 
                alert('Sinh viên đã được thêm thành công!');
            }
        }

        
        studentForm.reset();
        renderStudents();
    });

    renderStudents();
});
