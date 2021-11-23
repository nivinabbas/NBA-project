var source = $('#players-template').html();
var template = Handlebars.compile(source);

$('.getTeamName').on('click', function () {
  let teamName = $('.inputTeamName').val();
  $.get(`teams/${teamName}`, function (res) {
    let dataAboutTeams = {
      allActivePlayers: res,
    };
    $('.teamCard').empty();
    var newHTML = template(dataAboutTeams);
    $('.teamCard').append(newHTML);
  });
});
