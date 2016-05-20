@include('vue/chitchat')
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js"></script>
<div id="chatContainer">
    <!-- This passes all the required information to the chitchat component -->
    <!-- To adjust the layout, have a look at templates/vue/chitchat.blade.php -->
    <chitchat
            room="{{ $room }}"
            token="{{ $token }}"
            node-port="{{ $port }}"
            node-hostname="{{ $hostName }}"
    ></chitchat>
</div>