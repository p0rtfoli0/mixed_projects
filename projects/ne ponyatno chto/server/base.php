<?php 
	header('Content-type: text/html; charset=utf-8');

	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	$name = $data['name'];
	$time = $data['time'];
	$link = $data['link'];

	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	$mysqli = new mysqli("localhost", "root", "", "textbook");
	$mysqli->query("SET NAMES 'utf8'");

	function printResult($result_set) {
		while (($row = $result_set->fetch_assoc()) != false) { // fetch_assoc возвращает рельзультат выборки в виде ассоциативного массива
			// echo $row["login"];
			return $row["COUNT(`id`)"];
		}
	}

	file_put_contents('C:/Users/meren/Desktop/OSPanel/domains/HackerMan/data/data_base.json',  '');

	$mysqli->query("INSERT INTO `books` (`name`, `time`, `link`) VALUES ('$name', '$time', '$link')");

	$result_set = $mysqli->query("SELECT COUNT(`id`) FROM `books`");
	$count_id = printResult($result_set);

	if ($count_id > 0) {
		$select_base = $mysqli->query("SELECT * FROM `books` ORDER BY `id` DESC");
		while (($req_r = $select_base->fetch_assoc()) != false) {
			           
			$taskList[] = array('id'=>$req_r["id"], 'name'=>$req_r["name"], 'time'=>$req_r["time"], 'link'=>$req_r["link"], 'redactor'=>$req_r["redactor"]);        // Представить новую переменную как элемент массива, в формате 'ключ'=>'имя переменной'
			              
		}
		file_put_contents('C:/Users/meren/Desktop/OSPanel/domains/HackerMan/data/data_base.json',json_encode($taskList), FILE_APPEND);  // Перекодировать в формат и записать в файл.	
	} 

	$mysqli->close();
?>