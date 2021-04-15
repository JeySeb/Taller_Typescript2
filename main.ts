import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!;
const studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxCi: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-ci")!;
const inputSearchBoxCf: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-cf")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

renderCoursesInTable(dataCourses);
renderDataStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderDataStudentInTable(student: Student[]): void {
  student.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.dato}</td>
                           <td>${c.value}</td>`;
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
function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
  }
   
   
    function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
  }

  function applyFilterByCredits() { 
    let valueInf = Number(inputSearchBoxCi.value).valueOf()
    let valueSup = Number(inputSearchBoxCf.value).valueOf();
    valueInf = (valueInf == null) ? 0 : valueInf;
    valueSup = (valueSup == null) ? 0 : valueSup;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByRangeOfCredits(valueInf,valueSup, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
  }

  function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
      }

      
  function searchCourseByRangeOfCredits(ci:number,cf:number,courses: Course[])
  {
    return (cf-ci< 0 || (cf===0  && ci===0) ) ? dataCourses : courses.filter( c => 
      c.credits>=ci && c.credits<=cf);
  }

    btnfilterByName.onclick = () => applyFilterByName();
    btnfilterByCredits.onclick = () => applyFilterByCredits();