<?php
require_once 'LongPoller.class.php';

class MySleepPoller extends LongPoller {
	function MySleepPoller() {
		$this->setTimeout(30);
		$this->setSleep(5);
	}

	function loadData() {
		$num = mt_rand(0, 9);
		sleep($num);
		return json_encode(array(
			"timestamp" => time(),
			"payload" => $num
		));
	}
}
?>
