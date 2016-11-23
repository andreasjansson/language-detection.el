<? 
    if ($HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"] != ""){ 
        $IP = $HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"]; 
        $proxy = $HTTP_SERVER_VARS["REMOTE_ADDR"]; 
        $host = @gethostbyaddr($HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"]); 
    }else{ 
        $IP = $HTTP_SERVER_VARS["REMOTE_ADDR"]; 
        $host = @gethostbyaddr($HTTP_SERVER_VARS["REMOTE_ADDR"]); 
    } 
?>