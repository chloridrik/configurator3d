<template>
    <div class="home">
        <canvas class="renderCanvas"></canvas>
        <div class="nav">
            <div class="nav-group">
                <span class="title">Skybox</span>
                <span class="btn" v-on:click="setSky(0)">sky 0</span>
                <span class="btn" v-on:click="setSky(1)">sky 1</span>
                <span class="btn" v-on:click="setSky(2)">sky 2</span>
                <span class="btn" v-on:click="setSky(3)">sky 3</span>
            </div>

            <div class="nav-group">
                <span class="title">Ground</span>
                <span class="btn" v-on:click="setGround(0)">Ground 0</span>
                <span class="btn" v-on:click="setGround(1)">Ground 1</span>
            </div>

        </div>

    </div>
</template>
<script src="./Home.js"/>