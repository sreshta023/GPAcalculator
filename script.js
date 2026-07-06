let subjects=[];

function addSubject(){

    let name=document.getElementById("subject").value;

    let credits=parseFloat(document.getElementById("credits").value);

    let grade=parseFloat(document.getElementById("grade").value);

    if(name=="" || isNaN(credits)){
        alert("Enter valid details");
        return;
    }

    subjects.push({
        name,
        credits,
        grade
    });

    displaySubjects();

    document.getElementById("subject").value="";
    document.getElementById("credits").value="";
}

function displaySubjects(){

    let body=document.getElementById("tableBody");

    body.innerHTML="";

    subjects.forEach(sub=>{

        body.innerHTML+=`
        <tr>
        <td>${sub.name}</td>
        <td>${sub.credits}</td>
        <td>${sub.grade}</td>
        </tr>
        `;
    });

}

function calculateGPA(){

    let totalCredits=0;
    let totalPoints=0;

    subjects.forEach(sub=>{

        totalCredits+=sub.credits;

        totalPoints+=sub.credits*sub.grade;

    });

    let gpa=totalPoints/totalCredits;

    document.getElementById("gpa").innerText=gpa.toFixed(2);

}

function calculateCGPA(){

    calculateGPA();

    let semesterGPA=parseFloat(document.getElementById("gpa").innerText);

    let previousCredits=parseFloat(document.getElementById("previousCredits").value)||0;

    let previousCGPA=parseFloat(document.getElementById("previousCGPA").value)||0;

    let currentCredits=0;

    subjects.forEach(sub=>{
        currentCredits+=sub.credits;
    });

    let cgpa=((previousCGPA*previousCredits)+(semesterGPA*currentCredits))/(previousCredits+currentCredits);

    document.getElementById("cgpa").innerText=cgpa.toFixed(2);

}

function predictCGPA(){

    let currentCGPA=parseFloat(document.getElementById("cgpa").innerText);

    let previousCredits=parseFloat(document.getElementById("previousCredits").value)||0;

    let currentCredits=0;

    subjects.forEach(sub=>{
        currentCredits+=sub.credits;
    });

    let futureCredits=parseFloat(document.getElementById("futureCredits").value);

    let futureGrade=parseFloat(document.getElementById("futureGrade").value);

    let totalCredits=previousCredits+currentCredits;

    let predicted=((currentCGPA*totalCredits)+(futureGrade*futureCredits))/(totalCredits+futureCredits);

    document.getElementById("prediction").innerText=predicted.toFixed(2);

}