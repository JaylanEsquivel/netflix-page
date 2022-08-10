$(document).ready(function(){

    buscar_generos();
        
});		

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    $(".navbar").css('background-color', '#000');
  } else {
    $(".navbar").css('background-color', '#33333361');
  }
}


function buscar_generos(){

    $.ajax({
        url:'https://api.themoviedb.org/3/genre/movie/list', //Página PHP que seleciona postagens
        type:'GET', // método post, GET ...
        data: "api_key=49453ddd24d2109cbd2875df16cdd76f&page=1&limit=5&language=pt-BR", //seus paramêtros
        success: function(data){ // sucesso de retorno executar função
            
                var cont = 0;
                var htm = "";
                var list_array = [];
                $.each(data['genres'], function( p, item ){
                    if(cont <= 2){
                        htm += "<div class='bloco'>";
                        htm += "<h3>"+item.name+"</h3>";
                        htm += "<div id='film-"+item.id+"' style='color: #fff' ></div>";
                        htm += "</div>";

                        list_array.push(item.id);
                    }
                    cont++;
                });

                $(".slides").html(htm);
                buscar_filmes(list_array);

        } // fim success
     }); // fim ajax
}

function buscar_filmes(list){

    for(var i = 0; i < list.length; i++){
        var id_gen = list[i];
        $.ajax({
            url:'https://api.themoviedb.org/3/discover/movie', //Página PHP que seleciona postagens
            type:'GET', // método post, GET ...
            async: false,
            data: "api_key=49453ddd24d2109cbd2875df16cdd76f&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres="+id_gen+"&page=1&with_watch_monetization_types=flatrate" //seus paramêtros
        }).done(function (data) {
            var li = "";

            li += "<div class='owl-carousel owl-theme'>";
            $.each(data['results'], function( p2, item2 ){

                li += "<div class='item'>";
                li += "<img src='https://image.tmdb.org/t/p/original/"+item2.poster_path+"' />";
                li += "</div>";

            });
            li += "</div>";

            $("#film-"+id_gen).html(li);
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            });
        });

        //$("#film-"+id_gen).html(id_gen+testList);

        /*
        $.ajax({
            url:'https://api.themoviedb.org/3/discover/movie', //Página PHP que seleciona postagens
            type:'GET', // método post, GET ...
            data: "api_key=49453ddd24d2109cbd2875df16cdd76f&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres="+id_gen+"&page=1&with_watch_monetization_types=flatrate", //seus paramêtros
            success: function(data, id_gen){ // sucesso de retorno executar função
                
                $.each(data['results'], function( p2, item2 ){
                    console.log(item2.poster_path+"-"+id_gen);
                });

            } // fim success
        }); // fim ajax

        */
    }
}
