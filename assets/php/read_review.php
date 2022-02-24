<?php
  $server_name = '35.223.136.224';
  $username = 'user1';
  $password = 'flushy-netlify';
  $db_name = 'user_rate';

  $conn = new mysqli($server_name, $username, $password, $db_name);
  if(! $conn )
  {
      die('Could not connect: ' . mysqli_error());
  }
  echo 'connect';
  mysqli_close($conn);
?>