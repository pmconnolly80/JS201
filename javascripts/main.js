requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',  
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "adding", "q"],
  function($, _, _firebase, Handlebars, bootstrap, adding, Q) {

 //replaces ajax GET   
    var myFirebaseRef = new Firebase("https://nss-peter-family.firebaseio.com/");

    myFirebaseRef.child("family").on("value", function(snapshot) {
      console.log(snapshot);
      var family = snapshot.val();
      var familyArray = [];
      adding().then(function(){
        console.log();
      });

//Using Promises to display JSON files
      var first_list_of_family = getFamily();

      var all_family = [];

      first_list_of_family
        .then(function(first_family){
          for (var i = 0; i < first_family.family.length; i++) {
            all_family.push(first_family.family[i]);
          }

          return getMoreFamily();
        })
        .then(function(second_songs){
          second_family.family.forEach(function(family){
            all_family.push(family);
          });
        })
        .done(function(){
          console.log("all_family", all_family);
        });

      
// Convert Firebase's object of objects into an array of objects
      for (var key in family.family) {
        familyArray[familyArray.length] = family.family[key];
      }
      console.log("familyArray", familyArray);
         
        var uniqueMemberName =_.chain(familyArray)
                 .uniq("memberName")
                 .pluck("memberName")
                 .value();


        console.log(uniqueMemberName);
  

      function displayFamily() {  

      require(['hbs!../templates/family'], function(familyTemplate) {
        $("#theFamilyList").html(familyTemplate(family));
       });

      }
      
      $(document).on( "click", "#deleteButton", function(){
        $(this).parent().remove();
      });


   



//Keep me on the outside.
  
});
});