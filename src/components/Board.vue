<template>
    <div>
        <h3>게시판목록</h3>
        <hr />
        {{state}}
        <hr />

        <router-link to="/boardwrite">글쓰기</router-link>
        <div v-if="state.items">
            <table border="1">
                <tr v-for="obj of state.items" :key="obj">
                    <td>{{obj.bno}}</td>
                    <td @click="handlePage(obj.bno)" style="cursor:pointer;">{{obj.btitle}}</td>
                    <td>{{obj.bhit}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            page : 1,
        });
    
        const handleData = async() => {
            const url = `/ROOT/api/board/selectlist?page=${state.page}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200) {
                state.items = response.data.result;
            }
        };

        // asyno(no)랑 query로 받는거랑 무슨 차이일까...
        const handlePage = async(no) => {
            // 조회수 1 증가시키기
            const url = `/ROOT/api/board/updatehit?bno=${no}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.put(url, {}, {headers});

            console.log(response.data);
            if(response.data.status === 200) {
                router.push({name:'BoardOne', query:{no:no}});
            }
        };

        onMounted(()=> {
            handleData();
        });
        

        return {state, handlePage}
    }
}
</script>

<style lang="scss" scoped>

</style>