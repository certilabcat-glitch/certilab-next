fetch('http://localhost:3457/api/apply-migration', { redirect: 'follow' })
  .then(r => r.text())
  .then(t => console.log(t))
  .catch(e => console.error(e));