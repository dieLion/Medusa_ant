$(function() {
    $(document).keydown(function(event) {
		Typer.addText(event);
        // setInterval(function() {
			// Typer.addText(event)
			// },500);
    })
});
var Typer = {
    text: null,
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: "",
    accessCount: 0,
    deniedCount: 0,
    init: function() {
        accessCountimer = setInterval(function() {
            Typer.updLstChr()
        },
        500);
        $.get(Typer.file,
        function(data) {
            Typer.text = data;
        })
    },
    content: function() {
        return $("#console").html();
    },
    write: function(str) {
        $("#console").append(str);
        return false
    },
    makeAccess: function() {
        Typer.hidepop();
        Typer.accessCount = 0;
        var ddiv = $("<div id='gran'>").html("");
        ddiv.addClass("accessGranted");
        ddiv.html("<h1>ACCESS GRANTED</h1>");
        $(document.body).prepend(ddiv);
        return false
    },
    makeDenied: function() {
        Typer.hidepop();
        Typer.deniedCount = 0;
        var ddiv = $("<div id='deni'>").html("");
        ddiv.addClass("accessDenied");
        ddiv.html("<h1>ACCESS DENIED</h1>");
        $(document.body).prepend(ddiv);
        return false
    },
    hidepop: function() {
        $("#deni").remove();
        $("#gran").remove()
    },
    addText: function(key) {
        if (key.keyCode == 18) {
            Typer.accessCount++;
            if (Typer.accessCount >= 3) {
                Typer.makeAccess();
            }
        } else if (key.keyCode == 20) {
            Typer.deniedCount++;
            if (Typer.deniedCount >= 3) {
                Typer.makeDenied();
            }
        } else if (key.keyCode == 27) {
            Typer.hidepop();
        } else if (Typer.text) {
            var cont = Typer.content();
            if (cont.substring(cont.length - 1, cont.length) == "|") $("#console").html($("#console").html().substring(0, cont.length - 1));
            if (key.keyCode != 8) {
                Typer.index += Typer.speed;
            } else {
                if (Typer.index > 0) Typer.index -= Typer.speed;
            }
            var text = $("<div/>").text(Typer.text.substring(0, Typer.index)).html();
            var rtn = new RegExp("\n", "g");
            var rts = new RegExp("\\s", "g");
            var rtt = new RegExp("\\t", "g");
            $("#console").html(text.replace(rtn, "<br/>").replace(rtt, " ").replace(rts, " "));
            window.scrollBy(0, 50);
        }
        if (key.preventDefault && key.keyCode != 122) {
            key.preventDefault()
        };
        if (key.keyCode != 122) {
            key.returnValue = false
        }
    },
    updLstChr: function() {
        var cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) == "|") $("#console").html($("#console").html().substring(0, cont.length - 1));
        else this.write("|");
    }
}