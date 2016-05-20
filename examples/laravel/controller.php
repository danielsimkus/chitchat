<?php
$chitChat = new ChitChat('127.0.0.1', '8181');
$chatToken = '';
$currentRoom = 'globalchat';
if ($user) {
    $chatToken = $chitChat->getToken(
        $currentRoom,
        $user->username,
        $chitChat->getRandomColour(),
        $user->avatar ?: "/images/unknown.png"
    );
}

$chatParams = [
    'port' => $chitChat->getPort(),
    'hostName' => $chitChat->getHostName(),
    'token' => $chatToken,
    'room' => $currentRoom,
];

return view('index', $chatParams);
