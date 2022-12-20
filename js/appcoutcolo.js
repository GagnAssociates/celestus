requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        calcs: '../Calculateurs'
    }
});

//Chargement des librairies
requirejs(['bootstrap', 'bootstrap-table.min', 'jquery.bootstrap-touchspin.min', 'jquery.jstepper.min', 'jquery.numbox-1.3.0.min', 'modernizr.custom.97185', 'number-polyfill.min', 'responsive-tables', 'sidebar_menu'],
    function () {
        //Chargement des scripts de l'application
        if ($(location).attr('href').indexOf('dev') >= 0) {
            requirejs(['calcs/Global'], function () { requirejs(['calcs/formules']); });
            $('head').append('<link rel="stylesheet" href="css/style.css" />');
        }
        else {
            requirejs(['calcs/Global.min'], function () { requirejs(['calcs/formules.min']); });
            $('head').append('<link rel="stylesheet" href="css/style.min.css" />');
        }

    });
