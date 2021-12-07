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

$('#dreamTeam').on('click', function () {
  $.get('dreamTeam', function (response) {
    let dreamTeam = { allPlayers: response };
    console.log(dreamTeam);

    $('.teamCard').empty();

    var newHTML = template(dreamTeam);
    $('.teamCard').append(newHTML);
  });
});

$('body').on('click', '.playerCard', function () {
  let firstName = $(this).find('#firstName')[0].innerHTML;
  console.log(firstName);
  let lastName = $(this).find('.lastName')[0].innerHTML;
  let jersey = $(this).find('#jersey')[0].innerHTML;
  let photo = $(this).find('.clickable').find('.photoCard').attr('src');
  let position = $(this).find('#position')[0].innerHTML;

  let data = {
    firstName: firstName,
    lastName: lastName,
    jersey: jersey,
    position: position,
    photo: photo,
  };
  console.log(data);
  $.post('addPlayer', data, function (response) {
    response.send(data);
  });
});
