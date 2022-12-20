//Initialisation
$(function () {
    //Sort par clés multiples
    Array.prototype.keySort = function (keys) {

        keys = keys || {};

        // via
        // http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
        var obLen = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key))
                    size++;
            }
            return size;
        };

        // avoiding using Object.keys because I guess did it have IE8 issues?
        // else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
        // whatever
        var obIx = function (obj, ix) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (size == ix)
                        return key;
                    size++;
                }
            }
            return false;
        };

        var keySort = function (a, b, d) {
            d = d !== null ? d : 1;
            // a = a.toLowerCase(); // this breaks numbers
            // b = b.toLowerCase();
            if (a == b)
                return 0;
            return a > b ? 1 * d : -1 * d;
        };

        var KL = obLen(keys);

        if (!KL)
            return this.sort(keySort);

        for (var k in keys) {
            // asc unless desc or skip
            keys[k] =
                    keys[k] == 'desc' || keys[k] == -1 ? -1
                  : (keys[k] == 'skip' || keys[k] === 0 ? 0
                  : 1);
        }

        this.sort(function (a, b) {
            var sorted = 0, ix = 0;

            while (sorted === 0 && ix < KL) {
                var k = obIx(keys, ix);
                if (k) {
                    var dir = keys[k];
                    sorted = keySort(a[k], b[k], dir);
                    ix++;
                }
            }
            return sorted;
        });
        return this;
    };

    $('#tauxMetal').NumBox({ type: 'integer', min: 0, max: 50000 });

    // $('#tauxMetal').TouchSpin({ min: 0, max: 5000, step: 100, initval: 1000, boostat: 5, maxboostedstep: 500 });

    $('#tauxTritium').NumBox({ type: 'integer', min: 0, max: 150000 });
    $('#tauxPP').NumBox({ type: 'integer', min: 0, max: 20000000 });
    $('#txtNbrMKII').NumBox({ type: 'integer', min: 0, max: 100000000 });
    $('#txtNbrVaiss').NumBox({ type: 'integer', min: 0, max: 100000000000 });
    $('#prixGiZ').NumBox({ type: 'integer', min: 0, max: 150000000 });


    //AjouterBatimentListe();
    $('#listeBatiments').bootstrapTable({
        onClickRow: function (row) {
            ChargerBatiment(row);
        }
    });

    $('#listeTechnologies').bootstrapTable({
        onClickRow: function (row) {
            ChargerTechnologie(row);
        }
    });

    LoadFromLocal();
    
    //On rempli les listes de vaisseaux
    RemplirListePlansVaisseaux($(".selectVaisseau"));

    calculCoutModules();
    calculCoutTechnologie();
    calculCoutVaisseaux();
    calcRampe(null);
    calcTC(this);
    calcAIA();

    /* $('.spinner .btn:first-of-type').on('click', function () {
         var tempVal = parseInt($(this).parentsUntil('.col-md-6').find('.form-control').val());
         if (tempVal < 100) { $(this).parentsUntil('.col-md-6').find('.form-control').val(parseInt(tempVal, 10) + 1).change(); }
     });
     $('.spinner .btn:last-of-type').on('click', function () {
         var tempVal = parseInt($(this).parentsUntil('.col-md-6').find('.form-control').val());
         if (tempVal > 0) { $(this).parentsUntil('.col-md-6').find('.form-control').val(parseInt(tempVal, 10) - 1).change(); }
     });*/

    $('#nudObjReduc.spinner.form-control').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin({ min: 0, max: 5 });

    $("#nudPolitiqueTech.spinner.form-control, #nudPolitiqueBat.spinner.form-control, #nudPolitiqueBatMKII.spinner.form-control, #nudPolitiqueVaiss.spinner.form-control").on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin({ min: 0, max: 25 });

    $('#nudNiveauBS.spinner.form-control, #nudBonusTCLabs.spinner.form-control').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin({ min: 0, max: 5000 });

    $('#nudNiveauAIA.spinner.form-control, #nudNiveauRampe.spinner.form-control, #nudPorteeRampe.spinner.form-control, #nudPtsTech.spinner.form-control, #nudNiveauTC.spinner.form-control, #nudNiveauStructTc.spinner.form-control, #nudCumulLabs.spinner.form-control, #nudPorteeTCLabs.spinner.form-control').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin({ min: 0, max: 50000 });

    $('#nudVitesseRampe.spinner.form-control').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin({ min: 1, max: 200 });

    $('.spinner.form-control').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).TouchSpin();

    //Gestion des Numeric Up Down      
    $('#nudActuel').on('change', function () {
        if (parseInt($('#nudDesire').val()) < 100 && parseInt($('#nudActuel').val()) >= parseInt($('#nudDesire').val())) {
            if (parseInt($('#nudActuel').val()) < 100) {
                $('#nudDesire').val(parseInt($('#nudActuel').val()) + 1);
            } else {
                $('#nudDesire').val(100);
            }

        }
    });
    $('#nudDesire').on('change', function () {
        if (parseInt($('#nudActuel').val()) > 0 && parseInt($('#nudDesire').val()) <= parseInt($('#nudActuel').val())) {
            if (parseInt($('#nudDesire').val()) > 0) {
                $('#nudActuel').val(parseInt($('#nudDesire').val()) - 1);
            } else {
                $('#nudActuel').val(0);
            }
        }
    });

    $('#nudActuelTech').on('change', function () {
        if (parseInt($('#nudDesireTech').val()) < 100 && parseInt($('#nudActuelTech').val()) >= parseInt($('#nudDesireTech').val())) {
            if (parseInt($('#nudActuelTech').val()) < 100) {
                $('#nudDesireTech').val(parseInt($('#nudActuelTech').val()) + 1);
            } else {
                $('#nudDesireTech').val(100);
            }

        }
    });
    $('#nudDesireTech').on('change', function () {
        if (parseInt($('#nudActuelTech').val()) > 0 && parseInt($('#nudDesireTech').val()) <= parseInt($('#nudActuelTech').val())) {
            if (parseInt($('#nudDesireTech').val()) > 0) {
                $('#nudActuelTech').val(parseInt($('#nudDesireTech').val()) - 1);
            } else {
                $('#nudActuelTech').val(0);
            }
        }
    });

    //$('#nudActuel').jStepper({ minValue: 0, maxValue: 100, allowDecimals: false });
    //$('#nudDesire').jStepper({ minValue: 0, maxValue: 100, allowDecimals: false });
    //$('#nudReduc').jStepper({ minValue: 0, maxValue: 100, allowDecimals: false });
    //$('#nudNbrChan').jStepper({ minValue: 0, maxValue: 200, allowDecimals: false });

    //Lancement des calculs
    $('#panSaisie,#panGlobal').find('input,select').on('change', function () {
        calculCoutModules();
    });

    $('#panSaisieTech,#panGlobal').find('input,select').on('change', function () {
        calculCoutTechnologie();
    });

    $('#panChoixVaisseau,#panGlobal').find('input,select').on('change', function () {
        calculCoutVaisseaux();
    });

    $('#panBatisseur input').on('change', function () {
        calcBatisseur();
    });

    $('#AIA input').on('change', function () {
        calcAIA();
    });

    $('#rampeLancement input').on('change', function () {
        calcRampe(this);
    });

    $('#technocites input').on('change', function () {
        calcTC(this);
    });

    $('#niveauxtechnologies input').on('change', function () {
        SaveToLocal();
    });

    $('#options input').on('change', function () {
        SaveToLocal();
    });

    $("#btnVider").on('click', function () { ViderBatimentListe(); });
    $("#btnAjouter").on('click', function () { AjouterBatimentListe(); });
    $('#listeBatiments').find('.btn').on('click', function () { EnleverBatimentListe(this); });
    $("#btnVoirDetailsListeBats").on('click', function () { VoirDetailsModules(); });
    $("#btnExporterListeBats").on('click', function () { ExporterListeBatiments(); });
    $("#btnImporterListeBats").on('click', function () { ImporterListeBatiments(); });
    $("#btnSelectionnerDetailsModules").on('click', function () { SelectText('resumeCommande'); });

    $("#btnViderTech").on('click', function () { ViderTechnologieListe(); });
    $("#btnAjouterTech").on('click', function () { AjouterTechnologieListe(); });
    $('#listeTechnologies').find('.btn').on('click', function () { EnleverTechnologieListe(this); });
    $("#btnExporterListeTechs").on('click', function () { ExporterListeTechnologies(); });
    $("#btnImporterListeTechs").on('click', function () { ImporterListeTechnologies(); });

    $("#btnViderVaiss").on('click', function () { ViderVaisseauListe(); });
    $("#btnAjouterVaiss").on('click', function () { AjouterVaisseauListe(); });
    $('#listeVaisseaux').find('.btn').on('click', function () { EnleverVaisseauListe(this); });
    $("#btnExporterListeVaisseaux").on('click', function () { ExporterListeVaisseaux(); });
    $("#btnImporterListeVaisseaux").on('click', function () { ImporterListeVaisseaux(); });

    var today = new Date();
    $('#dateCopyRight').text(today.getFullYear());

    CalcTotalBatimentsListe();
    CalcTotalTechnologiesListe();

    $(window).resize(function () {
        listeBatiments = $('#listeBatiments').bootstrapTable('getData');
        $('#listeBatiments').bootstrapTable('destroy');
        if ($(this).width() < 981) {
            //do something
            $('#listeBatiments').bootstrapTable({
                cardView: true, data: listeBatiments, onClickRow: function (row) {
                    ChargerBatiment(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerBatiment(row, $element);
            });
        } else {
            $('#listeBatiments').bootstrapTable({
                cardView: false, data: listeBatiments, onClickRow: function (row) {
                    ChargerBatiment(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerBatiment(row, $element);
            });
        }
        CalcTotalBatimentsListe();


        listeTechnologies = $('#listeTechnologies').bootstrapTable('getData');
        $('#listeTechnologies').bootstrapTable('destroy');
        if ($(this).width() < 981) {
            //do something
            $('#listeTechnologies').bootstrapTable({
                cardView: true, data: listeTechnologies, onClickRow: function (row) {
                    ChargerTechnologie(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerTechnologie(row, $element);
            });
        } else {
            $('#listeTechnologies').bootstrapTable({
                cardView: false, data: listeTechnologies, onClickRow: function (row) {
                    ChargerTechnologie(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerTechnologie(row, $element);
            });
        }
        CalcTotalTechnologiesListe();


        listeVaisseaux = $('#listeVaisseaux').bootstrapTable('getData');
        $('#listeVaisseaux').bootstrapTable('destroy');
        if ($(this).width() < 981) {
            //do something
            $('#listeVaisseaux').bootstrapTable({
                cardView: true, data: listeVaisseaux, onClickRow: function (row) {
                    ChargerVaisseau(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerVaisseau(row, $element);
            });
        } else {
            $('#listeVaisseaux').bootstrapTable({
                cardView: false, data: listeVaisseaux, onClickRow: function (row) {
                    ChargerVaisseau(row);
                }
            }).on('click-row.bs-table', function (e, row, $element) {
                ChargerVaisseau(row, $element);
            });
        }
        CalcTotalVaisseauxListe();
    });


    //On affiche la bonne page
    var option = 'batiments';
    var url = window.location.href;
    option = url.match(/option=(.*)/)?url.match(/option=(.*)/)[1]:option;
    showDiv(option);

    window.onpopstate = function (e) {
        var option = 'batiments';
        var url = window.location.href;
        option = url.match(/option=(.*)/) ? url.match(/option=(.*)/)[1] : option;
        showDiv(option,true);
        /*if (e.state) {
            document.getElementById("content").innerHTML = e.state.html;
            document.title = e.state.pageTitle;
        }*/
    };
});

