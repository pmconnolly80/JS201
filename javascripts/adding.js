define(
  ["jquery", "hbs", "bootstrap", "q"],
  function($, Handlebars, bootstrap, Q) {
    var deferred = Q.defer();
  
    return function() {
      $(".addMember").click(function(e) {
          e.preventDefault();
          var newMember = {
            "name": $("#memberName").val(),
            "age": $("#memberAge").val(),
            "gender": $("#memberGender").val(),
            "skills": $("#memberSkills").val(),
          };

        $.ajax({
          url: "https://nss-peter-family.firebaseio.com/family.json",
          method: "POST",
          data: JSON.stringify(newFamily)
        })
        .done(function(data) {
          console.log(newMember);
          deferred.resolve(data);
        });
      });
      return deferred.promise;
    };
  });