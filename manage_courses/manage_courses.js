// "courses" ek object hai jo ki database ki tarah kaam krta hai is andar
//  objects stored hote hai jiske key chapter ka naam hota hai aur value chapter ka link
courses = JSON.parse(localStorage.getItem("database"))

Active_course_name = ""


// ye function program ka entry point hai ye ek baar run hoag aur database(courses-object)
//  me jitne courses honge unke naame course container me display karega
function createCourses() {

    for (cou_name in courses) {
        container = appendCourseList(cou_name)
    }
};

function appendCourseList(cou_name) {
    co_cont = document.getElementById("course-list");
    id = cou_name
    // pahla element-parent element
    container = document.createElement("div")
    container.setAttribute("id", id)
    
    // pehla child element
    course = document.createElement("span");
    course.textContent = cou_name;
    course.setAttribute("onclick", `createChapter('${cou_name}')`);

    // dusra child element
    rm_btn = createRemoveCourse(cou_name, id)

    container.append(course);
    container.append(rm_btn);
    co_cont.append(container);

};

function createChapter(coursename) {
    Active_course_name = coursename

    chapterList = courses[coursename];

    ch_cont_head = document.getElementById("ch-container-heading");
    ch_cont_head.textContent = Active_course_name;

    ch_cont = document.getElementById("chapter-list");
    ch_cont.innerHTML = '';
    for (chap in chapterList) {
        id = coursename + chap
        container = document.createElement("div")
        container.setAttribute("id", id)

        chapter = createInputTag(chap, isLink = false)
        link = createInputTag(courses[coursename][chap], isLink = true)
        rm_btn = createRemoveChapter(coursename, chap, id)

        container.append(chapter);
        container.append(link);
        container.append(rm_btn);
        ch_cont.append(container)
    }




};
function createInputTag(value, isLink) {
    tag = document.createElement("input")
    tag.setAttribute("value", value)
    if (isLink) {
        tag.setAttribute("class", "link-input")
    }
    return tag
}
function createRemoveChapter(coursename, chap, id) {
    rm_btn = document.createElement('button')
    rm_btn.textContent = "Remove"
    rm_btn.setAttribute("onclick", `removeChapter('${coursename}','${chap}','${id}')`)
    rm_btn.setAttribute("type", "button")
    rm_btn.setAttribute("class", "button")
    return rm_btn

}
function createRemoveCourse(coursename, id) {
    rm_btn = document.createElement('button')
    rm_btn.textContent = "Remove"
    rm_btn.setAttribute("onclick", `removeCourse('${coursename}','${id}')`)
    rm_btn.setAttribute("type", "button")
    rm_btn.setAttribute("class", "button")
    return rm_btn

}
function addChapter() {

    ch_cont = document.getElementById("chapter-list");
    container = document.createElement("div")
    chapter = createInputTag("No_name", false);

    link = createInputTag("No_link", true);

    container.append(chapter);
    container.append(link);
    ch_cont.append(container);

};

function removeChapter(course, chapter, id) {
    delete courses[course][chapter]
    if (document.getElementById(id)) {
        document.getElementById(id).remove()
    }
};
function addCourse() {

    co_cont = document.getElementById("course-container")
    add_section = document.createElement("div")
    add_section.setAttribute('id', "add-course-section")
    input_tag = document.createElement("input")
    input_tag.setAttribute("id", "add-course-input")

    add_btn = document.createElement("button")
    add_btn.textContent = "Add"
    add_btn.setAttribute("type", "button")
    add_btn.setAttribute("class", "button")
    add_btn.setAttribute("onclick", "addNewCourse()")
    add_section.append(input_tag)
    add_section.append(add_btn)
    co_cont.append(add_section)
    disableButton(".add_button")

}
function addNewCourse() {
    input_tag = document.getElementById("add-course-input");
    new_cou_name = input_tag.value;
    
    if (isValidString(new_cou_name)) {
        if (courses[new_cou_name]){
        alert("Course Alredy Exists")
        return
        }

        document.getElementById('add-course-section').remove();
        courses[new_cou_name] = { "no_chapters": "add_link" };
        appendCourseList(new_cou_name);
        update()
    }
    else {
        alert("Please Enter a VALID name with minimum one characters!!!")

    };
    enableButton(".add_button")


};
function removeCourse(course, id) {
    delete courses[course]
    if (document.getElementById(id)) {
        document.getElementById(id).remove()
        document.getElementById("chapter-list").innerHTML = ""
    }
};
function save() {
    courses[Active_course_name]={}
    chapter_list = document.getElementById("chapter-list").children
    for (let i = 0; i < chapter_list.length; i++) {
        
        chapter_name = chapter_list[i].children[0].value
        chapter_link = chapter_list[i].children[1].value
        courses[Active_course_name][chapter_name] = chapter_link
    }

    update()
    alert("Courses Saved Successfully...")

};
function disableButton(id){
    document.querySelector(id).disabled=true
   
}
function enableButton(id){
    document.querySelector(id).disabled=false
    
}


function update() {

    localStorage.setItem("database", JSON.stringify(courses))

};
function isValidString(string) {
    return (string.length > 0) ? true : false;
}



createCourses()

