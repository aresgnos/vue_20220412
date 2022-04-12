<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" style="width:50px;"> <br />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/board">Board</router-link> |
    <router-link to="/boardwrite">BoardWrite</router-link> 
    <hr />
    
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>

</style>