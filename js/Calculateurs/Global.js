//Fonctions globales
function big_number(nombre) {
    var negatif = (nombre < 0);
    var output = "";
    if (negatif) {
        nombre *= -1;
        output = "-";
    }
    if (nombre >= 1000000000000000000000000) {
        output += formatNumber(Math.round(nombre / 10000000000000000000000) / 100) + " Y";
    } else
        if (nombre >= 1000000000000000000000) {
            output += Math.round(nombre / 10000000000000000000) / 100 + " Z";
        } else
            if (nombre >= 1000000000000000000) {
                output += Math.round(nombre / 10000000000000000) / 100 + " E";
            } else
                if (nombre >= 1000000000000000) {
                    output += Math.round(nombre / 10000000000000) / 100 + " P";
                } else if (nombre >= 1000000000000) {
                    output += Math.round(nombre / 10000000000) / 100 + " T";
                } else if (nombre >= 1000000000) {
                    output += Math.round(nombre / 10000000) / 100 + " G";
                } else if (nombre >= 1000000) {
                    output += Math.round(nombre / 10000) / 100 + " M";
                } else if (nombre >= 1000) {
                    output += Math.round(nombre / 10) / 100 + " k";
                } else {
                    output += Math.round(nombre);
                }

    return output;
}

function formatNumber(number) {
    number += '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function formatTime(seconds) {
    var resultat = "";
    var semaines = Math.floor(seconds / 86400 / 7);
    var jours = Math.floor(seconds / 86400) % 7;
    var heures = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secondes = Math.floor(seconds % 60);

    if (semaines > 0)
    { resultat += semaines + "sem "; }
    if (jours > 0)
    { resultat += jours + "j "; }
    if (heures > 0)
    { resultat += heures + "h "; }
    if (minutes > 0)
    { resultat += minutes + "m "; }
    if (secondes >= 0)
    { resultat += secondes + "s "; }

    return resultat;
}

function unFormat(string) {
    var out = string.replaceAll(' ', '');
    out = out.replaceAll('-', '');
    out = out.replaceAll('.', '');
    return out;
}

function SelectText(element) {
    var doc = document, text = doc.getElementById(element), range, selection
    ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function showDiv(option, precedent) {
    if (!$("#chkCoutsAffiches").is(":checked")) {
        $("#panResultat").hide();
        $("#panModules").hide();
    }
    else {
        $("#panResultat").show();
        $("#panModules").show();
    }

    if (!$("#chkCoutsReels").is(":checked")) {
        $("#panReelResultat").hide();
        $("#panReelModules").hide();
    }
    else {

        $("#panReelResultat").show();
        $("#panReelModules").show();
    }


    $('.moduleCalc').hide();
    $('.menu').removeClass('active');
    if ($('#' + option).length) {
        $('#' + option).show();
        $('.menu' + option).addClass('active');
        $('#menu.menu' + option).click();
    }
    else {
        $('#404').show();
    }
    document.title = $('#' + option).find('.panel-title b').first().text() + " - Calculateurs Célestus";
    if (!precedent)
    {
        window.history.pushState({}, document.title, replaceQueryParam('option', option, window.location.search));
    }
    ga('send', 'pageview', {
        'page': location.pathname + "?option="+option
    });
}

function SaveToLocal() {
    if (typeof (Storage) !== "undefined") {
        $('.form-control, .checkbox').each(function () {
            if ($(this).attr('id')) {
                if ($(this).hasClass('NumBox')) {
                    localStorage.setItem($(this).attr('id'), $(this).NumBox('getRaw'));
                }
                else if ($(this).hasClass('checkbox')) {
                    localStorage.setItem($(this).attr('id'), $(this).is(':checked'));
                }
                else{
                    localStorage.setItem($(this).attr('id'), $(this).val());
                }
            }

        });
        $('.bootstrapTable').each(function () {
            localStorage.setItem($(this).attr('id'), JSON.stringify($(this).bootstrapTable('getData')));
        });
    } else {
        // Sorry! No Web Storage support..
    }

}

function LoadFromLocal() {
    for (var i in window.localStorage) {
        val = localStorage.getItem(i);
        //value = val.split(","); //splitting string inside array to get name
        //name[i] = value[1]; // getting name from split string
        if (!(i.match("^key$|^getItem$|^setItem$|^removeItem$|^clear$|^length$|^undefined$")) && document.getElementById(i)) {
            if (val === "true" || val === "false") {
                $('#' + i).attr('checked', val === "true");
            }
            else if ($('#' + i).hasClass('NumBox')) {
                $('#' + i).NumBox('setRaw', val);
            }
            else if ($('#' + i).hasClass('bootstrapTable') && val) {
                $('#' + i).bootstrapTable('load', JSON.parse(val));
            }
            else {
                $('#' + i).val(val);
            }
        }
    }
}

function RechercherVaisseau(selectlist)
{
    $("#rechercheVaisseau").load("Modules/Vaisseaux/RechercheVaisseaux.html");
    $("#rechercheVaisseau").modal('show');



}

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
