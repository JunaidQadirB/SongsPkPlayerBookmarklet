/**
 * Bookmarklet Displays a player to play songs on any songs pk ablbum.
 * Flash MP3 player thanks to http://flash-mp3-player.net/
 * @author Junaid Qadir Baloch (JeyKeu) <shekhanzai.baloch@gmail.com>
 */
var SongsPkPlayer = (function() {
    "use strict";
    var baseUrl = 'projects.junaidbaloch.com';
    baseUrl = 'localhost/projects';
    function createPlayer() {
        var playerAudio = document.createElement("audio");
        playerAudio.controls = "controls";
        playerAudio.id = "songsPkPlayer";
        document.body.appendChild(playerAudio);
    }

    function getResource(url, callback, type) {
        var head = document.getElementsByTagName("head")[0],
                done = false,
                elem;
        type = type || 'script';
        var splitUrl = url.split(',');
        if (splitUrl.length > 0) {
            for (var i = 0; i < splitUrl.length; i++) {
                switch (type) {
                    case 'script':
                        {
                            elem = document.createElement("script");
                            elem.src = splitUrl[i];
                            break;
                        }
                    case 'css':
                        {
                            elem = document.createElement("link");
                            elem.type = "text/css";
                            elem.rel = "stylesheet";
                            elem.href = splitUrl[i];
                            break;
                        }
                }
                /* Attach handlers for all browsers*/
                elem.onload = elem.onreadystatechange = function() {
                    if (!done && (!this.readyState ||
                            this.readyState === "loaded" || this.readyState === "complete")) {
                        done = true;
                        callback();
                    }
                };
                head.appendChild(elem);
            }
        } else {
            switch (type) {
                case 'script':
                    {
                        elem = document.createElement("script");
                        elem.src = url;
                        break;
                    }
                case 'css':
                    {
                        elem = document.createElement("link");
                        elem.type = "text/css";
                        elem.rel = "stylesheet";
                        elem.href = url;
                        break;
                    }
            }
            /* Attach handlers for all browsers*/
            elem.onload = elem.onreadystatechange = function() {
                if (!done && (!this.readyState ||
                        this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    callback();
                }
            };
            head.appendChild(elem);
        }
    }
    function _toggle() {
        if (parseInt($('#keuPlayer .flashMp3PlayerWrapper').css('height')) <= 6) {
            $('#keuPlayer .flashMp3PlayerWrapper').css('overflow', 'auto');
            $('#keuPlayer .flashMp3PlayerWrapper').css('height', 'auto');
            $('#keuPlayer .flashMp3PlayerWrapper').css('width', 'auto');

        } else {
            $('#keuPlayer .flashMp3PlayerWrapper').css('height', '5px');
            $('#keuPlayer .flashMp3PlayerWrapper').css('width', '20px');
            $('#keuPlayer .flashMp3PlayerWrapper').css('overflow', 'hidden');
        }
    }
    function createPlayer() {
        var wlj = window.location.href.match("(http://|www\.)(localhost|songspk.pk|songs.pk)");
        var h = "", plUrls = "", ht = "", plTitles = "",
                trackSource = "";
        if (!wlj) {
            alert("This works with songs.pk album pages");
        } else {
            $("a").each(function() {
                h = $(this).attr('href');
                ht = $.trim($(this).text());
                if (typeof h !== "undefined") {
                    if (h.match("link[1-9]*(\.songspk.pk|songs.pk)/(.*)\.php[?]songid")) {
                        plUrls += h + "|";
                        plTitles += ht + "|";
                    }
                }
            });
            plUrls = plUrls.substring(0, plUrls.length - 1);
            plUrls = plUrls.replace("undefined", "");
            plTitles = plTitles.substring(0, plTitles.length - 1);
            plTitles = plTitles.replace("undefined", "");
            var keuPlayer = "<div id=\"keuPlayer\" style=\"position:fixed; display:inline-block;clear:both;top: 0px; right: 0px; background-color: silver; margin: 5px; padding: 10px; height: content-box;width: content-box\"><div id=\"playerMenu\"><a class=\"toggle-player\" style=\"text-decoration:none\" href=\"javascript:window.SongsPkPlayer.toggle();\" title=\"Expand/Collapse\">></a></div>\n\<div class=\"flashMp3PlayerWrapper\"><object id=\"flashMp3Player\" style=\"display: inline-block;margin-left: auto;margin-right: auto;padding-top:10px;clear:both\" type=\"application/x-shockwave-flash\" data=\"http://flash-mp3-player.net/medias/player_mp3_multi.swf\" width=\"500\" height=\"250\"><param name=\"movie\" value=\"http://flash-mp3-player.net/medias/player_mp3_multi.swf\" /><param name=\"bgcolor\" value=\"#c0c0c0\" /><param name=\"FlashVars\" value=\"wmode=transpa&width=550&height=250&rent&mp3=" + plUrls + "&title=" + plTitles + "\" /></object></div></div>";
            $('#keuPlayer').remove();
            $('body').append(keuPlayer);
            $('#keuPlayer').hover(function() {
                $(this).css('opacity', '1');
            }, function() {
                $(this).css('opacity', '0.4');
            });
        }
    }
    /**
     * Load Resource and buld player
     */
    getResource('http://' + baseUrl + '/mep-feature-playlist/mediaelement/jquery.js', function() {
        createPlayer();
        console.log('YAY! Songspk player has been loaded');
    });
    return {
        toggle: function() {
            _toggle();
        }
    };
})();
