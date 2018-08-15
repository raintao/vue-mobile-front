<template>
    <div>
        <!-- 头部组件 -->
        <nav-header :title="title"></nav-header>

        <!-- 底部组件 -->
        <nav-footer :items="footerItem" @clickItem="clickButtonItem"></nav-footer>

        <div class="content-body">
            <!-- 数据绑定 -->
            <h1>{{ msg }}</h1>
            <p>
                数据绑定：
                <input v-model="msg" />
            </p>
        
            <!-- 单向改变数据 -->
            <p>
                <button @click="changeTitle">单向改变数据：改变标题</button>
            </p>
        
            <!-- 改变状态 -->
            <div>
                <div v-show="isLoading === true">加载中...</div>
                <div v-show="isLoading === false">加载完成</div>
                <button @click="changeLoading">改变加载中状态</button>
            </div>

            <!-- API数据获取 -->
            <p>
                <button @click="getList">API数据获取</button>
            </p>

            <div>
                <input v-model="testTxt">
            </div>

            <div>
                <icon icon="vue" width="40" color="#42b983 #35495e"></icon>
            </div>

            <mt-button type="default">default</mt-button>
            <mt-button type="primary">primary</mt-button>
            <mt-button type="danger">danger</mt-button>

            <div>
                <mt-button type="default" @click="goTo('/list')">跳转Test1</mt-button>
                <mt-button type="default" @click="goTo('/list')">跳转Test2</mt-button>
            </div>

            <div class="mt-20">
                本地缓存测试（storage）<br>
                <input v-model="storTest"><br>
                <mt-button type="default" @click="setStorageTest">写入缓存</mt-button>
                <mt-button type="default" @click="removeStorageTest">删除缓存</mt-button>
            </div>
        </div>
    </div>
</template>

<script src="./demo.js"></script>
<style src="./demo.scss" lang="scss" scoped></style>
