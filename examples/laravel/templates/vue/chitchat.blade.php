<template id='chitchat-template'>
    <div class="chitchatapp">
        <br>
        <div class="chitchatmessagearea">
            <span class="chitchatmessage" v-for="row in messages">
                <img class="chitchatimage" :src="row.user.imageurl" width=25 height=25 v-if="row.user.imageurl"/> <span class="chitchatusername" v-bind:style="{ color:row.user.colour }">@{{ row.user.username }}</span>:
                <span v-bind:class="{ 'chitchatmessage': true, 'chitchatsentbyuser': row.user.username == user.username }">@{{ row.message }}</span><br>
            </span>
        </div>
        <div class="chitchatinputarea">
            <form v-on:submit.prevent="sendMessage(message)"  v-if="user">
                <input type="text" v-model="message"/>
                <input class="chitchatsendbutton" type="submit" v-on.prevent:submit="sendMessage(message)" value="Send"/><br>
            </form>
            <div v-else>
                Please login to chat
            </div>
        </div>
    </div>
</template>