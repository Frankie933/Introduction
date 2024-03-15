//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

import studentScore from '../model/studentScore.js';

class formStudent {

    //class contructor
    constructor() {
        this.studentName = document.querySelector('#studentName');
        this.studentBirthDate = document.querySelector('#studentBirthDate');
        this.studentEmail = document.querySelector('#studentEmail');
        this.studentScoreMin = document.querySelector('#studentScoreMin');
        this.studentScoreMax = document.querySelector('#studentScoreMax');
        this.studentScoreAvg = document.querySelector('#studentScoreAvg');
        this.studentScoreLast = document.querySelector('#studentScoreLast');
    }
    setFormData(student) {
        //save studentId so I can restore it
        this.studentId = student.studentId;

        studentName.value = `${student.firstName} ${student.lastName}`;
        studentBirthDate.value = toYMDFormat(student.birthDate);

        studentEmail.value = student.email;
        studentScoreMin.value = student.scores.min;
        studentScoreMax.value = student.scores.max;
        studentScoreAvg.value = student.scores.avg;
        studentScoreLast.value = student.scores.last;

        function toYMDFormat(dateString) {
            const date = new Date(Date.parse(dateString));

            // Ensure date numbers less than 10 are padded with an initial 0.
            const day = date.getDate().toString().padStart(2, '0');

            // Ensure months are 0-padded and add 1 to convert the month from its
            // 0-based JavaScript representation
            const month = (date.getMonth() + 1).toString().padStart(2, '0');

            // The year is always 4-digit
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        }
    }
    getFormData() {
        const fname = studentName.value.split(' ')[0].trim();
        const lname = studentName.value.split(' ')[1].trim();
        const student = new studentScore({ firstName: fname, lastName: lname, email: studentEmail.value, birthDate: fromYMDFormat(studentBirthDate.value) },
            {
                minScore: Number(studentScoreMin.value), maxScore: Number(studentScoreMax.value),
                avgScore: Number(studentScoreAvg.value), lastScore: Number(studentScoreLast.value)
            });
        
        //resture student ID
        student.studentId = this.studentId;
 
        return student;

        function fromYMDFormat(stringDate) {
            // Split on the slashes
            const dateArray = stringDate.split('-');

            // Find the individual date ingredients
            const year = dateArray[0];
            const month = dateArray[1];
            const day = dateArray[2];

            // Apply the correction for 0-based month numbering
            return new Date(year, month - 1, day).toDateString();
        }
    }
}

export default formStudent;