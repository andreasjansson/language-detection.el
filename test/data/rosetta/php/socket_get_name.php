<?php 
$sock = stream_socket_server("udp://127.0.0.1:0"); 
$name = stream_socket_get_name($sock); 
echo $name; 
?>