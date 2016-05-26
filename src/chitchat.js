$(document).ready(function() {
    Vue.component('chitchat', {
        template: '#chitchat-template',
        props: [
            'token',
            'room',
            'nodeHostname',
            'nodePort',
            'messageAreaContainer'
        ],
        data: function() {
            return {
                connection: this.connectToChat(),
                authenticated: false,
                user: false,
                messages: [],
                message: '',
                retryInterval: false,
            }
        },
        methods: {
            connectToChat: function() {
                this.socket = io('//' + this.nodeHostname + ':' + this.nodePort);
                if(typeof this.socket !== 'object') {
                    console.log('Failed to connect to chitchat node server');
                } else {
                    this.setEventListeners();
                }
            },
            validateToken: function() {
                this.socket.emit('validateToken', this.token);
            },
            updateScrollBar: function() {
                $(this.messageAreaContainer).scrollTop(99999);
                if (typeof $(this.messageAreaContainer).closest('.nano').nanoScroller === "function") {
                    $(this.messageAreaContainer).closest('.nano').nanoScroller();
                }
            },
            changeRoom: function(newRoom) {
                this.messages = [];
                this.message = '';
                this.room = newRoom;
                this.requestMessages();
            },
            addMessage: function(msgObj) {
                this.messages.push(msgObj);
                if (this.messages.length > 300) {
                    this.messages.splice(0, 50);
                }
            },
            requestMessages: function() {
                this.socket.emit('loadMessages', this.room);
            },
            sendMessage: function () {
                if (this.message.replace(' ', '').length > 1) {
                    this.socket.emit('sendMessage', this.room, this.message);
                }
                this.message = '';
            },
            setEventListeners: function()
            {
                this.socket.on('connected', function(that){
                    console.log('connected to chitchat node');
                    if (that.token) {
                        that.validateToken();
                    }
                    that.requestMessages();
                }.bind(this,this));
                // Receiving all messages from redis on first load

                this.socket.on('messages', function(that, data){
                    if (data.room != that.room) {

                    } else {
                        for(i=0; i<data.messages.length; i++) {
                            that.addMessage(JSON.parse(data.messages[i]));
                        }
                    }
                    // for some reason doesn't work if you do it instantly
                    setTimeout(function(){that.updateScrollBar()}, 100);
                }.bind(this, this));
                this.socket.on('message', function(that, data){
                    if (data.room == this.room) {
                        this.addMessage(data.message);
                    }
                    setTimeout(function(){that.updateScrollBar()}, 100);
                }.bind(this, this));
                this.socket.on('authenticated', function(that, user){
                    delete user.room;
                    that.user = user;
                    that.authenticated = true;
                    $('.chitchatsendbutton').prop('disabled', false);
                }.bind(this, this));
                this.socket.on('disconnect', function(){
                    console.log('disconnected from chitchat node');
                    $('.chitchatsendbutton').prop('disabled', true);
                });
            }
        }
    });
    var app = new Vue({
        el:'#chatContainer'
    });
});



