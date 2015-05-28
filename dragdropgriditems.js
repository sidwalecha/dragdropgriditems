LISTA = new Meteor.Collection('lista');
LISTB = new Meteor.Collection('listb');

if (Meteor.isClient) {
  Template.listtemplate.rendered = function() {

    var dataSourcea = new kendo.data.DataSource({
      sort: {
        field: 'id',
        dir: 'desc'
      }
    });

    var dataSourceb = new kendo.data.DataSource({
      sort: {
        field: 'id',
        dir: 'desc'
      }
    });

    //display dataSource's data through ListView
    this.$("#listadiv").kendoListView({
      dataSource: dataSourcea,
      template: "<div class='item'>ListA: #: item #</div>"
    });

    this.$("#listbdiv").kendoListView({
      dataSource: dataSourceb,
      template: "<div class='item'>ListB: #: item #</div>"
    });

    this.autorun(function () {
      dataSourcea.data(LISTA.find().fetch());
      dataSourceb.data(LISTB.find().fetch());
    });

    function draggableOnDragStart(e) {
    }

    function draggableOnDrag(e) {
    }

    function draggableOnCancel(e) {
    }

    function draggableOnDragEnd(e) {
    }

    //create a draggable for the parent container
    this.$("#listadiv").kendoDraggable({
      filter: ".item", //specify which items will be draggable
      hint: function (element) { //create a UI hint, the `element` argument is the dragged item
        return element.clone().css({
          "opacity": 0.6,
          "background-color": "#0cf"
        });
      },
      dragstart: draggableOnDragStart,
      drag: draggableOnDrag,
      dragend: draggableOnDragEnd,
      dragcancel: draggableOnCancel
    });

    function droptargetOnDragEnter(e) {
    }

    function droptargetOnDragLeave(e) {
    }

    function droptargetOnDrop(e) {

      var item = dataSourcea.getByUid(e.draggable.hint.data().uid);
      dataSourceb.add(item);
      dataSourcea.remove(item);

    }

    this.$("#listbdiv").kendoDropTarget({
      dragenter: droptargetOnDragEnter,
      dragleave: droptargetOnDragLeave,
      drop: droptargetOnDrop
      });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (LISTA.find().count() === 0) {
      LISTA.insert({
        id: 1,
        item: 'Item 1'
      });
      LISTA.insert({
        id: 2,
        item: 'Item 2'
      });
    }

    if (LISTB.find().count() === 0) {
      LISTB.insert({
        id: 3,
        item: 'Item 3'
      });
      LISTB.insert({
        id: 4,
        item: 'Item 4'
      });
    }
  });
}
