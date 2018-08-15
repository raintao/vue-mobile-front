<template>
    <div id="app">
       <transition :name="transitionName">
          <router-view class="child-router"/>
       </transition>
    </div>
</template>

<script src="./app.js"></script>
<style src="./app.scss" lang="scss" scoped></style>