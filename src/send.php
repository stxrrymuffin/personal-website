<?php
    phpinfo();
    $name = $_POST['name'];
    echo htmlspecialchars($name);

    $formContentsToSend = "The name is ". $name; //add \n at the end of the string if you have multiple values.

    mail("jcpiano27@gmail.com","You just received new data!",$formContentsToSend);
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;

?>