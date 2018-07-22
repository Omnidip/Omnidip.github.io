
//----------------------//
//----LOGO ANIMATION----//
//----------------------//

logo_animation_canvas = document.getElementById("logo_animation");

lac_w = 1000;
lac_h = 200;

//center
lac_wc = lac_w/2.0;
lac_hc = lac_h/2.0;

//padding
lac_pradw = lac_wc - 5;
lac_pradh = lac_hc - 10;

//offset
lac_offx = -450;
lac_offy = -80;

lac_context = logo_animation_canvas.getContext("2d");

logo_n_arms     = 12;
logo_p_per_arm  = 30;
logo_p_base     = 10;//px
logo_p_varience = 20;//px
logo_step       = 0;
logo_tilt       = 1.45;//rad
logo_particles  = [];

//generate the galaxy particles
for (a=logo_n_arms-1; a>=0; a--) {//reverse order
    for (p=0; p<logo_p_per_arm; p++) {
        logo_particles.push([a, Math.random(), Math.random(), Math.random(), Math.round(Math.random()-0.2)])//arm, pos, width, height, color
    }
}

//logo_particles.sort(function(a,b){return b[1] - a[1]});

function draw_particles(){
    //clear the canvas for drawing
    lac_context.clearRect(0, 0, lac_w, lac_h);

    for (p=0; p<logo_particles.length; p++) {
        part = logo_particles[p];

        if(part[4] == 0){
            lac_context.fillStyle = "#3D3C4D";
        }else{
            lac_context.fillStyle = "#A65C57";
        }

        ang = ((Math.PI*2.0)/logo_n_arms) * part[0] + ((Math.PI/1.8) * part[1]) - (logo_step/500.0);

        xoff = (Math.sin(ang) * part[1]*lac_pradw);
        yoff = (Math.cos(ang) * part[1]*lac_pradh);

        px = lac_wc + xoff*Math.sin(logo_tilt) + yoff*Math.cos(logo_tilt);
        py = lac_hc + xoff*Math.cos(logo_tilt) + yoff*Math.sin(logo_tilt);

        lac_context.fillRect(
            px + lac_offx,
            py + lac_offy,
            part[2]*logo_p_varience + logo_p_base,
            part[3]*logo_p_varience + logo_p_base
        );
    }
}

setInterval(function(){
    logo_step++;
    draw_particles();
},50);