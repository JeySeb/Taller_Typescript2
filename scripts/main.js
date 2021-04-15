import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxCi = document.getElementById("search-box-ci");
var inputSearchBoxCf = document.getElementById("search-box-cf");
var totalCreditElm = document.getElementById("total-credits");
renderCoursesInTable(dataCourses);
renderDataStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderDataStudentInTable(student) {
    student.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.dato + "</td>\n                           <td>" + c.value + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function applyFilterByCredits() {
    var valueInf = Number(inputSearchBoxCi.value).valueOf();
    var valueSup = Number(inputSearchBoxCf.value).valueOf();
    valueInf = (valueInf == null) ? 0 : valueInf;
    valueSup = (valueSup == null) ? 0 : valueSup;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRangeOfCredits(valueInf, valueSup, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByRangeOfCredits(ci, cf, courses) {
    return (cf - ci < 0 || (cf === 0 && ci === 0)) ? dataCourses : courses.filter(function (c) {
        return c.credits >= ci && c.credits <= cf;
    });
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
