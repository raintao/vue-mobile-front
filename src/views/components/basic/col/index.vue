<!--
 * Col
 * @author peter <185832959@qq.com>
 * @date 2018-01-26
 * @since 1.0.0
 -->
<template>
    <div :class="['z-col', align]" :style="`width:${ (span * spanWidth) }%;`">
        <slot></slot>
    </div>
</template>
<script src="./col.js"></script>
<style src="./col.scss" lang="scss" scoped></style>
