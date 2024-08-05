const net = require('net');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

const localServer = net.createServer();
const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '//localhost/EPSON1', // Reemplaza con la configuración de tu impresora
});

localServer.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log('Datos recibidos del servidor EC2:', data.toString());
        printer.alignCenter();
        printer.println(data.toString());
        printer.cut();
        printer.execute();
    });

    socket.on('close', () => {
        console.log('Conexión con el servidor EC2 cerrada');
    });

    socket.on('error', (err) => {
        console.log('Error:', err.message);
    });
});

localServer.listen(5000, () => {
    console.log('Servidor local escuchando en el puerto 5000');
});