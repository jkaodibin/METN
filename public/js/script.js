// Range slider init
$("#rangeSliderPrix").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 1000000,
    step: 10000,
    skin: "round"
});

// Select Init
$(document).ready(function (){
    initSelect___()
    $.fn.select2.defaults.set( "theme", "bootstrap-5" );
})
$('.select2-type, .select2-categorie , .select2-lieu').select2({
    multiple:true,
        language: {
            noResults: function() {
                return "<div class='text-center'><span class='text-muted font-size-13'>Ooooo!!, pas de resultat! </div>";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        }
});
// Datatable init
$('#tablePostule, #tablePub').DataTable({
        "language": {
            "paginate": {
                "first": "Premier",
                "last": "Dernier",
                "next": "Suivant",
                "previous": "Précedent"
            },
            sZeroRecords: "Rien ne corespond à vos conditions (ou recherche)",
            "loadingRecords": "Chargement en cours...",
            "search": "Recherche rapide",
            "lengthMenu": "Lignes par page: _MENU_",
            "info": "Nombre Total :<strong class='font-size-30'> _TOTAL_ <strong>",
            "emptyTable": "Liste Vide",
            "infoEmpty": "Rien à afficher",
            "infoFiltered": " resultat",
        }
});