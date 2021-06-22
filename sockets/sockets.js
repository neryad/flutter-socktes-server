const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metalica'));



io.on('connection', (client) => {
  console.log('Cliente conectado');
  client.emit('active-bands', bands.getBands());

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  client.on('mensaje', (payload) => {
    console.log('mensaje', payload);
    io.emit('mensaje', { admin: 'wawa' });
  });

  // client.on('emitir-mensaje', (payload) => {
  //   console.log(payload,'payload');
  //   //io.emit('nuevo-mensaje', 'Heyy');
  //   client.broadcast.emit('nuevo-mensaje', payload);
  // });

   client.on('vote-band', (payload) => {
//console.log(payload,'payload');
bands.voteBand(payload.id);
   io.emit('active-bands', bands.getBands());
  });

     client.on('add-band', (payload) => {
       const newBand = new Band(payload.name);
console.log(payload,'payload');
bands.addBand(newBand);
   io.emit('active-bands', bands.getBands());
  });

    client.on('delete-band', (payload) => {
//console.log(payload,'payload');
bands.deleteBand(payload.id);
   io.emit('active-bands', bands.getBands());
  });
});
