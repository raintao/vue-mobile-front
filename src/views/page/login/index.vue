<!--
 * Row
 * @author levo <229208577@qq.com>
 * @date 2018-01-26
 * @since 1.0.0
 -->

<template>
  <div class="login" :style="{height:allHeight+'px'}">
      <span><icon icon="vue" width="140" color="#42b983 #35495e"></icon></span>
                
      <div>
        <input type="text" v-model.trim="userName" maxlength="14" placeholder="请输入手机号/用户名">
        <input @keyup.enter="submit" type="password" v-model.trim="passWord" maxlength="14" placeholder="请输入登陆密码">
        <button @click="submit">登&nbsp;&nbsp;录</button>
      </div>
  </div>
</template>
<script src="./login.js"></script>
<style src="./login.scss" lang="scss" scoped></style>
