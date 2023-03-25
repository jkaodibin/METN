
//_______________List datatable ___BEGIN________//

var counter = 0;
var counter_md = 0;
var counter_si = 0;
var counter_dl = 0;
$('form, input').keypress(
    function(event){
        if (event.which == '13') {
            event.preventDefault();
        }
    });
//_______________List aticle________//
function initDataTable(item, order = [[1, 'asc']]) {
    return item.DataTable({
        colReorder: true,
        "drawCallback": function() {
                if(counter_dl<1)loadConfirmDelete();
                if(counter_md<1)load_modification();
                if(counter_si<1)load_showInfo();
        },
        "language": {
            "paginate": {
                "first": "Premier",
                "last": "Dernier",
                "next": "Suivant",
                "previous": "Précedent"
            },
            sZeroRecords: "Rien ne corespond à vos conditions (ou recherche)",
            "loadingRecords": "Chargement en cours...",
            "search": "Mots clées",
            "lengthMenu": "Nombre d' entré: _MENU_",
            "info": "Nombre Total :<strong class='font-size-30'> _TOTAL_ <strong>",
            "emptyTable": "Liste Vide",
            "infoEmpty": "Rien à afficher",
            "infoFiltered": " resultat",
        }
    }).order(order);
}

var table_loc =  $('#list_achat_locale').DataTable({
    "order": [[ 1, 'desc' ]],
    colReorder: true,
    "drawCallback": function() {
        if(counter <1) suivi();
    },
    "language": {
        sZeroRecords: "Rien ne corespond à vos conditions (ou recherche)",
        "paginate": {
            "first": "Premier",
            "last": "Dernier",
            "next": "Suivant",
            "previous": "Précedent"
        },
        "loadingRecords": "Chargement en cours...",
        "search": "Mots clées",
        "lengthMenu": "Nombre d' entré: _MENU_",
        "info": "Nombre Total :<strong class='font-size-30'> _TOTAL_ <strong>",
        "emptyTable": "Liste Vide",
        "infoEmpty": "Rien à afficher",
        "infoFiltered": " resultat",
    }
})

var table_ext = $('#list_achat_externe').DataTable({
    "order": [[ 1, 'desc' ],[ 2, 'asc' ]],
    colReorder: true,
    "drawCallback": function() {
        if(counter <1) suivi();
    },
    "language": {
        sZeroRecords: "Rien ne corespond à vos conditions (ou recherche)",
        "paginate": {
            "first": "Premier",
            "last": "Dernier",
            "next": "Suivant",
            "previous": "Précedent"
        },
        "loadingRecords": "Chargement en cours...",
        "search": "Mots clées",
        "lengthMenu": "Nombre d' entré: _MENU_",
        "info": "Nombre Total :<strong class='font-size-30'> _TOTAL_ <strong>",
        "emptyTable": "Liste Vide",
        "infoEmpty": "Rien à afficher",
        "infoFiltered": " resultat",
    }
})

// on events -> table_ext.order(orderTable = [[ 1, 'asc' ],[ 2, 'asc' ],[ 3, 'desc' ]]).draw()
$('#reset_loc').click(function () {
    orderTable(table_loc,[[ 1, 'desc' ]])
})
$('#reset_ext').click(function () {
    orderTable(table_ext,[[ 1, 'desc' ],[ 2, 'asc' ]])
})

$('#filter_ext').click(function () {
    let order = [];
    let data = $(this).parent().parent().serializeArray();

    data.forEach(function (item, i) {
        if (i % 2 === 0 && item.value !== 'false'){
            if (data[i+1].value === '1'){
                order.push([ item.value , 'desc' ])
            }
            else{
                order.push([ item.value , 'asc' ])
            }
        }
    })
    orderTable(table_ext, order)

    // orderTable(table_ext, order);
})
$('#filter_loc').click(function () {
    let order = [];
    let data = $(this).parent().parent().serializeArray();

    data.forEach(function (item, i) {
        if (i % 2 === 0 && item.value !== 'false'){
            if (data[i+1].value === '1'){
                order.push([ item.value , 'desc' ])
            }
            else{
                order.push([ item.value , 'asc' ])
            }
        }
    })
    orderTable(table_loc, order)

})


function orderTable(table, order ){
    table.order(order).draw()
}

//_______________List datatable ___END________//





//_______________Filtre column ___BEGIN________//

$(document).ready(function () {
    function filterColumn(id){
        let idFilter = $('#'+ id);
        let classFilter = $('.'+ id);
        let check = idFilter.prop('checked');

        if(check === false){
            idFilter.addClass('hide');
            classFilter.each(function (){
                $(this).addClass('hide');
            });
        }else {
            idFilter.removeClass('hide');
            classFilter.each(function (){
                $(this).removeClass('hide');
            });
        }
    }


    $('.colomList :checkbox').each(function (){
        let id = $(this).attr('id');
        $(this).click(function (){
            filterColumn(id);
        })
    })
})


//_______________Filtre column ___END________//




//_______________Export to excel ___START________//
$('#table_article_to_csv').click(function (){
    $('#list_article').table2excel({
        exclude: ".hide, .pic ,.action",
        filename: "Liste article__" + new Date().toISOString().replace(/[\-\:\.]/g, "") + "",
        fileext: "xlsx",
        exclude_img: false,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
});

$('#table_achat_to_csv').click(function (){

    $('#list_achat').table2excel({
        exclude: ".hide, .action",
        filename: "Liste Commande __" + new Date().toISOString().replace(/[\-\:\.]/g, "") + "",
        fileext: "xlsx",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
});
//_______________Export to excel ___END________//




//_______________Export to Pdf ___START________//

// $('#table_article_to_pdf').click(function (){
//
//     $('#list_article').tableHTMLExport({
//         type: "pdf",
//         orientation: 'l',
//         ignoreColumns: ".hide, .action",
//         filename: "Liste __" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".pdf",
//
//     });
// });

// //_______________Export to Pdf ___END________//










// //_______________Screen responsive stack table ___start________//


// //_______________Screen responsive stack table ___END________//













// //_______________DateRange Picker ___START________//


// //_______________DRP for MODAL new commande ___start________//


function initDatePicker(jQinput){
    return jQinput.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
}
function initEmptyDatePicker(jQinput){
    jQinput.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false
    }).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY'));
    });
}

initDatePicker($('input[name="date_commande"], input[name="date_arrive"]'));
initEmptyDatePicker($('input[name="date_livraison"], input[name="date_prev_arrive"], input[name="date_embarquement"],  input[name="date_achat"]'));




// //_______________DRP for MODAL new commande ___END________//

// //_______________DateRange Picker ___END________//












// //_______________Confirm delete ___START________//

function loadConfirmDelete(){
    counter_dl++
    $('.confirmDelete').click(function(e){
        e.preventDefault()
        let form = $(this).parent();
        let table = form.parent().parent().parent().parent()
        let t = table.DataTable();
        let url = form.attr('action')
        let data = form.serialize()
        swal({
            title: "Etes-vous sure?",
            text: "Cette action sera irreversible !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if(willDelete) {
                    $.post(url, data, function (Response){
                        if (Response.status[0] === 'delete_success'){

                            if(table.hasClass('dataTable')){
                                form.parent().parent().remove()
                                swal("C'est fait!", "Suppression fait!", "success");

                                // let reload_link = table.attr('data-link');
                                // window.location.replace(reload_link);
                                    t
                                        .row( form.parents('tr') )
                                        .remove()
                                        .draw();
                            }
                            else {
                                form.parent().parent().remove()

                                const tbody = form.parent().parent().parent()

                                if (tbody.children().length === 0) {
                                    tbody.html('<tr>\n' +
                                        '        <td colspan="3">Vous avez vidé la liste!</td>\n' +
                                        '    </tr>')
                                }
                                swal("C'est fait!", "Suppression fait!", "success");
                            }


                        }
                        else{
                            swal("Desolée!", "Vous n'avez pas droit à cette action!", "error");
                        }
                    }).fail(function(response) {
                        swal("Desolée!", "Vous n'avez pas droit à cette action!", "error");
                    });

                }
            })
    });

}loadConfirmDelete()
// //_______________Confirm delete ___END________//





// ________________________ Select init Start ______________________________________________________________
function initSelect___() {
    $('.payement_select,  .initSelect').select2({
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
    $('.initSelectOne, .initSelectOne2').select2({
        multiple:false,
        language: {
            noResults: function() {
                return "<div class='text-center'><span class='text-muted font-size-13'>Ooooo!!, pas de resultat! </div>";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        }
    });

}
$(document).ready(function (){
    initSelect___()
    $.fn.select2.defaults.set( "theme", "bootstrap-5" );
})

function createThisQuickly(jQSelect2Obj, url, typeOfCli = false) {
    let new_item = typedInSelect;
    let newOption = new Option(new_item,new_item, true, true);
    let data = (typeOfCli)? {'item':new_item, 'cat_cli':typeOfCli} : {'item':new_item}
    $.post(url,data, function (Response) {
        if(Response.statut !== "success"){
            swal("Erreur lors de l'ajout!", "", "error");// VenteCtrlR:54:quickCrtCli
        }else{
            if(jQSelect2Obj.hasClass('azaMantanyHahaha')){
                $('#modal_commande_ajout #cmd_code_cli').val(Response.code_cli)
                $('#new_devis_form #cmd_code_cli').val(Response.code_cli)
                $('.code_cli').html(Response.code_cli)
                $('.fb2c_code_cli').html(Response.code_cli)
                $('.fb2b_cli').html(Response.cli)
                $('.fb2c_cli').html(Response.cli)
                $('.fb2c_cli2').html(Response.cli)
                $('.bl_cli').html(Response.cli)

                politique_selection = $('select.politique')
                adress_selection = $('select.lieu_livraison, select.fact_lieu_livraison')
                pLink = jQSelect2Obj.attr('data-PLink');
                lLink = jQSelect2Obj.attr('data-LLink');

                politique_selection.select2({
                    data: [],
                    multiple: false,
                    language: {
                        noResults: function() {
                            pl = pLink;
                            typedInSelect = event.target.value;
                            return "<div class='text-center'><span class='text-muted font-size-13'>Ooooo!!, pas de resultat! <i class='fas fa-smile'></i></span><br><button type='button' onclick='createThisQuickly(politique_selection, pl)' class='btn create_this_article btn-sm btn-success'>Nouvelle politique ?</button></div>";
                        }
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    }
                })
                adress_selection.select2({
                    data:[],
                    multiple: false,
                    language: {
                        noResults: function() {
                            ll = lLink;
                            typedInSelect = event.target.value;
                            return "<div class='text-center'><span class='text-muted font-size-13'>Ooooo!!, pas de resultat! <i class='fas fa-smile'></i></span><br><button type='button' onclick='createThisQuickly(adress_selection, ll)' class='btn create_this_article btn-sm btn-success'>Nouvelle adresse ?</button></div>";
                        }
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    }
                })

            }
        }
    })
    jQSelect2Obj.append(newOption).trigger('change');
    jQSelect2Obj.select2("close");

    typedInSelect = "";
}
// ________________________ Select init End ______________________________________________________________










//__________________________ DropZone init ___________________________ Start _____________________________
function InitDropzone(className) {

    Dropzone.autoDiscover = false;

    $('.'+className).click(function() {
        Dropzone.autoDiscover = false;
        //Dropzone class
            url = $('#addPic').attr('data-link');

        let dropPic = new Dropzone(".dropzone", {
            url: url,
            paramName: "pic",
            // maxFilesize: 4,
            maxFiles: 1,
            addRemoveLinks: true,
            acceptedFiles: "image/*",
            autoProcessQueue: false
        });
        dropPic.options.dictDefaultMessage = "Cliquez ou glisser votre fichier ici";
        dropPic.options.dictFileTooBig = "Fichier trop grand ({{filesize}}MiB). Max autorisé: {{maxFilesize}}Mo.";
        dropPic.options.dictInvalidFileType = "Vous ne pouvez pas importer ce type de fichier.";
        dropPic.options.dictResponseError = "Erreur au niveau du serveur, code: {{statusCode}}.";
        dropPic.options.dictCancelUpload = "Annuler l'import";
        dropPic.options.dictCancelUploadConfirmation = "Etes-vous sûr?";
        dropPic.options.dictRemoveFile = "Retirer le fichier";
        dropPic.options.dictMaxFilesExceeded = "Vous avez atteint le nombre max d'importation.";

        $('#new_article').click(function () {
            dropPic.processQueue()
        })

    });
}

InitDropzone('add_btn_article');

    //------------------------------ INIT DROPZONE IMPORT EXCEL --------------------
function InitDropExcel(className, url) {

        Dropzone.autoDiscover = false;
        //Dropzone class

        let dropExcel = new Dropzone("#"+ className +"_form .dropzone", {
            url: url,
            paramName: "excel_file",
            // maxFilesize: 4,
            maxFiles: 1,
            timeout: 0,
            addRemoveLinks: true,
            acceptedFiles: "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            autoProcessQueue: false,
            success : function(file, response){
                if(response.import === 'success'){
                    window.location.reload(true);
                }
                else{
                    swal('Erreur lors de l\'importation !!!', 'Veuillez à bien verifier les données du fichier s\'il vous plait','error')
                }
    
            }
        });

            dropExcel.options.dictDefaultMessage = "Cliquez ou glisser votre fichier ici";
            dropExcel.options.dictFileTooBig = "Fichier trop grand ({{filesize}}MiB). Max autorisé: {{maxFilesize}}Mo.";
            dropExcel.options.dictInvalidFileType = "Vous ne pouvez pas importer ce type de fichier.";
            dropExcel.options.dictResponseError = "Erreur au niveau du serveur, code: {{statusCode}}.";
            dropExcel.options.dictCancelUpload = "Annuler l'import";
            dropExcel.options.dictCancelUploadConfirmation = "Etes-vous sûr?";
            dropExcel.options.dictRemoveFile = "Retirer le fichier";
            dropExcel.options.dictMaxFilesExceeded = "Vous avez atteint le nombre max d'importation.";

        $('.btn_'+ className +'').click(function () {
            dropExcel.processQueue()
        })


}


$('#init_import_fournisseur').click(function () {
    InitDropExcel('import_fournisseur', $('#import_fournisseur_form').attr('action'));
});
$('#init_import_article').click(function () {
    InitDropExcel('import_article', $('#import_article_form').attr('action'));
});
$('#init_import_client').click(function () {
    InitDropExcel('import_client', $('#import_client_form').attr('action'));
});







//__________________________ DropZone init ___________________________ End _____________________________














// //_______________Add client in modal ajout article ___START________//
// function addClientEntry(container) {

//     let numero = container.children().length + 1;

//     container.append('' +
//         '<div class="row '+'row_'+ numero +'">' +
//         '<div class="col-lg-3 col-sm-12">'+
//         //<!-- Client -->
//         '<div class="form-group">'+
//         '<select type="text" class="form-control selectClient" id="client'+'_'+ numero +'" name="client['+ numero +']" placeholder="Designation du Client"></select>'+
//         '</div>'+
//         '</div>'+
//         '<div class="col-lg-3 col-sm-12">'+
//         // <!-- ref art Client -->
//         '<div class="form-group">'+
//         '<input type="text" class="form-control" id="ref_article'+'_'+ numero +'" name="ref_article['+ numero +']" placeholder="ref article chez Client">'+
//         '</div>'+
//         '</div>'+
//         '<div class="col-lg-2 col-sm-12">'+
//         // <!-- Code bar -->
//         '<div class="form-group">'+
//         '<input type="text" class="form-control" id="p_vente'+'_'+ numero +'" name="p_vente['+ numero +']" placeholder="p_vente article chez Client">'+
//         '</div>'+
//         '</div>'+
//         '<div class="col-lg-3 col-sm-12">'+
//         // <!-- Code bar -->
//         '<div class="form-group">'+
//         '<input type="text" class="form-control" id="code_bar'+'_'+ numero +'" name="code_bar['+ numero +']" placeholder="code_bar article chez Client">'+
//         '</div>'+
//         '</div>'+
//         '<div class="col-lg-1 col-sm-12">'+
//         '<div class="btn btn-outline-danger remove_client_in_modal"><i class="ti-trash"></i></div>'+
//         '</div>'+
//         '</div>')

//
// let client_selection = $('.selectClient');
// client_selection.select2({
//     placeholder:"Client à choisir",
//         ajax: {
//             url: client_selection.attr('data-link'),
//             delai: 250,
//             dataType: 'json',
//             processResults: function (data) {
//                 return {
//                     results: data
//                 }
//             }
//         },
//
//     })
//
//

    // //_______________remove client in modal ajout article ___Start________//
    // $('.remove_client_in_modal').click(function (e){
    //     e.preventDefault();

    //     $(this).parent().parent().remove();

    // })
    // //_______________remove client in modal ajout article ___END________//

// }

// $('.add_client_in_modal').click(function (e) {
//     e.preventDefault();
//     let container = $(this).parent().prev();
//     addClientEntry(container);
// });
// //_______________Add client in modal ajout article ___END________//










// ________________________ Modification start
function load_modification(){
    counter_md++
// ____________________________ reset modal __________________________
    function resetModal(id) {
        $(''+id+' button.close').click(function () {
            $(''+id+'_content').html(''+
                '<div style="width: 100%; height: 40vh" class="m-auto pt-5 text-center">'+
                '<div class="spinner-border mb-4 text-dark" style="line-height: 100%" role="status">'+
                '<span class="sr-only m-5">Chargement en cours, patientez un instant...</span>'+
                '</div>'+
                '</div>'
            );
        });
    }

    $('.modify_btn').click(function (){
        const  btn = $(this);
        let url = $(this).attr('data-link')
        let form = $(this).attr('data-target')+"_content"

        $.get(url, function (Response){
            $(''+form+'').html(""+Response+"");
            $('.payement_select').select2({
                multiple:true
            });

            if(btn.attr('data-target') == "#modal_modif_article"){
                let img_src = "";
                resetModal(btn.attr('data-target'))

                $('.update_image').click(function (e) {
                    e.preventDefault();
                    let update_img_btn = $(this);
                    url = $('#updatePic').attr('data-link');
                    let myDropzone2 = new Dropzone("#updatePic", {
                        url: url,
                        paramName: "pic",
                        maxFilesize: 4,
                        maxFiles: 1,
                        addRemoveLinks: true,
                        acceptedFiles: "image/*",
                        autoProcessQueue: false
                    });
                    $('#update_article').click(function () {
                        myDropzone2.processQueue()
                    })
                    let img = $('#updatePic img');
                    let cancel_img = $('.cancel_image_update');
                    img_src = img.attr('src');

                    update_img_btn.addClass('hide');
                    $('#updatePic h6, #updatePic p').removeClass('hide');
                    cancel_img.removeClass('hide');
                    // $('#updatePic img').attr('src', update_img_btn.attr('data-src'));
                    img.css("width","50%");


                    cancel_img.click(function () {
                        update_img_btn.removeClass('hide');
                        $('#updatePic h6, #updatePic p').addClass('hide');
                        cancel_img.addClass('hide');
                        img.attr('src', img_src);
                        img.css("width","80%");
                        myDropzone2.destroy();
                    });

                });
                $('.add_client_in_modif').click(function (e) {
                    e.preventDefault();
                    let container = $(this).parent().prev();
                    addClientEntry(container);
                });

            }
        })
    })

}
load_modification()
// ________________________ Modification end



$('#modal_ajout_bc').on('hide.bs.modal', function () {
    $('#date_commande').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#cours_in_use').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#ref_fact_frn').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#ref_fact_transit').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#date_embarquement').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#ref_fact_embarquement').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#frais').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#paye').val('').removeClass('is-valid').removeClass('is-invalid');
    $('#list_cmd_externe').html('');
    init_data();
    update_total()
    $('#fournisseur').val('').trigger('change').removeClass('is-valid').removeClass('is-invalid');
    $('#transitaire').val('').trigger('change').removeClass('is-valid').removeClass('is-invalid');
});






// ____________________________ Show Detail Article Article __________________________ start
function load_showInfo(){
    counter_si++
    $('.show_detail_article').click(function (){
        const url = $(this).attr('data-link');
        const id = $(this).attr('data-target');
        $.get(url,function (Response) {
            $(''+id+'_content').html(Response);

            // ____________________________ DaterangePicker for Detail Article __________________________ start
            let datefilter = $('input[name="date_graph_filter"]');
            datefilter.daterangepicker({
                autoUpdateInput: false,
                locale: {
                    cancelLabel: 'Clear'
                }
            });
            datefilter.on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            });
            $('input.create-event-datepicker').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: false
            }).on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('MM/DD/YYYY'));
            });
            // ____________________________ DaterangePicker for Detail Article __________________________ end




            // //_______________ChartJs  article detail ___START________//
            const ctx = $('#graph_in_detail')
            const myChart = new Chart(ctx, {
                type: 'line',
                data:
                    {
                        labels: ['un', 'deux', 'troix', 'quatre', '5' , '6', '7'],
                        datasets: [{
                            label: 'test1',
                            data: [12, 19, 3, 5, 2, 3, 7],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1,
                            tension: 0.4
                        },{
                            label: 'test2',
                            data: [1, 9, 13, 15, 20, 3, 4],
                            backgroundColor: [
                                'rgba(104,255,99,0.2)'
                            ],
                            borderColor: [
                                'rgb(141,255,99)'
                            ],
                            borderWidth: 1,
                            tension: 0.4
                        },{
                            label: 'test3',
                            data: [2, 1, 7, 0, 8, 3, 17],
                            backgroundColor: [
                                'rgba(99,250,255,0.2)'
                            ],
                            borderColor: [
                                'rgb(99,255,255)'
                            ],
                            borderWidth: 1,
                            tension: 0.4
                        }]
                    },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            // //_______________ChartJs article detail ___END________//


            // ___________ REMOVE HTML ON CLOSE _____________
            resetModal(id)
        })
    });
}load_showInfo()
// ____________________________ Show Detail Article __________________________ end























///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ____________________________ RESAKA COMMANDE LE MANOMBOKA ETO HAHAHA __________________________ start
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// anomboka tsika ary eih, ireto avy reo variabla mbo ilaina amty rah ty

let mode ="externe";
let tarif_usd = 0;
let tarif_devise = 0;
let tarif_ar = 0;


let pat_frn = 0;
let montant_total = 0;
let vol_total_cmd = 0;
let frais_transport = 0;
let rest =0;

let cours_devise = 0;
let cours_usd = 0;
let tarif_avion = 0;
let tarif_bateau = 0;

function init_data(){
    pat_frn = 0;
    montant_total = 0;
    vol_total_cmd = 0;
    frais_transport = 0;
    rest =0;
}
function format_number(number){
    let nf = Intl.NumberFormat("fr-FR");
    return nf.format(number);
}
// zay ihany de ampy ka, mahaiza mampiasa tsar eih haha


function NIL() {
    $('.mode_achat').click(function (e) {
        mode = $(this).attr('data-cmd');
        if (mode === "local"){
            $('.notInLocale').addClass("hide");
            $('#type_monaie').html("ariary");
        }else{
            $('.notInLocale').removeClass("hide");
            $('#type_monaie').html("Devise");
        }
    });
}NIL();// not in local


// $('#close_modal_bc').click(function(){
//     $('#transitaire').attr("disabled",true);
//     $('#mode_avion').attr("disabled",true);
//     $('#mode_bateau').attr("disabled",true);
//     $('.add_modal_trigger').attr("disabled",true);
// })


//________ Choix cours a utiliser ____________________ start
$('#cours_in_use').on('change', function () {
    let id_cours = $(this).val();
    let nom_devise = $('#cours_in_use option[value="'+id_cours+'"]').html();
    let url = $(this).attr('data-link');
    let data = {
        id_cours: id_cours
    }
    $.post(url, data, function (Response) {
        $('#cours_devise').val(Response.cours);
        $('.cours_devise').html(Response.cours+' ar');
        $('.devise_symbole').html(Response.symbole);
        $('.nom_devise').html(nom_devise);
        cours_devise = Response.cours;
        updateTarif()
        $('.add_modal_trigger').removeAttr('disabled');

    })
    $('#list_cmd_externe').html('');
    init_data();
    update_total();

    // cours_devise = $('#cours_devise').val();
})
//________ Choix cours a utiliser ____________________ end

//________ frais de transport ____________________ start
$('#frais').on('change keyup', function () {
    let frais = $(this).val();

    if(frais === ""){
        frais=0;
    }
    frais_transport = parseFloat(frais);
    update_total();
})
//________ Choix cours a utiliser ____________________ end


// ********************************************************************* //


//________ Choix transitaire  ____________________ start
$('#transitaire').on('select2:select', function () {

    $('#mode_avion').removeAttr('disabled');
    $('#mode_bateau').removeAttr('disabled');
    $('.update_cours_btn').removeAttr('disabled');

    let id_transitaire = $(this).val();
    let url = $(this).attr('data-link');
    let data = {
        id_transitaire: id_transitaire
    }
    $.post(url, data, function (Response) {
        $('#tarif_avion').val(Response.tarif_avion);
        $('#tarif_bateau').val(Response.tarif_bateau);
        tarif_avion = Response.tarif_avion;
        tarif_bateau = Response.tarif_bateau;

        updateTarif();
    })
    $('#list_cmd_externe').html('');
    init_data()
    update_total();
})
$('input[name="mode_transport"]').on('change', function() {
    updateTarif();
    $('#list_cmd_externe').html('');
    init_data()
    update_total();
});
//________ Choix transitaire ____________________ end


// _________ Rah te hanovanova valeurs cours de eto, tonga de log any am db io annh ________ play
function update_cours() {
    $('.update_cours').click(function () {
        let url = $(this).attr('data-link');
        let id_transit = $(this).attr('data-transit');
        let new_cours_usd = $('#cours_usd').val();
        let new_cours_devise = $('#cours_devise').val();
        let new_tarif_bateau = $('#tarif_bateau').val();
        let new_tarif_avion = $('#tarif_avion').val();

        cours_usd = new_cours_usd;
        tarif_bateau = new_tarif_bateau;
        tarif_avion = new_tarif_avion;
    // Modification a la creation d un bc
        if(id_transit === undefined){
            id_transit = $('#transitaire').val();
            let data = {
                id_transitaire: id_transit,
                id_devise: $('#cours_in_use').val(),
                cours_usd: new_cours_usd,
                cours_devise: new_cours_devise,
                tarif_bateau: new_tarif_bateau,
                tarif_avion: new_tarif_avion
            };

            $.post(url, data, function(response) {
                $('#list_cmd_externe').html('');
                init_data();
                updateTarif();
                update_total()
            })

        }

    // Modification a la suivi du bc
        else{
            let new_cours_usd = $('#new_cours_usd').val();
            cours_usd = new_cours_usd;
            $('#cours_usd').val(cours_usd);
            let new_tarif_aplique = $('#tarif_aplique').val();
            let vol = parseFloat(($('span#vol_total_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(",","."));
            let new_fret = vol * new_tarif_aplique;
            let new_fret_ar = new_fret * new_cours_usd;
            let pat = parseFloat(($('#pat_frn_ar_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(",","."));
            let new_total = new_fret_ar + pat;
            let acompte_payer = parseFloat($('#acompte_payer').val());
            let new_reste = new_total-acompte_payer;

            $('.new_rest').html(format_number(Math.round(new_reste)));
            $('.montant_ar_cmd').html(format_number(Math.round(new_total)));
            $('.tarif_usd').html(new_tarif_aplique);

            $('.fret_cmd').html(format_number(new_fret));
            $('.fret_ar_cmd').html(format_number(Math.round(new_fret_ar)));

            $('.tarif_ar').html(format_number(Math.round(new_tarif_aplique*cours_usd)));
            $('.cours_usd').html(format_number(Math.round(new_cours_usd)));

        }
        $(this).parent().parent().parent().removeClass('show');
    });
}
update_cours();
// _________ Rah te hanovanova valeurs cours de eto, tonga de log any am db io annh ________ pausi

// ********************************************************************* //

// func update ny tarif sy ny var ets ambony
function updateTarif() {
    if( $('#mode_avion').is(":checked")){
        tarif_usd = tarif_avion;
    } else {
        tarif_usd = tarif_bateau;
    }
    cours_usd = $('#cours_usd').val();
    // cours_devise = $('#cours_devise').val();
    tarif_ar = tarif_usd * cours_usd;
    // tarif_devise = tarif_ar / cours_devise;

    $('.tarif_usd').html(format_number(tarif_usd));
    $('.tarif_ar').html(format_number(tarif_ar));
    $('.cours_usd').html(format_number(cours_usd));
    // $('.tarif_devise').html(format_number(tarif_devise));
}


// ********************************************************************* //

//________ Choix frn  ____________________ start
$('#fournisseur').on('select2:select', function () {

    let id_fournisseur = $(this).val();
    let url = $(this).attr('data-link');
    let data = {
        id_fournisseur: id_fournisseur
    }
    $.post(url, data, function (Response) {
        $('.frn_specialisation').html(Response.specialisation);
        $('.frn_correspondant').html(Response.correspondant);
        $('.frn_mail').html(Response.mail);
        $('.frn_messagerie').html(Response.messagerie);
    })
})
//________ Choix frn  ____________________ end



// ********************************************************************* //

// Hide dropdown

var isAnUpdateOfArt = false;
// ___________________ RESAKA SERIEUX @ZAI !!! AJOUT ARTICLE ____________
function add_article_in_cmd() {
    let pr_avant, pv_avant = 0;
    let article_input = $('#form_article_designation');
    // last info article
    article_input.on('select2:select',function () {
        if(isAnUpdateOfArt === false){
            let data = {
                id_article:article_input.select2('data')[0].id
            }
            let url = article_input.attr('data-link');
            $.post(url,data, function (article) {
                $('#ref_article_fournisseur').val(article.ref);
                $('#qte_art').val(article.qte);
                $('#pa_art').val((article.pa/cours_devise).toFixed(3));
                $('#vol_art').val(article.vol_ctn);
                $('#pcb').val(article.pcb);
                pr_avant = article.pr;
                pv_avant = article.pv;

            })
        }
    })
    $('#add_article_in_cmd_list').on('hide.bs.modal', function () {
        $('#ref_article_fournisseur').val('');
        $('#qte_art').val('');
        $('#pa_art').val('');
        $('#vol_art').val('');
        $('#pcb').val('');
        article_input.val('').trigger('change');
    });


    $('#add_article_cmd_btn').click(function () {
        let data = $('form.add_art_cmd_form_').serializeArray();
        let id_art = data[0];
        let article = $('#form_article_designation option[value ='+id_art.value+']').html();

        let ref_art = data[1];
        let qte_art = data[2];
        let pa_frn = data[3];
        let vol_ctn = data[4];
        let pcb = data[5];


        if (mode === 'externe'){

            if (qte_art.value === ""|| pa_frn.value === "" || vol_ctn.value === "" || pcb.value === "" || pcb.value <= 0) {
                swal('Oops...','Veuillez à bien verifier les données entrée S.V.P \n(champ vide, virgule à la place d\'un point ...','error')

            }else{
                $('.notInLocale').removeClass("hide");

                let list = $('#list_cmd_externe')
                let number = list.children().length;

                let vol_unit = vol_ctn.value/pcb.value;
                let vol_total = vol_unit * qte_art.value;
                let qte_ctn = vol_total/vol_ctn.value;
                let pu_devise =parseFloat(pa_frn.value);
                let pu_ar = pu_devise * cours_devise;
                let fret_usd = parseFloat(vol_total) * parseFloat(tarif_usd);
                let fret_ar = fret_usd * cours_usd;
                let pat_frn_dev = parseFloat((pu_devise) * qte_art.value);
                let pat_frn_ar = parseFloat((pu_ar) * qte_art.value);
                let total = pat_frn_ar + parseFloat(fret_ar);
                let pr_est = total / qte_art.value;

                pat_frn += parseFloat(pat_frn_dev);
                vol_total_cmd += parseFloat(vol_total);
                montant_total += parseFloat(total);

                update_total()

                $('#paye').on('change keyup', function(){
                    rest = montant_total - $(this).val() + (frais_transport * cours_devise);
                    update_total();
                });

                list.append('' +
                    '<tr>'+
                    '<td>'+article+'</td>'+
                    '<td>'+qte_art.value+'</td>'+
                    '<td>'+pcb.value+'</td>'+
                    '<td>'+format_number(vol_unit)+'</td>'+
                    '<td>'+format_number(vol_total)+'</td>'+
                    '<td>'+format_number(vol_ctn.value)+'</td>'+
                    '<td>'+format_number(qte_ctn)+'</td>'+
                    '<td>'+format_number(pu_devise)+'</td>'+
                    '<td>'+format_number(pu_ar)+'</td>'+
                    '<td>'+format_number(Math.round(pat_frn_ar))+'</td>'+
                    '<td>'+format_number(Math.round(total))+'</td>'+
                    '<td>'+format_number(Math.round(pr_est))+'</td>'+
                    '<td>'+format_number(Math.round(pr_avant))+'</td>'+
                    '<td>'+format_number(Math.round(pv_avant))+'</td>'+
                    // '<td>'+format_number(pu_ar)+'</td>'+
                    // '<td>'+format_number(fret_usd)+'</td>'+
                    // '<td>'+format_number(fret_ar)+'</td>'+
                    // '<td>'+format_number(pat_frn_dev)+'</td>'+
                    // '<td>'+format_number(pat_frn_ar)+'</td>'+
                    // '<td>'+format_number(total)+'</td>'+

                    '<td>'+
                    '<input type="hidden" class="vol" value="'+vol_total+'" >'+
                    '<input type="hidden" class="pat" value="'+pat_frn_dev+'" >'+
                    '<input type="hidden" class="total" value="'+total+'" >'+
                    '<input type="hidden" class="pr_avant" value="'+pr_avant+'" >'+
                    '<input type="hidden" class="pv_avant" value="'+pv_avant+'" >'+

                    '<input type="hidden" class="id_article_entered" value="'+id_art.value+'" name="article['+number+'][id]">'+
                    '<input type="hidden" class="qte_entered" value="'+qte_art.value+'" name="article['+number+'][qte]">'+
                    '<input type="hidden" class="pcb_entered" value="'+pcb.value+'" name="article['+number+'][pcb]">'+
                    '<input type="hidden" class="ref_entered" value="'+ref_art.value+'" name="article['+number+'][ref_article_cmd]">'+
                    '<input type="hidden" class="vol_ctn_entered" value="'+vol_ctn.value+'" name="article['+number+'][vol_ctn]">'+
                    '<input type="hidden" class="pa_entered" value="'+pa_frn.value+'" name="article['+number+'][pa_frn]">'+
                    // '<input type="hidden" value="'+frais.value+'" name="article['+number+'][frais_transport]">'+

                    '<button type="button" class="btn text-warning update_article_added" data-number="'+number+'" onclick="update_article_added('+number+')" data-toggle="modal" data-target="#modif_article_added">'+
                    '<i class="fas fa-pen"></i>'+
                    '</button>'+
                    '<button type="button" class="btn removeCmnd text-danger">'+
                    '<i class="ti-trash"></i>'+
                    '</button>'+
                    '</td>'+
                    '</tr>')



                $('#buttExtENR').html(
                    '<button type="submit" class="btn btn-success">Enregistrer</button>'
                )
                
                
            }
            

        }
        else {
            if (qte_art === "" || pa_frn === "") {
                swal('Oops...','Veuillez à bien verifier les données entrée S.V.P \n(champ vide, virgule à la place d\'un point ...','error')

                $('#buttonEnr').html(
                    ''
                )
            }
            else{
                let list = $('#list_cmd_interne');
                let number = list.children().length;
                let pat = qte_art.value * pa_frn.value;
                list.append(
                    '               <tr>\n' +
                    '                    <td>'+article+'</td>\n' +
                    '                    <td>'+qte_art.value+'</td>\n' +
                    '                    <td>'+pa_frn.value+'</td>\n' +
                    '                    <td>'+pat+'</td>\n' +
                    '                    <td>'+pr_avant+'</td>\n' +
                    '                    <td>'+pv_avant+'</td>\n' +
                    '                    <td>'+
                    '                           <input type="hidden" class="id_article_entered" value="'+id_art.value+'" name="article['+number+'][id]">'+
                    '                           <input type="hidden" class="qte" value="'+qte_art.value+'" name="article['+number+'][qte]">'+
                    '                           <input type="hidden" class="pa_unit" value="'+pa_frn.value+'" name="article['+number+'][pa_frn]">'+
                    '                           <input type="hidden" class="total" value="'+pat+'" >'+
                    '                           <input type="hidden" class="pv_avant" value="'+pv_avant+'" >'+
                    '                           <input type="hidden" class="pr_avant" value="'+pr_avant+'" >'+
                    '                           <button type="button" class="btn text-warning update_article_added" data-number="'+number+'" data-toggle="modal" onclick="update_article_added('+number+')" data-target="#modif_article_added">'+
                    '                               <i class="fas fa-pen"></i>'+
                    '                           </button>'+
                    '                           <button type="button" class="btn removeCmnd text-danger">'+
                    '                               <i class="ti-trash"></i>'+
                    '                           </button>'+
                    '                   </td>\n'+
                    '</tr>')
                pat_frn += pat


                $('#total_interne').html(pat_frn);
                $('#add_article_in_cmd_list').modal('hide');
                $('#buttonEnr').html(
                    '<button type="submit" class="btn btn-success">Enregistrer</button>'
                )
            }


        }


        remove_article_added()
        return 0;
    })

}add_article_in_cmd();

function remove_article_added(){
    $('.removeCmnd').click(function () {

        let btn = $(this);
        let qte = btn.siblings('.qte').val();
        let pa_unit = btn.siblings('.pa_unit').val();
        let pat = btn.siblings('.pat').val();
        let vol = btn.siblings('.vol').val();
        let total = btn.siblings('.total').val();

        swal({
            title: "Etes-vous sure?",
            text: "Cette action sera irreversible !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if(willDelete) {
                    /*
                        * pat_frn -> - pu*qte
                        * vol_total -> - vol_remove
                        * montant_total -> - pat_remove
                        * fret = vol x tarif
                    */

                    if (mode === "externe"){
                        pat_frn -= pat;
                        vol_total_cmd -= vol;
                        montant_total -= total;
                        update_total();
                    }else{
                        total = pa_unit * qte;
                        pat_frn -= total
                        $('#total_interne').html(pat_frn);
                    }


                    btn.parent().parent().remove()
                    swal({
                        title: "C'est fait!",
                        icon: "success"
                    })
                }
            })
    })
}

function update_article_added(index) {

    // ____________________MODIFICATION______________________________     STAR
        // $('#listOfArticleForUpdate').html(''+$('#listOfArticleToAdd').html() +'')
        isAnUpdateOfArt = true;

    if (mode === 'externe'){
        btn___ =  $('#list_cmd_externe button.update_article_added[data-number = '+ index +']');
    }else {
        btn___ =  $('#list_cmd_interne button.update_article_added[data-number = '+ index +']');
    }

        // RECUPERENA donne teo aloha
        let id_article_entered = btn___.siblings('.id_article_entered').val();
        // Atsofoka anaty input
        $(".articleSelected_").select2().val(''+id_article_entered+'').trigger('change.select2');

        if (mode === 'externe') {
            let qte_entered = btn___.siblings('.qte_entered').val();
            let pcb_entered = btn___.siblings('.pcb_entered').val();
            let ref_entered = btn___.siblings('.ref_entered').val();
            let vol_ctn_entered = btn___.siblings('.vol_ctn_entered').val();
            let pa_entered = btn___.siblings('.pa_entered').val();

            $('#_updt_ref_article_fournisseur').val(ref_entered)
            $('#_updt_qte_art').val(qte_entered)
            $('#_updt_pa_art').val(pa_entered)
            $('#_updt_vol_art').val(vol_ctn_entered)
            $('#_updt_pcb').val(pcb_entered)
        }
        else{
            let pa_unit = btn___.siblings('.pa_unit').val();
            let qte = btn___.siblings('.qte').val();

            $('#updt_pa_art').val(pa_unit)
            $('#updt_qte_art').val(qte)
        }


// ____________________MODIFICATION______________________________     END

}

// Update le donne article
$('#update_article_cmd_btn').click(function () {
    isAnUpdateOfArt = false
    let btn = btn___;
    let data = $('form.update_art_cmd_form_').serializeArray();
    let id_art = data[0];
    let article = $('#updateTheArt option[value ='+id_art.value+']').html();
    let number = btn.attr('data-number');
    let ref_art = data[1];
    let qte_art = data[2];
    let pa_frn = data[3];
    let vol_ctn = data[4];
    let pcb = data[5];


    if (mode === "externe"){
        let total___ = parseFloat((btn.siblings('.total').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        let pr_avant = parseFloat((btn.siblings('.pr_avant').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        let pv_avant = parseFloat((btn.siblings('.pv_avant').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

        let pat = parseFloat((btn.siblings('.pat').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        let vol = parseFloat((btn.siblings('.vol').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        if (qte_art.value === ""|| pa_frn.value === "" || vol_ctn.value === "" || pcb.value === ""  || pcb.value <= 0) {
            swal('Oops...','Veuillez à bien verifier les données entrée S.V.P \n(champ vide, virgule à la place d\'un point ...','error')

        }else {

            pat_frn -= pat;
            vol_total_cmd -= vol;
            montant_total -= total___;
            $('.notInLocale').removeClass("hide");


            let vol_unit = vol_ctn.value / pcb.value;
            let vol_total = vol_unit * qte_art.value;
            let qte_ctn = vol_total / vol_ctn.value;
            let pu_devise = parseFloat(pa_frn.value);
            let pu_ar = pu_devise * cours_devise;
            let fret_usd = parseFloat(vol_total) * parseFloat(tarif_usd);
            let fret_ar = fret_usd * cours_usd;
            let pat_frn_dev = parseFloat((pu_devise) * qte_art.value);
            let pat_frn_ar = parseFloat((pu_ar) * qte_art.value);
            let total = pat_frn_ar + parseFloat(fret_ar);
            let pr_est = total / qte_art.value;

            pat_frn += parseFloat(pat_frn_dev);
            vol_total_cmd += parseFloat(vol_total);
            montant_total += parseFloat(total);

            update_total();

            btn.parent().parent().html('<td>' + article + '</td>' +
                '<td>' + qte_art.value + '</td>' +
                '<td>' + pcb.value + '</td>' +
                '<td>' + format_number(vol_unit) + '</td>' +
                '<td>' + format_number(vol_total) + '</td>' +
                '<td>' + format_number(vol_ctn.value) + '</td>' +
                '<td>' + format_number(qte_ctn) + '</td>' +
                '<td>' + format_number(pu_devise) + '</td>' +
                '<td>' + format_number(pu_ar) + '</td>' +
                '<td>' + format_number(pat_frn_ar) + '</td>' +
                '<td>' + format_number(total) + '</td>' +
                '<td>' + format_number(pr_est) + '</td>' +
                '<td>' + format_number(pr_avant) + '</td>' +
                '<td>' + format_number(pv_avant) + '</td>' +
                '<td>' +
                '<input type="hidden" class="vol" value="' + vol_total + '" >' +
                '<input type="hidden" class="pat" value="' + pat_frn_dev + '" >' +
                '<input type="hidden" class="total" value="' + total + '" >' +
                '<input type="hidden" class="pr_avant" value="' + pr_avant + '" >' +
                '<input type="hidden" class="pv_avant" value="' + pv_avant + '" >' +

                '<input type="hidden" class="id_article_entered" value="' + id_art.value + '" name="article[' + number + '][id]">' +
                '<input type="hidden" class="qte_entered" value="' + qte_art.value + '" name="article[' + number + '][qte]">' +
                '<input type="hidden" class="pcb_entered" value="' + pcb.value + '" name="article[' + number + '][pcb]">' +
                '<input type="hidden" class="ref_entered" value="' + ref_art.value + '" name="article[' + number + '][ref_article_cmd]">' +
                '<input type="hidden" class="vol_ctn_entered" value="' + vol_ctn.value + '" name="article[' + number + '][vol_ctn]">' +
                '<input type="hidden" class="pa_entered" value="' + pa_frn.value + '" name="article[' + number + '][pa_frn]">' +
                // '<input type="hidden" value="'+frais.value+'" name="article['+number+'][frais_transport]">'+

                '<button type="button" class="btn text-warning update_article_added" data-number="'+number+'" data-toggle="modal" onclick="update_article_added('+number+')" data-target="#modif_article_added">'+
                '<i class="fas fa-pen"></i>' +
                '</button>' +
                '<button type="button" class="btn removeCmnd text-danger">' +
                '<i class="ti-trash"></i>' +
                '</button>' +
                '</td>')
            // $('#add_article_in_cmd_list').modal('hide')
        }

    }
    else{
        let total___ = parseFloat((btn.siblings('.total').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        let pr_avant = parseFloat((btn.siblings('.pr_avant').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));
        let pv_avant = parseFloat((btn.siblings('.pv_avant').val()).replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

        if (qte_art.value === ""|| pa_frn.value === "" ) {
            swal('Oops...','Veuillez à bien verifier les données entrée S.V.P \n(champ vide, virgule à la place d\'un point ...','error')

        }
        else {
            pat_frn -= total___;
            let pat = pa_frn.value * qte_art.value;
            pat_frn += pat;
            btn.parent().parent().html('' +
                '                    <td>'+article+'</td>\n' +
                '                    <td>'+qte_art.value+'</td>\n' +
                '                    <td>'+format_number(pa_frn.value)+'</td>\n' +
                '                    <td>'+format_number(pat)+'</td>\n' +
                '                    <td>'+format_number(pr_avant)+'</td>\n' +
                '                    <td>'+format_number(pv_avant)+'</td>\n' +
                '                    <td>'+
                '                           <input type="hidden" class="id_article_entered" value="'+id_art.value+'" name="article['+number+'][id]">'+
                '                           <input type="hidden" class="qte" value="'+qte_art.value+'" name="article['+number+'][qte]">'+
                '                           <input type="hidden" class="pa_unit" value="'+pa_frn.value+'" name="article['+number+'][pa_frn]">'+
                '                           <input type="hidden" class="total" value="'+pat+'" >'+
                '                           <input type="hidden" class="pr_avant" value="'+pr_avant+'" >'+
                '                           <input type="hidden" class="pv_avant" value="'+pv_avant+'" >'+
                '                           <button type="button" class="btn text-warning update_article_added" data-number="'+number+'" data-toggle="modal" onclick="update_article_added('+number+')" data-target="#update_article_in_cmd_list">'+
                '                               <i class="fas fa-pen"></i>'+
                '                           </button>'+
                '                           <button type="button" class="btn removeCmnd text-danger">'+
                '                               <i class="ti-trash"></i>'+
                '                           </button>'+
                '                   </td>\n'+
                '');

            $('#total_interne').html(pat_frn);
        }

    }
    remove_article_added()
})




let avance = 0;
$('#avance').on('change keyup',function () {
    avance = $(this).val();
    reste = pat_frn - avance
    $('#reste').html(reste)
})



function update_total() {
    let fret_cmd = vol_total_cmd * tarif_usd;
    let pat_ar = pat_frn * cours_devise;
    let fret_ar = fret_cmd * cours_usd;

    $('#cv_frais').html(format_number(Math.round(frais_transport*cours_devise)));
    $('#reste_paye_ar').html(format_number(Math.round(rest)));
    $('#pat_cmd_devise').html(format_number(pat_frn));
    $('#pat_cmd_ar_val').html(format_number(Math.round(pat_ar)));
    $('#pat_frn_devise').html(format_number(pat_frn+(frais_transport)));
    $('#pat_frn_ar_val').html(format_number(Math.round((pat_ar+(frais_transport*cours_devise)))));
    $('#vol_total').html(format_number(vol_total_cmd));
    $('#fret_usd').html(format_number(fret_cmd));
    $('#fret_ar_val').html(format_number(Math.round(fret_ar)));
    // $('#montant_devise').html(format_number(montant_total/cours_devise));
    $('#montant_ar').html(format_number(Math.round(montant_total+(frais_transport*cours_devise))));
}
function closeTheModal(){
    $('.closeModal').click(function (){
        let the_modal = $(this).parent().parent().parent().parent()
        // the_modal.removeClass('show')
        the_modal.modal('hide')
    });
}closeTheModal();



function update_article_data(index) {
    let art_des = $('#ar_'+index+' .art_des').html()
    let qte_cmd = parseInt(($('#ar_'+index+' .qte_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(",", "."))
    let pcb_cmd = parseInt(($('#ar_'+index+' .pcb_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(",", "."))
    $('#designationDeArticleAModifier').html(art_des)
    $('#updt_qte_art').val(qte_cmd)
    $('#updt_pcb').val(pcb_cmd)
    $('#butt_update_art_cmd').attr('data-index',index)

}

function update_count_afterUpdate() {
    let index = $('#butt_update_art_cmd').attr('data-index')
    let vol_ctn = parseFloat(($('#ar_'+index+' .volCtn_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(",", "."))
    let pu_ar = parseFloat(($('#ar_'+index+' .pu_ar').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(",", "."))
    let pu_dev = parseFloat(($('#ar_'+index+' .pu_dev').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(",", "."))
    let qte_cmd = $('#updt_qte_art').val()
    let pcb_cmd = $('#updt_pcb').val()

    let v_unit = vol_ctn/pcb_cmd;
    let v_tot = v_unit*qte_cmd;
    let qt_ctn = v_tot/vol_ctn;
    let pat_ar = pu_ar*qte_cmd;
    let pat_dev = qte_cmd*pu_dev;


    let all_vol_in_list = $('#list_cmd_externe_suivi .vol_total_estime');
    let vol_total_cmd = 0;
    let all_pat_in_list = $('#list_cmd_externe_suivi .const_pat');
    let pa_total_cmd = 0;
    let all_pat_dev_in_list = $('#list_cmd_externe_suivi .pat_dev');
    let pa_total_dev_cmd = 0;
    let tarif_ = parseFloat($('#tarif_aplique').val());
    let cours_usd_ = parseFloat($('#new_cours_usd').val());
    let id = $('#ar_'+index+' .art_des').attr('data-id')

    $('#ar_'+index+' .qte_cmd').html(format_number(qte_cmd))
    $('#ar_'+index+' .pcb_cmd').html(format_number(pcb_cmd))
    $('#ar_'+index+' .volUnit_cmd').html(format_number(v_unit))
    $('#ar_'+index+' .nbCtn').html(format_number(qt_ctn))
    $('#ar_'+index+' .vol_total_estime').html(format_number(v_tot))
    $('#ar_'+index+' .pat_dev').html(format_number(pat_dev))
    $('#ar_'+index+' .const_pat').html(format_number(Math.round(pat_ar)))

    $('#ar_'+index+'').find('.hidden_input').html('' +
        '<input type="hidden" name="new_update['+index+'][article]" value="'+id+'"> ' +
        '<input type="hidden" name="new_update['+index+'][qte]" value="'+qte_cmd+'"> ' +
        '<input type="hidden" name="new_update['+index+'][pcb]" value="'+pcb_cmd+'"> ' +
        '')


    all_vol_in_list.each(function (index, item) {
        let vol_reel = parseFloat((item.innerHTML).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(" ", ".").replace(",", "."))
        vol_total_cmd += vol_reel;
    })
    all_pat_dev_in_list.each(function (index, item) {
        let pat_dev = parseFloat((item.innerHTML).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(" ", ".").replace(",", "."))
        pa_total_dev_cmd += pat_dev;
    })
    all_pat_in_list.each(function (index, item) {
        let pat = parseFloat((item.innerHTML).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ".").replace(" ", ".").replace(",", "."))
        pa_total_cmd += pat;
    })

    let fret_usd = vol_total_cmd * tarif_;
    let fret_ar = fret_usd * cours_usd_;
    let total = fret_ar + pa_total_cmd
    let acompte_payer = parseInt($('#acompte_payer').attr('value'));
    let reste = total-acompte_payer;

    $('#pat_frn_devise____').html(format_number(pa_total_dev_cmd));
    $('#pat_frn_ar_cmd').html(format_number(Math.round(pa_total_cmd)));

    $('.new_rest').html(format_number(Math.round(reste)));
    $('.montant_ar_cmd').html(format_number(Math.round(total)));
    $('#vol_total_cmd').html(format_number(vol_total_cmd));

    $('.fret_cmd').html(format_number(fret_usd));
    $('.fret_ar_cmd').html(format_number(Math.round(fret_ar)));

}

function suivi(){
    counter++
    $('.suivi_bc').click(function () {

        let bc = $(this);

        let status_cmd = bc.children('.status_cmd')

        let url = $(this).attr('data-link');
        let type = $(this).attr('data-type');
        let data = {type: type};
        $.post(url, data, function(Response) {


            $('#modal_info_bc_content').html(Response.info);


            if (!(Response.bc === null || Response.bc === undefined )){
//______________________ Set modal validation admin ____________ START
                $('#v_codeBc').html(Response.bc.codeBc);
                $('#v_dateArrive').html(Response.bc.dateArrive);
                $('#v_frn').html(Response.bc.frn);
                $('#v_patFrn').html(format_number(Math.round(Response.bc.patFrn)));
                $('#v_devise').html(Response.bc.devise);
                $('#v_coursApplique').html(Response.bc.coursApplique);
                $('#v_transitaire').html(Response.bc.transitaire);
                $('#v_tarifApplique').html(Response.bc.tarifApplique);
                $('#coursUsd').html(Response.bc.coursUsd);

                Response.bc.listArticle.forEach(function (article) {
                    $('#v_listArticle').append('<tr>\n' +
                        '                                    <td>'+ article.article +'</td>\n' +
                        '                                    <td>'+ article.qte_cmd +'</td>\n' +
                        '                                    <td>'+ article.qte_recu +'</td>\n' +
                        '                                    <td>'+ article.casse +'</td>\n' +
                        '                                    <td>'+ format_number(article.vol_prevu) +'</td>\n' +
                        '                                    <td>'+ format_number(article.vol_reel) +'</td>\n' +
                        '                                    <td>'+ format_number(Math.round(article.pr_estime)) +' ar</td>\n' +
                        '                                    <td>'+ format_number(Math.round(article.new_pr)) +' ar</td>\n' +
                        '                                    <td>'+ format_number(Math.round(article.pr_actif)) +' ar</td>\n' +
                        '                                    <td>'+ format_number(Math.round(article.pv)) +' ar</td>\n' +
                        '                                </tr>')
                })

//______________________ Set modal validation admin ____________ END
            }

            $('#modal_info_bc').on('hidden.bs.modal', function () {
                $('#modal_info_bc_content').html('<div class="modal-header bg-dark">\n' +
                    '                <h6 class="modal-title">Patientez un instant</h6>\n' +
                    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                    '                    <i class="ti-close"></i>\n' +
                    '                </button>\n' +
                    '            </div>\n' +
                    '\n' +
                    '            <div class="modal-body text-center" style="height: 40vh">\n' +
                    '                <div  class="spinner-border mt-5 text-info" role="status">\n' +
                    '                    <span class="sr-only mt-5 m-5">Chargement...</span>\n' +
                    '                </div>\n' +
                    '            </div>');
            });


            $('.confirmBCDelete').click(function(e){
                e.preventDefault()
                let form = $(this).parent();
                swal({
                    title: "Etes-vous sure?",
                    text: "Cette action sera irreversible !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        form.submit();
                    }
                })
            });

            $('#butt_obs').click(function(e){
                e.preventDefault();
                let url = $(this).parent().parent().attr('action');
                let data = $(this).parent().parent().serialize();
                $.post(url, data, function (observation) {
                    $('#observationContainer').html(observation);
                    $('#_observationContainer').html(observation);
                    $('#modal_obs').modal('hide');
                })
            })

            $('.observation_btn').click(function (e) {
                e.preventDefault()
                let url = $('#observation_btn').attr('data-link');
                $('#observation').parent().parent().attr('action', url)
                $('#observation').html($('#observationContainer').text())
            })

            $('.validationAdmin').click(function (e) {
                let url = $(this).attr('data-link');
                e.preventDefault()
                $('#validationAdmin_form').attr('action', url);
                $('#_observationContainer').html($('#observationContainer').html())
            })

            $('#deuxpaye, #acompte_payer').on('change keyup', function () {
                let deuxP = $('#deuxpaye').val()
                if(deuxP === undefined){deuxP=0}
                let acP = $('#acompte_payer').val()
                let tot = parseFloat(($('#montant_ar span.montant_ar_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(",","."))
                $('.rest_a_payer span.new_rest').html(format_number(Math.round(tot - deuxP - acP)))
            })

            update_cours();

            $('input[name="date_embarquement"], input[name="date_arrive"] , input[name="date_achat"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: false
            }).on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
            });


            let d_a_input = $('#date_embarquement_s');
            d_a_input.on('apply.daterangepicker', function(){
                if(d_a_input.val() !== ''){
                    let print_btn = $('.printBC')
                    print_btn.removeClass('btn-dark');
                    print_btn.addClass(' bg-info-bright text-info');
                }
            });

            $('.printBC').click(function (e) {
                if ($('#date_embarquement_s').val() === '' || $('#ref_embarquement_s').val() === ''){
                    e.preventDefault();
                    swal('Attention !', 'Veuillez verifier si les champs date et/ou ref d\'embarquement ne sont pas vides', 'error' );
                }else{
                    $(this).parent().parent().submit();
                }
            })
            let tr = null;
            let tr_index = null;
            $('.validation').click(function () {
                tr = $(this);
                tr_index = tr.index();
                let qte_recu = parseFloat((tr.find('.qte_recu').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));
                let qte_nv = parseFloat((tr.find('.qte_nv').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));
                let vol_reel = parseFloat((tr.find('.vol_reel').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));
                let dp = parseFloat((tr.find('.dp').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));
                let nctn = parseFloat((tr.find('.nctn').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));

                $('#qte-reel').val(qte_recu);
                $('#qte-vendable').val(qte_nv);
                $('#vol-reel').val(vol_reel);
                $('#vdepot').val(dp);
                $('#vnum_ctn').val(nctn);

            });
            $('#butt-valider').click(function (e){
                e.preventDefault()
                let id = tr.attr('data-id');
                let qte_cmd = parseFloat((tr.find('.qte_cmd').html()).replace(" ", "").replace(",", ".").replace(",", "."));
                let qte_ctn = parseFloat((tr.find('.nbCtn').html()).replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."));
                let vol_total_estime = parseFloat((tr.find('.vol_total_estime').html()).replace(" ", "").replace(",", ".").replace(",", "."));
                let tarif_reel_aplique = parseFloat($('#tarif_aplique').val());
                let cours_usd_applique = parseFloat($('#new_cours_usd').val());
                let data = $('#form_validation').serializeArray();
                let qte_reel = data[0].value;
                let qte_nv = data[1].value;
                let vol_reel = data[2].value;
                let dp = data[3].value;
                let numctn = data[4].value;
                let fret_reel = 0;
                let reste_reel = 0;
                let montant_total_reel = 0;
                let vol_total_reel = vol_reel * qte_ctn;
                let vol_total_cmd_reel = 0;
                let const_pat = parseInt(($('#pat_frn_ar_cmd').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
                let acompte_payer = parseInt($('#acompte_payer').attr('value'));
                let all_vol_in_list = $('#list_cmd_externe_suivi .vol_total_reel')

        // __________ DATA to POST ___________________
                tr.find('.hidden_input').html('' +
                    '<input type="hidden" name="validation['+tr_index+'][article]" value="'+id+'"> ' +
                    '<input type="hidden" name="validation['+tr_index+'][qte_reel]" value="'+qte_reel+'"> ' +
                    '<input type="hidden" name="validation['+tr_index+'][qte_nv]" value="'+qte_nv+'"> ' +
                    '<input type="hidden" name="validation['+tr_index+'][vol_reel]" value="'+vol_reel+'"> ' +
                    '<input type="hidden" name="validation['+tr_index+'][num_ctn]" value="'+numctn+'"> ' +
                    '<input type="hidden" name="validation['+tr_index+'][depot]" value="'+dp+'"> ' +
                    '')
        // ____________ SET COLOR ___________________
                if(qte_nv > 0){
                    tr.addClass('bg-warning-bright')
                    tr.removeClass('bg-danger-bright')
                    tr.removeClass('bg-success-bright')
                }
                else if(qte_cmd > qte_reel){
                    tr.addClass('bg-danger-bright')
                    tr.removeClass('bg-warning-bright')
                    tr.removeClass('bg-success-bright')
                }
                else{
                    tr.addClass('bg-success-bright')
                    tr.removeClass('bg-danger-bright')
                    tr.removeClass('bg-warning-bright')
                }
        //_____________ UPDATE TABLE VIEW ____________
                tr.find('.qte_recu').html(format_number(qte_reel))
                tr.find('.qte_nv').html(format_number(qte_nv))
                tr.find('.qte_v').html(format_number((qte_reel - qte_nv)))
                tr.find('.vol_reel').html(format_number(vol_reel))
                tr.find('.vol_total_reel').html(format_number(vol_total_reel))
    // ______________________________UPDATE TOTAL AND MORE _____________________________________
                all_vol_in_list.each(function (index, item) {
                    let vol_reel = 0;
                    if(!isNaN(parseFloat((item.innerHTML)))){
                        vol_reel = parseFloat((item.innerHTML).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(",", ".").replace(",", "."))
                    }else{
                        vol_reel = vol_total_estime;
                    }
                    vol_total_cmd_reel += vol_reel;
                })



                fret_reel = vol_total_cmd_reel * tarif_reel_aplique;

                montant_total_reel = const_pat + (fret_reel * cours_usd_applique);

                reste_reel = montant_total_reel - acompte_payer;
                $('.new_rest').html(format_number(Math.round(reste_reel)));
                $('.montant_ar_cmd').html(format_number(Math.round(montant_total_reel)));
                $('.tarif_usd').html(format_number(tarif_reel_aplique));
                $('#vol_total_cmd').html(format_number(vol_total_cmd_reel));

                $('.fret_cmd').html(format_number(fret_reel));
                $('.fret_ar_cmd').html(format_number(Math.round((fret_reel * cours_usd_applique))));

                $('.tarif_ar').html(format_number(Math.round(tarif_reel_aplique*cours_usd_applique)));
                $('.cours_usd').html(format_number(cours_usd_applique));
    // ______________________________UPDATE TOTAL AND MORE _____________________________________


                $('#modal_validation').modal('hide')
                tr = null;
            });

            // --------------- recupe date de prevision start function ----------------------

            $('input[name="date_embarquement"]').on('apply.daterangepicker', function() {
                let data= {
                    date_embarquement: $(this).val(),

                }
                let url = $(this).attr('data-link')

                $.post(url, data, function(Response){
                    $('#prev_date_arrive').val(Response.prevision)
                })

            });

            // --------------- recupe date de prevision end function ----------------------

            $('#validation_local').click(function (e) {
                e.preventDefault();
                let url = $(this).attr('href');
                $.get(url, function (Response) {
                    if(Response === 'ok'){
                        bc.find('td.status_cmd').html('<p class="p-3 bg-success-bright text-success border-radius-1">ok</p>');
                        $('#modal_info_bc').modal('hide')
                    }
                })
            })

            // manidy modal Start
            closeTheModal();
            // manidy modal end

            $('.modify_avance').click(function () {
                let link = $(this).attr('data-link')
                let the_avance = parseInt(($('#aComptePayerAv').html()).replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
                $('#avance_').val(the_avance)
                $('#butt-valider-avance').attr('data-link', link)
            })

            $('#butt-valider-avance').click( function (e){
                e.preventDefault()
                let data = $('#form-valider_avance').serialize()
                let url = $(this).attr('data-link')
                $.post(url, data, function(Response) {
                    // window.location.reload(true);
                    $('#modal_modif_avance').modal('hide')
                    $('#aComptePayerAv').html(format_number(Response.avance))
                    bc.find('.avance_paye_l').html(format_number(Response.avance))
                    $('#restePayerRst').html(format_number(Response.reste))
                    bc.find('.reste_paye_l').html(format_number(Response.reste))


                    if (Response.reste <= 0) {
                        $('#statusInterne').html(
                            '<p class="p-4 border-radius-1 shadow bg-success-bright text-center font-size-24 font-weight-800 text-success ">Payer</p>'
                        )
                        $('#modifAvance').html('<td></td>')
                        bc.find('.statut_payement_l').html('<p class="p-2 font-size-11 bg-success border-radius-1">Payer</p>')
                    }else{
                        $('#statusInterne').html(
                            '<p class="p-4 border-radius-1 shadow bg-warning text-center font-size-24 font-weight-800 ">A payer</p>'
                        )
                        bc.find('.statut_payement_l').html('<p class="p-2 font-size-11 bg-warning  border-radius-1">A payer</p>')
                    }
                });
            })

            $('#validationBcInt').click(function (e){
                e.preventDefault()
                let url = $(this).attr('data-link')
                let data = $('#formValidBcInt').serialize()
                $.post(url, data, function(Response){
                    if(Response === 'ok'){
                        $('#modal_info_bc_content').modal('hide')
                        status_cmd.html(
                            '<p class="p-2 font-size-12 bg-success border-radius-1">Ok</p>'
                        )
                        $('#statusInt').html(
                            '<p class="p-4 border-radius-1 shadow  bg-success text-center font-size-24 font-weight-800 ">OK</p>'
                        )
                    }

                });
            });


        });


        //
        //
        // $('.close').click(function (){
        //     $('#modal_info_bc_content').html('<div class="modal-header bg-dark">\n' +
        //         '                <h6 class="modal-title">Patientez un instant</h6>\n' +
        //         '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        //         '                    <i class="ti-close"></i>\n' +
        //         '                </button>\n' +
        //         '            </div>\n' +
        //         '\n' +
        //         '            <div class="modal-body text-center" style="height: 40vh">\n' +
        //         '                <div  class="spinner-border mt-5 text-info" role="status">\n' +
        //         '                    <span class="sr-only mt-5 m-5">Chargement...</span>\n' +
        //         '                </div>\n' +
        //         '            </div>\n');
        // });


    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ____________________________ de taaaapitra eto mo zany le RESAKA COMMANDY ko __________________________ Mbola hitohy.... tsy ho ela kkk
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



initDataTable($('#list_article, #list_fournisseur, #list_client'))
// var xdt = initDataTable($('#list_devis'),[[ 1, 'desc' ]])
function initDataTableWithFilter(JqObject, columns){
    return JqObject.DataTable( {
        colReorder: true,
        "drawCallback": function() {
            //    ETO NO antsoina reo zavatr rehetr ilaina

            // if(counter_dl<1)loadConfirmDelete();
            // if(counter_md<1)load_modification();
            // if(counter_si<1)load_showInfo();
        },
        dom: 'Qlfrtip',
        searchBuilder: {
            columns: columns
        },
        language: {
            "paginate": {
                "first": "Premier",
                "last": "Dernier",
                "next": "Suivant",
                "previous": "Précedent"
            },
            "loadingRecords": "Chargement en cours...",
            "search": "Mots clées",
            "lengthMenu": "Nombre d' entré: _MENU_",
            "info": "Nombre Total :<strong class='font-size-30'> _TOTAL_ <strong>",
            "emptyTable": "Liste Vide",
            "infoEmpty": "Rien à afficher",
            "infoFiltered": " resultat",
            sZeroRecords: "Rien ne corespond à vos conditions (ou recherche)",
            searchBuilder: {
                add: '+',
                condition: 'Condition',
                clearAll: 'Enlevé tous les filtre',
                delete: '<i class="fa fa-trash"></i>',
                deleteTitle: 'Enlevé ce filtre',
                data: 'Colonne',
                left: '<',
                leftTitle: 'Exclusion',
                logicAnd: 'et',
                logicOr: 'ou',
                right: '>',
                rightTitle: 'Inclusion',
                title: {
                    0: '<h6 class="underline ">Filtre des données : </h6>',
                    _: 'Nombre de filtre: <b class="underline">%d</b>'
                },
                value: 'Valeur',
                valueJoiner: 'et',
                conditions: {
                    string: {
                        contains: 'Contenant',
                        empty: 'Vide',
                        endsWith: 'Se termine par',
                        equals: 'Egale à ',
                        not: 'Different de',
                        notContains: 'Ne contenant pas',
                        notEmpty: 'Pas vide',
                        notEndsWith: 'Ne se termine pas par',
                        notStartsWith: 'Ne commançant pas',
                        startsWith: 'Commançant par',
                    }
                }
            }
        }
    });
}
$(document).ready(function() {

    initDataTableWithFilter($('#list_devis'),[1,2,3])
    initDataTableWithFilter($('#list_commande'),[1,2,3])
    initDataTableWithFilter($('#list_facture'),[1,2,3])

})

// ------------------------------- js ho an'ny user no manomboka eto --------------------------
$('.modifUser').click(function(){
    let url = $(this).attr('data-url')
    let data = { 'id': $(this).attr('dataCallId') }
    $.post(url, data, function(donne){
        $('.userPseudo').val(donne.pseudo)
        $('.userNom').val(donne.nom)
        $('.userPrenom').val(donne.prenom)
        $('.userPoste').val(donne.poste)
        $('.validationModifUser').attr('action', '/user/modif/valid/'+donne.id+'')
        if(donne.roles['0'] == 'ROLE_ADMIN'){
            $('.Role1').replaceWith('<option value="1" class="Role1">ADMIN</option>')
            $('.Role2').replaceWith('<option value="2" class="Role2">USER</option>')
        }else if(donne.roles['0'] == 'ROLE_USER'){
            $('.Role1').replaceWith('<option value="2" class="Role1">USER</option>')
            $('.Role2').replaceWith('<option value="1" class="Role2">ADMIN</option>')
        }
        else if(donne.roles['0'] == 'ROLE_SUPER_ADMIN'){
            $('.Role1').replaceWith('<option value="3"  class="Role1">SUPER ADMIN</option>')
            $('.Role2').replaceWith('<option  class="Role2"></option>')
        }
    })
})

$('.validModifPass').click(function(e){
    e.preventDefault()
    let url = $('.modifPass').attr('data-url')
    let data = { 'pass': $('.motsDePasse').val() }
    $.post(url,data, function(){})
})

$('.btnModifProfile1').click(function(e){
    e.preventDefault()
    $('.cardModifProdile').fadeIn()
})
$('.closeModifProfile').click(function(){
    $('.cardModifProdile').fadeOut()
})


function getImagePreview(event)
{
  console.log(event.target.files[0]);
  var image = URL.createObjectURL(event.target.files[0]);
  var imagediv = document.getElementById('preview');
  var newimg = document.createElement('img');
  imagediv.innerHTML = '';
  newimg.src=image;
  newimg.width= "100%";
  imagediv.appendChild(newimg);
}
$('.custom-file-input').on('change', function(e){
    var inputFile = e.currentTarget;
    $(inputFile).parent().find('.custom-file-label').html(inputFile.files[0].name);
  });