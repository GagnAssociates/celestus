$("#btnSelectionnerVaisseau").on("click", function () {
});
$(function () {
    $("#selChassisVaisseau").append($('<option>', { value: "", text: "Tous" }));
    $.each(typesVaisseaux, function (key, value) {
        $("#selChassisVaisseau").append($('<option>', { value: key, text: value }));
    });

    var listeRechercheVaisseaux = listePlansVaisseaux;
    $('#listeRechercheVaisseaux').bootstrapTable('destroy');
    if ($(this).width() < 981) {
        //do something
        $('#listeRechercheVaisseaux').bootstrapTable({
            cardView: true, onClickRow: function (row) {
                //ChargerVaisseau(row);
            }
        }).on('click-row.bs-table', function (e, row, $element) {
            //ChargerVaisseau(row, $element);
        });
    } else {
        $('#listeRechercheVaisseaux').bootstrapTable({
            cardView: false, onClickRow: function (row) {
                //ChargerVaisseau(row);
            }
        }).on('click-row.bs-table', function (e, row, $element) {
            //ChargerVaisseau(row, $element);
        });
    }
    
    $.each(listePlansVaisseaux, function (e, $element) {
        AjouterVaisseauRecherche($element.codeVaisseau, $element.nom, $element.chassis, $element.coutM, $element.coutT, $element.coutP, $element.coutZ);
    });
    //$('#listeRechercheVaisseaux').bootstrapTable('load', listeVaisseaux);
});

$("#btnRechercherVaisseau").on("click", function () {
    var vaisseauxTrouves = [];
    vaisseauxTrouves = RechercherPlansVaisseaux($("#txtNomVaisseau").val(), $("#selChassisVaisseau").val());
    $('#listeRechercheVaisseaux').bootstrapTable('load', []);
    $.each(vaisseauxTrouves, function (e, $element) {
        AjouterVaisseauRecherche($element.codeVaisseau, $element.nom, $element.chassis, $element.coutM, $element.coutT, $element.coutP, $element.coutZ);
    });
});