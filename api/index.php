<?php

if ( !isset($_GET['name']) or !isset($_GET['email']) or !isset($_GET['message']) ){ die( 'error!' ); }

$mysqli = mysqli_connect("localhost", "root", "password", "honeyhunters");
$mysqli->set_charset("utf8");

$name    = $mysqli->real_escape_string( $_GET['name']    );
$email   = $mysqli->real_escape_string( $_GET['email']   );
$message = $mysqli->real_escape_string( $_GET['message'] );



$query = "INSERT INTO `cards`  VALUES ( null, '$name', '$email', '$message' );";
$mysqli->query( $query );

$query = "SELECT * FROM `cards`";

$response = [];
if( $result = $mysqli->query($query) )
{
    while ( $row = $result->fetch_assoc() ) {

        $response[] = $row;
    }
}
$response = json_encode( $response );

echo $response;

?>