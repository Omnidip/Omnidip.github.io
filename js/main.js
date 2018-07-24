
// --------------- //
latest_post = 1;
// --------------- //

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
        }
    };
    xhttp.open("GET", "/post/" + encodeURIComponent(post) + ".html", true);
    xhttp.send();
}

function load_page(){
    search_parameters = new URLSearchParams(window.location.search);
    if(search_parameters.has('p')){
        load_post(search_parameters.get('p'));
    }else{
        history.pushState({}, "", "index.html?p="+latest_post);
        load_post(latest_post);
    }
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

window.onpopstate = function(event) {load_page();};
window.onload = load_page();