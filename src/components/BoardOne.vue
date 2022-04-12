<template>
    <div>
       
       <div v-if="state.items">
            글번호 : {{state.items.bno}}
            제목 : {{state.items.btitle}}
            내용 : {{state.items.bcontent}}
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
    setup () {
        const route = useRoute();

        const state = reactive ({
            no : route.query.no,
        });

        const handleData = async() => {
            const url = `/ROOT/api/board/selectone?bno=${state.no}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        onMounted(()=> {
            handleData();
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>