<template>
    <div>
        <h3>회원가입</h3>
        아이디 : <input type="text" v-model="state.uemail" /><br />
        비밀번호 : <input type="password" v-model="state.upw" /><br />
        이름 : <input type="text" v-model="state.uname" /><br />
        연락처 : <input type="text" v-model="state.uphone" /><br />
        권한 : <select v-model="state.urole">
                <option value="CUSTOMER">고객</option>
                <option value="SELLER">판매자</option>
            </select><br />
        
        <button @click="handleJoin">회원가입</button>

    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {

        const state = reactive ({
           uemail : '',
           upw : '',
           uname : '',
           uphone : '',
           urole : ''
        });

        const handleJoin = async() => {
            const url = `/ROOT/api/customer/join`;
            const headers = {"Content-Type" : "application/json"};
            const body = {
                uemail : state.uemail,
                upw : state.upw,
                uname : state.uname,
                uphone : state.uphone
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('회원가입완료');
            }

        }

        return {handleJoin, state}
    }
}
</script>

<style lang="scss" scoped>

</style>