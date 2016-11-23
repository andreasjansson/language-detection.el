<?php
// This function will convert a "normal" json to an array.

   function json_code ($json) {  

      //remove curly brackets to beware from regex errors 

      $json = substr($json, strpos($json,'{')+1, strlen($json)); 
      $json = substr($json, 0, strrpos($json,'}')); 
      $json = preg_replace('/(^|,)([\\s\\t]*)([^:]*) (([\\s\\t]*)):(([\\s\\t]*))/s', '$1"$3"$4:', trim($json)); 

      return json_decode('{'.$json.'}', true); 
   }  

   $json_data = '{ 
      a: 1, 
      b: 245, 
      c with whitespaces: "test me", 
      d: "function () { echo \"test\" }", 
      e: 5.66 
   }';  

   $jarr = json_code($json_data);
?>