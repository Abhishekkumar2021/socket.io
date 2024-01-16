// on connect
let firstClient = undefined;
let counter = 0;
function onConnect(socket) {
    if(firstClient === undefined) {
        firstClient = socket.id;
    }
    console.log('a user connected: ' + socket.id);
    counter++;
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
        counter--;
        if(counter == 0){
            firstClient = undefined;
        }
    });
    socket.on('message', (data) => {
        console.log({
            ...data
        })
    });

    if(socket.id === firstClient) {
        // This will be send to only the first client
        socket.emit('message', {
            message: 'This is a message from the server',
            date: new Date()
        });
    }

}

function sendMessage(io) {
    io.emit('message', {
        message: 'This is a message from the server',
        date: new Date()
    });
}


export { 
    onConnect,
    sendMessage,
}