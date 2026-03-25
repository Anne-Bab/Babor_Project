<?php
header('Content-Type: application/json');
$username = $_POST['username'] ?? '';
$taken_usernames = ['admin', 'root', 'user123']; 

if (in_array(strtolower($username), $taken_usernames)) {
    $response = [
        "available" => false,
        "message" => "Sorry, the username '$username' is already taken."
    ];
} else {
    $response = [
        "available" => true,
        "message" => "Great! The username '$username' is available."
    ];
}
echo json_encode($response);  
?>