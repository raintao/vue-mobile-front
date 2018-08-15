<!--
 * Row
 * @author peter <185832959@qq.com>
 * @date 2018-01-26
 * @since 1.0.0
 -->
<template>
    <div :class="['z-row', type, justify, align]">
        <slot></slot>
    </div>
</template>
<script src="./row.js"></script>
<style src="./row.scss" lang="scss" scoped></style>
