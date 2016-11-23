<?
/**
 * Tiene todas las funciones staticas para el procesamiento de cadenas
 *
 * @package String
 * @author Miguel Godoy / Alvaro talavera
 **/
class String
{
	/**
	 * Funcion que convierte los espacios en guion bajo y pasa todos los caracteres en minusculas
	 * 
	 * Ejemplo:
	 * <code>
	 * $cadena = String::('HolaMundo'); // Devuelve 'hola_mundo'
	 * </code>
	 *
	 * @return string Devuelve la cadena procesada
	 * @author Miguelati
	 * @access public
	 **/
	public static function underscore($string) {
		return strtolower(preg_replace('/(?<=\\w)([A-Z])/', '_\\1', $string));
	}
	/**
	 * Funcion que convierte los guiones bajo en espacios.
	 *
	 * @return string Devuelve la cadena procesado
	 * @author Miguelati
	 * @access public
	 **/
	public static function humanize($lowerCaseAndUnderscoredWord) {
		return ucwords(str_replace("_", " ", $lowerCaseAndUnderscoredWord));
	}
	
	/**
	 * Funcion que convierte los guiones bajo en espacios.
	 *
	 * @return string Devuelve la cadena procesado
	 * @author Miguelati
	 * @access public
	 **/
	public static function titleize($string) {
		$str = trim($str);
		$str = str_replace('  ', ' ', $str);
		$str = strtolower(preg_replace("/\W/", "-", $string));
		$str = str_replace(' ', '', $str);
		
		return $str;
	}
	
	/**
	 * Funcion que corta un string.
	 *
	 * @return string Devuelve la cadena procesado
	 * @author Alvaro Talavera
	 * @access public
	 **/
	public static function sub($str, $len, $append="...") {
		$strlen = strlen($str);
		if($strlen <= $len) return $str;
		
		return (substr($str, 0, $len) . $append);
	}
	
	/**
	 * Convertir un string a un formato url.
	 *
	 * @return string Devuelve la cadena procesado
	 * @author Alvaro Talavera
	 * @access public
	 **/
	public static function url($str, $len=null) {
		if($len!=null) $str = self::sub($str, $len, "");
		$str = preg_replace("/[\W]+/i", '-', $str);
		$str = self::lower($str);
		return $str;
	}
	
	/**
	 * Funcion que de underscore a camel.
	 *
	 * @return string Devuelve la cadena procesado
	 * @author Miguelati
	 * @access public
	 **/
	public static function camelize($lowerCaseAndUnderscoredWord) {
		return ucwords(str_replace("_", "", $lowerCaseAndUnderscoredWord));
	}
	
	
	/**
	 * Devuelve un print_r dentro del tag <pre>
	 *
	 * @return void
	 * @author Miguelati
	 * @access public
	 **/
	public static function pr($var){
		echo "<pre>";
		print_r($var);
		echo "</pre>";
	}

	public static function upper($string){
		return strtoupper($string);
	}
	
	public static function lower($string){
		return strtolower($string);
	}
	
	public static function truncate($string, $to){
		$posicion = strpos($string, $to);
		if ($posicion !== false) {
			return substr($string, 0, $posicion + 1);
		} else {
			return false;
		}
	}
	
	public static function round($num) {
		$count = strlen($num);
		if($count <= 3) return $num;
		if($count > 3 && $count < 6) return round(($num / 1000), 2) . "k";
		if($count == 6) return round(($num / 100000), 2) . "m";
		if($count >= 7) return round(($num / 1000000), 2) . "G";
	}
	
	
	
	
} // END class 

?>