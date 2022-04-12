<template>
    <div>
        <h3>글쓰기</h3>
        제목 : <input type="text" v-model="state.btitle" />
        내용 : <input type="text" v-model="state.bcontent" />
        <button @click="handleInsert">글쓰기</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive ({
            btitle: '',
            bcontent : '',
        });

        const handleInsert = async() => {
            const url = `/ROOT/api/board/insert`;
            const headers = {"Content-Type" : "application/json"};
            const body = {
                btitle:state.btitle, 
                bcontent:state.bcontent};
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200) {
                alert('글쓰기 완료');
                router.push({name:'Board'});
            }
        }
        

        return {state, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>