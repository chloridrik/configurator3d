<template>
    <div class="home">
        <canvas class="renderCanvas" touch-action="none"></canvas>
        <div class="nav">
            <div class="nav-group">
                <span class="title">Skybox</span>
                <span class="btn" v-on:click="setSky('sky0')">sky 0</span>
                <span class="btn" v-on:click="setSky('sky1')">sky 1</span>
                <span class="btn" v-on:click="setSky('sky2')">sky 2</span>
                <span class="btn" v-on:click="setSky('sky3')">sky 3</span>
            </div>

            <div class="nav-group">
                <span class="title">Ground</span>
                <span class="btn" v-on:click="setGround('wood0')">Wood 1</span>
                <span class="btn" v-on:click="setGround('wood1')">Wood 2</span>
                <span class="btn" v-on:click="setGround('whitelacquered')">White L</span>
                <span class="btn" v-on:click="setGround('blacklacquered')">Black L</span>
                <span class="btn" v-on:click="setGround('redlacquered')">Red L</span>
                <span class="btn" v-on:click="setGround('fabric')">Fabric</span>
                <span class="btn" v-on:click="setGround('tiles')">Tiles</span>
            </div>

            <div class="nav-group">
                <span class="title">TV stand</span>
                <span class="btn" v-on:click="setTV('wood0')">Wood 1</span>
                <span class="btn" v-on:click="setTV('wood1')">Wood 2</span>
                <span class="btn" v-on:click="setTV('whitelacquered')">White L</span>
                <span class="btn" v-on:click="setTV('blacklacquered')">Black L</span>
                <span class="btn" v-on:click="setTV('redlacquered')">Red L</span>
                <span class="btn" v-on:click="setTV('fabric')">Fabric</span>
                <span class="btn" v-on:click="setTV('tiles')">Tiles</span>
            </div>

            <div class="nav-group">
                <span class="title">Lion</span>
                <span class="btn" v-on:click="setLion('lion')">Rock</span>
                <span class="btn" v-on:click="setLion('wood0')">Wood 1</span>
                <span class="btn" v-on:click="setLion('wood1')">Wood 2</span>
                <span class="btn" v-on:click="setLion('whitelacquered')">White L</span>
                <span class="btn" v-on:click="setLion('blacklacquered')">Black L</span>
                <span class="btn" v-on:click="setLion('redlacquered')">Red L</span>
                <span class="btn" v-on:click="setLion('fabric')">Fabric</span>
                <span class="btn" v-on:click="setLion('tiles')">Tiles</span>
            </div>

            <div class="nav-group">
                <span class="title">Chair</span>
                <span class="btn" v-on:click="setChair('chair')">new</span>
                <span class="btn" v-on:click="setChair('oldchair')">old</span>
                <span class="btn" v-on:click="setChair('wood0')">Wood 1</span>
                <span class="btn" v-on:click="setChair('wood1')">Wood 2</span>
                <span class="btn" v-on:click="setChair('whitelacquered')">White L</span>
                <span class="btn" v-on:click="setChair('blacklacquered')">Black L</span>
                <span class="btn" v-on:click="setChair('redlacquered')">Red L</span>
                <span class="btn" v-on:click="setChair('fabric')">Fabric</span>
                <span class="btn" v-on:click="setChair('tiles')">Tiles</span>
            </div>

        </div>

    </div>
</template>
<script src="./Home.js"/>