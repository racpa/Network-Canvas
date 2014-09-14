/* global network, extend, session */
/* exported ListSelect */
var ListSelect = function ListSelect(options) {

  //global vars
  var listSelect = {};
  listSelect.options = {
    targetEl: $('.container'),
    variables: [],
    edgeType: "Drugs",
    heading: "This is a default heading",
    subheading: "And this is a default subheading"
  };

  extend(listSelect.options, options);

  var itemClickHandler = function() {
    if ($(this).data('selected') === true) {
      $(this).data('selected', false);
      $(this).css({'border':'2px solid #eee','background':'#eee'});

      // remove edge
      network.removeEdge(network.getEdges({type: listSelect.options.edgeType,from:network.getNodes({type_t0:'Ego'})[0].id, to: $(this).data('nodeid')}));

    } else {
      $(this).data('selected', true);
      $(this).css({'border':'2px solid red','background':'#E8C0C0'});

      // create the edge
      network.addEdge({type: listSelect.options.edgeType,from:network.getNodes({type_t0:'Ego'})[0].id, to: $(this).data('nodeid')});
    }
    
  };

  var processSubmitHandler = function() {
    
    session.nextStage(); 

  };


  listSelect.init = function() {
    // Add header and subheader
    listSelect.options.targetEl.append('<h1>'+listSelect.options.heading+'</h1>');
    listSelect.options.targetEl.append('<p class="lead">'+listSelect.options.subheading+'</p>');
    listSelect.options.targetEl.append('<div class="form-group list-container"></div>');


    // Event Listeners
    $(document).on('click', '.item', itemClickHandler);
    $(document).on('click', '.continue', processSubmitHandler);


    $.each(network.getEdges(listSelect.options.criteria), function(index,value) {
      var el = $('<div class="item" data-nodeid="'+value.to+'"><h3><strong>'+value.nname_t0+'</strong> <span>Name: '+value.fname_t0+' '+value.lname_t0+'</span> <span>Age: '+value.age_p_t0+'</span></h3></div>');
      if (network.getEdges({from:network.getNodes({type_t0:'Ego'})[0].id, to: value.to, type:listSelect.options.edgeType}).length>0) {
        el.data('selected', true);
        el.css({'border':'2px solid red','background':'#E8C0C0'});
      }
      $('.list-container').append(el);
    });

    var button = $('<div class="form-group text-right"><span class="btn btn-primary continue">Continue</span></div>');
    listSelect.options.targetEl.append(button);

  };

  listSelect.init();

  return listSelect;
};