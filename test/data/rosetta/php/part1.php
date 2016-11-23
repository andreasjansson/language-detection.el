<?php

$input = file_get_contents('input');

$lines = explode("\n", $input);

$values = array(
    'a' => 0,
    'b' => 0
);

for ($i = 0; $i < count($lines); $i++) {
    if (!isset($lines[$i])) {
        break;
    }
    $line = $lines[$i];
    $words = explode(" ", $line);

    foreach ($words as $key => $value) {
        $words[$key] = trim($value);
    }

    switch($words[0]) {
        case 'hlf':
            $values[$words[1]] = intval($values[$words[1]] / 2);
            break;
        case 'tpl':
            $values[$words[1]] *= 3;
            break;
        case 'inc':
            $values[$words[1]]++;
            break;
        case 'jmp':
            $i += intval($words[1]) - 1;
            break;
        case 'jie':
            $valueName = str_replace(',', '', $words[1]);
            if ($values[$valueName] % 2 == 0) {
                $i += intval($words[2]) - 1;
            }
            break;
        case 'jio':
            $valueName = str_replace(',', '', $words[1]);
            if ($values[$valueName] == 1) {
                $i += intval($words[2]) - 1;
            }
            break;
    }
}

var_dump($values);