export default function handler(req, res) {
  const {invite} = req.query
  const {host} = req.headers

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"')

  res.end(
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:IzzyAndAstridWedding
METHOD:PUBLISH
X-WR-CALNAME:Izzy & Astrid's Wedding
X-PUBLISHED-TTL:PT1H
BEGIN:VEVENT
UID:me@str.id.au
SUMMARY:Izzy & Astrid's Wedding
DESCRIPTION:We can't wait to see you!
DTSTAMP:20230403T063216Z
DTSTART;VALUE=DATE:20240511
DTEND;VALUE=DATE:20240511
URL:https://${host}/${invite}
LOCATION:Hillstone St Lucia
STATUS:CONFIRMED
CREATED:20230403T063216Z
END:VEVENT
END:VCALENDAR`)
}
