/*  MAIN
 */

fetch('https://hook.eu1.make.com/9n9hxqyeklz97u99n7hfbrt1b7nadhq8').then(r => r.json()).then(response => {
  const SIGNATURES = [];

  response.forEach(element => SIGNATURES.push({
    dateTime: element.statusChangedDateTime,
    description: element.emailBlurb,
    status: element.status,
    type: (String(element.emailSubject).split(' ')[0] + ' ' + String(element.emailSubject).split(' ')[1] + ' ' + String(element.emailSubject).split(' ')[2]).replace('Immocitiz', '')
  }));

  SIGNATURES.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)).forEach(signature => {
    const TD =
      '<td>' + new Date(signature.dateTime).toLocaleDateString('fr-FR') + ' ' + new Date(signature.dateTime).toLocaleTimeString('fr-FR') + '</td>' +
      '<td>' + String(signature.type).trim() + '</td>' +
      '<td>' + signature.description + '</td>';

    switch (signature.status) {
      case 'completed':
        $('#signatures').append('<tr class="table-success">' + TD + '<td>Complétée</td></tr>');
        break;
      case 'declined':
        $('#signatures').append('<tr class="table-danger">' + TD + '<td>Déclinée</td></tr>');
        break;
      case 'sent':
        $('#signatures').append('<tr class="table-warning">' + TD + '<td>Envoyée</td></tr>');
        break;
      case 'voided':
        $('#signatures').append('<tr>' + TD + '<td>Annulée</td></tr>');
        break;
      default:
        break;
    }
  });
});