<template>
    <div>
        <h3>product</h3>
        <hr />
        <input type="text" placeholder="제품명" v-model="state.name">
        <input type="text" placeholder="가격" v-model="state.price">
        <img :src="state.imageUrl" style="width:50px" />
        <input type="file" @change="handleImage($event)" />
        <button @click="handleInsert">등록하기</button>
        <hr />

        <div v-for="(tmp, idx) in 2" :key="tmp">
            <input type="text" v-model="state.name1[idx]" />
            <input type="text" v-model="state.price1[idx]" />
            <img :src="state.imageUrl1[idx]" style="width:50px" />
            <input type="file" @change="handleImage1($event, idx)" />
        </div>
        <button @click="handleInsert1">등록하기1</button>
        </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
export default {
    setup () {
        const state = reactive({
            name        : 'aaa',
            price       : 1222,
            imageUrl    : require('../assets/logo.png'),
            imageFile   : null,

            name1       : ['aaa1', 'aaa2'],
            price1      : [1222, 1333],
            imageUrl1   : [require('../assets/logo.png'),require('../assets/logo.png')],
            imageFile1  : [new File([""],""), new File([""],"")],
        });

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.imageFile = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/logo.png');
                state.imageFile = null;
            }
        }

        const handleImage1 = (e, idx) => {
            if(e.target.files[0]){
                state.imageUrl1[idx] = URL.createObjectURL(e.target.files[0]);
                state.imageFile1[idx] = e.target.files[0];
            }
            else{
                state.imageUrl1[idx] = require('../assets/logo.png');
                state.imageFile1[idx] = new File([""],"");
            }
        }


        const handleInsert = async() => {
            const url =`/ROOT/api/product/insert.json`;
            const headers = {"Content-Type":"form-data"};

            const body = new FormData();
            body.append("name", state.name);
            body.append("price", state.price);
            body.append("file", state.imageFile);

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
        }

        const handleInsert1 = async() => {
            const url =`/ROOT/api/product/insertbatch.json`;
            const headers = {"Content-Type":"form-data"};

            const body = new FormData();
            console.log(state.name1.length);
            for(let i=0;i<state.name1.length; i++){
                body.append("name", state.name1[i]);
                body.append("price", state.price1[i]);
                body.append("file", state.imageFile1[i]);
            }

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
        }


        return {state,handleImage, handleInsert, handleImage1, handleInsert1}
    }
}
</script>

<style lang="scss" scoped>

</style>