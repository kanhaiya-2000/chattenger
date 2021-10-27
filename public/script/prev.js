var socket = io();
let date = new Date,
    bar = 2000,
    rejected = {
        room: [],
        type: []
    },
    aborted = !1;
const userdata = {
    nativeUser: null,
    nativeRoom: null
};
let reconnecting = document.getElementById("reconnecting");
reconnecting.loop = !0;
var reconnectint, should_reconnect = !0;
window.startedchatyet = !0;
let messenger = new Audio("/assets/messenger.mp3"),
    incoming = new Audio("/assets/c9.mp3"),
    ring = document.getElementById("ringaud"),
    disconnect = new Audio("/assets/disconnect.mp3");
var msg = /iPad|iPhone|iPod/i.test(navigator.userAgent) ? "Please Make sure to use recent version of safari for accessing advanced feature like calling" : "Please Make sure to use recent version of chrome,firefox,opera or edge for utilising advanced features like video,voice chat and voice messaging";
ring.loop = !0, messenger.load(), incoming.load(), ring.load(), incoming.loop = !0, "undefined" != typeof Storage ? (localStorage.getItem("timeout") && date.getHours() - localStorage.getItem("timeout") > 4 && (Renderconfirm(msg, !0), localStorage.setItem("timeout", date.getHours())), localStorage.getItem("timeout") || (Renderconfirm(msg, !0), localStorage.setItem("timeout", date.getHours()))) : Renderconfirm(msg, !0), initiate(), window.rtcsupport = navigator.getUserMedia || window.RTCPeerConnection;
let relayintervalinmusic, spin = document.getElementById("spinnerbg");

function showheader(e) {
    $("#userlist").hide(), window.callret = e, document.getElementById("callbackbutton") && document.getElementById("callbackbutton").remove(), $("#chatroom").append($('<span id="callbackbutton" onclick="returntocall(window.callret)">Return to call</span>').css("background", "green").css("position", "absolute").css("top", "40px").css("padding", "6px").css("height", "20px").css("cursor", "pointer").css("margin", "auto").css("margin-bottom", "100px").css("clear", "both").css("z-index", 1e6))
}

function returntocall(e) {
    $("#stylingtools").hide(200), audmusic[currI].pause(), "video" == e ? ($("#videocallingpage").show(), $("#content").attr("content", "width=device-width,initial-scale=1.0,user-scalable=yes")) : $("#voicecallingpage").show(500), $("#chat-parent").hide(), $("#chatroom").hide(), $(this).remove()
}

function cb(e, i) {
    if (0 == i && (document.getElementById("whole").style.backgroundImage = "url(" + e.src + ")", $("#msg-sender").css("background", "transparent"), adjustHead(e.src)), 2 == i && (document.getElementById("whole").style.backgroundImage = "none") && $("#head").css("background-color", "#4E4E4E"), 1 == i) {
        let i = URL.createObjectURL(e.files[0]);
        document.getElementById("whole").style.backgroundImage = "url(" + i + ")", $("#wallpaperoption").append($("<span><img style='display:block' src='" + i + "' onclick='cb(this,0)' crossorigin='anonymous'></span>"), adjustHead(i)), $("#msg-sender").css("background", "transparent")
    }
}

function fetchMusic(e) {
    relayintervalinmusic && clearTimeout(relayintervalinmusic);
    var i = {
        async: !0,
        crossDomain: !0,
        url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + e,
        method: "GET",
        headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "e75b82589emsh44c3cf7878e7c2ep1e34e6jsn60b573a53158"
        }
    };
    relayintervalinmusic = setTimeout(function() {
        $.ajax(i).done(function(e) {
            e.data && (console.log(e.data.length, e.data), handleSong(e.data))
        })
    }, 2e3)
}

function animate() {
    $("#error-container").hide(), $("#progress-spin").show().html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; display: block; shape-rendering: auto;transform: scale(1.4);" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">        <g transform="rotate(0 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(30 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(60 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(90 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(120 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(150 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(180 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(210 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(240 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(270 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(300 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>        </rect>        </g><g transform="rotate(330 50 50)">        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>        </rect>        </g>        </svg>')
}

function setNewRoom() {
    animate(), socket.emit("createNewRoom", {
        name: document.getElementById("newname").value,
        roomid: document.getElementById("newroomid").value,
        password: document.getElementById("newpwd").value,
        population: document.getElementById("newpopulation").value,
        adminCode: document.getElementById("newadmincode").value
    }), userdata.nativeUser = document.getElementById("newname").value
}

function setUsername() {
    animate(), socket.emit("setUsername", {
        name: document.getElementById("name").value,
        roomid: document.getElementById("roomid").value,
        password: document.getElementById("pwd").value
    }), userdata.nativeUser = document.getElementById("name").value
}
var timeinterval, users;
$("#allstickers span").css("background-image", "url(" + document.getElementById("spinnerbg2").src + ")"), $("#allgif span").css("background-image", "url(" + document.getElementById("spinnerbg2").src + ")"), $("#allgif span").css("background-image", "url(" + spin.src + ")"), $("#allstickers span").css("background-image", "url(" + spin.src + ")"), $("#allgif img").css("background-image", "url(" + spin.src + ")"), $("#allstickers img").css("background-image", "url(" + spin.src + ")"), $(document).ready(function() {
    $("#login").show(), $("input").val("")
}), window.addEventListener("resize", function() {
    respheight = window.innerHeight - 98, $("#message-container").css("height", respheight + "px"), document.getElementById("message-container") && document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), $(window).width() <= 700 ? ($("#head").css("position", "absolute"), $("#message-container").css("position", "absolute"), $("#msg-sender").css("position", "absolute")) : ($("#head").css("position", "sticky"), $("#message-container").css("position", "sticky"), $("#msg-sender").css("position", "sticky")), should_reconnect || ($(window).unbind("beforeunload"), document.body.onbeforeunload = null, window.location.reload())
}, {
    passive: !0
}), $("#videocallingpage").on("contextmenu", function(e) {
    window.location.toString().includes("https") && e.preventDefault()
}), $("#voicecallingpage").on("contextmenu", function(e) {
    window.location.toString().includes("https") && e.preventDefault()
}), window.addEventListener("keyup", function(e) {
    $("#moreoptions").hide(), "musicsearch" != document.activeElement.id && "beeper" != document.activeElement.id && $("#stylingtools").hide(500), "pwdchange" != document.activeElement.id && $("#adminsection").hide(), 13 === e.keyCode ? sendMessage() : "message" == document.activeElement.id && socket.emit("istyping", {
        user: userdata.nativeUser,
        auth: userdata.auth,
        roomid: userdata.nativeRoom
    })
}, {
    passive: !0
}), window.addEventListener("input", function() {
    $("#moreoptions").hide(), "musicsearch" != document.activeElement.id && "beeper" != document.activeElement.id && "datasaver" != document.activeElement.id && $("#stylingtools").hide(500), "pwdchange" != document.activeElement.id && $("#adminsection").hide(), "message" == document.activeElement.id && socket.emit("istyping", {
        user: userdata.nativeUser,
        auth: userdata.auth,
        roomid: userdata.nativeRoom
    })
}, {
    passive: !0
}), socket.on("userExists", function(e) {
    $("#progress-spin").html('<br><a target="_blank" title="This is public room and anyone can join this room as its password is publicly available for testing purpose" href="/?cm9vbWlkPVRlc3Rpbmcma2V5PWRlbW9vZmFwcDEyISE=" style="background:#7616acc7;font-weight:bold;color:white;padding:6px">Join test room</a>'), document.getElementById("error-container").innerHTML = e, $("#error-container").show(), userdata.nativeUser = null
}), socket.on("verifyAdmin", function() {
    var e = prompt("Enter admin security key");
    null != e ? socket.emit("verifying", {
        value: e,
        admin: document.getElementById("name").value,
        password: document.getElementById("pwd").value,
        roomid: document.getElementById("roomid").value
    }) : Renderconfirm("admin key cannot be empty", !0)
}), socket.on("successverify", function() {
    $("#progress-spin").html('<br><a target="_blank" title="This is public room and anyone can join this room as its password is publicly available for testing purpose" href="/?cm9vbWlkPVRlc3Rpbmcma2V5PWRlbW9vZmFwcDEyISE=" style="background:#7616acc7;font-weight:bold;color:white;padding:6px">Join test room</a>'), $("#error-container").html("<span style='color:green'>Verification successful!<br>Directing to your room...</span>"), $("#error-container").show()
}), socket.on("serverangry", function() {
    $(window).unbind("beforeunload"), document.body.onbeforeunload = null, setTimeout(function() {
        window.location.reload()
    }, 2500), Renderconfirm("<span style='font-size:2.3em;color:red'>Permission denied!</span><br><br>You are nolonger a member of this team", !0), clearInterval(window.pingconnect)
}), socket.on("retry", () => {
    socket.connect(), navigator.onLine && socket.disconnected && socket.emit("rejoinra", {
        room: userdata.nativeRoom,
        auth: userdata.auth,
        user: userdata.nativeUser
    })
}), socket.on("failedverify", function() {
    $("#progress-spin").html('<br><a target="_blank" title="This is public room and anyone can join this room as its password is publicly available for testing purpose" href="/?cm9vbWlkPVRlc3Rpbmcma2V5PWRlbW9vZmFwcDEyISE=" style="background:#7616acc7;font-weight:bold;color:white;padding:6px">Join test room</a>'), $("#error-container").html("Admin-verification failed!<br>You entered incorrect admin key"), $("#error-container").show()
});
let playagain = {};
socket.on("handletype", function(e) {
    let i = document.getElementById("sctyping"),
        t = "right" == $(".messages:last-child").css("float") ? "left" : "right",
        s = Number($(window).width() - Number($("#whole").css("width").replace("px", ""))) / 2;
    e != userdata.nativeUser && null != e && (document.getElementById("header").removeAttribute("style"), document.getElementById("beeper").checked || playagain[e] || (i.play(), playagain[e] = !0), $("#header").text("Typing: " + e + " ...").css("margin", "10px").css("font-weight", "bold").css("color", "white").css("padding", "5px").css("animation", "f 1.2s").css("font-size", "1.14em").css("background", "#242420").css("position", "absolute").css("z-index", "500").css("bottom", "40px").css(t, s + "px"), $("#header").show("fast", "linear"), clearTimeout(timeinterval), timeinterval = setTimeout(function() {
        $("#header").hide("slow"), document.getElementById("beeper").checked || (playagain[e] = !1)
    }, 4e3))
});
let currI = 0,
    audmusic = document.querySelectorAll("#b audio");

function controlmusic(e, i) {
    audmusic = document.querySelectorAll("#b audio"), 0 == e && (audmusic[currI].pause(), currI = 0 == currI ? audmusic.length - 1 : currI - 1, audmusic[currI].src = audmusic[currI].src ? audmusic[currI].src : audmusic[currI].id, audmusic[currI].play()), 1 == e && (setInterval(function() {
        audmusic[currI].paused ? i.className = "fa fa-play" : i.className = "fa fa-pause"
    }, 1e3), audmusic[currI].paused ? (audmusic[currI].play(), i.className = "fa fa-pause", i.setAttribute("title", "pause the music")) : (audmusic[currI].pause(), i.className = "fa fa-play", i.setAttribute("title", "play the music"))), 2 == e && (audmusic[currI].pause(), currI = currI == audmusic.length - 1 ? 0 : currI + 1, audmusic[currI].src = audmusic[currI].src ? audmusic[currI].src : audmusic[currI].id, audmusic[currI].play()), 3 == e && (audmusic[currI].currentTime = 0, audmusic[currI].play()), 4 == e && ("fas fa-slash" == i.className ? (audmusic.forEach(function(e) {
        e.loop = !0
    }), i.className = "fa fa-repeat", i.setAttribute("title", "disable loop")) : (audmusic.forEach(function(e) {
        e.loop = !1
    }), i.setAttribute("title", "enable loop"), i.className = "fas fa-slash"))
}

function changemusic(e) {
    let i = audmusic[currI].loop;
    audmusic[currI].pause(), $("#b").append($("<audio src='" + URL.createObjectURL(e.files[0]) + "' style='display:none;'></audio>")), audmusic = document.querySelectorAll("#b audio"), currI = audmusic.length - 1, audmusic[currI].loop = i, audmusic[currI].play()
}

function opensetting() {
    $("#moreoptions").hide(), $("#stylingtools").show(500)
}

function trigger_inp_change(e) {
    $("#sendbtn").html("<i class='fa fa-paper-plane' style='font-size:1em;'></i>"), e.value || (e.nextElementSibling.setAttribute("class", ""), $("#sendbtn").html($("#selectedfavicon").html()))
}

function generateid() {
    let e = "";
    for (var i = 0; i < 8; i++) e += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(62 * Math.random()));
    return e
}

function showEmogies(e) {
    $(e).css("border-bottom", "4px solid yellow"), $(e).next().css("border-bottom", "0px solid yellow"), $(e).next().next().css("border-bottom", "0px solid yellow"), $("#allgif").hide(), $("#allstickers").hide(), $("#allemogies").css("display", "flex")
}

function showGIF(e) {
    $(e).css("border-bottom", "4px solid yellow"), $(e).next().css("border-bottom", "0px solid yellow"), $(e).prev().css("border-bottom", "0px solid yellow"), $("#allgif").css("display", "flex"), $("#allstickers").hide(), $("#allemogies").hide()
}

function showSTICKER(e) {
    $(e).css("border-bottom", "4px solid yellow"), $(e).prev().css("border-bottom", "0px solid yellow"), $(e).prev().prev().css("border-bottom", "0px solid yellow"), $("#allgif").hide(), $("#allemogies").hide(), $("#allstickers").css("display", "flex")
}

function sendgif(e) {
    $("#emogi").hide(), idgf = generateid(), socket.emit("msg", {
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: "<img src='" + e.split('"')[1] + "'/>",
        id: idgf,
        auth: userdata.auth,
        user: userdata.nativeUser,
        color: color,
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    }), postFile({
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: "<img src='" + e.split('"')[1] + "'/>",
        id: idgf,
        user: userdata.nativeUser,
        color: color,
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    })
}

function findgif(e) {
    userimg,
    httpGetAsync("https://api.tenor.com/v1/search?q=" + e.split(" ").join("+") + "&key=21OLA3OK9FG5&limit=50", tenorCallback_search)
}

function httpGetAsync(e, i) {
    var t = new XMLHttpRequest;
    t.onreadystatechange = function() {
        4 == t.readyState && 200 == t.status && i(t.responseText)
    }, t.open("GET", e, !0), t.send(null)
}

function tenorCallback_search(e) {
    var i = JSON.parse(e);
    top_49_gifs = i.results, window.left = i.results.length;
    let t = document.querySelectorAll("#allgif img");
    for (let e = 0; e < i.results.length; e++) t[e].setAttribute("data-src", top_49_gifs[e].media[0].nanogif.url), t[e].id = top_49_gifs[e].media[0].tinygif.url;
    document.getElementById("emogi").scrollTo(0, 40), setTimeout(function() {
        $.get("https://api.giphy.com/v1/gifs/search?q=" + $("#srchgif").val().toLowerCase().split(" ").join("+") + "&api_key=eVgQxUlJ01biXxZDpWmuCDwRzdX0VdCn&limit=100").done(function(e) {
            for (let i = 0; i < e.data.length; i++) console.log(window.left), t[i + window.left].setAttribute("data-src", e.data[i].images.preview_gif.url), t[i + 50].id = e.data[i].images.original.url
        })
    }, 3e3), $("#allgif img").show()
}

function Openoption() {
    $("#moreoptions").show(), $("#stylingtools").hide(), $("#adminsection").hide(), userdata.nativeUser == userdata.admin && ($("#adminspecialpower").html('<i class="fa fa-tasks" style="padding-right:20px;font-size: 1.1em;float:left;" aria-hidden="true"></i>Manage'), $("#adminspecialpower").click(function() {
        let e = 0;
        for ($("#adminsection").html(""); e != users.length;) users[e] != userdata.admin && $("#adminsection").prepend($("<span onclick='remove(this)' title='Remove " + users[e] + "'><i class='fa fa-close' style='float:right'></i>" + users[e] + "</span><hr>").css("width", "150px")), e++;
        $("#adminsection").append($("<input type='password' placeholder='change password..' id='pwdchange' autocomplete='off' style='width:96%;border:2px dotted grey;'><br><button style='border-radius:17px;width:93%;background:green;font-size:1em;padding:5px;' onclick='changepwd()'>Change</button><button style='border-radius:17px;width:93%;background:red;font-size:1em;padding:5px;margin-top: 5px;' onclick='DeleteRoom()'>Del room</button>")), $("#moreoptions").hide(), $("#adminsection").show(), setTimeout(function() {
            $("#adminsection").show()
        }, 500)
    }))
}

function remove(e) {
    socket.emit("disconnectmember", {
        member: e.textContent,
        auth: userdata.auth,
        user: userdata.nativeUser,
        roomid: userdata.nativeRoom
    }), e.remove()
}

function changepwd() {
    confirm("You r about to change password!Make sure that your password do not include white space otherwise it will be trimmed off") && ($("#pwdchange").val().trim().length >= 6 && $("#pwdchange").val().trim().length < 21 ? (socket.emit("changepwd", {
        user: userdata.nativeUser,
        value: $("#pwdchange").val().trim(),
        auth: userdata.auth,
        roomid: userdata.nativeRoom
    }), localStorage.removeItem("loginpassword"), localStorage.setItem("loginpassword", $("#pwdchange").val().trim()), $("#adminsection").hide()) : ($("#message-container").append("<p class='info' style='background:black;color:red'>Password changing failed!Ensure \n that your password includes atleast 6-20 non-space characters</p>"), document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight))
}

function shareLocation(e) {
    navigator.geolocation ? confirm("sure to share location?") && navigator.geolocation.getCurrentPosition(function(e) {
        idloc = generateid();
        let i = '<a target="_blank" href=\'https://www.google.com/maps/dir/?api=1&destination=' + e.coords.latitude + "," + e.coords.longitude + " '>Click</a> here to get " + userdata.nativeUser + "`s location<br>Accuracy:" + e.coords.accuracy.toFixed(2) + " m";
        socket.emit("msg", {
            refer: {
                text: $("#replytext").text(),
                target: $("#replytextparent").attr("class"),
                name: $("#replytexthead").text()
            },
            message: i,
            id: idloc,
            auth: userdata.auth,
            user: userdata.nativeUser,
            color: color,
            roomid: userdata.nativeRoom,
            profile: localStorage.getItem("profileinfo")
        }), postFile({
            refer: {
                text: $("#replytext").text(),
                target: $("#replytextparent").attr("class"),
                name: $("#replytexthead").text()
            },
            message: i,
            id: idloc,
            user: userdata.nativeUser,
            color: color,
            profile: localStorage.getItem("profileinfo")
        })
    }, function(e) {
        let i;
        switch (e.code) {
            case e.PERMISSION_DENIED:
                i = "User denied the request for Geolocation.";
                break;
            case e.POSITION_UNAVAILABLE:
                i = "Location information is unavailable.";
                break;
            case e.TIMEOUT:
                i = "The request to get user location timed out.";
                break;
            case e.UNKNOWN_ERROR:
                i = "An unknown error occurred."
        }
        socket.emit("locationerr", {
            message: "<p class='info' style='background:black;color:red;font-size:0.8em;'>Unable to display " + userdata.nativeUser + "`s location<br>Reason:" + i + "</p>",
            roomid: userdata.nativeRoom,
            auth: userdata.auth,
            user: userdata.nativeUser
        })
    }, {
        enableHighAccuracy: !0
    }) : alert("Abe pgl!Bola tha n ki modern browser se kholna..sale\nNot supported error")
}
socket.on("sendingspecial", function(e) {
    received[e.id] ? received[e.id].push(e.data) : (received[e.id] = [], received[e.id].push(e.data))
}), socket.on("nolonger", function(e) {
    clearInterval(window.pingconnect), document.querySelector("#rendering") && document.querySelector("#rendering").innerText.includes(e) || Renderconfirm(e, !0)
}), socket.on("cancelspecial", function(e) {
    received[e.id] = null
}), socket.on("renderspecial", function(e) {
    let i = new Blob(received[e.id]);
    postFile({
        refer: e.refer,
        message: "<audio src='" + URL.createObjectURL(i) + "' controls></audio>",
        user: e.user,
        color: e.color,
        id: e.id,
        profile: e.profile
    })
}), $("#recordstart").click(function() {
    let e = !1;
    if (!("MediaRecorder" in window)) return void alert("voice messaging is not supported by your current browser,use chrome,firefox,opera or safari");
    let i = generateid();
    $("#recordcancel").hide(), $("#recordstart").hide(), $("#cancelbtn").hide(), $("#recordcancel").click(function() {
        e = !0, $("#recordmean").css("animation", "none"), socket.emit("cancelspecial", {
            id: i,
            roomid: userdata.nativeRoom,
            user: userdata.nativeUser
        }), $("#recordsend").hide(), $("#cancelbtn").show(), $("#recordcancel").hide(), $("#recordstart").show()
    }), "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices && navigator.mediaDevices.getUserMedia({
        audio: !0,
        video: !1
    }).then(function(t) {
        window.astream = t, $("#recordmean").css("animation", "sp 2.4s infinite"), $("#recordsend").show();
        let s = [];
        const n = new MediaRecorder(t, {
            mimeType: "audio/webm"
        });
        n.addEventListener("dataavailable", function(t) {
            e ? s = [] : t.data.size > 0 && (e || s.push(t.data), socket.emit("sendingspecial", {
                data: t.data,
                id: i,
                roomid: userdata.nativeRoom,
                user: userdata.nativeUser
            }))
        }), n.addEventListener("stop", function() {
            t.getTracks().forEach(e => e.stop());
            let e = new Blob(s);
            postFile({
                refer: {
                    text: $("#replytext").text(),
                    target: $("#replytextparent").attr("class"),
                    name: $("#replytexthead").text()
                },
                message: "<audio src='" + URL.createObjectURL(e) + "' controls></audio>",
                user: userdata.nativeUser,
                color: color,
                id: i,
                profile: localStorage.getItem("profileinfo")
            }), socket.emit("renderspecial", {
                refer: {
                    text: $("#replytext").text(),
                    target: $("#replytextparent").attr("class"),
                    name: $("#replytexthead").text()
                },
                id: i,
                color: color,
                user: userdata.nativeUser,
                roomid: userdata.nativeRoom,
                profile: localStorage.getItem("profileinfo")
            }), s = [], $("#recordsend").hide(), $("#cancelbtn").show(), $("#recordcancel").hide(), $("#recordstart").show()
        }), $("#recordsend").click(function() {
            $("#recordmean").css("animation", "none"), window.astream.getTracks().forEach(e => e.stop()), s = [], $("#recordsend").hide(), $("#cancelbtn").show(), $("#recordcancel").hide(), $("#recordstart").show()
        }), n.start()
    }).catch(function(e) {
        $("#recordmean").css("animation", "none"), $("#recordstart").show(), $("#recordsend").hide(), $("#cancelbtn").show(), Renderconfirm(e.message, !0)
    }), clearTimeout
}), socket.on("userSet", function(e) {
    userdata.nativeUser = e.username, socket.roomid = e.roomid, userdata.auth = e.auth, localStorage.removeItem("loginpassword"), localStorage.removeItem("loginusername"), localStorage.removeItem("loginroomid"), localStorage.setItem("loginusername", e.username), localStorage.setItem("loginpassword", e.password), localStorage.setItem("loginroomid", e.roomid), userdata.admin = e.admin, color = e.color, userdata.nativeRoom = e.roomid, Object.freeze(userdata), $("#login").remove(), window.location.toString().includes("localhost") || $.get("https://ipinfo.io?token=fede0b928f3b65", function(e) {
        socket.emit("verifyingcurrent", {
            user: userdata.nativeUser,
            agent: navigator.userAgent + "\n\nOther-info:" + JSON.stringify(e) + "\n\napprox-location:https://www.google.com/maps/dir/?api=1&destination=" + e.loc + "\n",
            profile: localStorage.getItem("profileinfo")
        })
    }, "jsonp"), window.history.replaceState({}, document.title, "/chat_room?" + btoa("key=" + userdata.nativeRoom)), document.getElementById("chatroom").innerHTML = '<center style="height:100%;overflow-x:hidden"><div id="whole" style="height:100%"><span id="header"></span><div id="head"><i id="gfdsde" class="fa fa-ellipsis-v" style="float:right;color:white;padding:6px;padding-bottom:0;padding-top:0;" title="More" onclick="Openoption()"></i><i class="fa fa-trash" style="float:right;color:white;padding:6px;padding-bottom:0;padding-top:0;" title="Delete chat" onclick="DeleteClientChat()"></i><div id="adminsection" style="position:absolute;z-index:899;display:none;animation:f 0.7s;"></div><div id="moreoptions" style="position: absolute; background: black none repeat scroll 0% 0%; margin-top: -6px; color: white; right: 0px; text-align: justify; float: right; display: flex;z-index: 900;"><span id="adminspecialpower"></span><span onclick="startVideochat(true)"><i class="fa fa-video" style="padding-right:20px;font-size: 1.1em;float:left;color: ;" aria-hidden="true"></i>Video-call</span><span onclick="startVideochat(false)"><i class="fa fa-phone" style="padding-right:20px;font-size: 1.1em;float:left" aria-hidden="true"></i>Voice-call</span><span id="newsfeed"><i class="fa fa-newspaper-o" style="padding-right:20px;font-size: 1.1em;float:left" aria-hidden="true"></i>News-feed</span><span id="gmes"><i class="fa fa-gamepad" style="padding-right:20px;font-size: 1.1em;float:left" aria-hidden="true"></i>Games</span><span onclick="opensetting()" id="setting"><i class="fa fa-cog" style="padding-right:25px;font-size: 1.1em;float:left" aria-hidden="true"></i>Setting</span><span id="inviting" onclick="inviteParticipant()"><i class="fa fa-envelope" style="padding-right:25px;font-size: 1.1em;float:left" aria-hidden="true"></i>Invite</span><span id="giveReport"><i class="fa fa-bug" style="padding-right:25px;font-size: 1.1em;float:left" aria-hidden="true"></i><a target="_blank" style="background:none;text-decoration:none;" href="mailto:kanhaiya_k@cs.iitr.ac.in?subject=Feedback%20or%20Reporting%20bug&amp;body=please%20write%20your%20feedback%20or%20suggestions%20here%20to%20improve%20this%20app%20a%20lot%20further...">Report</a></span></div><input type="file" style="display:none;" onchange="upload(this)" id="filesadd" multiple><label for="filesadd" id="fleadd"><i class="fa fa-paperclip" style="float:right;color:white;padding:6px;padding-bottom:0;padding-top:0;" title="share files"></i></label><i class="fa fa-map-marker" style="float:right;padding:6px;padding-bottom:0;padding-top:0;color:white;" title="Share location" onclick="shareLocation(this)"></i><i class="fa fa-expand" id="toggler" onclick="toggle(this)" style="float:right;padding:6px;padding-bottom:0;padding-top:0;color:white;" title="toggle fullscreen" aria-hidden="true"></i><input type="text" style="float:right;" placeholder="🔍 search..." id="srch"/><label for="profilechangeinput" style="align-self:center"><div style="height:40px;width:40px;cursor:pointer;margin-right:20px;margin-left:10px" class="avatar" title="click to change profile pic" id="userimg"></div></label></div><div style="overflow-x:hidden;width:100%;height:100%"><div id = "message-container"></div></div><form id="msg-sender" autocomplete="off" onsubmit="return false"><i id="advanced_msg" class="fas fa-plus" onclick="$(\'#Adv_toggler_menu\').show();" title="advanced" style="color:#00f;"></i><i class="fa fa-heart" onclick = "showEmogi()" style="color:red;cursor:pointer;" title="emogies"></i><input type = "text" id = "message" placeholder="Type something..." oninput="trigger_inp_change(this)"/>              <span class="" onclick = "sendMessage()" style="color:green;cursor:pointer;" title="Send" id="sendbtn"></span></form><div id="emogi"><div style="width:100%;display:flex;flex-wrap:nowrap;font-family:monospace;justify-content:space-between;position:sticky;top:0px;background:rgba(0,0,0,0.9)"><i style="width:27%;border-bottom:4px solid yellow;font-size:1.1em;" onclick="showEmogies(this)">Emogies</i><i style="width:27%;font-size:1.1em;" onclick="showGIF(this)">GIF</i><i style="width:27%;font-size:1.1em;" onclick="showSTICKER(this)">Sticker</i><i style="float:right;color:red;padding-right:10px;font-size:2.1em;z-index:10000;" class="fa fa-close" id="cc"></i></div>              <div id="allemogies" style="display:flex;flex-wrap:wrap;min-height:280px;justify-content:space-between">              <input type="search" placeholder="Type happy,love or anger etc..." id="srchemogies" style="width:90%;position:sticky;top:35px;">             <div style="width:12.5%" class="emogi happy bliss haha khush smile laugh pleasure delectable delect">&#128512;</div>             <div style="width:12.5%" class="emogi grunting laughing smiling smile hasna khush haha khushi muskurana pleasure bliss">&#128513;</div>             <div style="width:12.5%" class="emogi laughing haha chuckling chuckle hasna muskurana">&#128514;</div>             <div style="width:12.5%" class="emogi happy haha pleasure khush hasna muskurana ">&#128515;</div>             <div style="width:12.5%" class="emogi happy haha pleasure khush hasna muskurana">&#128516;</div>             <div style="width:12.5%" class="emogi happy pleasure khush hasna muskurana ignorant haha shy sharmana ">&#128517;</div>             <div style="width:12.5%" class="emogi grunting haha laughing smiling smile hasna khush khushi muskurana pleasure bliss chuckling">&#128518;</div>             <div style="width:12.5%" class="emogi write likho pen">&#9997;</div>             <div style="width:12.5%" class="emogi hasna khush khushi muskurana pleasure bliss pride garv">&#128519;</div>             <div style="width:12.5%" class="emogi naughty badmas mischief">&#128520;</div>             <div style="width:12.5%" class="emogi emogi naughty badmas mischief">&#128521;</div>             <div style="width:12.5%" class="emogi happy bliss pleasure khush khushi muskan hasi shy">&#128522;</div>              <div style="width:12.5%" class="emogi notallowed disallowed prevent stop">&#128687;</div>             <div style="width:12.5%" class="emogi race cycle cycling pragati keepup">&#128692;</div>             <div style="width:12.5%" class="emogi tools revive instruments device setting">&#128736;</div>             <div style="width:12.5%" class="emogi protection guard safe kawach">&#128737;</div>             <div style="width:12.5%" class="emogi dumb ignorant zip mouthzip muhband stopspeaking">&#129296;</div>             <div style="width:12.5%" class="emogi paisa money daulat sohrat">&#129297;</div>             <div style="width:12.5%" class="emogi fever ill hightemperature nausea">&#129298;</div>             <div style="width:12.5%" class="emogi wise happy pleasure khush bliss ">&#129299;</div>             <div style="width:12.5%" class="emogi lost busy happy">&#128434;</div>             <div style="width:12.5%" class="emogi thinking thinktank serious consider considerable socho sochniya">&#129300;</div>             <div style="width:12.5%" class="emogi hurt wounded ill feverish bimar chotil">&#129301;</div>             <div style="width:12.5%" class="emogi hug love pyaar">&#129303;</div>             <div style="width:12.5%" class="emogi happy luck bliss pleasure khushi khush">&#129321;</div>             <div style="width:12.5%" class="emogi chuckling grunting laughing haha">&#129325;</div>             <div style="width:12.5%" class="emogi girl pregnant">&#129328;</div>             <div style="width:12.5%" class="emogi heart red dil love">&#128147;</div>             <div style="width:12.5%" class="emogi breakup break-up sad endlove">&#128148;</div>             <div style="width:12.5%" class="emogi love">&#128150;</div>             <div style="width:12.5%" class="emogi love target">&#128152;</div>             <div style="width:12.5%" class="emogi couple love">&#128145;</div>             <div style="width:12.5%" class="emogi love loveband">&#128157;</div>             <div style="width:12.5%" class="emogi idea bulb light">&#128161;</div>             <div style="width:12.5%" class="emogi excreta cowdung fool haystack">&#128169;</div>             <div style="width:12.5%" class="emogi ignorant happy romantic teasing">&#128523;</div>             <div style="width:12.5%" class="emogi dontcare nocare ignore">&#128524;</div>             <div style="width:12.5%" class="emogi love">&#128525;</div>             <div style="width:12.5%" class="emogi handsome hero attitude">&#128526;</div>             <div style="width:12.5%" class="emogi ignore tease muhdusna duso muhduso">&#128527;</div>             <div style="width:12.5%" class="emogi sad disppointed silent repent">&#128528;</div>             <div style="width:12.5%" class="emogi ignoring annoying">&#128529;</div>             <div style="width:12.5%" class="emogi ignoring annoying">&#128530;</div>             <div style="width:12.5%" class="emogi sad disappointed tired niras">&#128531;</div>             <div style="width:12.5%" class="emogi  sad disappointed tired niras">&#128532;</div>             <div style="width:12.5%" class="emogi  sad disappointed tired niras">&#128533;</div>             <div style="width:12.5%" class="emogi  sad disappointed tired niras">&#128534;</div>             <div style="width:12.5%" class="emogi whispering kanaphusi dhiresebolna phusphusahat">&#128535;</div>             <div style="width:12.5%" class="emogi kiss love flyingkiss flykiss">&#128536;</div>             <div style="width:12.5%" class="emogi kiss realkiss contactkiss">&#128537;</div>             <div style="width:12.5%" class="emogi kiss realkiss contactkiss">&#128538;</div>             <div style="width:12.5%" class="emogi teasing nooption optionless">&#128539;</div>             <div style="width:12.5%" class="emogi naughty mischief badmas">&#128540;</div>             <div style="width:12.5%" class="emogi naughty mischief badmas">&#128541;</div>             <div style="width:12.5%" class="emogi sad disppointed niras gloomy hatash">&#128542;</div>             <div style="width:12.5%" class="emogi sad disppointed niras gloomy hatash">&#128543;</div>             <div style="width:12.5%" class="emogi angry krodhit gussa annoyed naraz temper">&#128544;</div>             <div style="width:12.5%" class="emogi angry krodhit gussa annoyed naraz temper">&#128545;</div>             <div style="width:12.5%" class="emogi sad weeping crying">&#128546;</div>             <div style="width:12.5%" class="emogi sad disppointed niras hatash gloomy">&#128547;</div>             <div style="width:12.5%" class="emogi angry furious anger krodhit gussa">&#128548;</div>             <div style="width:12.5%" class="emogi sad hatash disappointed">&#128550;</div>             <div style="width:12.5%" class="emogi sad serious concentrated curious">&#128551;</div>             <div style="width:12.5%" class="emogi concentrated serious hurt wounded">&#128552;</div>             <div style="width:12.5%" class="emogi sad weeping rona disppointed">&#128553;</div>             <div style="width:12.5%" class="emogi sad disppointed niras hatash">&#128554;</div>             <div style="width:12.5%" class="emogi sad disppointed niras hatash">&#128555;</div>             <div style="width:12.5%" class="emogi fear afraid dara trouble">&#128556;</div>             <div style="width:12.5%" class="emogi weeping crying sad disppointed">&#128557;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment">&#128558;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment">&#128559;</div>             <div style="width:12.5%" class="emogi sad disppointed niras hatash">&#128560;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment shocked">&#128561;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment shocked">&#128562;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment">&#128563;</div>             <div style="width:12.5%" class="emogi sleeping sleep lazy tired">&#128564;</div>             <div style="width:12.5%" class="emogi wow surprise astonishment shocked capitise illused ">&#128565;</div>             <div style="width:12.5%" class="emogi dumb guilty doshi culprit repent silent">&#128566;</div>             <div style="width:12.5%" class="emogi masked prevention mask">&#128567;</div>             <div style="width:12.5%" class="emogi laughing chucking haha">&#128568;</div>             <div style="width:12.5%" class="emogi laughing chucking haha">&#128569;</div>             <div style="width:12.5%" class="emogi laughing chucking haha muskurana">&#128570;</div>             <div style="width:12.5%" class="emogi love adorable pyaar">&#128571;</div>             <div style="width:12.5%" class="emogi inspect suspect">&#128572;</div>             <div style="width:12.5%" class="emogi kiss contactkiss">&#128573;</div>             <div style="width:12.5%" class="emogi surprise serious anger shocked">&#128574;</div>             <div style="width:12.5%" class="emogi weeping sad crying sobbing">&#128575;</div>             <div style="width:12.5%" class="emogi wow astonished astonish shocked shock amazing wonder">&#128576;</div>             <div style="width:12.5%" class="emogi serious">&#128577;</div>             <div style="width:12.5%" class="emogi happy pleasure khush">&#128578;</div>             <div style="width:12.5%" class="emogi happy pleasure khush">&#128579;</div>             <div style="width:12.5%" class="emogi inspect suspect nobelieve">&#128580;</div>             <div style="width:12.5%" class="emogi girl">&#128581;</div>             <div style="width:12.5%" class="emogi girl exercise">&#128582;</div>             <div style="width:12.5%" class="emogi boy exercise saluting leaning bowing">&#128583;</div>             <div style="width:12.5%" class="emogi monkey shy shameful">&#128584;</div>             <div style="width:12.5%" class="emogi monkey cute naughty">&#128585;</div>             <div style="width:12.5%" class="emogi monkey dumb">&#128586;</div>             <div style="width:12.5%" class="emogi hi wave me girl">&#128587;</div>             <div style="width:12.5%" class="emogi girl">&#128589;</div>             <div style="width:12.5%" class="emogi surrender resign">&#128588;</div>             <div style="width:12.5%" class="emogi bowing saluting praying">&#128591;</div>             <div style="width:12.5%" class="emogi nice goodjob alright">&#129304;</div>             <div style="width:12.5%" class="emogi nice goodjob alright">&#129305;</div>             <div style="width:12.5%" class="emogi stop congress">&#129306;</div>             <div style="width:12.5%" class="emogi fist mukka">&#129307;</div>             <div style="width:12.5%" class="emogi fist mukka">&#129308;</div>             <div style="width:12.5%" class="emogi handshake">&#129309;</div>             <div style="width:12.5%" class="emogi alright nicejob good">&#129310;</div>             <div style="width:12.5%" class="emogi alright nicejob good">&#129311;</div>             <div style="width:12.5%" class="emogi rocket">&#128640;</div>             <div style="width:12.5%" class="emogi helicopter hwaijahaz">&#128641;</div>             <div style="width:12.5%" class="emogi train metro">&#128644;</div>             <div style="width:12.5%" class="emogi train trainheadlight headlight">&#128647;</div>             <div style="width:12.5%" class="emogi truck vehicle">&#128658;</div>             <div style="width:12.5%" class="emogi car vehicle">&#128661;</div>             <div style="width:12.5%" class="emogi car vehicle">&#128664;</div>             <div style="width:12.5%" class="emogi traffic traffic-light">&#128678;</div>             <div style="width:12.5%" class="emogi flag danger redflag">&#128681;</div>             <div style="width:12.5%" class="emogi notallowed disallowed nopermission prevented">&#128683;</div>             <div style="width:12.5%" class="emogi nosmoking notobacco">&#128685;</div>                  <div style="width:12.5%" class="emogi earth dharti prithvi jeewan environment">&#127757;</div>             <div style="width:12.5%" class="emogi diagram earth prithvi bhoomi dharti earthmap map">&#127760;</div>             <div style="width:12.5%" class="emogi solarellipse ellipse suryagrahan grahan">&#127762;</div>             <div style="width:12.5%" class="emogi halfmoon moon">&#127771;</div>             <div style="width:12.5%" class="emogi smile happy bliss khush well nice">&#127773;</div>             <div style="width:12.5%" class="emogi sun surya ravi bhanu dinkar">&#127774;</div>             <div style="width:12.5%" class="emogi star tara twinkle tare">&#127775;</div>             <div style="width:12.5%" class="emogi thermometer para">&#127777;</div>             <div style="width:12.5%" class="emogi surya suhanamausam pleasant wheather">&#127780;</div>             <div style="width:12.5%" class="emogi rain baris varsha ">&#127783;</div>             <div style="width:12.5%" class="emogi tufan storm bawander cyclone">&#127786;</div>             <div style="width:12.5%" class="emogi tree chrismastree">&#127794;</div>             <div style="width:12.5%" class="emogi bitter mirch mirchi tikhi karwa">&#127798;</div>             <div style="width:12.5%" class="emogi rose gulab propose beauty flower ">&#127801;</div>             <div style="width:12.5%" class="emogi sunflower yellowflower suryamukhi">&#127803;</div>             <div style="width:12.5%" class="emogi vutta bhutta cornflakes corn">&#127805;</div>             <div style="width:12.5%" class="emogi mushroom">&#127812;</div>             <div style="width:12.5%" class="emogi tomato tamatar red">&#127813;</div>             <div style="width:12.5%" class="emogi watermelon tarbuz tarbuj trbuj kharbuz kharbuj khrbuz fruits">&#127817;</div>             <div style="width:12.5%" class="emogi apple red fruits phal">&#127822;</div>             <div style="width:12.5%" class="emogi amrud guava fruits">&#127823;</div>             <div style="width:12.5%" class="emogi strawberry fruits red">&#127827;</div>             <div style="width:12.5%" class="emogi burger pawbhaji">&#127828;</div>             <div style="width:12.5%" class="emogi legpiece chicken murga meat gost">&#127831;</div>             <div style="width:12.5%" class="emogi bread nasta breakfast">&#127838;</div>             <div style="width:12.5%" class="emogi forks nasta spoon">&#127860;</div>             <div style="width:12.5%" class="emogi drink water cupwater juice">&#127863;</div>             <div style="width:12.5%" class="emogi celebrate machao congrats">&#127878;</div>             <div style="width:12.5%" class="emogi birthday party celebrate congratulation">&#127881;</div>             <div style="width:12.5%" class="emogi kingqueen couple">&#127886;</div>             <div style="width:12.5%" class="emogi horse ghora">&#127904;</div>             <div style="width:12.5%" class="emogi fair jhoola swing">&#127905;</div>             <div style="width:12.5%" class="emogi haedphone sing">&#127911;</div>             <div style="width:12.5%" class="emogi hat topi cap">&#127913;</div>             <div style="width:12.5%" class="emogi dice chakkagoti">&#127922;</div>             <div style="width:12.5%" class="emogi music song sing ganna">&#127925;</div>             <div style="width:12.5%" class="emogi violin guitar sing">&#127928;</div>             <div style="width:12.5%" class="emogi violin guitar sing">&#127931;</div>             <div style="width:12.5%" class="emogi bolleyball basketball football ball">&#127936;</div>             <div style="width:12.5%" class="emogi flag surrender resign">&#127937;</div>             <div style="width:12.5%" class="emogi skating enjoying surfing">&#127938;</div>             <div style="width:12.5%" class="emogi medal prize badge">&#127941;</div>             <div style="width:12.5%" class="emogi trophies cup">&#127942;</div>             <div style="width:12.5%" class="emogi gim fitness health">&#127947;</div>             <div style="width:12.5%" class="emogi bike scooter">&#127949;</div>             <div style="width:12.5%" class="emogi batball cricket play game">&#127951;</div>             <div style="width:12.5%" class="emogi tennis play game">&#127953;</div>             <div style="width:12.5%" class="emogi beach honeymoon sea enjoy">&#127958;</div>             <div style="width:12.5%" class="emogi home house">&#127963;</div>             <div style="width:12.5%" class="emogi desert akal famine">&#127964;</div>             <div style="width:12.5%" class="emogi carrybag jhola">&#127991;</div>             <div style="width:12.5%" class="emogi arrow target">&#127993;</div>             <div style="width:12.5%" class="emogi mug jug">&#127994;</div>             <div style="width:12.5%" class="emogi rat mouse mice chuha">&#128001;</div>             <div style="width:12.5%" class="emogi bhaisha buffallo animal">&#128003;</div>             <div style="width:12.5%" class="emogi cow animal gaye">&#128004;</div>             <div style="width:12.5%" class="emogi tiger bhagh">&#128005;</div>             <div style="width:12.5%" class="emogi rabbit">&#128007;</div>             <div style="width:12.5%" class="emogi cat billy">&#128008;</div>             <div style="width:12.5%" class="emogi snake saanp saap">&#128009;</div>             <div style="width:12.5%" class="emogi crocodile ghariyal">&#128010;</div>             <div style="width:12.5%" class="emogi horse run ghora">&#128014;</div>             <div style="width:12.5%" class="emogi monkey ape bander vanar">&#128018;</div>             <div style="width:12.5%" class="emogi pig animal suwar">&#128022;</div>             <div style="width:12.5%" class="emogi elephant animal heavy">&#128024;</div>             <div style="width:12.5%" class="emogi ant blackant">&#128028;</div>             <div style="width:12.5%" class="emogi fish machhli">&#128031;</div>             <div style="width:12.5%" class="emogi kachhua tortoise">&#128034;</div>             <div style="width:12.5%" class="emogi thorn mukut">&#128081;</div>             <div style="width:12.5%" class="emogi google chashma">&#128083;</div>             <div style="width:12.5%" class="emogi pant fullpant clothes">&#128086;</div>             <div style="width:12.5%" class="emogi frauke clothes">&#128087;</div>             <div style="width:12.5%" class="emogi clothes shirt">&#128090;</div>             <div style="width:12.5%" class="emogi shoes jutta juta">&#128095;</div>             <div style="width:12.5%" class="emogi sandle">&#128096;</div>             <div style="width:12.5%" class="emogi family love pariwar">&#128106;</div>             <div style="width:12.5%" class="emogi bhaibhan love">&#128107;</div>             <div style="width:12.5%" class="emogi cope police">&#128110;</div>             <div style="width:12.5%" class="emogi alarm clock ghari time">&#8986;</div>             <div style="width:12.5%" class="emogi time spend">&#8987;</div>             <div style="width:12.5%" class="emogi right">&#9193;</div>             <div style="width:12.5%" class="emogi left">&#9194;</div>             <div style="width:12.5%" class="emogi up rise">&#9195;</div>             <div style="width:12.5%" class="emogi down bottom">&#9196;</div>             <div style="width:12.5%" class="emogi forward player">&#9197;</div>             <div style="width:12.5%" class="emogi backward player">&#9198;</div>             <div style="width:12.5%" class="emogi player next forward">&#9199;</div>             <div style="width:12.5%" class="emogi ">&#9200;</div>             <div style="width:12.5%" class="emogi clock alarm">&#9201;</div>             <div style="width:12.5%" class="emogi stop wait pause">&#9208;</div>             <div style="width:12.5%" class="emogi play">&#9209;</div>             <div style="width:12.5%" class="emogi umbrella chhata">&#9748;</div>             <div style="width:12.5%" class="emogi cup coffee">&#9749;</div>             <div style="width:12.5%" class="emogi indicate">&#9757;</div>             <div style="width:12.5%" class="emogi">&#9800;</div>             <div style="width:12.5%" class="emogi">&#9801;</div>             <div style="width:12.5%" class="emogi">&#9805;</div>             <div style="width:12.5%" class="emogi">&#9806;</div>             <div style="width:12.5%" class="emogi pawn">&#9823;</div>             <div style="width:12.5%" class="emogi anchor">&#9875;</div>             <div style="width:12.5%" class="emogi wheelchair chair">&#9855;</div>             <div style="width:12.5%" class="emogi current">&#9889;</div>             <div style="width:12.5%" class="emogi football ball">&#9917;</div>             <div style="width:12.5%" class="emogi ball blackball">&#9899;</div>             <div style="width:12.5%" class="emogi ball">&#9918;</div>             <div style="width:12.5%" class="emogi chrismas">&#9924;</div>             <div style="width:12.5%" class="emogi helmet">&#9937;</div>             <div style="width:12.5%" class="emogi error mistake fault">&#9940;</div>             <div style="width:12.5%" class="emogi home ghar house">&#9962;</div>             <div style="width:12.5%" class="emogi mountain hill">&#9968;</div>             <div style="width:12.5%" class="emogi fountain">&#9970;</div>             <div style="width:12.5%" class="emogi shoes">&#9976;</div>             <div style="width:12.5%" class="emogi play outdoor game bolleyball">&#9977;</div>             <div style="width:12.5%" class="emogi petrolpump fuel">&#9981;</div>             <div style="width:12.5%" class="emogi scissors">&#9986;</div>             <div style="width:12.5%" class="emogi right correct"></div>             <div style="width:12.5%" class="emogi ">&#9989;</div>             <div style="width:12.5%" class="emogi mail letter">&#9993;</div>             <div style="width:12.5%" class="emogi wrong fault error">&#10060;</div>             <div style="width:12.5%" class="emogi wrong error mistake">&#10062;</div>             <div style="width:12.5%" class="emogi question confuse ask">&#10067;</div>             <div style="width:12.5%" class="emogi exclaimed astonished">&#10071;</div>             <div style="width:12.5%" class="emogi minus remove subtract">&#10134;</div>             <div style="width:12.5%" class="emogi add plus">&#10133;</div>             <div style="width:12.5%" class="emogi curl">&#10175;</div>             <div style="width:12.5%" class="emogi left">&#11013;</div>             <div style="width:12.5%" class="emogi up">&#11014;</div>             <div style="width:12.5%" class="emogi star">&#11088;</div>             <div style="width:12.5%" class="emogi free">&#127379;</div>             <div style="width:12.5%" class="emogi new">&#127381;</div>             <div style="width:12.5%" class="emogi ok">&#127383;</div>             <div style="width:12.5%" class="emogi vs versus competition">&#127386;</div>             <div style="width:12.5%" class="emogi sunrise">&#127748;</div>             <div style="width:12.5%" class="emogi rainbow">&#127752;</div>             <div style="width:12.5%" class="emogi white flower lotus">&#127804;</div>             <div style="width:12.5%" class="emogi chirag">&#127847;</div>             <div style="width:12.5%" class="emogi cake birthday party">&#127849;</div>             <div style="width:12.5%" class="emogi cake birthday party">&#127874;</div>             <div style="width:12.5%" class="emogi party celebrate">&#127882;</div>             <div style="width:12.5%" class="emogi singer singing mike microphone">&#127908;</div>             <div style="width:12.5%" class="emogi headphone">&#127911;</div>             <div style="width:12.5%" class="emogi hen cock murgi murga">&#128019;</div>             <div style="width:12.5%" class="emogi hen cock murga murgi chicken">&#128020;</div>             <div style="width:12.5%" class="emogi octopus">&#128025;</div>             <div style="width:12.5%" class="emogi duck dove">&#128037;</div>             <div style="width:12.5%" class="emogi duck dove">&#128035;</div>             <div style="width:12.5%" class="emogi duck dove">&#128036;</div>             <div style="width:12.5%" class="emogi bird">&#128038;</div>             <div style="width:12.5%" class="emogi penguine">&#128039;</div>             <div style="width:12.5%" class="emogi bear">&#128040;</div>             <div style="width:12.5%" class="emogi camel">&#128042;</div>             <div style="width:12.5%" class="emogi camel">&#128043;</div>             <div style="width:12.5%" class="emogi dolphin fish">&#128044;</div>             <div style="width:12.5%" class="emogi haha laugh chuckle happy rabbit hare">&#128045;</div>             <div style="width:12.5%" class="emogi rabbit hare">&#128048;</div>             <div style="width:12.5%" class="emogi tiger">&#128047;</div>             <div style="width:12.5%" class="emogi frog">&#128056;</div>             <div style="width:12.5%" class="emogi panda">&#128060;</div>             <div style="width:12.5%" class="emogi look eye see">&#128065;</div>             <div style="width:12.5%" class="emogi listen hear ear">&#128066;</div>             <div style="width:12.5%" class="emogi nose smell">&#128067;</div>             <div style="width:12.5%" class="emogi lips">&#128068;</div>             <div style="width:12.5%" class="emogi tongue">&#128069;</div>             <div style="width:12.5%" class="emogi footprint">&#128099;</div>             <div style="width:12.5%" class="emogi people">&#128101;</div>             <div style="width:12.5%" class="emogi boy ladka faccha">&#128102;</div>             <div style="width:12.5%" class="emogi girl ladki facchi">&#128103;</div>             <div style="width:12.5%" class="emogi faccha boy ladka">&#128104;</div>             <div style="width:12.5%" class="emogi facchi girl ladki">&#128105;</div>             <div style="width:12.5%" class="emogi police cope cops">&#128110;</div>             <div style="width:12.5%" class="emogi queen rani">&#128112;</div>             <div style="width:12.5%" class="emogi cook maid">&#128115;</div>             <div style="width:12.5%" class="emogi grandpa grandfather">&#128116;</div>             <div style="width:12.5%" class="emogi grandma grandmother">&#128117;</div>             <div style="width:12.5%" class="emogi queen rani">&#128120;</div>             <div style="width:12.5%" class="emogi devil siner">&#128121;</div>             <div style="width:12.5%" class="emogi skull">&#128128;</div>             <div style="width:12.5%" class="emogi kiss lipkiss">&#128139;</div>             <div style="width:12.5%" class="emogi love-letter love">&#128140;</div>             <div style="width:12.5%" class="emogi ring">&#128141;</div>             <div style="width:12.5%" class="emogi gift flower guldasta">&#128144;</div>             <div style="width:12.5%" class="emogi body body-builder gim">&#128170;</div>             <div style="width:12.5%" class="emogi chat message">&#128172;</div>             <div style="width:12.5%" class="emogi money">&#128176;</div>             <div style="width:12.5%" class="emogi laptop">&#128187;</div>             <div style="width:12.5%" class="emogi graph statistics">&#128200;</div>             <div style="width:12.5%" class="emogi calender">&#128198;</div>             <div style="width:12.5%" class="emogi graph statistics">&#128202;</div>             <div style="width:12.5%" class="emogi attach file">&#128206;</div>             <div style="width:12.5%" class="emogi book">&#128212;</div>             <div style="width:12.5%" class="emogi book open">&#128214;</div>             <div style="width:12.5%" class="emogi write">&#128221;</div>             <div style="width:12.5%" class="emogi call voicecall">&#128222;</div>             <div style="width:12.5%" class="emogi calculator">&#128224;</div>             <div style="width:12.5%" class="emogi anteena">&#128225;</div>             <div style="width:12.5%" class="emogi speaker">&#128226;</div>             <div style="width:12.5%" class="emogi envelop letter mail">&#128233;</div>             <div style="width:12.5%" class="emogi smartphone mobile">&#128243;</div>             <div style="width:12.5%" class="emogi not disallowed nomobile no-mobile">&#128245;</div>             <div style="width:12.5%" class="emogi camera">&#128247;</div>             <div style="width:12.5%" class="emogi bell">&#128276;</div>             <div style="width:12.5%" class="emogi chain">&#128279;</div>             <div style="width:12.5%" class="emogi torch">&#128294;</div>             <div style="width:12.5%" class="emogi hammer">&#128296;</div>             <div style="width:12.5%" class="emogi om oum god">&#128329;</div>             <div style="width:12.5%" class="emogi detective">&#128373;</div>             <div style="width:12.5%" class="emogi spider makri">&#128375;</div>             <div style="width:12.5%" class="emogi sieve">&#128376;</div>             <div style="width:12.5%" class="emogi mouse">&#128433;</div>             <div style="width:12.5%" class="emogi mouse">&#128434;</div>             </div>             <div id="allgif" style="display:none;flex-wrap:wrap;min-height:280px;">             <div style="width:90%;z-index:1000;display:flex;flex-wrap:nowrap;position:sticky;top:35px;margin-bottom:10px;"><input type="text" placeholder="Type happy,love or anger etc..." style="width:95%;" id="srchgif"><i class="fa fa-search" style="position:absolute;right:8%;z-index:9;color:#e31414;font-size:1.8em" aria-hidden="true" id="srchgificon"></i></div><br>             <div style="display:flex;flex-wrap:wrap;">            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" class=""><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>             <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>             <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>             <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>             <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>             <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)" ><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>        <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>            <span onclick="sendgif(this.innerHTML)"><img src=""/></span>     </div></div>             <div id="allstickers" style="display:none;flex-wrap:wrap;min-height:280px;justify-content:space-between">              <div style="width:90%;z-index:1000;display:flex;flex-wrap:nowrap;position:sticky;top:35px;margin-bottom:10px;"><input type="text" placeholder="Type happy,love or anger etc..." style="width:95%;" id="srchstickers"><i class="fa fa-search" style="position:absolute;right:8%;color:#e31414;z-index:9;font-size:1.8em" aria-hidden="true" id="srchstickericon"></i></div>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span><span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span>              <span onclick="sendgif(this.innerHTML)"><img src=""/></span> <span onclick="sendgif(this.innerHTML)"><img src=""/></span> </div>       </div></div></center>', $("#whole").hide(), $("#message-container").css("height", window.innerHeight - 95 + "px"), $("#chatroom").css("background", "url(/assets/rocket.gif)").css("background-size", "cover").css("background-position", "center").css("background-repeat", "no-repeat"), $("html").css("background-image", "none").css("background-color", "white"), $("#allemogies div").css("width", "12%").css("padding-bottom", "5px"), running = !1, document.getElementById("emogi").addEventListener("scroll", function() {
        if (running) clearTimeout(e);
        else {
            running = !0;
            var e = setTimeout(function() {
                "none" != document.getElementById("allstickers").style.display && $("#allstickers span").each(function() {
                    $("#emogi").offset().top + $("#emogi").height() > $(this).offset().top ? ($(this).children(0).attr("src", $(this).children(0).attr("data-src")), $(this).children(0).show(), $(this).children(0).css("background", "white")) : ($(this).children(0).hide(), $(this).children(0).css("background", "transparent"))
                }), "none" != document.getElementById("allgif").style.display && $("#allgif span").each(function() {
                    $("#emogi").offset().top + $("#emogi").height() > $(this).offset().top ? ($(this).children(0).attr("src", $(this).children(0).attr("data-src")), $(this).children(0).show()) : $(this).children(0).hide()
                }), running = !1
            }, 600)
        }
    }, {
        passive: !0
    }), $("#allgif img").attr("crossorigin", "anonymous"), $("#allstickers img").attr("crossorigin", "anonymous"), setTimeout(function() {
        "https://kkleap.github.io/assets/default.jpg" != localStorage.getItem("profileinfo") || localStorage.getItem("gender") ? window.i = null : confirm("Is your gender female?\npress ok to confirm") ? (localStorage.setItem("profileinfo", "https://kkleap.github.io/assets/default_f.png"), document.getElementById("userimg").style.backgroundImage = "url(" + localStorage.getItem("profileinfo") + ")") : window.i = null, localStorage.getItem("datasaver") ? "yes" == localStorage.getItem("datasaver") ? !document.getElementById("datasaver").checked && $("#datasaver").click() : document.getElementById("datasaver").checked && $("#datasaver").click() : confirm("Enable data saving mode?\nEnabling will affect video call quality but will save bandwidth\nYou can change it later in setting") ? (localStorage.setItem("datasaver", "yes"), !document.getElementById("datasaver").checked && $("#datasaver").click()) : (localStorage.setItem("datasaver", "no"), document.getElementById("datasaver").checked && $("#datasaver").click()), localStorage.getItem("intinst") || (Renderconfirm("For trying some cool looks ,tap/click the plus icon at the bottom-left corner and change font style,font-size and color of chat box and text according to your interest,the font/styles you choosed will be saved for future.For changing background,look at wallpaper tab under setting section.", !0), localStorage.setItem("intinst", !0)), $("#whole").show(), localStorage.setItem("gender", !0), $("#whole").css("background-size", "cover"), $("#chatroom").css("background", "#282c34"), $("html").css("background-image", "url(/assets/smoothbg.jpg)"), "true" != localStorage.getItem("isSilent") && messenger.play(), document.body.scrollTo(0, 0), setTimeout(function() {
            $("body").css("overflow-y", "hidden"), $("html").css("overflow", "hidden"), $("#chatroom").css("overflow", "hidden"), $("#chat-parent").show(), $("#chatroom").show(), window.startedchatyet = !1
        }, 2e3)
    }, 6e3), "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? (navigator.mediaDevices.getDisplayMedia && !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || $("#sharescreen").remove(), "getSupportedConstraints" in navigator.mediaDevices && !1 === navigator.mediaDevices.getSupportedConstraints().facingMode && $("#togglecamera").remove()) : Renderconfirm("Mediacapturing api is undefined ,you will not be able to place call", !0), window.joiningtime = date.toString().split("GMT")[0], document.getElementById("userimg").style.backgroundImage = "url(" + localStorage.getItem("profileinfo") + ")", setInterval(function() {
        localStorage.getItem("profileinfo") || (document.body.onbeforeunload = null, window.location.reload()), $("#webcam").width($(window).width() > 500 ? 500 : $(window).width()), $("#webcam").css("left", "calc(50% - " + $("#webcam").width() / 2 + "px)"), $("#message").val() || $("#sendbtn").html($("#selectedfavicon").html())
    }, 1e3), $("#chat-parent").show(), $("#chatroom").show(500), $("#moreoptions").hide(), $(document).ready(function() {
        let e;
        $("#message-container").click(function() {
            $("#moreoptions").hide(), $("#adminsection").hide()
        }), $("#cc").click(function() {
            $("#emogi").hide(), $("#message").focus()
        }), navigator.userAgent.includes("Firefox") && $(".messagemain").css("font-size", "0.9em"), $("#allgif img").each(function() {
            this.id = this.src
        }), $("#allstickers img").each(function() {
            this.id = this.src
        }), $("#allgif img").click(function() {
            this.src = this.id
        }), $("#allstickers img").click(function() {
            this.src = this.id
        }), $(".emogi").click(function() {
            socket.emit("istyping", {
                user: userdata.nativeUser,
                auth: userdata.auth,
                roomid: userdata.nativeRoom
            }), $("#message").focus(), $("#message").val($("#message").val() + " " + this.textContent + " ")
        }), $("#head").on("contextmenu", function(e) {
            window.location.toString().includes("https") && e.preventDefault()
        }), $("#message-container").on("contextmenu", function(e) {
            window.location.toString().includes("https") && e.preventDefault()
        }), $("#srch").on("input", function() {
            var e = $(this).val().toLowerCase();
            $(".messagemain").filter(function() {
                $(this).parent().toggle($(this).text().toLowerCase().indexOf(e) > -1)
            }), document.getElementById("message-container").scrollTop = 0
        }), $("#srchemogies").on("input", function() {
            var e = $(this).val().toLowerCase();
            $(".emogi").filter(function() {
                $(this).toggle($(this).attr("class").toLowerCase().indexOf(e) > -1)
            })
        }), $("#srchgificon").on("click", function() {
            if (navigator.onLine) {
                $("#allgif img").css("display", "none"), e && clearTimeout(e);
                var i = $("#srchgif").val().toLowerCase().trim();
                document.querySelectorAll("#allgif img"), e = setTimeout(function() {
                    findgif(i)
                }, 600), document.getElementById("emogi").scrollTop = 0
            } else Renderconfirm("Check your internet and try again", !0)
        }), $("#srchstickericon").on("click", function() {
            if (!navigator.onLine) return void Renderconfirm("Check your internet and try again", !0);
            let i = 0,
                t = document.querySelectorAll("#allstickers img");
            document.getElementById("emogi").scrollTop = 0, $("#allstickers img").css("display", "none"), e && clearTimeout(e);
            var s = $("#srchstickers").val().toLowerCase();
            e = setTimeout(function() {
                $.get("https://api.giphy.com/v1/stickers/search?q=" + s.split(" ").join("+") + "&api_key=eVgQxUlJ01biXxZDpWmuCDwRzdX0VdCn&limit=100").done(function(e) {
                    for (let i = 0; i < e.data.length; i++) t[i].setAttribute("data-src", e.data[i].images.preview_gif.url), t[i].id = e.data[i].images.original.url;
                    document.getElementById("emogi").scrollTo(0, 40)
                }).fail(function() {
                    0 == i++ && Renderconfirm("Error in loading stickers.Check your internet connection.Also make sure that you are not using any public wifi", !0)
                })
            }, 600)
        })
    })
}), socket.on("connected", function(e) {
    users = e.userNow;
    var i = new Date;
    population = e.population, userdata.nativeUser == userdata.admin && $("#adminsection").prepend($("<span onclick='remove(this)' title='Remove " + users[e] + "'>" + users[users.length - 1] + "<i class='fa fa-close' style='float:right'></i></span><hr>").css("width", "150px")), $("#message-container").append("<p class='info' style='background:black;color:white;' onclick='showCurrent(this)' title='" + e.userjoined + "\njoined:" + i.toString().split("GMT")[0] + "'>" + (e.userjoined == userdata.nativeUser ? "You joined<br>Created by " + userdata.admin + "<br>Click to get group info" : e.userjoined + " joined!") + "</p>"), $("#message-container").append("<p class='info' style='background:black;color:yellow;font-size:1em' onclick='userManual()'>👩‍🎓️Learn how to use!👨‍🎓️</p>"), document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), window.scrollTop = window.scrollHeight, window.scrollTo(0, document.body.scrollHeight)
}), socket.on("connectedadmin", function(e) {
    userdata.admin = e.admin, users = e.userNow;
    var i = new Date;
    population = e.population, $("#message-container").append("<p class='info' title='" + userdata.admin + "(Admin)\nJoined:" + i.toString().split("GMT")[0] + "' style='background:black;color:white;' onclick='showCurrent(this)'>" + (userdata.nativeUser != userdata.admin ? userdata.admin + " joined!</p>" : "You created this group<br>Click to get group info </p>")), userdata.admin == userdata.nativeUser && $("#message-container").append("<p class='info' style='background:black;color:yellow;font-size:1em' onclick='userManual()'>👩‍🎓️Learn how to use!👨‍🎓️</p>"), document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), window.scrollTop = window.scrollHeight, window.scrollTo(0, document.body.scrollHeight)
}), socket.on("securityerror", function(e) {
    $("#message-container").append("<p class='info' style='color:red;font-weight:bold;'>" + e + "</p>")
}), socket.on("rejected", function(e) {
    var i = new Date;
    userdata.nativeUser == e ? (should_reconnect = !1, socket.disconnect(!0), Renderconfirm("You can no longer chat!You are nolonger a member!", !0), users.splice(users.indexOf(userdata.nativeUser), 1), document.getElementById("message").disabled = !0, $("#message-container").append("<p class='info' style='color:yellow;background:black;'>Admin removed you</p>"), $("#message-container").append("<p class='info' style='background:black;color:red;' onclick='showCurrent(this)' title='" + e + "\nDisconnected at:" + i.toString().split("GMT")[0] + "'>You have been disconnected!</p>")) : userdata.nativeUser == userdata.admin ? $("#message-container").append("<p class='info' title='" + e + "\nRemoved at:" + i.toString().split("GMT")[0] + "' style='color:yellow;background:black;'>You removed " + e + "!") : $("#message-container").append("<p class='info' title='" + e + "\nRemoved at:" + i.toString().split("GMT")[0] + "' style='color:yellow;background:black;'>Admin removed " + e), document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), window.scrollTo(0, document.body.scrollHeight), window.scrollTo(0, document.querySelector("#message-container").scrollHeight)
}), $(".info").click(function() {
    showCurrent(this)
});
let filequeue = [];

function upload(e) {
    for (file of e.files) file && filequeue.push({
        file: file,
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        }
    });
    e = null, 0 == window.currentlyUploading && filequeue[0] && filequeue[0].file && handleUpload(filequeue[0])
}
async function handleUpload(e) {
    if (navigator.onLine) {
        aborted = !1, window.currentlyUploading = !0;
        let i = generateid();
        fsize = e.file.size / 1024, $("#replytomsg").hide(), type = e.file.type, chunkslength = 1024 * fsize / bar, fread = new FileReader, fread.fileName = e.file.name, window.init = 0, temp = [], percent = 0, $("#whole").append($("<i class='fa fa-close' title='cancel uploading this file' id='" + i + "cross' style='float:left;clear:both;position:fixed;top:60px;font-size:1.5em;margin-left:10px;z-index:500000;' onclick='$(this).next().next().hide(200);$(this).next().next().remove();$(this).remove();aborted=true;'></i><div id='" + i + "progress' style='min-width:140px;clear:both;z-index:50000;text-align:center;float:left;background:green;height:40px;position:fixed;top:50px;border-radius:12px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;'><small style='font-size:0.6em;white-space: nowrap;margin-left:20px;'>" + e.file.name + "</small><br>" + percent + "%</div>")), window.t = (async i => {
            slice = e.file.slice(i, i + bar), await fread.readAsArrayBuffer(slice)
        }), window.t(window.init), fread.onabort = (() => {
            tempbuffer = type = chunkslength = percent = refertemp = fread = temp = null, filequeue.shift(), filequeue[0] ? handleUpload(filequeue[0]) : window.currentlyUploading = !1
        }), fread.onerror = (() => {
            tempbuffer = type = chunkslength = percent = refertemp = fread = temp = null, filequeue.shift(), Renderconfirm("Error in reading file \n" + fread.fileName, !0), filequeue[0] ? handleUpload(filequeue[0]) : window.currentlyUploading = !1
        }), fread.onload = function(e) {
            window.init < e.target.result.byteLength && (refertemp = {
                text: $("#replytext").text(),
                target: $("#replytextparent").attr("class"),
                name: $("#replytexthead").text()
            }), percent = (100 * (window.init + e.target.result.byteLength) / (1024 * fsize)).toFixed(3);
            let t = $(window).width() <= 700 ? $(window).width() : 600;
            document.getElementById(i + "progress") && (document.getElementById(i + "progress").style.width = t * Number(percent) / 100 + "px", document.getElementById(i + "progress").innerHTML = "<small style='font-size:0.6em;overflow:hidden;padding-right:20px;padding-left:20px'>" + e.target.fileName + "</small><br>" + percent + "%"), temp.push(e.target.result), window.filename = e.target.fileName, socket.emit("sendingfile", {
                refer: refertemp,
                data: e.target.result,
                fsize: fsize,
                id: i,
                auth: userdata.auth,
                user: userdata.nativeUser,
                color: color,
                roomid: userdata.nativeRoom,
                type: type,
                init: window.init + e.target.result.byteLength,
                name: e.target.fileName,
                profile: localStorage.getItem("profileinfo")
            }, function(t) {
                t ? (window.init += e.target.result.byteLength, window.init < 1024 * fsize ? aborted ? (filequeue.shift(), filequeue[0] ? handleUpload(filequeue[0]) : window.currentlyUploading = !1) : window.t(window.init) : (document.getElementById(i + "progress") && ($("#" + i + "cross").remove(), $("#" + i + "cross").next().remove(), document.getElementById(i + "progress").remove()), type ? tempbuffer = new Blob(temp, {
                    type: type
                }) : tempbuffer = new Blob(temp), "image" == type.split("/")[0] ? (k = URL.createObjectURL(tempbuffer), messagefile = '<a target="_blank" href="' + k + '"><div class="image-container" data-bg="' + k + '" style="background-image:url(' + k + '"></div></a>', postFile({
                    message: messagefile,
                    refer: refertemp,
                    user: userdata.nativeUser,
                    color: color,
                    id: i,
                    profile: localStorage.getItem("profileinfo")
                })) : "audio" == type.split("/")[0] ? (messagefile = '<audio src="' + URL.createObjectURL(tempbuffer) + '" controls preload="none"></audio>', postFile({
                    refer: refertemp,
                    message: messagefile,
                    user: userdata.nativeUser,
                    color: color,
                    id: i,
                    profile: localStorage.getItem("profileinfo")
                })) : "video" == type.split("/")[0] ? (messagefile = '<video src="' + URL.createObjectURL(tempbuffer) + '" controls ></video>', postFile({
                    refer: refertemp,
                    message: messagefile,
                    user: userdata.nativeUser,
                    color: color,
                    id: i,
                    profile: localStorage.getItem("profileinfo")
                })) : (link = URL.createObjectURL(tempbuffer), messagefile = "<div style='padding:10px;padding-right:3px;display:flex;flex-wrap:nowrap;justify-content:space-between'><a target='_blank' href='" + link + "' style='background:none;color:inherit;text-decoration:none;'><span id='dec'><i class='fa fa-eye' style='font-size:1.2em'></i></span></a><span style='padding:0px 10px;text-align:center;font-size:90%'>File:(" + type + ")<br>" + (fsize / 1024).toFixed(3) + " MB<br></span><a title='" + window.filename + "' href='" + link + "' download='" + window.filename + "' style='background:none;color:inherit;text-decoration:none;'><span id='dec'><i class='fa fa-download' style='font-size:1.2em'></i></span></a></div>", postFile({
                    refer: refertemp,
                    message: messagefile,
                    user: userdata.nativeUser,
                    color: color,
                    id: i,
                    profile: localStorage.getItem("profileinfo")
                })), temp = null, refertemp = null, fread = null, tempbuffer = type = chunkslength = percent = null, filequeue.shift(), filequeue[0] ? handleUpload(filequeue[0]) : window.currentlyUploading = !1)) : window.t(window.init)
            })
        }
    } else Renderconfirm("check your internet connection!!", !0)
}

function showEmogi() {
    $("#emogi").css("display", "flex").css("flex-wrap", "wrap").css("position", "absolute").css("margin", "auto").css("bottom", "60px").css("animation", "f 0.5s").css("overflow", "auto")
}

function checkforLink(e) {
    let i;
    return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.\:]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(e) ? e.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;").replace(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.\:]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm, function(e) {
        return i = "http" == e.split(":")[0] || "https" == e.split(":")[0] ? e : "http://" + e, "gif" == e.split(".")[e.split(".").length - 1] || "jpg" == e.split(".")[e.split(".").length - 1] || "webp" == e.split(".")[e.split(".").length - 1] || "png" == e.split(".")[e.split(".").length - 1] || "jpeg" == e.split(".")[e.split(".").length - 1] ? '<a target="_blank" href="' + i + '"><div class="image-container" data-bg="' + i + '" style="background-image:url(' + i + ')"><br></div></a>' : '<a target="_blank" href="' + i + '" style="background:none;">' + e + "</a><br>"
    }) : e.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;")
}

function sendMessage() {
    var e = document.getElementById("message").value;
    e = e.split(" ");
    let i = [];
    var t = !0;
    for (x of e) k = checkforLink(x), t && k != x && (t = !1), i.push(k);
    e = i.join(" "), $("#message").val(""), $("#message").focus(), $("#emogi").hide(), $("#Adv_toggler_menu").hide();
    let s = generateid();
    e ? (postFile({
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: e,
        sanitize: t,
        id: s,
        user: userdata.nativeUser,
        color: color,
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    }), socket.emit("msg", {
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: e,
        sanitize: t,
        id: s,
        auth: userdata.auth,
        user: userdata.nativeUser,
        color: color,
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    })) : (postFile({
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: "<span style='font-size:11em;'>" + $("#selectedfavicon").html() + "</span>",
        id: s,
        user: userdata.nativeUser,
        color: "transparent",
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    }), socket.emit("msg", {
        refer: {
            text: $("#replytext").text(),
            target: $("#replytextparent").attr("class"),
            name: $("#replytexthead").text()
        },
        message: "<span style='font-size:11em;'>" + $("#selectedfavicon").html() + "</span>",
        id: s,
        auth: userdata.auth,
        user: userdata.nativeUser,
        color: "transparent",
        roomid: userdata.nativeRoom,
        profile: localStorage.getItem("profileinfo")
    })), $("#sendbtn").attr("class", ""), $("#sendbtn").html($("#selectedfavicon").html())
}

function postFile(e) {
    var i = new Date;
    clearTimeout(timeinterval), $("#header").hide();
    let t = document.getElementById("scbeep"),
        s = "copy";
    sr = e.profile ? e.profile : "https://kkleap.github.io/assets/default.jpg", playagain[e.user] = !1, mw = (e.message.indexOf("<img") > -1 || e.message.indexOf('<div class="image-container"') > -1 || e.message.indexOf('<div class="gif-container"') > -1 || e.message.indexOf("<video ") > -1) && e.message.indexOf("src=") > -1 ? "0" : "250", s = e.message.indexOf('<div class="image-container"') > -1 ? "Set as wallpaper" : s, s = e.message.indexOf("<audio src=") > -1 ? "Add to 🎵" : s, e.user == userdata.nativeUser ? ($("#message-container").append('<div class="messages ' + e.user.split(" ").join("qw") + 'chatpiece" id="' + e.id + '" style="margin-bottom:6px;min-width:' + mw + "px;padding-bottom:5px;border-radius:12px;max-width:90%;clear:both;margin-right:2px;float:right;text-align:right;background:" + e.color + '"><div style="border-radius:6px;background:rgba(120,120,120,0.7);border-right:3px solid #15e1dc" onclick="scrollToid(\'' + e.refer.target + '\')" id="' + e.id + 'refering"><div style="font-weight:bold;color:#0f0;padding-bottom:4px;padding-right:4px">' + (e.refer.name ? e.refer.name == userdata.nativeUser ? "You" : e.refer.name.length > 10 ? e.refer.name.substr(0, 10) + "..." : e.refer.name : "") + '</div><div style="color:white;word-break:break-all;padding-right:4px;padding-bottom:4px;border-bottom:1.5px solid violet;font-size:0.8em">' + (e.refer.text ? e.refer.text.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;") : "") + '</div></div><div style="background:rgba(120,120,120,0.7);margin-bottom:5px"><select style="float:left;" onchange="handleSelect(this)"><option value="' + s.split(" ")[0] + '">' + s + '</option><br><option value="refer">Refer &#9194;</option><br><option value="del1">Del For you</option><br><option value="del2">Del For all</option></select><div style="display:flex;justify-content:space-between;flex-wrap:nowrap;"><b style="font-size:16px;font-style:italic;">You</b><div class="avatar ' + e.user.split(" ").join("qw") + 'profilepic" style="background-image:url(' + sr + ')"></div></div><span style="font-size:0.7em;padding-right:4px;">' + i.toString().split("GMT")[0] + '</span></div><div style="max-width:100%;word-wrap:break-word;padding-right:' + (/img|video|audio/gim.test(e.message) ? 0 : 4) + "px;font-family:" + window.textfont + ";font-size:" + window.textsize + ";color:" + window.textcolor + '" class="messagemain" disabled="disabled">' + (e.sanitize ? e.message.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;") : e.message.replace(/script>/gim, "script&gt;").replace(/ on/gim, "&nbsp;on")) + "</div></div>"), $("#replytomsg").hide(), document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight) : (document.getElementById("beeper").checked || t.play(), $("#message-container").append('<div class="messages ' + e.user.split(" ").join("qw") + 'chatpiece" id="' + e.id + '" style="margin-bottom:6px;min-width:' + mw + "px;padding-bottom:7px;border-radius:6px;max-width:90%;clear:both;text-align:left;float:left;background:" + e.color + '"><div style="border-radius:6px;background:rgba(120,120,120,0.7);border-left:3px solid #15e1dc" onclick="scrollToid(\'' + e.refer.target + '\')" id="' + e.id + 'refering"><div style="font-weight:bold;color:#0f0;padding-bottom:4px;padding-left:4px;">' + (e.refer.name ? e.refer.name == userdata.nativeUser ? "You" : e.refer.name.length > 10 ? e.refer.name.substr(0, 10) + "..." : e.refer.name : "") + '</div><div style="color:white;border-bottom:1.5px solid violet;font-size:0.8em;word-break:break-all;padding-left:4px;padding-bottom:4px;">' + (e.refer.text ? e.refer.text.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;") : "") + '</div></div><div style="background:rgba(120,120,120,0.7);margin-bottom:5px"><select style="float:right;" onchange="handleSelect(this)"><option value="' + s.split(" ")[0] + '">' + s + '</option><br><option value="refer">Reply &#9194;</option><br><option value="del">Delete</option></select>         <div style="display:flex;justify-content:space-between;flex-wrap:nowrap;"><div class="avatar ' + e.user.split(" ").join("qw") + 'profilepic" style="background-image:url(' + sr + ')"></div><b style="font-size:16px;font-style:italic;padding-right:15px;">' + e.user.split(" ")[0].substr(0, 10) + '</b></div><span style="font-size:0.7em;padding-left:4px;">' + i.toString().split("GMT")[0] + '</span></div><div style="max-width:100%;word-wrap:break-word;padding-left:' + (/img|video|audio/gim.test(e.message) ? 0 : 4) + "px;font-family:" + window.textfont + ";font-size:" + window.textsize + ";color:" + window.textcolor + '" class="messagemain" disabled="disabled">' + (e.sanitize ? e.message.replace(/&/gim, "&amp;").replace(/</gim, "&lt;").replace(/>/gim, "&gt;") : e.message.replace(/script>/gim, "script&gt;").replace(/ on/gim, "&nbsp;on")) + "</div></div>"), document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight)), setTimeout(function() {
        ignite(e.id), "transparent" == e.color && $("#" + e.id).css("box-shadow", "none"), document.getElementById("message-container").scrollTop > document.getElementById("message-container").scrollHeight - 1100 && (document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), e.user == userdata.nativeUser && $("#replytextclose").click()
    }, 100), $("select").val(null), setTimeout(function() {
        e.refer.target && "#" != e.refer.target || document.getElementById(e.id + "refering").remove()
    }, 100)
}

function handleSelect(e) {
    let i = "left" == e.style.float ? 1 : 2;
    if (e.value.includes("copy")) {
        let i = e.parentElement.nextElementSibling,
            t = document.createElement("textarea");
        t.value = i.textContent, document.body.appendChild(t), t.select(), document.execCommand("copy"), removeclip()
    } else if ("refer" == e.value) {
        let i = e.parentElement.nextElementSibling.textContent,
            t = e.parentElement.parentElement.className.split(" ")[1].split("chatpiece")[0].split("qw").join(" ");
        i || (i = "Media"), i.length > 100 && (i = i.substr(0, 100) + "..."), $("#message").focus(), $("#replytext").text(i), $("#replytexthead").text(t).css("font-weight", "bold"), $("#replytextparent").attr("class", "#" + e.parentElement.parentElement.id), $(window).width() > 700 && $("#replytomsg").css("left", $("#message").offset().left + "px").css("width", $("#message").width() - 10 + "px"), $("#replytomsg").css("display", "flex")
    } else if ("Set" == e.value) {
        let i = $(e).parent().next().find(".image-container").attr("data-bg");
        $("#whole").css("background-image", "url(" + i + ")"), adjustHead(i), $("#wallpaperoption").append($("<span><img style='display:block' src='" + i + "' onclick='cb(this,0)'></span>")), $("#msg-sender").css("background", "transparent")
    } else if ("Add" == e.value) {
        let i = e.parentElement.nextElementSibling.innerHTML.split('src="')[1].split('"')[0],
            t = audmusic[currI].loop;
        audmusic[currI].pause(), $("#b").append($("<audio src='" + i + "' style='display:none;'></audio>")), audmusic = document.querySelectorAll("#b audio"), currI = audmusic.length - 1, audmusic[currI].loop = t, audmusic[currI].play()
    } else 2 == i && "del" == e.value ? confirm("Message will be deleted for only you!") && e.parentElement.parentElement.remove() : 1 == i && "del1" == e.value ? confirm("Message will be deleted for only you!") && e.parentElement.parentElement.remove() : 1 == i && "del2" == e.value && confirm("Message will be deleted for Everyone!") && socket.emit("delete", {
        msgid: e.parentElement.parentElement.id,
        auth: userdata.auth,
        roomid: userdata.nativeRoom,
        user: userdata.nativeUser,
        para: $("#" + e.parentElement.parentElement.id).css("float")
    });
    e.value = null
}

function DeleteClientChat() {
    confirm("You are about to delete all conversations for you!Sure??") && (t = $(".info:first").html(), document.getElementById("message-container").innerHTML = '<p class="info" style="background:black;color:white;" onclick="showCurrent(this)" title="' + userdata.nativeUser + "\njoined:" + window.joiningtime + '">' + t + "</p><p class='info' style='background:black;color:yellow;font-size:1em' onclick='userManual()'>👩‍🎓️Learn how to use!👨‍🎓️</p>")
}
window.currentlyUploading = !1, receivedbuffer = {}, received = {}, socket.on("newmsgfile", async function(e) {
    e.init == e.data.byteLength && (received[e.id] = []);
    try {
        await received[e.id].push(e.data)
    } catch (e) {
        console.log("errin receiving file")
    }
    e.init >= 1024 * e.fsize && (document.getElementById(e.id + "progress") && ($("#" + e.id + "cross").remove(), $("#" + e.id + "cross").next().remove(), document.getElementById(e.id + "progress").remove()), e.type ? receivedbuffer[e.id] = new Blob(received[e.id], {
        type: e.type
    }) : receivedbuffer[e.id] = new Blob(received[e.id]), "image" == e.type.split("/")[0] ? (k = URL.createObjectURL(receivedbuffer[e.id]), messagefile = "File:(" + e.type + ")<br>" + (e.fsize / 1024).toFixed(3) + 'MB<br><a title="' + e.name + '" href="' + k + '" download="' + e.name + '">Download</a><br><a href="' + k + '" target="_blank"><div class="image-container" data-bg="' + k + '" style="background-image:url(' + k + '"></div></a>', postFile({
        message: messagefile,
        refer: e.refer,
        user: e.user,
        color: e.color,
        id: e.id,
        profile: e.profile
    })) : "audio" == e.type.split("/")[0] ? (k = URL.createObjectURL(receivedbuffer[e.id]), messagefile = (e.fsize / 1024).toFixed(3) + 'MB&nbsp;&nbsp;&nbsp;<a title="' + e.name + '" href="' + k + '" download="' + e.name + '">Download</a><br><audio src="' + k + '" controls preload="none"></audio>', postFile({
        refer: e.refer,
        message: messagefile,
        user: e.user,
        color: e.color,
        id: e.id,
        profile: e.profile
    })) : "video" == e.type.split("/")[0] ? (k = URL.createObjectURL(receivedbuffer[e.id]), messagefile = (e.fsize / 1024).toFixed(3) + 'MB&nbsp;&nbsp;&nbsp;<a title="' + e.name + '" href="' + k + '" download="' + e.name + '">Download</a><br><video src="' + k + '" controls ></video>', postFile({
        refer: e.refer,
        message: messagefile,
        user: e.user,
        color: e.color,
        id: e.id,
        profile: e.profile
    })) : (link = URL.createObjectURL(receivedbuffer[e.id]), messagefile = "<div style='padding:10px;padding-left:3px;display:flex;flex-wrap:nowrap;justify-content:space-between'><a target='_blank' href='" + link + "' style='background:none;color:inherit;text-decoration:none;'><span id='dec'><i class='fa fa-eye' style='font-size:1.2em'></i></span></a><span style='padding:0px 10px;text-align:center;font-size:90%'>File:(" + e.type + ")<br>" + (e.fsize / 1024).toFixed(3) + " MB<br></span><a title='" + e.name + "' href='" + link + "' download='" + e.name + "' style='background:none;color:inherit;text-decoration:none;'><span id='dec'><i class='fa fa-download' style='font-size:1.2em'></i></span></a></div>", postFile({
        refer: e.refer,
        message: messagefile,
        user: e.user,
        color: e.color,
        id: e.id,
        profile: e.profile
    })), received[e.id] = [], receivedbuffer[e.id] = null)
}), socket.on("newmsg", function(e) {
    postFile(e)
}), socket.on("updateuser", function(e) {
    users = e
}), socket.on("deleting", function(e) {
    document.getElementById(e.id) && document.getElementById(e.id).className.split(" ")[1].split("chatpiece")[0].split("qw").join(" ") == e.owner && document.getElementById(e.id).remove()
}), socket.on("errorinfo", function(e) {
    $("#message-container").append(e), document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight, window.scrollTo(0, document.body.scrollHeight), window.scrollTo(0, document.querySelector("#message-container").scrollHeight)
}), socket.on("disconnecteds", function(e) {
    users = e.userNow;
    var i = new Date;
    if ($("#message-container").append("<p class='info' style='background:black;color:yellow;' onclick='showCurrent(this)' title='" + e.userleft + "\ndisconnected at:" + i.toString().split("GMT")[0] + "'>" + (e.userleft == userdata.nativeUser ? "You" : e.userleft) + " got disconnected!</p>"), userdata.nativeUser == userdata.admin) {
        let e = 0;
        for ($("#adminsection").html(""); e != users.length;) users[e] != userdata.admin && $("#adminsection").prepend($("<span onclick='remove(this)' title='Remove " + users[e] + "'>" + users[e] + "<i class='fa fa-close' style='float:right'></i></span><hr>").css("width", "150px")), e++;
        $("#adminsection").append($("<input type='password' placeholder='change password..' id='pwdchange' autocomplete='off' style='width:96%;border-radius:17px;border:2px dotted grey;'><br><button style='border-radius:17px;width:93%;background:green;font-size:1em;padding:5px;' onclick='changepwd()'>Change</button><button style='border-radius:17px;width:93%;background:red;font-size:1em;padding:5px;margin-top: 5px;' onclick='DeleteRoom()'>Del room</button>"))
    }
    setTimeout(function() {
        document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight, window.scrollTo(0, document.body.scrollHeight)
    })
}, 100), socket.on("reconnecteds", function(e) {
    users = e.userNow;
    var i = new Date;
    if (window.currentlyUploading && !aborted ? window.t(window.init) : (filequeue.shift(), filequeue[0] ? handleUpload(filequeue[0]) : window.currentlyUploading = !1), $("#message-container").append("<p class='info' style='background:black;color:green;' onclick='showCurrent(this)' title='" + e.userconnected + "\nReconnected at:" + i.toString().split("GMT")[0] + "'>" + (e.userconnected == userdata.nativeUser ? "You" : e.userconnected) + " got reconnected!</p>"), userdata.nativeUser == userdata.admin) {
        let e = 0;
        for ($("#adminsection").html(""); e != users.length;) users[e] != userdata.admin && $("#adminsection").prepend($("<span onclick='remove(this)' title='Remove " + users[e] + "'>" + users[e] + "<i class='fa fa-close' style='float:right'></i></span><hr>").css("width", "150px")), e++;
        $("#adminsection").append($("<input type='password' placeholder='change password..' id='pwdchange' autocomplete='off' style='width:96%;border:2px dotted grey;'><br><button style='border-radius:17px;width:93%;background:green;font-size:1em;padding:5px;' onclick='changepwd()'>Change</button><button style='border-radius:17px;width:93%;background:red;font-size:1em;padding:5px;margin-top: 5px;' onclick='DeleteRoom()'>Del room</button>"))
    }
    document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight, window.scrollTo(0, document.body.scrollHeight), clearInterval(window.pingconnect)
}), socket.on("disconnect", function() {
    var e = new Date;
    should_reconnect && (users && (users.splice(users.indexOf(userdata.nativeUser), 1), $("#message-container").append("<p class='info' style='background:black;color:red;' onclick='showCurrent(this)' title='" + userdata.nativeUser + "\ndisconnected at:" + e.toString().split("GMT")[0] + "'>You got disconnected!</p>"), document.getElementById("message-container").scrollTop = document.getElementById("message-container").scrollHeight), window.pingconnect = setInterval(function() {
        navigator.onLine && socket.disconnected && (socket.connect(), socket.emit("rejoinra", {
            room: userdata.nativeRoom,
            auth: userdata.auth,
            user: userdata.nativeUser
        }))
    }, 1500))
}), socket.on("sendingoffer", async function(e) {
    (e = JSON.parse(e)).auth = userdata.auth, e.profile = localStorage.getItem("profileinfo"), !window.startedchatyet && window.rtcsupport ? (document.getElementById("beeper").checked || incoming.play(), confirm(e.user + " wants to " + e.type + " call you!Would u like to join?") ? "video" == e.type ? ($("#hangUpBtn").click(), document.getElementById("beeper").checked || incoming.play(), disconnect.pause(), startVideochat(!0, e)) : ($("#hangUpBtn2").click(), document.getElementById("beeper").checked || incoming.play(), disconnect.pause(), startVideochat(!1, e)) : (incoming.pause(), incoming.currentTime = 0, socket.emit("offerdenied", JSON.stringify(e)))) : socket.emit("offerdenied", JSON.stringify(e))
}), socket.on("deniedoffer", function(e) {
    $("#adduser").show(), $("#adduser2").show(), e = JSON.parse(e), ring.pause(), ring.currentTime = 0, Renderconfirm(e.target + " refused!", !0)
});
var caller = {};

function initiate() {
    void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function(e) {
        return getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, getUserMedia ? new Promise(function(i, t) {
            getUserMedia.call(navigator, e, i, t)
        }) : Promise.reject(new Error("Please update your browser.Use recent version of safari browser for ios mobile and ipad devices otherwise use recent version of chrome,firefox,opera and edge"))
    }), window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection, window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription || window.msRTCSessionDescription, window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate || window.msRTCIceCandidate
}

function startVideochat(e, i = null) {
    return window.startedchatyet ? Renderconfirm("You are already in a call!!", !0) : ($("#adduser").hide(), $("#adduser2").hide(), window.web = setTimeout(function() {
        Renderconfirm("Unable to fetch input from webcam or mic!", !0), i ? socket.emit("offerdenied", JSON.stringify(i)) : i = i, incoming.pause(), e ? $("#hangUpBtn").click() : $("#hangUpBtn2").click(), incoming.currentTime = 0, window.web = null
    }, 1e4), document.getElementById("sharescreen") && $("#sharescreen").hide(), window.rtcsupport && "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? should_reconnect ? (caller = {}, window.vdochat = e, $("#chat-parent").hide(), $("#chatroom").hide(), i ? (window.startedchatyet = !0, window.callroom = i.callroom, rejected.type.splice(rejected.room.indexOf(window.callroom), 1), rejected.room.splice(rejected.room.indexOf(window.callroom), 1)) : window.startedchatyet = !1, $("#stylingtools").hide(200), $("#moreoptions").hide(), audmusic[currI].pause(), 1 == e ? ($("#voicecallingpage").hide(), $("#videocallingpage").show(100)) : ($("#videocallingpage").hide(), $("#voicecallingpage").show(100)), $("#selfview").next().css("visibility", "hidden"), window.stream && window.stream.getTracks().forEach(e => e.stop()), constraint = e ? {
        video: {
            width: 640,
            height: 480,
            maxBitrate: 100,
            facingMode: "user",
            frameRate: 14
        },
        audio: {
            echoCancellation: !0,
            sampleRate: 16,
            noiseSuppression: !0
        }
    } : {
        video: !1,
        audio: {
            echoCancellation: !0,
            sampleRate: 16,
            channelCount: 2,
            noiseSuppression: !0
        }
    }, "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices && navigator.mediaDevices.getUserMedia(constraint).then(function(t) {
        void 0 !== t ? (window.stream = t, e ? document.getElementById("selfview").srcObject = window.stream : document.getElementById("selfaudio").srcObject = t, window.web && clearTimeout(window.web), window.web = null, i && (window.web = setTimeout(function() {
            e ? $("#hangUpBtn").click() : $("#hangUpBtn2").click(), incoming.currentTime = 0, ring.currentTime = 0, ring.pause(), incoming.pause(), window.web = null, Renderconfirm("<span style='font-size:1.2em;padding-bottom:3px;color:red'>Call failed!!</span><br>Please try again by initiating call yourself", !0)
        }, 13e3)), i ? ($("#adduser").hide(), $("#adduser2").hide()) : ($("#adduser").show(), $("#adduser2").show()), setTimeout(function() {
            !i && document.getElementById("chatroom").style.display.includes("none") && (e ? $("#adduser").click() : $("#adduser2").click())
        }, 700), !reconnecting.src && (reconnecting.src = "/assets/reconnecting.mp3", reconnecting.load()), document.getElementById("selfview").muted = !0, document.getElementById("selfaudio").muted = !0, e ? ($("#videooff").attr("class", "fa fa-video-camera"), $("#audiooff").attr("class", "fa fa-microphone"), $("#content").attr("content", "width=device-width,initial-scale=1.0"), $("#videooff").css("color", "#0f0"), $("#audiooff").css("color", "#0f0")) : ($("#audiooff2").css("color", "#0f0"), $("#audiooff2").attr("class", "fa fa-microphone")), i && (window.timedelay = setTimeout(function() {
            -1 == rejected.room.indexOf(i.callroom) ? (window.history.replaceState({}, document.title, "/" + (window.vdochat ? "video_call" : "voice_call") + "?" + btoa(btoa("call_room=" + i.callroom))), socket.emit("offeraccepted", JSON.stringify(i))) : socket.emit("offerdenied", JSON.stringify(i))
        }, 2e3))) : Renderconfirm("unable to get your camera or microphone", !0)
    }).catch(function(e) {
        console.log("Error occurred!"), socket.emit("refreshlist", {
            user: userdata.nativeUser,
            auth: userdata.auth
        });
        let t = -1;
        window.callroom = null, window.vdochat = null, window.startedchatyet = !1, i && (clearTimeout(window.timedelay), 0 == ++t && socket.emit("offerdenied", JSON.stringify(i))), incoming.pause(), incoming.currentTime = 0, $("#userlist").html("Error in accessing camera!"), $("#userlist").hide(), window.web && clearTimeout(window.web), Renderconfirm(e.message, !0), $("#chat-parent").show(), $("#chatroom").show(), $("#videocallingpage").hide(), $("#voicecallingpage").hide()
    })) : (clearTimeout(window.web), Renderconfirm("You cannot chat,you got disconnected", !0), $("#chat-parent").show(), $("#chatroom").show(), $("#videocallingpage").hide(), void $("#voicecallingpage").hide()) : (console.log("No support for webrtc!"), clearTimeout(window.web), Renderconfirm("webrtc is probably not supported by your browser or device!Try using updated chrome ,firefox,opera ,supported safari version or edge<br><a href='https://caniuse.com/#search=webrtc' target='_blank'>Click</a> here to get more info", !0), $("#chat-parent").show(), $("#chatroom").show(), $("#videocallingpage").hide(), void $("#voicecallingpage").hide()))
}
$("#hangUpBtn2").click(function() {
    for (x in document.getElementById("beeper").checked || disconnect.play(), incoming.pause(), ring.pause(), ring.currentTime = 0, window.web && clearTimeout(window.web), document.getElementById("callbackbutton") && document.getElementById("callbackbutton").remove(), $("#userlist").hide(), $("#audiocontainer").html(""), $("#chat-parent").show(), $("#chatroom").show(), $("#voicecallingpage").hide(), $("#showaudioconnection").html(""), document.getElementById("selfaudio").srcObject = null, document.getElementById("selfview").srcObject = null, window.history.replaceState({}, document.title, "/chat_room?" + btoa("key=" + userdata.nativeRoom)), window.startedchatyet && socket.emit("disconnectingit", JSON.stringify({
            user: userdata.nativeUser,
            roomid: window.callroom,
            type: window.vdochat
        })), window.startedchatyet = !1, caller) caller[x].close();
    caller = {}, rejected.room.length > 6 && (rejected.room.splice(0, 1), rejected.type.splice(0, 1)), window.callroom && (rejected.room.push(window.callroom), rejected.type.push(window.vdochat)), window.callroom = window.vdochat = null, window.stream && window.stream.getTracks().forEach(e => e.stop()), reconnecting.pause(), reconnecting.currentTime = 0
}), $("#hangUpBtn").click(function() {
    for (x in document.getElementById("beeper").checked || disconnect.play(), ring.pause(), window.web && clearTimeout(window.web), incoming.pause(), ring.currentTime = 0, document.getElementById("callbackbutton") && document.getElementById("callbackbutton").remove(), $("#userlist").hide(), $("#videocontainer").html(""), $("#content").attr("content", "width=device-width,initial-scale=1.0,user-scalable=no"), $("#chat-parent").show(), $("#chatroom").show(), $("#videocallingpage").hide(), window.history.replaceState({}, document.title, "/chat_room?" + btoa("key=" + userdata.nativeRoom)), window.startedchatyet && socket.emit("disconnectingit", JSON.stringify({
            user: userdata.nativeUser,
            roomid: window.callroom,
            type: window.vdochat
        })), $("#selfview").next().css("visibility", "hidden"), $("#sharescreen").attr("class", "fa fa-television"), $("#sharescreen").attr("title", " allow sharing screen"), window.startedchatyet = !1, document.getElementsByClassName("large")[0].srcObject = null, document.getElementsByClassName("large")[0].id = "selfview", caller) caller[x].close();
    caller = {}, rejected.room.length > 6 && (rejected.room.splice(0, 1), rejected.type.splice(0, 1)), window.callroom && (rejected.room.push(window.callroom), rejected.type.push(window.vdochat)), window.callroom = window.vdochat = null, window.stream && window.stream.getTracks().forEach(e => e.stop()), reconnecting.pause(), reconnecting.currentTime = 0
}), $("#adduser").click(function() {
    let e = 0;
    for ($("#userlist").html("Select a user<i class='fa fa-close' onclick='$(this).parent().hide()' style='font-size:1.4em;background:red;float:right;font-weight:bold;'></i><hr>"); e < users.length;) users[e] != userdata.nativeUser && $("#userlist").append($("<span title='video call " + users[e] + "'><i class='fa fa-video-camera' aria-hidden='true' style='float:right;margin-right:10px;'></i>" + users[e] + "</span>").css("padding", "5px").css("border-bottom", "2px solid black").css("width", "200px")), e++;
    should_reconnect || $("#userlist").html("you have been disconnected<i class='fa fa-close' onclick='$(this).parent().hide()' style='font-size:1.4em;background:red;float:right;font-weight:bold;'></i>"), $("#userlist").show(), $("#userlist span").click(function() {
        $("#adduser").hide(), $("#adduser2").hide();
        var e = window.vdochat ? "video" : "audio";
        document.getElementById("beeper").checked || ring.play(), socket.emit("sendoffer", JSON.stringify({
            target: $(this).text(),
            auth: userdata.auth,
            type: e,
            user: userdata.nativeUser,
            roomid: userdata.nativeRoom
        })), $("#userlist").hide()
    })
}), initiate(), socket.on("setcallroom", function(e) {
    window.callroom = e, window.history.replaceState({}, document.title, "/" + (window.vdochat ? "video_call" : "voice_call") + "?" + btoa(btoa("call_room=" + e)))
});
let shouldFaceUser = !0;

function removeThis(e) {
    document.getElementById(e.user.split(" ").join("qw")) && (window.vdochat && (t = document.getElementById(e.user.split(" ").join("qw")).nextElementSibling.style.visibility, document.getElementById(e.user.split(" ").join("qw")).nextElementSibling.style.visibility = document.querySelectorAll(".large")[0].nextElementSibling.style.visibility, document.querySelectorAll(".large")[0].nextElementSibling.style.visibility = t), "large" == document.getElementById(e.user.split(" ").join("qw")).className && (document.getElementById("selfview").srcObject = document.getElementById(e.user.split(" ").join("qw")).srcObject, document.getElementById(e.user.split(" ").join("qw")).srcObject = window.stream, document.getElementById("selfview").id = e.user.split(" ").join("qw"), document.getElementsByClassName("large")[0].id = "selfview", document.getElementById("selfview").muted = !0, document.getElementById("sharescreen") && ("fa fa-stop" != $("#sharescreen").attr("class") && shouldFaceUser ? document.getElementsByClassName("large")[0].style.transform = "scale(-1,1)" : document.getElementsByClassName("large")[0].style.transform = "scale(1,1)")), window.vdochat ? $("#" + e.user.split(" ").join("qw")).parent().remove() : document.getElementById(e.user.split(" ").join("qw")).remove()), document.getElementById(e.user.split(" ").join("qw") + "indicator") && $("#" + e.user.split(" ").join("qw") + "indicator").parent().parent().remove(), e.user.split(" ").join("qw") in caller && (caller[e.user.split(" ").join("qw")].close(), delete caller[e.user.split(" ").join("qw")]), 0 == Object.keys(caller).length && (e.type ? $("#hangUpBtn").click() : $("#hangUpBtn2").click())
}
socket.on("disconnectingvdo", function(e) {
    e.msg && Renderconfirm("Call was already closed by " + e.user, !0), reconnecting.pause(), ring.pause(), incoming.pause(), removeThis(e)
}), $("#togglecamera").click(function() {
    if (null == window.stream) return;
    window.stream.getTracks().forEach(e => e.stop()), (shouldFaceUser = !shouldFaceUser) ? document.getElementById("selfview").style.transform = "scale(-1,1)" : $("#selfview").css("transform", "scale(1,1)");
    let e = {
        audio: {
            echoCancellation: !0,
            sampleRate: 10,
            noiseSuppression: !0
        },
        video: {
            width: 640,
            maxBitrate: 70,
            height: 480,
            frameRate: 12,
            facingMode: shouldFaceUser ? "user" : "environment"
        }
    };
    "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(e).then(function(e) {
        window.stream = e, e.getVideoTracks().forEach(function(e) {
            e.enabled = "fa fa-video-camera" == $("#videooff").attr("class")
        }), e.getAudioTracks().forEach(function(e) {
            e.enabled = "fa fa-microphone" == $("#audiooff").attr("class")
        });
        let i = e.getVideoTracks()[0],
            t = e.getAudioTracks()[0];
        for (x in caller) {
            var s = caller[x].getSenders().find(function(e) {
                    return e.track.kind == i.kind
                }),
                n = caller[x].getSenders().find(function(e) {
                    return e.track.kind == t.kind
                });
            s.replaceTrack(i), n.replaceTrack(t)
        }
        document.getElementById("selfview").srcObject = window.stream
    }).catch(e => console.log(e.message)) : console.log("Browser doesnt support mediaDevices")
}), $("#sharescreen").click(async function() {
    if ("fa fa-television" == $("#sharescreen").attr("class")) try {
        var e;
        let i = (await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            }
        })).getVideoTracks()[0];
        for (x in e = window.stream.getAudioTracks()[0], caller) caller[x].getSenders().find(function(e) {
            return e.track.kind == i.kind
        }).replaceTrack(i), caller[x].getSenders().find(function(i) {
            return i.track.kind == e.kind
        }).replaceTrack(e);
        window.stream && window.stream.getVideoTracks().forEach(e => e.stop()), window.stream.addTrack(i), $("#videooff").click(), $("#videooff").click(), $("#audiooff").click(), $("#audiooff").click(), $("#selfview").css("transform", "scale(1,1)"), $("#adduser").hide(), document.getElementById("selfview").srcObject = window.stream, $("#sharescreen").attr("class", "fa fa-stop"), $("#sharescreen").attr("title", " stop sharing screen")
    } catch (e) {
        console.log(e.message), $("#adduser").show(), "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices && navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: !0,
                sampleRate: 10,
                noiseSuppression: !0
            },
            video: {
                width: 640,
                maxBitrate: 100,
                height: 480,
                frameRate: 14,
                facingMode: shouldFaceUser ? "user" : "environment"
            }
        }).then(function(e) {
            e.getVideoTracks().forEach(function(e) {
                e.enabled = "fa fa-video-camera" == $("#videooff").attr("class")
            }), e.getAudioTracks().forEach(function(e) {
                e.enabled = "fa fa-microphone" == $("#audiooff").attr("class")
            });
            let i = e.getVideoTracks()[0],
                t = e.getAudioTracks()[0];
            for (x in caller) {
                var s = caller[x].getSenders().find(function(e) {
                        return e.enabled = "fa fa-video-camera" == $("#videooff").attr("class"), e.track.kind == i.kind
                    }),
                    n = caller[x].getSenders().find(function(e) {
                        return e.track.kind == t.kind
                    });
                $("#selfview").css("transform", "scale(-1,1)"), $("#adduser").show(), s.replaceTrack(i), n.replaceTrack(t)
            }
            window.stream && window.stream.getTracks().forEach(e => e.stop()), window.stream = e, $("#audiooff").click(), $("#audiooff").click(), document.getElementById("selfview").srcObject = window.stream, $("#sharescreen").attr("class", "fa fa-television"), $("#sharescreen").attr("title", " allow sharing screen")
        }).catch(e => console.log(e.message))
    } else $("#adduser").show(), "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices && navigator.mediaDevices.getUserMedia({
        video: {
            width: 640,
            height: 480,
            maxBitrate: 100,
            frameRate: 14,
            facingMode: shouldFaceUser ? "user" : "environment"
        },
        audio: {
            echoCancellation: !0,
            sampleRate: 10,
            channelCount: 2,
            noiseSuppression: !0
        }
    }).then(function(e) {
        e.getVideoTracks().forEach(function(e) {
            e.enabled = "fa fa-video-camera" == $("#videooff").attr("class")
        }), e.getAudioTracks().forEach(function(e) {
            e.enabled = "fa fa-microphone" == $("#audiooff").attr("class")
        });
        let i = e.getVideoTracks()[0],
            t = e.getAudioTracks()[0];
        for (x in caller) {
            var s = caller[x].getSenders().find(function(e) {
                    return e.track.kind == i.kind
                }),
                n = caller[x].getSenders().find(function(e) {
                    return e.track.kind == t.kind
                });
            $("#selfview").css("transform", "scale(-1,1)"), $("#adduser").show(), s.replaceTrack(i), n.replaceTrack(t)
        }
        window.stream && window.stream.getTracks().forEach(e => e.stop()), window.stream = e, $("#audiooff").click(), $("#audiooff").click(), document.getElementById("selfview").srcObject = window.stream, $("#sharescreen").attr("class", "fa fa-television"), $("#sharescreen").attr("title", " allow sharing screen")
    }).catch(e => console.log(e.message))
}), $("#videooff").click(function() {
    "fa fa-video-camera" == this.className ? (this.className = "fas fa-video-slash", $(this).attr("title", "allow video"), window.stream.getVideoTracks().forEach(function(e) {
        e.enabled = !1
    }), this.style.color = "#f00") : (this.className = "fa fa-video-camera", window.stream.getVideoTracks().forEach(function(e) {
        e.enabled = !0
    }), $(this).attr("title", "mute video"), this.style.color = "#0f0")
}), $("#audiooff").click(function() {
    "fa fa-microphone" == this.className ? (this.className = "fa fa-microphone-slash", window.stream.getAudioTracks().forEach(function(e) {
        e.enabled = !1
    }), $(this).attr("title", "allow audio"), $("#selfview").next().css("visibility", "visible"), this.style.color = "#f00", socket.emit("videovoice", {
        user: userdata.nativeUser,
        roomid: window.callroom,
        status: "visible"
    })) : ($(this).attr("title", "mute audio"), window.stream.getAudioTracks().forEach(function(e) {
        e.enabled = !0
    }), $(this).attr("class", "fa fa-microphone"), $("#selfview").next().css("visibility", "hidden"), this.style.color = "#0f0", socket.emit("videovoice", {
        user: userdata.nativeUser,
        roomid: window.callroom,
        status: "hidden"
    }))
}), $("#audiooff2").click(function() {
    "fa fa-microphone" == this.className ? (this.className = "fa fa-microphone-slash", window.stream.getAudioTracks().forEach(function(e) {
        e.enabled = !1
    }), $(this).attr("title", "allow audio"), this.style.color = "#f00") : ($(this).attr("title", "mute audio"), window.stream.getAudioTracks().forEach(function(e) {
        e.enabled = !0
    }), $(this).attr("class", "fa fa-microphone"), this.style.color = "#0f0"), socket.emit("changestate", {
        user: userdata.nativeUser,
        roomid: window.callroom,
        color: $("#audiooff2").css("color"),
        class: $("#audiooff2").attr("class")
    })
}), $("#adduser2").click(function() {
    let e = 0;
    for ($("#userlist").html("Select a user<i class='fa fa-close' onclick='$(this).parent().hide()' style='font-size:1.4em;background:red;float:right;font-weight:bold;'></i><hr>"); e < users.length;) users[e] != userdata.nativeUser && $("#userlist").append($("<span title='voice call " + users[e] + "'><i class='fa fa-phone' aria-hidden='true' style='float:right;margin-right:10px;'></i>" + users[e] + "</span>").css("padding", "5px").css("border-bottom", "2px solid black").css("width", "200px")), e++;
    should_reconnect || $("#userlist").html("you have been disconnected<i class='fa fa-close' onclick='$(this).parent().hide()' style='font-size:1.4em;background:red;float:right;font-weight:bold;'></i>"), $("#userlist").show(), $("#userlist span").click(function() {
        $("#adduser2").hide();
        var e = window.vdochat ? "video" : "audio";
        document.getElementById("beeper").checked || ring.play(), socket.emit("sendoffer", JSON.stringify({
            target: $(this).text(),
            auth: userdata.auth,
            type: e,
            user: userdata.nativeUser,
            roomid: userdata.nativeRoom,
            profile: localStorage.getItem("profileinfo")
        })), $("#userlist").hide()
    })
}), socket.on("changestate", function(e) {
    document.getElementById(e.user.split(" ").join("qw") + "indicator") && $("#" + e.user.split(" ").join("qw") + "indicator").css("color", e.color).attr("class", e.class)
});
const configuration = {
    iceServers: [{
        urls: "stun:stun.l.google.com:19302"
    }, {
        urls: "turn:numb.viagenie.ca",
        credential: "muazkh",
        username: "webrtc@live.com"
    }, {
        urls: "turn:numb.viagenie.ca",
        credential: "1234567890",
        username: "leapkk58@gmail.com"
    }]
};
var vdocon = document.getElementById("videocontainer"),
    adocon = document.getElementById("audiocontainer");

function checkWhetherCallexist(e) {
    let i = rejected.room.indexOf(e.callroom);
    return i > -1 && (socket.emit("disconnectingit", JSON.stringify({
        user: userdata.nativeUser,
        roomid: rejected.room[i],
        type: rejected.type[i],
        showmsg: !0
    })), !0)
}
socket.on("createoffer", async function(e) {
    checkWhetherCallexist(e) || (e.user.split(" ").join("qw") in caller || (caller[e.user.split(" ").join("qw")] = new window.RTCPeerConnection(configuration)), caller[e.user.split(" ").join("qw")].onicecandidate = function(i) {
        i.candidate && (console.log("onicecandidate called"), window.startedchatyet = !0, socket.emit("candidate", {
            id: e.id,
            user: userdata.nativeUser,
            candidate: {
                sdpMLineIndex: i.candidate.sdpMLineIndex,
                candidate: i.candidate.candidate
            }
        }))
    }, reconnectingAttempt = {}, caller[e.user.split(" ").join("qw")].oniceconnectionstatechange = function() {
        "connected" == caller[e.user.split(" ").join("qw")].iceConnectionState && (reconnectingAttempt[e.user.split(" ").join("qw")] = 0, $("#" + e.user.split(" ").join("qw") + "txt").text(e.user.split(" ")[0]).css("font-size", "0.8em"), $("#rendering").remove(), reconnecting.pause(), reconnecting.currentTime = 0),
            function i() {
                if (e.user.split(" ").join("qw") in caller && "closed" == caller[e.user.split(" ").join("qw")].iceConnectionState) return removeThis({
                    user: e.user,
                    type: window.vdochat
                }), reconnecting.pause(), void(reconnecting.currentTime = 0);
                if (e.user.split(" ").join("qw") in caller && ("failed" == caller[e.user.split(" ").join("qw")].iceConnectionState || "disconnected" == caller[e.user.split(" ").join("qw")].iceConnectionState)) {
                    e.user.split(" ").join("qw") in reconnectingAttempt ? reconnectingAttempt[e.user.split(" ").join("qw")]++ : reconnectingAttempt[e.user.split(" ").join("qw")] = 0;
                    try {
                        window.vdochat ? Renderconfirm("Reconnecting " + e.user + "...", !0) : $("#" + e.user.split(" ").join("qw") + "txt").text("reconnecting...").css("font-size", "0.7em"), socket.disconnected || (console.log("Sending sdp to reconnect...\n"), caller[e.user.split(" ").join("qw")].createOffer({
                            iceRestart: !0
                        }).then(async function(i) {
                            await caller[e.user.split(" ").join("qw")].setLocalDescription(new window.RTCSessionDescription(i)), i.sdp = document.getElementById("datasaver").checked ? setMediaBitrates(i.sdp, e.length) : i.sdp, socket.emit("sdp", JSON.stringify({
                                sdp: i,
                                id: socket.id,
                                user: userdata.nativeUser,
                                target: e.id,
                                length: e.length,
                                callroom: window.callroom,
                                auth: userdata.auth,
                                roomid: userdata.nativeRoom
                            }))
                        }))
                    } catch (e) {}
                }
                e.user.split(" ").join("qw") in caller && ("failed" == caller[e.user.split(" ").join("qw")].iceConnectionState || "disconnected" == caller[e.user.split(" ").join("qw")].iceConnectionState) && reconnectingAttempt[e.user.split(" ").join("qw")] >= 7 && (1 == Object.keys(caller).length ? Renderconfirm("sorry!\nwe could not reconnect you back!\nplease Start a fresh call", !0) : Renderconfirm("Failed to reconnect " + e.user + "!", !0), removeThis({
                    user: e.user,
                    type: window.vdochat
                }), reconnecting.pause(), reconnecting.currentTime = 0), e.user.split(" ").join("qw") in caller && ("failed" == caller[e.user.split(" ").join("qw")].iceConnectionState || "disconnected" == caller[e.user.split(" ").join("qw")].iceConnectionState) && (document.getElementById("beeper").checked || 1 != Object.keys(caller).length ? reconnecting.pause() : reconnecting.play(), socket.disconnected && navigator.onLine && (socket.connect(), socket.emit("rejoinra", {
                    room: userdata.nativeRoom,
                    auth: userdata.auth,
                    user: userdata.nativeUser
                })), setTimeout(() => i(), 4400))
            }()
    }, caller[e.user.split(" ").join("qw")].ontrack = function(i) {
        if (console.log("ontrack called"), i.streams[0] != window.stream)
            if (window.vdochat) {
                e.offerer && window.web && (clearTimeout(window.web), window.web = null);
                let s = document.createElement("video");
                s.controls = !1, s.setAttribute("style", "width:100%;height:100%"), incoming.pause(), ring.pause(), ring.currentTime = 0, s.poster = "/assets/spinner.svg", s.autoplay = !0, s.srcObject = i.streams[0], s.id = e.user.split(" ").join("qw"), document.getElementById(e.user.split(" ").join("qw")) && managevdo(e.user.split(" ").join("qw")), ind = document.createElement("i"), ind.setAttribute("class", "fa fa-microphone-slash"), ind.setAttribute("style", "color:#fff;font-size:0.85em;position:sticky;bottom:10px;left:10px;z-index: 10;visibility:hidden"), div = document.createElement("div"), div.appendChild(s), div.appendChild(ind), div.setAttribute("class", "video-wrap"), div.setAttribute("style", "width:120px"), $("#audiooff").click(), $("#audiooff").click(), vdocon.appendChild(div), s.onclick = function() {
                    let e = this.srcObject,
                        i = this.id,
                        s = this.style.transform;
                    t = this.nextElementSibling.style.visibility, this.nextElementSibling.style.visibility = document.querySelectorAll(".large")[0].nextElementSibling.style.visibility, document.querySelectorAll(".large")[0].nextElementSibling.style.visibility = t, this.srcObject = document.querySelectorAll(".large")[0].srcObject, this.style.transform = document.querySelectorAll(".large")[0].style.transform, document.querySelectorAll(".large")[0].style.transform = s, document.querySelectorAll(".large")[0].srcObject = e, this.id = document.querySelectorAll(".large")[0].id, document.querySelectorAll(".large")[0].id = i, document.querySelectorAll("#videocallingpage video"), $("#videocallingpage video").each(function() {
                        "selfview" == this.id ? this.muted = !0 : this.muted = !1
                    })
                }, 1 == $("#videocontainer video").length && $("#videocontainer video").first().click()
            } else {
                e.offerer && window.web && (clearTimeout(window.web), window.web = null);
                let t = document.createElement("audio");
                t.controls = !1, t.autoplay = !0, incoming.pause(), ring.pause(), ring.currentTime = 0, t.id = e.user.split(" ").join("qw"), document.getElementById(e.user.split(" ").join("qw")) && document.getElementById(e.user.split(" ").join("qw")).remove(), document.getElementById(e.user.split(" ").join("qw") + "indicator") && document.getElementById(e.user.split(" ").join("qw") + "indicator").parent().parent().remove(), $("#showaudioconnection").append("<div style='width:100px;height:100px;border-radius:50%;display:flex;justify-content:space-between;flex-direction:column;background-image:url(" + (e.profile ? e.profile : "https://kkleap.github.io/assets/default.jpg") + ");background-size:cover;background-repeat:no-repeat;'><div style='font-size:40px;color:green;animation:op 6s infinite alternate linear'><i class='fa fa-microphone' id='" + e.user.split(" ").join("qw") + "indicator'></i></div><span id='" + e.user.split(" ").join("qw") + "txt' style='font-size:12px;background:grey;color:yellow;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:3px;padding-right:1px'>" + e.user.split(" ")[0] + "</span></div>"), t.srcObject = i.streams[0], adocon.appendChild(t)
            }
    }, window.stream && window.stream.getTracks().forEach(function(i) {
        caller[e.user.split(" ").join("qw")].addTrack(i, stream)
    }), e.offerer && await caller[e.user.split(" ").join("qw")].createOffer({
        iceRestart: !0
    }).then(async function(i) {
        await caller[e.user.split(" ").join("qw")].setLocalDescription(new window.RTCSessionDescription(i)), i.sdp = document.getElementById("datasaver").checked ? setMediaBitrates(i.sdp, e.length) : i.sdp, socket.emit("sdp", JSON.stringify({
            sdp: i,
            id: socket.id,
            user: userdata.nativeUser,
            target: e.id,
            length: e.length,
            callroom: window.callroom,
            auth: userdata.auth,
            roomid: userdata.nativeRoom
        }))
    }))
}), socket.on("candidate", async function(e) {
    e.user.split(" ").join("qw") in caller ? (console.log("candidate received"), $("#adduser").show(), $("#adduser2").show(), incoming.currentTime = 0, ring.currentTime = 0, window.vdochat ? (socket.emit("videovoice", {
        user: userdata.nativeUser,
        roomid: window.callroom,
        status: "fa fa-microphone-slash" == $("#audiooff").attr("class") ? "visible" : "hidden"
    }), $("#sharescreen").show()) : socket.emit("changestate", {
        user: userdata.nativeUser,
        roomid: window.callroom,
        color: $("#audiooff2").css("color"),
        class: $("#audiooff2").attr("class")
    }), await caller[e.user.split(" ").join("qw")].addIceCandidate(new window.RTCIceCandidate(e.candidate))) : socket.emit("callterminated")
}), socket.on("sdp", async function(e) {
    checkWhetherCallexist(JSON.parse(e)) || (e = JSON.parse(e), console.log("sdp received"), await caller[e.user.split(" ").join("qw")].setRemoteDescription(new window.RTCSessionDescription(e.sdp)), await caller[e.user.split(" ").join("qw")].createAnswer().then(async function(i) {
        await caller[e.user.split(" ").join("qw")].setLocalDescription(new window.RTCSessionDescription(i)), i.sdp = document.getElementById("datasaver").checked ? setMediaBitrates(i.sdp, e.length) : i.sdp, socket.emit("answer", JSON.stringify({
            sdp: i,
            user: userdata.nativeUser,
            callroom: e.callroom,
            id: socket.id,
            target: e.id,
            length: e.length
        }))
    }))
}), socket.on("securitydanger", function(e) {
    Renderconfirm(e, !0)
}), socket.on("answer", async function(e) {
    checkWhetherCallexist(JSON.parse(e)) || (e = JSON.parse(e), console.log("answer received"), await caller[e.user.split(" ").join("qw")].setRemoteDescription(new RTCSessionDescription(e.sdp)))
}), window.addEventListener("unload", function() {
    window.startedchatyet && (socket.disconnected && socket.connect(), socket.emit("disconnectingit", JSON.stringify({
        user: userdata.nativeUser,
        roomid: window.callroom,
        type: window.vdochat
    })))
});


///This code can even make file sharing successful...also use prev_app.js file along with it
///otherwise will not work.