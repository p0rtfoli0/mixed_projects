<!DOCTYPE html>
<html>
	<head>
		<title>TextBook - Redactor</title>
		<meta charset="UTF-8">
		<meta name="keywords" content="учебник, редактор, текст, интерактивный, конструктор">
		<meta name="description" content="Конструктор интерактивных учебников">
		<link id="link-style" rel="stylesheet" href="/style/style.css" type="text/css">
		<link rel="shortcut icon" href="/image/Terminal.ico">
	</head>

	<body>
		<header>
			<div class="menu">
				<a href="index.php" class="logo">TextBook - Redactor</a>
				<ul class="main-menu">
					<li class="main"><a href="index.php">Главная</a></li>
					<li class="info"><a href="info.php">Информация</a></li>
					<li class="feedback"><a href="feedback.php">Обратная связь</a></li>
				</ul>
			</div>
		</header>

		<!---------------HEADER END------------------>

		<main>
			<div class="container-bookList">
				<form name="createBook" action="" method="POST">
					<input type="text" name="bookName-value" id="bookName" placeholder="Введите название учебника">
				</form>
				<hr>
				<div class="block-book">
					<ul class="book-item"></ul>
				</div>
			</div>
		</main>
		<!---------------MAIN END------------------>

		<footer>
			
		</footer>

		<script src="/js/addBook.js"></script>
		
	</body>
</html>