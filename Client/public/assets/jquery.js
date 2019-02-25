// SIDEBAR
$(document).ready(function() {
  $(".button-collapse").sideNav({
    menuWidth: 350, // Default is 300
    edge: "left", // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  // START OPENss
  //$(".button-collapse").sideNav("show");
});

