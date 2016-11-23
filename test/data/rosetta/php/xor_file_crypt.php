<?php 
// Stream files and encrypt the data on-the-fly 

// Settings 
// -- File to stream 
$file = "FILE_out"; 
// -- Reading buffer 
$bufferlength = 3840; 
// -- Key in hex 
//$keychar = "9cdfb439c7876e703e307864c9167a15"; 

// Function: Convertion hex key in a string into binary 
function hex2bin($h) { 
    if (!is_string($h)) return null; 
    $r = array(); 
    for ($a=0; ($a*2)<strlen($h); $a++) { 
        $ta = hexdec($h[2*$a]); 
        $tb = hexdec($h[(2*$a+1)]); 
        $r[$a] = (int) (($ta << 4) + $tb); 
    } 
    return $r; 
} 

// Function to send the auth headers 
function askPassword($text="Enter the password") { 
    header('WWW-Authenticate: Basic realm="'. utf8_decode($text) .'"'); 
    header('HTTP/1.0 401 Unauthorized'); 
    return 1; 
} 

// Key is asked at the first start 
if (!isset($_SERVER['PHP_AUTH_PW'])) { 
    askPassword(); 
    echo "Une clé est nécessaire !<br />"; 
    exit; 
} 
// Get the key in hex 
$keychar = $_SERVER['PHP_AUTH_PW']; 

// Convert key and set the size of the key 
$key = hex2bin($keychar); 
$keylength = count($key); 
// Teste si la clé est valide en hex 
if ($key == "" || $keylength <= 4) { 
    askPassword("Clé incorrecte !"); 
    //echo "Clé incorrecte !<br />"; 
    exit(); 
} 
// Teste si la clé est de longueur d'une puissance de 2 
if ( ($keylength%2) != 0) { 
    askPassword("Clé de longueur incorrecte (multiple de 2 uniquement)"); 
    //echo "Clé de longueur incorrecte (puissance de 2 uniquement)<br />"; 
    exit(); 
} 

// Headers 
header("Content-Type: application/octet-stream; "); 
header("Content-Transfer-Encoding: binary"); 
header("Content-Length: " . filesize($file) ."; "); 
header("filename=\"".$file."\"; "); 
flush(); // this doesn't really matter. 

// Opening the file in read-only 
$fp = fopen($file, "r"); 
while (!feof($fp)) 
{ 
    // Read a buffer size of the file 
    $buffer = fread($fp, $bufferlength); 
    $j=0; 
    for ($i=0; $i < $bufferlength; $i++) { 
        // The key is read in loop to crypt the whole file 
        if ($i%$keylength == 0) { 
            $j=0; 
        } 
        // Apply a xor operation between the key and the file to crypt 
        // This operation eats a lots of CPU time (Stream at 1MiB/s on my server; Intel E2180) 
        $tmp = pack("C", $key[$j]); 
        $bufferE = ( $buffer[$i]^$tmp); // <==== Le fameux XOR 
        
        /* 
        echo "<br />key[".$j."]: "; 
        var_dump($tmp); 
        echo "<br />buffer[".$i."]: "; 
        var_dump($buffer[$i]); 
        echo "<br />bufferE: "; 
        var_dump($bufferE); 
        echo "<br />"; 
        //*/ 
        
        // Send the encrypted data 
        echo $bufferE; 
        // Clean the memory 
        $bufferE = ""; 
        $j++; 
    } 
    $buffer = ""; 
    flush(); // this is essential for large downloads 
    /* 
    fclose($fp); 
    exit(); 
    //*/ 
} 
// Close the file and it's finished 
fclose($fp); 

?>