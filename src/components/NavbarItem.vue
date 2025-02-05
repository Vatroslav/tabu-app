<template>
    <nav>
        <img src="/tabu_small_logo_app.webp" alt="Tabu Logo" class="small-logo-app" />
    </nav>
</template>

<style scoped>
nav {
    background-color: white;
    height: 84px;
    z-index: -2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline;
    margin-right: 1em;
}

a {
    color: white;
    text-decoration: none;
}

.small-logo-app {
    position: absolute;
    left: 10px;
    top: 10px;
    max-height: 50vh;
    max-width: 50vw;
    z-index: 1;
    padding: 10px;
}
</style>
