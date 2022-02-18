
import navbar from "./components/navbar.js"

let navBar=document.getElementById("navBar");

navBar.innerHTML=navbar();












let api_key = "AIzaSyBRzDYTQZuKHLJgfP_AW0ljG9pX7Kdm1xs";
let url = `https://www.googleapis.com/youtube/v3/videos/?part=snippet&chart=mostPopular&regionCode=IN&maxResults=48&key=${api_key}`;

// let searchResults = document.getElementById("searchResults");


async function searchVideoo() {
    try {
        let userInput = document.getElementById("search").value;

        console.log(userInput)
        // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${userInput}&type=video&key=${api_key}`);

        // let data= await res.json();

        // console.log(data)
    } catch (err) {
        console.log(err);
    }
}


// showing most popular videos

showData();

async function showData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        showVideos(data.items)

    } catch (err) {
        console.log(err)
    }
}
let rightSide = document.getElementById("rightSide")
let showVideos = (data) => {
    console.log(data)
    rightSide.innerHTML = "";
    data.map((el) => {
        let mainDiv = document.createElement("div");

        let img = document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;

        let titleDiv = document.createElement("div");

        let title = document.createElement("p");
        title.textContent = el.snippet.title;

        let channelName = document.createElement("p");
        channelName.setAttribute("id", "channelName")
        channelName.textContent = el.snippet.channelTitle;

        titleDiv.append(title, channelName);

        mainDiv.append(img, titleDiv);
        rightSide.append(mainDiv)

        mainDiv.addEventListener("click",function(){
            showVid(data,el)
        })




    })
}

function showVid(data,el){
    console.log(el)
    localStorage.setItem("video",JSON.stringify(el));
    localStorage.setItem("allVid",JSON.stringify(data));
    window.location.href="showvideo.html"
     
}