courses=JSON.parse(localStorage.getItem("database"))
activeCourse=null


function createCourses() {
    cont = document.getElementById("course-list");
    for (cou_name in courses) {

        course = document.createElement("span");
        course.textContent = cou_name;

        course.setAttribute("onclick", `createChapter('${cou_name}')`);
        cont.append(course);
    }

};

function createChapter(coursename) {
    activeCourse=coursename
  
    changeCourse()
    chapterList = courses[coursename];

    ch_cont = document.getElementById("chapter-list");
    ch_cont.innerHTML = '';
    for (chap in chapterList) {


        chapter = document.createElement("span");
        chapter.textContent = chap;
        chapter.setAttribute("onclick", `createPreview("${courses[coursename][chap]}")`);
        chapter.setAttribute("ondblclick","preview.requestFullscreen()");
       
        ch_cont.append(chapter);
    }



};



function createPreview(source) {

    frm = document.getElementById("preview");
    frm.setAttribute("src", source);

};
function changeCourse(){
    document.getElementById('courseName').textContent=activeCourse
}

$(document).ready(function () {
    createCourses()

});




