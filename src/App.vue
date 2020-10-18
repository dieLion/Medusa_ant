<template>
<div id="app">
    <template>
        <router-view />
    </template>
</div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    height: 100%;
    overflow: hidden;

}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    word-wrap: break-word
}
</style>
