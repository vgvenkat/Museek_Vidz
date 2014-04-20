$(document).ready(function(){

    
    display_info();
    });
function  display_info(){
$.get( "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=USA&api_key=da52a7bf3835464bfef379522f19efbe&format=json", function( data ) {
      //console.log(data.topartists);
    var new_data=data.topartists.artist;
   // console.log(new_data);
    $.each(new_data,function(){
    var name = this.name;
        var p = $('<p>');
        p.attr('class','para');
        p.text(name);
        console.log('name',name);
        console.log('para:',p);
        
    console.log(this.image[3]['#text']);
        var li = $('<li>');
        var figure = $('<figure>');
        var figure_caption = $('<figcaption>');
        
        
        $(figure_caption).append(p);
        var img = $('<img>');
        img.attr('src',this.image[3]['#text']);
        p.on('click',function(){
            window.location=name;
        });
         $(figure).append(img);
        $(figure).append(figure_caption);
        $(li).append(figure);
        $('ul').append(li);
    });
 });
}