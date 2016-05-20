<?php

// This is mainly an example script for the client

$data = [];

$possibleColours = [
    '#ff0000',
    '#ffffff',
    '#11ff11',
    '#1111ff',
];

$data['room'] = 'global';
$data['username'] = $_GET['username'] ?: '';
$data['imageurl'] = $_GET['imageurl'] ?: 'http://2.bp.blogspot.com/-G1vh_uLbyM8/U5W__nOU6eI/AAAAAAAAIIg/v1y8V_TEduI/s1600/coffee-smiley.png';
$data['colour'] = isset($_GET['colour']) ? $_GET['colour'] : $possibleColours[rand(0,count($possibleColours)-1)];
if ($data['username']) {
    $ch = curl_init('http://139.59.188.141:8181/auth/create?' . http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $response = curl_exec($ch);

    if ($tokenData = json_decode($response, true)) {
        $token = $tokenData['token'];
    } else {
        die('Failed to get token');
    }
}
?>

<template id='chitchat-template'>
    <div class="chitchatapp">
        <div class="chitchatrooms">
            <div v-bind:class="{chitchatroombutton: true, selected: this.room == 'global'}" v-on:click="this.changeRoom('global')">
                Global Chat
            </div>
            <div v-bind:class="{chitchatroombutton: true, selected: this.room == 'bbc1'}" v-on:click="this.changeRoom('bbc1')">
                BBC One
            </div>
        </div>
        <br>
        <div class="chitchatmessagearea">
            <span class="chitchatmessage" v-for="row in messages">
                <img class="chitchatimage" :src="row.user.imageurl" width=25 height=25 v-if="row.user.imageurl"/> <span class="chitchatusername" v-bind:style="{ color:row.user.colour }">{{ row.user.username }}</span>:
                <span v-bind:class="{ 'chitchatmessage': true, 'chitchatsentbyuser': row.user.username == user.username }">{{ row.message }}</span><br>
            </span>
        </div>
        <div class="chitchatinputarea" v-if="user">
            <form v-on:submit.prevent="sendMessage(message)">
                <input type="text" v-model="message"/>
                <input class="chitchatsendbutton" type="submit" v-on.prevent:submit="sendMessage(message)" value="Send Message"/><br>
            </form>
        </div>
    </div>
</template>


<html>
    <head>
        <title>Test</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js"></script>
        <script type="text/javascript" src="//code.jquery.com/jquery-2.2.0.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.6/socket.io.min.js"></script>
        <script src="js/chitchat.js"></script>
        <style>
            .chitchatapp {
                font-family: 'Helvetica', Verdana, sans-serif;
                font-size: 14pt;
                width: 400px;
                height: 500px;
                color: #fffbea;
                background-color: #333333;
            }
            .chitchatusername {
                font-weight: bold;
            }
            .chitchatsentbyuser {
                font-weight: bold;
            }
            .chitchatmessage {

            }
            .chitchatinputarea {

            }
            .chitchatmessagearea {
                height:400px;
                overflow: hidden;
                overflow-y: scroll;
            },
            .chitchatimage {
                width: 100px;
                height: 100px;
            }
            .chitchatrooms {
                width:100%;
            }
            .chitchatroombutton {
                display:inline-block;
                border: 1px solid #e3f4f2;
                text-align:center;
                padding:5px;
                height:26px;
            }

            .selected.chitchatroombutton{
                border: 1px solid #67f46c;
            }
        </style>
    </head>
    <body>
        <div id="chatContainer">
            <chitchat room="<?=$data['room']?>" token="<?=$token?>"></chitchat>
        </div>
    </body>
</html>

