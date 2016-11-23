<?php
if (!function_exists('mysql_search')) {
 
   function mysql_search($table, $columns, $query = '', $options = Array()) {
 
      if (empty($query)) { return Array(); }
 
      $sql_query = Array();
 
      $options['columns'] = isset($options['columns'])?$options['columns']:'*';
      $options['method'] = isset($options['method'])?$options['method']:'OR';
      $options['extra_sql'] = isset($options['extra_sql'])?$options['extra_sql']:'';
 
      $query = ereg_replace('[[:<:]](and|or|the)[[:>:]]', '', $query);
      $query = ereg_replace(' +', ' ', trim(stripslashes($query)));
 
      $pattern = '/([[:alpha:]:]+)([[:alpha:] ]+)[[:alpha:]]?+[ ]?/i';
 
      $regs = Array();
 
      preg_match_all($pattern, $query, $regs);
 
      $query = $regs[0];
 
      while (list($key, $value) = @each($query)) {
 
         $column = $columns;
         $keywords = urldecode($value);
 
         if (strpos($value, ':')) {
 
            $column = substr($value, 0, strpos($value, ':'));
            $keywords = trim(substr($keywords, strpos($keywords, ':') + 1));
            $keywords = ereg_replace('\'', '', $keywords);
 
         } else { $keywords = ereg_replace(' +', '|', $keywords); }
 
         $column_list = explode(' ', $column);
 
         $sql = Array();
 
         for ($i = 0; $i < count($column_list); $i++) { $sql[] = '' . $column_list[$i] . ' REGEXP "' . $keywords . '"'; }
 
         $query[$key] = Array('orignal'=>$value, 'sql'=>implode(' ' . $options['method'] . ' ', $sql));
 
         $sql_query = array_merge($sql_query, $sql);
         $sql_query = implode(' ' . $options['method'] . ' ', $sql_query);
 
      }
 
      $results = mysql_fetch_results(mysql_query('SELECT ' . $options['columns'] . ' FROM ' . $table . ' WHERE ' . $sql_query . ' ' . $options['extra_sql']));
 
      return $results;
 
   }
 
}
?>