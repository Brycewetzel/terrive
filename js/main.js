var client=new hivesigner.Client({app:"terrive",callbackURL:"https://terrive.one/auth.html"}),loginType=localStorage.getItem("type"),accessToken=localStorage.getItem("token"),rpc="https://api.hive.blog",imgHoster="https://images.ecency.com";client.setAccessToken(accessToken),hive.api.setOptions({url:rpc});var username=localStorage.getItem("username"),eleHome=document.getElementById("home"),eleDiscover=document.getElementById("discover"),eleProfileGrid=document.querySelector("#profile-grid .row"),eleProfileVideo=document.querySelector("#profile-video .row"),md=new remarkable.Remarkable({html:!0});function toolip(){[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e){return new bootstrap.Tooltip(e)})}md.use(remarkable.linkify);var toastEl=document.querySelector(".toast"),toast=new bootstrap.Toast(toastEl);function notify(e,t){var o=document.querySelector(".bi-info");t?o.setAttribute("fill",t):o.setAttribute("fill","var(--bs-success)"),document.querySelector("#update-notify-body").innerHTML=e,toast.show(),setTimeout(toast.hide(),3e3)}function keychainLogin(){var e=prompt("username");hive_keychain.requestEncodeMessage(e,e,"#login-true","Posting",function(t){console.log("endoding key ..."),console.log(t),1==t.success&&hive_keychain.requestVerifyKey(e,t.result,"Posting",function(t){console.log("verifying key ..."),console.log(t),"#login-true"==t.result?(localStorage.setItem("username",e),localStorage.setItem("type","keychain"),window.setTimeout(location.reload(),500)):notify("error while login","var(--bs-danger)")})})}function logOut(){localStorage.clear(),setTimeout(location.reload(),500)}function postTypeSelector(e){"image"==e?document.getElementById("upload-input-wrap").innerHTML='<input id="input-image-ele" type="file" accept="image/*" hidden><div class="position-relative"><label class="position-absolute end-0 m-1-5" for="input-image-ele"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--bs-primary)" class="bi bi-plus-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/></svg></label><input id="upload-image-url" onchange="loadPostPreview(this.value)" type="text" class="form-control" placeholder="URLs ( Seperated by Space )"></div><br>':"video"==e&&(document.getElementById("upload-input-wrap").innerHTML='<input id="input-video-ele" type="file" accept="video/*" hidden><div class="position-relative"><label class="position-absolute end-0 m-1-5" for="input-video-ele"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--bs-primary)" class="bi bi-plus-square-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/></svg></label><input id="upload-video-url" onchange="loadPostPreview(this.value,this.id)" type="text" class="form-control" placeholder="URL of Video"></div><br><input id="upload-video-url-cover" type="text" class="form-control" placeholder="URL of Cover Image"><br>')}function loadPostPreview(e,t){if(document.getElementById("upload-preview").innerHTML='<div class="text-center"><div class="spinner-grow text-primary" role="status"></div></div>',"upload-video-url"==t)document.getElementById("upload-preview").innerHTML='<video id="upload-video-preview" src="'+e+'" class="w-100" preload="metadata" controls></video>',window.setTimeout(function(){document.getElementById("upload-video-preview").duration.toFixed(0)>60&&(document.getElementById("upload-video-url").value="",document.getElementById("upload-preview").innerHTML="",notify("Video should be less than 60sec","var(--bs-danger)"))},500);else{var o=e.split(" ");if(1==o.length)document.getElementById("upload-preview").innerHTML='<img src="'+o[0]+'" class="w-100 rounded mb-3">';else if(o.length>1){document.getElementById("upload-preview").innerHTML='<div id="carouselPreviewControls" class="carousel slide mb-3" data-bs-ride="carousel"><div class="carousel-inner"></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselPreviewControls" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselPreviewControls" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>';for(var n=0;n<o.length;)document.querySelector("#carouselPreviewControls .carousel-inner").innerHTML+='<div class="carousel-item"><img src="'+o[n]+'" class="d-block w-100 rounded" alt="ERROR: Image Not Found !!!"></div>',n+=1;document.querySelector("#carouselPreviewControls .carousel-inner .carousel-item:first-child").classList.add("active")}}}var fi=document.getElementById("input-image-ele");function submitPost(){var e=document.getElementById("textbox").value,t=reg(e,3),o=document.getElementsByClassName("tag-wrap"),n=Array.prototype.slice.call(o).map(function(e){return e.innerHTML});if(document.getElementById("upload-image-url")&&document.getElementById("upload-image-url").value){var r=document.getElementById("upload-image-url").value.split(" "),i="[![]("+r[0]+")](https://terrive.one/?u="+username+"&p="+t.replaceAll(" ","-").toLowerCase()+") <br><br>"+e+" <br><br> Posted using [Terrive](https://terrive.one)",a=JSON.stringify({app:"terrive/0.0.0",format:"markdown",description:e,tags:n,image:r});broadcastPost(username,i,a,"trhome",t)}else if(document.getElementById("upload-video-url").value&&document.getElementById("upload-video-url-cover").value){n.push("trhome");var l=document.getElementById("upload-video-url-cover").value,s="[![]("+l+")](https://terrive.one/?u="+username+"&p="+t.replaceAll(" ","-").toLowerCase()+"&video) <br><br>"+e+" <br><br> Posted using [Terrive](https://terrive.one)",d=document.getElementById("upload-video-url").value,c=JSON.stringify({app:"terrive/0.0.0",format:"markdown",description:e,tags:n,image:[l],video:[d]});broadcastPost(username,s,c,"trvideo",t)}else if(document.getElementById("upload-video-url").value){n.push("trhome");var u=imgHoster+"/u/"+username+"/avatar/large",p="[![]("+u+")](https://terrive.one/?u="+username+"&p="+t.replaceAll(" ","-").toLowerCase()+"&video) <br><br>"+e+" <br><br> Posted using [Terrive](https://terrive.one)",m=document.getElementById("upload-video-url").value,g=JSON.stringify({app:"terrive/0.0.0",format:"markdown",description:e,tags:n,image:[u],video:[m]});broadcastPost(username,p,g,"trvideo",t)}}function reg(e,t){var o=e.match(new RegExp("[\\w\\.]+(?:[\\s-]*[\\w\\.]+){0,"+(t-1)+"}"));return null==o?"":o[0]}function broadcastPost(e,t,o,n,r){accessToken?client.comment("",n,e,r.replaceAll(" ","-").toLowerCase(),r,t,o,function(e,t){null===e||void 0===e.error_description?(console.log(t),clearUploadTray(),notify("Successfully Posted")):notify(e.error_description,"var(--bs-danger)")}):"keychain"==loginType&&hive_keychain.requestPost(e,r,t,n,"",o,r.replaceAll(" ","-").toLowerCase(),"",function(e){1==e.success?(clearUploadTray(),notify("Successfully Posted")):notify("Failed to Post","var(--bs-danger)")})}function clearUploadTray(){document.getElementById("upload-preview").innerHTML="",document.getElementById("upload-input-wrap").innerHTML="",document.getElementById("textbox").value="",document.getElementById("tagTray").innerHTML=""}function filterType(e,t){let o=document.getElementById("post-tray");o.setAttribute("data-tr-vote",e.active_votes.length),o.setAttribute("data-tr-children",e.children),"re"==t?o.setAttribute("data-tr-body",e.body):"vid"==t?(o.setAttribute("data-tr-body",JSON.parse(e.json_metadata).description),o.setAttribute("data-tr-src",JSON.parse(e.json_metadata).video[0])):(o.setAttribute("data-tr-body",JSON.parse(e.json_metadata).description),o.setAttribute("data-tr-src",JSON.parse(e.json_metadata).image.toString()))}function pushPost(e,t,o,n,r,i){var a=n.split(",");document.getElementById("like-count-post").innerHTML=r,document.getElementById("post-body").innerHTML=md.render(o).replaceAll("<p>","").replaceAll("</p>","");var l=document.getElementById("post-tray");l.setAttribute("data-tr-author",e),l.setAttribute("data-tr-permlink",t),document.getElementById("children-post").innerHTML=i,document.querySelector("#post-tray .modal-title").textContent=e;var s=document.querySelector("#post-tray .modal-body .post-img");if(s.innerHTML="",1==a.length)s.innerHTML+='<img src="'+imgHoster+"/p/"+b58(a[0])+'?format=webp&mode=fit">';else if(a.length>1){s.innerHTML+='<div id="carouselPostControls" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner"></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselPostControls" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselPostControls" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>';for(var d=0;d<a.length;)document.querySelector("#carouselPostControls .carousel-inner").innerHTML+='<div class="carousel-item"><img src="'+imgHoster+"/p/"+b58(a[d])+'?format=webp&mode=fit" class="d-block" alt="ERROR: Image Not Found !!!"></div>',d+=1;document.querySelector("#carouselPostControls .carousel-inner .carousel-item:first-child").classList.add("active")}e==username?document.querySelector("#post-tray .bi-pencil").classList.replace("invisible","visible"):document.querySelector("#post-tray .bi-pencil").classList.replace("visible","invisible"),document.querySelector("#post-tray .modal-header img").setAttribute("src",imgHoster+"/u/"+e+"/avatar/small"),getReplies(e,t),document.querySelector("#edit-post textarea").value=o}function postLike(){var e=document.getElementById("post-tray"),t=e.getAttribute("data-tr-author"),o=e.getAttribute("data-tr-permlink"),n=document.getElementById("like-count-post"),r=document.querySelector("#post-like");accessToken&&"#ff0000"!==r.style.fill?client.vote(username,t,o,1e4,function(e,t){null===e&&"#ff0000"!==r.style.fill?(console.log(t),document.querySelector("#post-like use").setAttribute("href","#bi-heart-fill"),r.style.fill="#ff0000",n.innerHTML=+n.innerHTML+1,notify("Successfully Voted")):notify(e.error_description)}):"keychain"==loginType&&"#ff0000"!==r.style.fill?hive_keychain.requestVote(username,o,t,1e4,function(e){1==e.success?(document.querySelector("#post-like use").setAttribute("href","#bi-heart-fill"),r.style.fill="#ff0000",n.innerHTML=+n.innerHTML+1,notify("Successfully Voted")):notify("Error while Voting","var(--bs-danger)")}):notify("Failed to vote","var(--bs-danger)")}function editPost(){const e=document.getElementById("post-tray"),t=e.getAttribute("data-tr-author"),o=e.getAttribute("data-tr-permlink"),n=document.querySelector("#edit-post .modal-body textarea"),r=new bootstrap.Modal(document.getElementById("edit-post"));hive.api.getContent(t,o,function(e,t){if(null===e){var o=JSON.parse(t.json_metadata);o.description=n.value,accessToken?client.comment("",t.category,t.author,t.permlink,t.title,n.value,JSON.stringify(o),function(e,t){null===e?(r.hide(),notify("Successfully edited !")):(notify(e,"var(--bs-danger)"),console.log(e))}):(loginType="keychain")?hive_keychain.requestPost(t.author,t.title,n.value,t.category,"",JSON.stringify(o),t.permlink,"",function(e){1==e.success?(r.hide("Successfully edited !"),notify("Successfully edited !")):(notify("Could not edit","var(--bs-danger)"),console.log(e))}):notify("not logged in","var(--bs-danger)")}else notify(e,"var(--bs-danger)")})}function postComment(){const e=document.getElementById("post-tray"),t=e.getAttribute("data-tr-author"),o=e.getAttribute("data-tr-permlink"),n=Math.random().toString(36).substring(2),r=document.querySelector("#post-tray .modal-footer input"),i=JSON.stringify({app:"terrive/0.0.0"});accessToken?client.comment(t,o,username,n,"",r.value,i,function(e,t){null===e?(console.log(t),r.value="",notify("Successfully Commented")):notify(e.error_description,"var(--bs-danger)")}):"keychain"==loginType&&hive_keychain.requestPost(username,"",r.value,o,t,i,n,"",function(e){console.log(e),1==e.success?(r.value="",notify("Successfully Commented")):notify("Error while commenting","var(--bs-danger)")})}function addReaction(e){let t;t="!LUV"==e?"![love.webp](https://images.ecency.com/p/5bEGgqZEHBMe6s3wiPgGFTi3naqHERgdwJew6rJYRaB3RR7sSAdZKnpM5EfB7haZJRqrK9eHDfaxfKmryUDHQ7jC7FQfWdCH.webp)":"!PIZZA"==e?"![pizza.webp](https://images.ecency.com/p/7DceLgR4szFwuz7CAHs19JsfqtMKwxDmgzo1nicPT5tDgv48VYtNCWLUEcb9kRvnGVoVv5qmQZFm7yFHMa6NA.webp)":"";const o=document.getElementById("post-tray"),n=o.getAttribute("data-tr-author"),r=o.getAttribute("data-tr-permlink"),i="re-"+r+"-"+Math.random().toString(36).substring(2),a=JSON.stringify({reaction:e,app:"terrive/0.0.0"}),l="Here is some "+e+"<br> "+t+"<br> Reactions added using [Terrive](https://terrive.one)";accessToken?client.comment(n,r,username,i,"",l,a,function(e,t){null===e?(console.log(t),notify("Successfully Added Reaction")):notify(e.error_description,"var(--bs-danger)")}):"keychain"==loginType&&hive_keychain.requestPost(username,"",l,r,n,a,i,"",function(e){console.log(e),1==e.success?notify("Successfully Added Reaction"):notify("Error adding Reaction","var(--bs-danger)")})}function calcURL(){var e=location.search,t=new URLSearchParams(e);if(t.has("p")&&t.has("u")&&t.has("reply")){var o=t.get("p"),n=t.get("u");document.title=o+" by "+n+" on Terrive",(r=document.querySelector("#post-tray")).setAttribute("data-tr-author",n),r.setAttribute("data-tr-permlink",o),r.setAttribute("data-tr-type","re"),new bootstrap.Modal(r).show(),getContent(n,o,"reply")}else if(t.has("p")&&t.has("u")&&t.has("video")){o=t.get("p"),n=t.get("u");document.title=o+" by "+n+" on Terrive",(r=document.querySelector("#post-tray")).setAttribute("data-tr-author",n),r.setAttribute("data-tr-permlink",o),r.setAttribute("data-tr-type","vid"),new bootstrap.Modal(r).show(),getContent(n,o,"video")}else if(t.has("p")&&t.has("u")){o=t.get("p"),n=t.get("u");document.title=o+" by "+n+" on Terrive",(r=document.getElementById("post-tray")).setAttribute("data-tr-author",n),r.setAttribute("data-tr-permlink",o),new bootstrap.Modal(r).show(),getContent(n,o)}else if(t.has("u")){n=t.get("u");document.title=n+"'s Posts on Terrive";var r=document.querySelector('a[href="#profile"]');new bootstrap.Tab(r).show(),getBlog(n),getProfileInfo(n),getFollowers(n)}else null===username&&document.getElementById("login").classList.replace("invisible","visible")}function getContent(e,t,o){hive.api.getContent(e,t,function(n,r){if(null===n){var i=r.active_votes.length,a=r.children;if("reply"==o){var l=r.body;pushPost(e,t,"","",i,a),document.querySelector("#post-tray .modal-body .post-img").innerHTML='<div class="w-100 text-center">'+md.render(l)+"</div>"}else if("video"==o){var s=JSON.parse(r.json_metadata).video[0];pushPost(e,t,l,"",i,a),document.querySelector("#post-tray .modal-body .post-img").innerHTML='<video id="upload-video-preview" src="'+s+'" preload="metadata" controls></video>'}else{var d=JSON.parse(r.json_metadata);pushPost(e,t,d.description,d.image.toString(),i,a)}}else notify(n,"var(--bs-danger)")})}function darken(){"dark"==localStorage.getItem("theme")&&document.body.classList.add("dark")}function dark(){window.matchMedia("(prefer-color-scheme: dark)").matches||(document.body.classList.toggle("dark"),document.body.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.removeItem("theme"))}function calcLength(){var e=document.getElementById("text-length"),t=document.getElementById("textbox");e.innerHTML=t.value.length,150<=t.value.length?t.setAttribute("class","form-control btn-outline-danger"):t.setAttribute("class","form-control")}function calcTag(e){if(13==e.keyCode||32==e.keyCode){var t=document.getElementById("tag");document.getElementById("tagTray").innerHTML+='<span class="alert d-inline alert-primary ms-3 p-1"><span class="d-inline tag-wrap me-1">'+t.value.replace(" ","")+'</span><button type="button" class="d-inline btn-close p-0 m-0 align-middle newtag" data-bs-dismiss="alert" aria-label="Close"></button></span>',t.value=""}}function getSearch(e){document.getElementById("search-tray").innerHTML="";var t=document.getElementById(e).value;hive.api.callAsync("condenser_api.lookup_accounts",[t,10]).then(function(e){for(var t=0;t<e.length;)document.getElementById("search-tray").innerHTML+='<a class="list-group-item list-group-item-action mx-auto" href="/?u='+e[t]+'"><img class="rounded-circle float-start" src="'+imgHoster+"/u/"+e[t]+'/avatar/small" height="48" width="48"><p class="fs-5 fw-bold float-start mt-2 ms-3">'+e[t]+"</p></a>",t+=1})}function getReplies(e,t){document.querySelector("#post-tray .modal-body p").innerHTML="",hive.api.getContentReplies(e,t,function(e,t){if(null===e){let e=0,o={LUV:0,PIZZA:0,BEER:0};for(;e<t.length;){if(JSON.parse(t[e].json_metadata).reaction){const n=JSON.parse(t[e].json_metadata).reaction.replace("!","");o[n]=o[n]+1}else document.querySelector("#post-tray .modal-body .post-comment").innerHTML+='<br><div class="mx-3 shadow alert-light rounded p-3 mx-auto position-relative" style="max-width: 36em;"><img src="'+imgHoster+"/u/"+t[e].author+'/avatar/small" class="rounded-circle me-2" height="24" width="24"><a class="fw-bold link-dark text-decoration-none" href="?u='+t[e].author+'">'+t[e].author+'</a><br><br><span class="reply-body">'+md.render(t[e].body)+'</span><a href="?u='+t[e].author+"&p="+t[e].permlink+'&reply" class="link-dark satisfy">reply</a><svg width="16" height="16" fill="#d3d3d3" class="bi bi-star-fill position-absolute mt-3 me-3 top-0 end-0" data-tr-author="'+t[e].author+'" data-tr-permlink="'+t[e].permlink+'" onclick="likeReplies(this)"><use href="#bi-star-fill"/></svg><a data-tr-author="'+t[e].author+'" data-tr-permlink="'+t[e].permlink+'" onclick="getChildReplies(this)"><svg width="16" height="16" fill="var(--tr-color)" class="bi bi-chevron-down position-absolute end-0 bottom-0 me-3 mb-3"><use href="#bi-chevron-down"/></svg></a></div><br><div id="child-replies-'+t[e].permlink+'"></div>';e+=1}document.querySelector("#post-tray .modal-body .luv-count").innerHTML=o.LUV,document.querySelector("#post-tray .modal-body .pizza-count").innerHTML=o.PIZZA,document.querySelector("#post-tray .modal-body .beer-count").innerHTML=o.BEER;const n=document.querySelector("#post-tray .modal-body .luv"),r=document.querySelector("#post-tray .modal-body .pizza"),i=document.querySelector("#post-tray .modal-body .beer");0!==o.LUV?n.classList.replace("invisible","visible"):n.classList.replace("visible","invisible"),0!==o.PIZZA?r.classList.replace("invisible","visible"):r.classList.replace("visible","invisible"),0!==o.BEER?i.classList.replace("invisible","visible"):i.classList.replace("visible","invisible")}else notify(e,"var(--bs-danger)")})}function getChildReplies(e){var t=e.getAttribute("data-tr-author"),o=e.getAttribute("data-tr-permlink"),n=document.getElementById("child-replies-"+o);hive.api.getContentReplies(t,o,function(e,t){if(null===e){for(var o=0;o<t.length;)n.innerHTML+='<div class="mx-3 shadow alert-light rounded p-3 mx-auto position-relative" style="max-width: 32em;"><img src="'+imgHoster+"/u/"+t[o].author+'/avatar/small" class="rounded-circle me-2" height="24" width="24"><a class="fw-bold link-dark text-decoration-none" href="?u='+t[o].author+'">'+t[o].author+'</a><br><span class="reply-body">'+md.render(t[o].body)+'</span><a href="?u='+t[o].author+"&p="+t[o].permlink+'&reply" class="link-dark satisfy">reply</a><svg width="16" height="16" fill="#d3d3d3" class="bi bi-star-fill position-absolute mt-3 me-3 top-0 end-0" data-tr-author="'+t[o].author+'" data-tr-permlink="'+t[o].permlink+'" onclick="likeReplies(this)"><use href="#bi-star-fill"/></svg><svg data-tr-author="'+t[o].author+'" data-tr-permlink="'+t[o].permlink+'" onclick="getChildReplies(this)" width="16" height="16" fill="var(--tr-color)" class="bi bi-chevron-down position-absolute end-0 bottom-0 me-3 mb-3"><use href="#bi-chevron-down"/></svg></div><div id="child-replies-'+t[o].permlink+'"></div><br>',o+=1;(t.length=0)&&notify("No Replies","var(--bs-danger)")}else notify(e,"var(--bs-danger)")})}function likeReplies(e){var t=e.getAttribute("data-tr-author"),o=e.getAttribute("data-tr-permlink");accessToken?client.vote(username,t,o,1e4,function(t,o){null===t?e.querySelector("use").style.fill="#ff0000":notify(t,"var(--bs-danger)")}):"keychain"==loginType&&hive_keychain.requestVote(username,o,t,1e4,function(t){1==t.success?e.querySelector("use").style.fill="#ff0000":notify("Error Voting","var(--bs-danger)")})}function like(e){var t=document.getElementById(e).querySelector("use"),o=e.replace("like-",""),n=document.getElementById("like-count-"+o),r=document.getElementById("author-"+o),i=r.innerHTML,a=r.getAttribute("data-tr-permlink");accessToken&&"#ff0000"!==t.style.fill?client.vote(username,i,a,1e4,function(e,o){null===e&&"#ff0000"!==t.style.fill?(t.setAttribute("href","#bi-heart-fill"),t.style.fill="#ff0000",n.innerHTML=+n.innerHTML+1,notify("Successfully Voted")):notify(e.error_description,"var(--bs-danger)")}):"keychain"==loginType&&"#ff0000"!==t.style.fill?hive_keychain.requestVote(username,a,i,1e4,function(e){1==e.success?(t.setAttribute("href","#bi-heart-fill"),t.style.fill="#ff0000",n.innerHTML=+n.innerHTML+1,notify("Successfully Voted")):notify("Error while Voting","var(--bs-danger)")}):notify("Failed to vote","var(--bs-danger)")}function followToggle(e){var t=document.getElementById("profile-info-username").innerHTML.replace("@","");if(t==username)notify("Ehh!! Why do you want to follow yourself!!","var(--bs-danger)");else if(accessToken)client.follow(username,t,function(t,o){null==t?(console.log(o),e.innerHTML="Followed",e.classList.replace("btn-primary","btn-outline-primary")):notify(t.error_description,"var(--bs-danger)")});else if("keychain"==loginType){var o=JSON.stringify(["follow",{follower:username,following:t,what:["blog"]}]);hive_keychain.requestCustomJson(username,"follow","Posting",o,"Follow a User",function(t){console.log("following ..."),console.log(t),1==t.success?(e.innerHTML="Followed",e.classList.replace("btn-primary","btn-outline-primary"),notify("Successfully Followed")):notify("Error while following","var(--bs-danger)")})}}function getFeed(){hive.api.getDiscussionsByFeed({tag:username,limit:100,truncate_body:1},function(e,t){null===e?filterTag(t,"feed"):(console.log(e),notify("Failed to get Feed","var(--bs-danger)"))})}function getNew(){hive.api.getDiscussionsByCreated({tag:"trhome",limit:35,truncate_body:1},function(e,t){null===e?filterTag(t,"new"):console.log(e)})}function getBlog(e){hive.api.getDiscussionsByBlog({tag:e,limit:100,truncate_body:1},function(e,t){null===e?pushProfile(t):console.log(e)})}function getProfileInfo(e){hive.api.getAccounts([e],function(e,t){pushProfileInfo(t)})}fi.addEventListener("change",function(e){var t=document.getElementById("upload-image-url"),o="";t.value&&(o=" ");var n=e.target.files[0];n.arrayBuffer().then(function(e){var r=new Blob([new Uint8Array(e)],{type:"application/octet-stream"}),i=new FormData;i.append("file",r,n.name),fetch("https://ipfs.infura.io:5001/api/v0/add",{method:"POST",body:i,mode:"cors"}).then(function(e){e.json().then(function(e){console.log(e),t.value+=o+"https://ipfs.infura.io/ipfs/"+e.Hash,window.setTimeout(loadPostPreview(t.value),500)}).catch(function(e){console.log(e),notify("Error while uploading","var(--bs-danger)")})}).catch(function(e){console.log(e),notify("Error while uploading","var(--bs-danger)")})})}),document.querySelector('input[type="radio"][value="video"]').addEventListener("click",function(){document.getElementById("input-video-ele").onchange=function(e){var t=e.target.files[0];console.log(t.size),t.size<15e6?(document.getElementById("upload-preview").innerHTML='<div class="text-center"><div class="spinner-grow text-primary" role="status"></div></div>',t.arrayBuffer().then(function(e){var o=new Blob([new Uint8Array(e)],{type:"application/octet-stream"}),n=new FormData;n.append("file",o,t.name),fetch("https://ipfs.infura.io:5001/api/v0/add",{method:"POST",body:n,mode:"cors"}).then(function(e){e.json().then(function(e){var t=document.getElementById("upload-video-url");t.value="https://ipfs.infura.io/ipfs/"+e.Hash,window.setTimeout(loadPostPreview(t.value,"upload-video-url"),500),notify("Uploaded video !!")}).catch(function(e){console.log(e),notify("Error while uploading","var(--bs-danger)")})}).catch(function(e){notify(e,"var(--bs-danger)")})}).catch(function(e){notify(e,"var(--bs-danger)")})):notify("File Size is too Big","var(--bs-danger)")}}),document.getElementById("reblogPop").addEventListener("show.bs.modal",function(e){var t=e.relatedTarget.getAttribute("data-tr-permlink"),o=e.relatedTarget.getAttribute("data-tr-author");document.getElementById("reblog-pop-permlink").innerHTML=t,document.getElementById("reblog-pop-yes").addEventListener("click",function(){if(accessToken)client.reblog(username,o,t,function(e,t){null===e?(console.log(t),notify("Reblogged")):notify(e.error_description)});else if("keychain"==loginType){var e=JSON.stringify(["reblog",{account:username,author:o,permlink:t}]);hive_keychain.requestCustomJson(username,"follow","Posting",e,"Reblog a Post",function(e){console.log(e),notify("Reblogged")})}})}),document.getElementById("post-tray").addEventListener("hide.bs.modal",function(){document.querySelector("#post-like use").setAttribute("href","#bi-heart"),document.querySelector("#post-like").style.fill="var(--tr-color)"}),document.getElementById("post-tray").addEventListener("show.bs.modal",function(e){const t=e.relatedTarget,o=t.getAttribute("data-tr-author"),n=t.getAttribute("data-tr-permlink"),r=t.getAttribute("data-tr-type"),i=t.getAttribute("data-tr-body"),a=t.getAttribute("data-tr-src"),l=t.getAttribute("data-tr-vote"),s=t.getAttribute("data-tr-children");"vid"==r?(pushPost(o,n,i,"",l,s),document.querySelector("#post-tray .modal-body .post-img").innerHTML='<video id="upload-video-post" src="'+a+'" class="w-100" preload="metadata" controls></video>'):pushPost(o,n,i,a,l,s)}),document.getElementById("sharePop").addEventListener("show.bs.modal",function(e){var t=e.relatedTarget.getAttribute("data-tr-url");document.getElementById("share-facebook").setAttribute("href","https://facebook.com/sharer.php?u=https://terrive.one"+t.replace("/","").replace("trhome","").replace("trtestvid","").replace("/@","?u=").replace("/","&p=")),document.getElementById("share-twitter").setAttribute("href","https://twitter.com/intent/tweet?url=https://terrive.one"+t.replace("/","").replace("trhome","").replace("trtestvid","").replace("/@","?u=").replace("/","&p=")),document.getElementById("share-reddit").setAttribute("href","https://reddit.com/submit?url=https://terrive.one"+t.replace("/","").replace("trhome","").replace("trtestvid","").replace("/@","?u=").replace("/","&p="));var o=document.getElementById("share-copy-txtbx");o.setAttribute("value","https://terrive.one"+t.replace("/","").replace("trhome","").replace("trtestvid","").replace("/@","?u=").replace("/","&p=")),document.getElementById("share-link").addEventListener("click",function(){o.select(),o.setSelectionRange(0,99999),document.execCommand("copy"),notify("Successfully copied")})}),calcURL(),darken(),document.querySelectorAll('a[href="#home"]').forEach(function(e){e.addEventListener("show.bs.tab",function(e){getFeed(),null===username&&document.getElementById("login").classList.replace("invisible","visible")})}),document.querySelectorAll('a[href="#profile"]').forEach(function(e){e.addEventListener("show.bs.tab",function(e){document.getElementById("loader").classList.replace("invisible","visible"),getBlog(username),getProfileInfo(username),getFollowers(username)})});var notifywrkr=new Worker("js/notify.js");function getNotifications(){document.getElementById("notify-body").innerHTML="",notifywrkr.postMessage([rpc,username])}notifywrkr.addEventListener("message",function(e){document.getElementById("notify-body").innerHTML+=e.data}),getNotifications(),setInterval(function(){document.getElementById("notify-body").innerHTML="",notifywrkr.postMessage([rpc,username])},12e4);var filterwrkr=new Worker("js/filter.js");function filterTag(e,t){"feed"===t?eleHome.innerHTML="":"new"===t&&(eleDiscover.innerHTML=""),filterwrkr.postMessage([e,t])}function getFollowers(e){var t=document.getElementById("profile-info-followers"),o=document.getElementById("profile-info-following");hive.api.getFollowers(e,"","blog",10,function(e,o){null===e?(t.setAttribute("title","@"+o.map(function(e){return e.follower}).toString().replaceAll(","," @")),toolip()):notify(e,"var(--bs-danger)")}),hive.api.getFollowing(e,"","blog",10,function(e,t){null===e?(o.setAttribute("title","@"+t.map(function(e){return e.following}).toString().replaceAll(","," @")),toolip()):notify(e,"var(--bs-danger)")}),hive.api.getFollowCount(e,function(e,n){null===e?(o.querySelector("span").innerHTML=n.following_count,t.querySelector("span").innerHTML=n.follower_count):notify(e,"var(--bs-danger)")})}filterwrkr.addEventListener("message",function(e){var[t,o]=e.data;push(t,o);var n=document.getElementById("loader");n.classList.contains("visible")&&n.classList.replace("visible","invisible")}),document.querySelectorAll('a[href="#discover"]').forEach(function(e){e.addEventListener("show.bs.tab",function(e){getNew(),document.getElementById("loader").classList.replace("invisible","visible"),null===username&&document.getElementById("login").classList.replace("invisible","visible")})});var ProfileJsonMeta="",JsonMeta="";function saveProfile(){ProfileJsonMeta.profile.about=document.querySelector("#profile-edit textarea").value,ProfileJsonMeta.profile.location=document.querySelector('#profile-edit input[placeholder="Location"]').value,ProfileJsonMeta.profile.profile_image=document.querySelector('#profile-edit input[placeholder="Profile Image"]').value,ProfileJsonMeta.profile.website=document.querySelector('#profile-edit input[placeholder="Website"]').value;document.getElementById("profile-edit");const e=[["account_update2",{account:username,json_metadata:JsonMeta,posting_json_metadata:JSON.stringify(ProfileJsonMeta)}]];accessToken?hivesigner.sendOperation(e,{callback:window.location.href},function(e,t){console.log(e,t)}):"keychain"==loginType&&hive_keychain.requestBroadcast(username,e,"Posting",function(e){console.log(e)})}function pushProfileInfo(e){""!==e[0].posting_json_metadata?ProfileJsonMeta=JSON.parse(e[0].posting_json_metadata):ProfileJsonMetadata="",""!==e[0].json_metadata?JsonMeta=e[0].json_metadata:JsonMetadata="";var t=ProfileJsonMeta;document.getElementById("profile-info-username").innerHTML=e[0].name,document.getElementById("profile-info-about").innerHTML=t.profile.about,document.querySelector("#profile-edit textarea").value=t.profile.about,document.getElementById("profile-info-loc").innerHTML=t.profile.location,document.querySelector('#profile-edit input[placeholder="Location"]').value=t.profile.location,document.getElementById("profile-info-profile-pic").style.backgroundImage='url("'+imgHoster+"/u/"+e[0].name+'/avatar/medium")',document.querySelector('#profile-edit input[placeholder="Profile Image"]').value=t.profile.profile_image,document.getElementById("profile-info-web").innerHTML='<a class="text-secondary" target="_blank" rel="noopener" href="'+t.profile.website+'">'+t.profile.website+"</a>",document.querySelector('#profile-edit input[placeholder="Website"]').value=t.profile.website,document.getElementById("profile-info-created").innerHTML=e[0].created.replace("T"," | "),document.getElementById("profile-info-pst-count").innerHTML=e[0].post_count,document.getElementById("profile-info-last-up").innerHTML=e[0].last_account_update.replace("T"," | "),document.getElementById("profile-info-rep").innerHTML=hive.formatter.reputation(e[0].reputation),document.getElementById("profile-info-rec-acc").innerHTML=e[0].recovery_account,document.getElementById("profile-info-vp").style.width=e[0].voting_power/100+"%",document.getElementById("profile-info-vp").innerHTML=e[0].voting_power/100+"%",e[0].name==username&&(document.querySelector(".setting-wrap").innerHTML='<button class="btn btn-outline-primary m-3" data-bs-target="#profile-edit" data-bs-toggle="modal">Edit Profile</button><button class="btn btn-outline-danger m-3" onclick="logOut()">Logout</button>')}function pushProfile(e){var t=0;for(eleProfileGrid.innerHTML="",eleProfileVideo.innerHTML="";t<e.length;){var o=JSON.parse(e[t].json_metadata),n=o.image;void 0===n?console.log(t):"trhome"==e[t].category?(eleProfileGrid.innerHTML+='<div id="trImg'+t+'" class="col tr-profile-img" data-bs-toggle="modal" data-bs-target="#post-tray" data-tr-src="'+n.toString()+'" data-tr-author="'+e[t].author+'" data-tr-permlink="'+e[t].permlink+'" data-tr-children="'+e[t].children+'" data-tr-vote="'+e[t].active_votes.length+'" data-tr-body="'+o.description+'"></div>',document.querySelector("#trImg"+t).style.backgroundImage='url("'+imgHoster+"/p/"+b58(n[0])+'")'):"trvideo"===e[t].category&&(console.log(o.video),eleProfileVideo.innerHTML+='<div id="trVid'+t+'" class="col bg-secondary rounded tr-profile-img tr-profile-video-gra" data-bs-toggle="modal" data-bs-target="#post-tray" data-tr-author="'+e[t].author+'" data-tr-src="'+o.video[0]+'" data-tr-permlink="'+e[t].permlink+'" data-tr-children="'+e[t].children+'" data-tr-vote="'+e[t].active_votes.length+'" data-tr-body="'+o.description+'" data-tr-type="vid"></div>',document.querySelector("#trVid"+t).style.backgroundImage='url("'+imgHoster+"/p/"+b58(n[0])+'")'),document.getElementById("loader").classList.replace("visible","invisible"),t+=1}}function push(e,t){document.getElementById(t).innerHTML+=e}window.addEventListener("load",function(){document.getElementById("loader").classList.replace("visible","invisible"),getNew(),toolip(),window.addEventListener("offline",function(){document.querySelector(".offline-notify").classList.add("offline")}),window.addEventListener("online",function(){document.querySelector(".offline-notify").classList.remove("offline")})});