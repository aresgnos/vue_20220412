<template>
    <div>
        <h3>주문하기</h3>
        물품명 : <input type="text" v-model="state.itemno" />
        주문수량 : <input type="text" v-model="state.buycnt" />
        <button @click="handleBuy">주문하기</button>
    </div>
</template>

<script>
import mqtt from 'mqtt';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            itemno : 4,
            buycnt : 10,

            token : sessionStorage.getItem("TOKEN"),

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
        

        const handleBuy = async() => {
            const url =  `/ROOT/api/buy/insert2`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = { 
                bcnt : state.buycnt, 
                item : {icode:state.itemno}
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                console.log('주문성공');
                // 신호 전송 구현
                sendMessage();
            }
        }

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

        const sendMessage = () => {
            // json object => string : JSON.stringify(   )  
            // string => json object : JSON.parse(   ) 
            const payload = JSON.stringify({ 
                userid : 'd216',
                msg : state.message 
            });

            // 보낼 토픽, 보내는 내용(문자), QOS(0~2)
            state.client.publish('ds/seller1', payload, 0, error => {
                if(error) {
                    console.log('publish error', error);
                    return;
                }
            });
        }

        onMounted(()=>{
            createConnection();
        });

        return {state, handleBuy}
    }
}
</script>

<style lang="scss" scoped>

</style>