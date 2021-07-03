console.log("Script Loaded")
$(document).ready(function() {
   
   
    function createPlayer(Obj) {
       
        
            var PlayerWrapper = $("<div>").attr("id","player-wrapper");
            var Iframe = $("<iframe>",{
                src :"https://player.vimeo.com/video/"+Obj[0].vimeoId,
                id : "video-player",
                frameborder : 0,
            }).attr("allowFullScreen","");
            var ActionTitle = $("<div>");
            var Actions = $("<div>").attr("id","video-actions");
            var ViewsPara = $("<p>").text("views")
            var ViewSpan = $("<span>").text(Obj[0].views/1000 +"k ").attr("id","views-count");
            var IconWrap = $("<div>")
            var IconHeart = $("<i>").addClass("far fa-heart");
            var IconComment = $("<i>").addClass("far fa-comment-alt");
            var IconBookMark = $("<i>").addClass("far fa-bookmark");
            var VideoTitle = $("<h3>").text(Obj[0].title).attr("id","video-title");
            var VideoDescription = $("<p>").text(Obj[0].description).attr("id","video-description");
            $(IconWrap).append(IconHeart,IconComment,IconBookMark)
            $(ViewsPara).prepend(ViewSpan)
            $(Actions).append(ViewsPara)
            $(Actions).append(IconWrap)
            $(ActionTitle).append(Actions)
            $(ActionTitle).append(VideoTitle)
            $(ActionTitle).append(VideoDescription)
            $(PlayerWrapper).append(Iframe)
            
            $(PlayerWrapper).append(ActionTitle)
            
            return PlayerWrapper;
        
        
    }


    function createPlaylist(Obj)
    {
        var PlaylistWrapper = $("<div>").attr("id","playlist-wrapper"); 
        for(var i=0;i<Obj.length;i++)
        {
            var PlaylistCard = $("<div>").attr("id","card"+[i+1]).addClass("playlist-card");
            if(i == 0){
                var PlaylistCard = $("<div>").attr("id","card"+[i+1]).addClass("playlist-card").addClass("active-card")
            }
            var Image = $("<img/>").attr("src",Obj[i].thumbnail).addClass("thumbnail");
            var Details = $("<h3>").text(Obj[i].title).addClass("video-card-title")

            $(PlaylistCard).append(Image);
            $(PlaylistCard).append(Details);
            if(i == 6)
            {
                break;
            }
            $(PlaylistWrapper).append(PlaylistCard)
            
        }

       
        return PlaylistWrapper
    }

    
    var PlayerSection = document.getElementById("player-section");
    $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/video",function(response){
        
        $(PlayerSection).append(createPlayer(response));
        
        
        $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/playlist",function(response1){
        
            $(PlayerSection).append(createPlaylist(response1));
            
            $(".playlist-card").click(function(){

            var clickIndex = ($(".playlist-card").index(this));

            $("#video-player").attr("src","https://player.vimeo.com/video/"+response[clickIndex].vimeoId);  
            $("#views-count").text(response[clickIndex].views/1000 +"k "); 
            $("#video-title").text(response[clickIndex].title); 
            $("#video-description").text(response[clickIndex].description);
            $(".playlist-card").removeClass("active-card");
            $(this).addClass("active-card"); 
            $(window).scrollTop(50);  
             })
        })  
    })
    
    
    

    
}); 