<?php 
	header('Content-type: text/html; charset=utf-8');

	session_start();

	if(isset($_POST["send"])) {
		$from = htmlspecialchars($_POST["mail-value"]);
		$subject = htmlspecialchars($_POST["subject-value"]);
		$message = htmlspecialchars($_POST["message-value"]);

		$_SESSION["from"] = $from;
		$_SESSION["subject"] = $subject;
		$_SESSION["message"] = $message;

		$error_from = "";
		$error_subject = "";
		$error_message = "";
		$error = false;

		if(strlen($from) < 2 || !preg_match("/@/", $from) ) {
			$error_from = "Введите корректный адрес эл. почты";
			$error = true;
		}

		if(strlen($subject) == 0) {
			$error_subject = "Введите тему запроса";
			$error = true;
		}

		if(strlen($message) == 0) {
			$error_message = "Введите сообщение";
			$error = true;
		}

		if(!$error) {
			// $subject = "=?utf-8?B?".base64_encode($subject)."?=";
			// $headers = "From: $mail\r\nReply-to: $mail\r\nContent-type: text/plain; charset=utf-8\r\n";
			// mail("karimov-bogdan@inbox.ru", $subject, $message, $headers);

			require_once('phpmailer/PHPMailerAutoload.php');
			$mail = new PHPMailer;
			$mail->CharSet = 'utf-8';

			//$mail->SMTPDebug = 3;                               // Enable verbose debug output

			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
			$mail->SMTPAuth = true;                               // Enable SMTP authentication
			$mail->Username = 'textbook.redactor@bk.ru'; // Ваш логин от почты с которой будут отправляться письма
			$mail->Password = '$dk820&123'; // Ваш пароль от почты с которой будут отправляться письма
			$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
			$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

			$mail->setFrom('textbook.redactor@bk.ru'); // от кого будет уходить письмо?
			$mail->addAddress('karimov-bogdan@inbox.ru');     // Кому будет уходить письмо 
			//$mail->addAddress('ellen@example.com');               // Name is optional
			//$mail->addReplyTo('info@example.com', 'Information');
			//$mail->addCC('cc@example.com');
			//$mail->addBCC('bcc@example.com');
			//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
			//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
			$mail->isHTML(true);                                  // Set email format to HTML

			$mail->Subject = $subject;
			$mail->Body    = 'Пользователь '.$from.' отправил Вам запрос<br/><br/>'.'Сообщение:<br/>'.'"'.$message.'"';
			$mail->AltBody = '';

			if(!$mail->send()) {
			    echo 'Error';
			} else {
			    $_SESSION["from"] = '';
				$_SESSION["subject"] = '';
				$_SESSION["message"] = '';
			}
		}
	}
?>


<!DOCTYPE html>
<html>
	<head>
		<title>TextBook - Redactor</title>
		<meta charset="UTF-8">
		<meta name="keywords" content="учебник, редактор, текст, интерактивный, конструктор">
		<meta name="description" content="Конструктор интерактивных учебников">
		<link rel="shortcut icon" href="/image/Terminal.ico">
		<link id="link-style" rel="stylesheet" href="/style/style.css" type="text/css">
	</head>

	<body>
		<header>
			<div class="menu">
				<a href="index.php" class="logo">TextBook - Redactor</a>
				<ul class="main-menu">
					<li class="main"><a href="index.php">Главная</a></li>
					<li class="info"><a href="info.php">Информация</a></li>
					<li class="feedback"><a href="feedback.php">Обратная связь</a></li>
					<!--<li class="account"><a href="login.html">Мой Аккаунт</a></li>-->

				</ul>
			</div>
		</header>

		<!---------------HEADER END------------------>

		<main class="main-block">
			<div class="form-block">
				<h1 class="form-header">Отправить запрос</h1><br/>
				<form name="feedback" action="" method="POST">
					<label for="mail">Адрес эл. почты</label><br/>
					<input type="text" id="mail" name="mail-value" value="<?php echo $_SESSION['from'] ?>"><br/>
					<span ><?php echo $error_from ?></span><br/>
					<label for="subject-value">Тема</label><br/>
					<input type="text" id="subject" name="subject-value" value="<?php echo $_SESSION['subject'] ?>"><br/>
					<span ><?php echo $error_subject ?></span><br/>
					<label for="message">Сообщение</label><br/>
					<textarea id="message" name="message-value"><?php echo $_SESSION['message'] ?></textarea><br/>
					<span ><?php echo $error_message ?></span><br/>
					<input class="button-send" type="submit" name="send" value="Отправить">
				</form>
			</div>	
		</main>

		<!---------------MAIN END------------------>

		<footer>
			
		</footer>

		<script src="js/error.js"></script>
		
	</body>
</html>