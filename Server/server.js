const net = require('net');

const ec2Server = net.createServer();

ec2Server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log('Datos recibidos del cliente:', data.toString());

        const localClient = new net.Socket();
        localClient.connect(5000, '38.25.17.154', () => { // Reemplaza 'LOCAL_IP' con la IP local de tu servidor intermedio
            localClient.write(data.toString());
        });

        localClient.on('error', (err) => {
            console.log('Error en la conexión al servidor local:', err.message);
        });
    });

    socket.on('close', () => {
        console.log('Conexión con el cliente cerrada');
    });

    socket.on('error', (err) => {
        console.log('Error:', err.message);
    });
});

ec2Server.listen(4000, () => {
    console.log('Servidor EC2 escuchando en el puerto 4000');
});