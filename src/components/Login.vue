<template>
    <div>
        <h3>로그인</h3>
        아이디 : <input type="text" v-model="state.uemail" />
        비밀번호 : <input type="password" v-model="state.upw" />
        <button @click="handleLogin">로그인</button>

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
        });

        const handleLogin = async() => {
            const url = `/ROOT/api/customer/login`;
            const headers = {"Content-Type" : "application/json"};
            const body = {
                uemail : state.uemail,
                upw : state.upw,
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('로그인 되었습니다.');
            }

        }

        return {handleLogin, state}
    }
}
</script>

<style lang="scss" scoped>

</style>