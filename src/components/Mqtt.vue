<template>
    <div>
        <button @click="createConnection()">1. 서버연결</button>
        <button @click="doSubscribe()">2. 토픽설정</button>
        <button @click="doUnSubscribe()">3. 토픽해제</button>
        <input type="text" v-model="state.message" />
        <button @click="sendMessage()">4. 메세지보내기</button>
    </div>
</template>

<script>
import mqtt from 'mqtt';
import { reactive, onMounted } from 'vue';

export default {
    setup () {
        const state = reactive({
            message : '',  // 보낼 메세지 
            client  : '' , // 접속한 클라이언트 객체

            host    : '1.234.5.158',  //서버주소
            port    : 11884,   // web용 포트번호

            options : {
                clean : true, //세션 초기화
                reconnectPeriod : 20000, // 주기적인 접속 시간

                // 고유값 ex)d200, d212 등
                clientId    : 'd216_'+ new Date().getTime(),
                username    : 'ds606', // 아이디
                password    : 'ds606', // 암호
            },

            topic : 'ds/class606/#',
            qos   : 0,  // 0부터 2까지의 숫자
        });

        const createConnection = () => {
            const url = `ws://${state.host}:${state.port}`;
            try {
                state.client = mqtt.connect(url, state.options);
                console.log(state.client);

                state.client.on('connect', () => { 
                    console.log('connect success!!');
                });

                state.client.on('error', () => { 
                    console.log('connect error!!');
                });

                state.client.on('message',(topic, message) => {
                    console.log(topic, JSON.parse(message));
                });
            }

            catch(e){
                console.log('mqtt error', e);
            }
           
        };

        const doSubscribe = () => {
            state.client.subscribe(state.topic, {qos:state.qos}, (error, res) => {
                if(error) {
                    console.log('subscribe topic error', error);
                    return;
                }
                console.log('subscribe success', res);
            });
        };

        const doUnSubscribe = () => {
            state.client.unsubscribe(state.topic, error => {
                if(error) {
                    console.log('unsubscribe topic error', error);
                    return;
                }
                console.log('unsubscribe success');
            });            
        };

        const sendMessage = () => {
            // json object => string : JSON.stringify(   )  
            // string => json object : JSON.parse(   ) 
            const payload = JSON.stringify({ 
                userid : 'd216',
                msg : state.message 
            });

            // 보낼 토픽, 보내는 내용(문자), QOS(0~2)
            state.client.publish('ds/class606/d216', payload, 0, error => {
                if(error) {
                    console.log('publish error', error);
                    return;
                }
            });
        }

        onMounted( () => {
            console.log(state.options.clientId);
            createConnection();
            doSubscribe();

        });
        return {
            state, 
            createConnection, 
            doSubscribe, 
            doUnSubscribe, 
            sendMessage 
        }
    }
}
</script>

<style lang="scss" scoped>

</style>