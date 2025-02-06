<template>
    <nav>
        <img src="/tabu_small_logo_app.webp" alt="Tabu Logo" class="small-logo-app" />
    </nav>
</template>

<style scoped>
nav {
    background-color: white;
    z-index: -2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
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

@media (max-width: 768px) {
    nav {
        height: 60px;
    }

    .small-logo-app {
        padding: 25px;
    }
}


@media (min-width: 768px) {
    nav {
        height: 84px;
    }

    .small-logo-app {
        padding: 82px;
    }
}
</style>
