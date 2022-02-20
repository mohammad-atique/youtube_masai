import navbar from "./components/navbar.js";

let navBar=document.getElementById("navBar");

navBar.innerHTML=navbar();


let api_key = "AIzaSyAuGOFHhqxN6Er-6PviJHJCFuCRHbIB3hU";


let video= JSON.parse(localStorage.getItem("video"));

let allVid = JSON.parse(localStorage.getItem("allVid"));

displayVid(video,allVid);

async function displayVid(video,allVid){
    let iframe=document.querySelector("iframe");

    let videoid;
  if (video.id.videoId) {
    videoid = video.id.videoId;
  } else {
    videoid = video.id;
  }
    

    iframe.src= `https://www.youtube.com/embed/${videoid}`;

    let title=document.getElementById("title");

    title.innerText=video.snippet.title;


    // console.log(video);

    let profile=`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoid}&key=${api_key}`
    
    let p= await fetch(profile);

    let data= await p.json();

    // console.log(data)
    let viewsLikes=document.getElementById("views_like");

    let views=document.createElement("div");

    views.textContent=`${data.items[0].statistics.viewCount} views`;

    let divv=document.createElement("div")
    let like=document.createElement("div");
    let likeCount=data.items[0].statistics.likeCount;
    let num=numFormatter(likeCount)
    like.innerHTML=`<span class="material-icons">
    thumb_up_off_alt
    </span> <p> ${num}</p>`

    let dislike=document.createElement("div");

    dislike.innerHTML=`<span class="material-icons">
    thumb_down_off_alt
    </span> <p>dislike</p>`;

    let share=document.createElement("div");

    share.innerHTML=`<i class="fa-solid fa-share"></i> <p> share</p>`;

    let save=document.createElement("div");
    save.innerHTML=`<span class="material-icons">
    playlist_add
    </span> <p> save</p>`;

    let dot=document.createElement("div");
    dot.innerHTML=`<span class="material-icons">
    more_horiz
    </span>`;

    divv.append(like,dislike,share,save,dot)
    viewsLikes.append(views,divv);


  allVid.map((el)=>{
        if(el.snippet.title !== video.snippet.title){
            let div= document.createElement("div");
            console.log(el)
            let vidImg = document.createElement("img");
            
            vidImg.src = el.snippet.thumbnails.medium.url;
      
            var title_and_Profile = document.createElement("div");
            title_and_Profile.setAttribute("id", "title_and_Profile");
      
            var divTitle = document.createElement("div");
            var title = document.createElement("p");
            title.innerText = el.snippet.title;
            var views = document.createElement("span");
            let vieww=`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${el.id.videoId||el.id}&key=${api_key}`;

            fetch(vieww)
                .then((res)=>{
                    return res.json();
                })
                .then((res)=>{
                    // console.log(res)
                   let viewvid=res.items[0].statistics.viewCount;
                    // console.log(viewvid)
                    let numm=numFormatter(viewvid);
                    views.textContent=`${numm} views`
                })
                .catch((err)=>{
                    console.log(err)
                })
            var channelName = document.createElement("span");
            channelName.innerText = el.snippet.channelTitle;
            divTitle.append(title, channelName, views);

            
            

                title_and_Profile.append(divTitle);
                div.append(vidImg, title_and_Profile);

                document.getElementById("allvid").append(div)
            
                div.addEventListener("click", function () {
                    showVid(allVid,el);
                  });
            
        }
    })





    

}


function showVid(data,el){
    // console.log(el)
    localStorage.setItem("video",JSON.stringify(el));
    localStorage.setItem("allVid",JSON.stringify(data));
    window.location.href="showvideo.html"
     
}


function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + ' K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000 && num < 1000000000){
        return (num/1000000).toFixed(1) + ' M'; // convert to M for number from > 1 million 
    }else if(num >1000000000){
        return (num/1000000000).toFixed(1) + ` B`
    }
    else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}