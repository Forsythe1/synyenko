<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/phpmailer/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/phpmailer/src/SMTP.php';
    
    

    require_once "vendor/autoload.php";


    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'vendor/phpmailer/phpmailer/language/');
    $mail->IsHTML(true);


    //От кого письмо
    $mail->setFrom('admin@synyenko.com.ua', 'Admin');
    //Кому отправить
    $mail->addAddress('igorfsynk@gmail.com');
    // Тема письма
    $mail->Subject = 'Возникли вопросы или сомнения?';



    //Тело письма
    $body = '<h1>Встречайте супер письмо!</h1>';

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя: </strong>'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail: </strong>'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['tel']))) {
        $body.='<p><strong>Телефон: </strong>'.$_POST['tel'].'</p>';
    }
    if(trim(!empty($_POST['message']))) {
        $body.='<p><strong>Сообщение: </strong>'.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    $message = null;

    //Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
	//$mail->send();
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>