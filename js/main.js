
// --------------- //
latest_post = 2;
// --------------- //

//Credits
console.log("Main font is 'Noto Semi Condensed Light' by Google");

function load_post(post){
    post_body = document.getElementById("post");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                post_body.innerHTML = this.responseText;
            }else{
                post_body.innerHTML = `
                    <h1> 404 - Not found </h1>
                    <p> Sorry, I can't seem to find that post. </p>
                `;
            }
            toggle_blog(true);
        }
    };
    xhttp.open("GET", "/post/" + encodeURIComponent(post) + ".html", true);
    xhttp.send();
}

function get_post(inc){
    search_parameters = new URLSearchParams(window.location.search);
    this_post = latest_post;
    if(search_parameters.has('p')){
        this_post = parseInt(search_parameters.get('p'));
    }

    new_post = this_post + inc;
    if( new_post <= latest_post && new_post >= 1){
        history.pushState({}, "", "index.html?p="+new_post);
        load_post(new_post);
    }
}

function load_page(page){
    page_body = document.getElementById("page_content");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                page_body.innerHTML = this.responseText;
            }else{
                page_body.innerHTML = `
                    <h1> 404 - Not found </h1>
                    <p> Sorry, I can't seem to find that page. </p>
                `;
            }
            toggle_blog(false);
        }
    };
    xhttp.open("GET", "/page/" + encodeURIComponent(page) + ".html", true);
    xhttp.send();
}

function toggle_blog(b){
    blog_body = document.getElementById("blog_content");
    page_body = document.getElementById("page_content");
    if(b){
        page_body.innerHTML = "";
        page_body.style.display = "none";
        blog_body.style.display = "block";
    }else{
        post_body = document.getElementById("post");
        post_body.innerHTML = "";
        blog_body.style.display = "none";
        page_body.style.display = "block";
    }
}

function init_page(){
    search_parameters = new URLSearchParams(window.location.search);
    if(search_parameters.has('page')){
        load_page(search_parameters.get('page'));
    }else{
        if(search_parameters.has('p')){
            load_post(search_parameters.get('p'));
        }else{
            history.pushState({}, "", "index.html?p="+latest_post);
            load_post(latest_post);
        }
    }
}

function load_about(){
    history.pushState({}, "", "index.html?page=about");
    init_page();
}

function load_archive(){
    history.pushState({}, "", "index.html?page=archive");
    init_page();
}

function load_blog(){
    history.pushState({}, "", "index.html");
    init_page();
}

window.onpopstate = function(event) {init_page();};
window.onload = init_page();