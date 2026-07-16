const net = require('net');

const client = new net.Socket();
client.connect(5432, 'aws-0-ap-southeast-2.pooler.supabase.com', function() {
    console.log('Connected to 5432!');
    client.destroy();
});

client.on('error', function(err) {
    console.log('Error 5432:', err);
});

const client2 = new net.Socket();
client2.connect(6543, 'aws-0-ap-southeast-2.pooler.supabase.com', function() {
    console.log('Connected to 6543!');
    client2.destroy();
});

client2.on('error', function(err) {
    console.log('Error 6543:', err);
});
