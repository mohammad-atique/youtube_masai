function navbar(){
  return  `<div id="left">
    <div><span class="material-icons">
            menu
        </span></div>
    <a href="/index.html"><img id="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
            alt="logo"></a>

</div>
<div id="centre">
    <div id="searchDiv">
        <div id="searchin"><input  type="text" name="search" id="search" placeholder="Search"></div>
        <button ><span class="material-icons">
                search
            </span></button>
    </div>
    <div id="mic"><span class="material-icons">
            mic
        </span></div>
</div>
<div id="right">
    <div><span class="material-icons">
            video_call
        </span></div>
    <div><span class="material-icons">
            apps
        </span></div>
    <div><span class="material-icons">
            notifications
        </span></div>
    <div><span class="material-icons">
            account_circle
        </span></div>
</div>`
}

export default navbar;