
// import { axios } from '/plugins/axios/index.js'
import { gsap } from '/plugins/gsap/index.js'
import { ScrollTrigger } from '/plugins/gsap/ScrollTrigger.js'
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
    // $.fn.select2.defaults.set( "theme", "bootstrap-5" );
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
})

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


if ($('header').hasClass('headerPage')){
    gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions:"play none none reverse"
})
    gsap.from('.barDeNavigation',{
        opacity: 0,
        display: 'none',
        y: 3,
        scrollTrigger:{
        trigger:'.offres',
        scrub:1,
        start:"top bottom",
        end:"bottom",
        }
    })
}

$('.chat').on('click' ,function () {
    $('.chatContainer').removeClass('hide')
    $('.chatContainer .messagebody').html(' ')
    let userId = $(this).attr('data-id');
})

$('.closeChat').on('click' ,function () {
    $('.chatContainer').addClass('hide')
    let userId = $(this).attr('data-id');
})
