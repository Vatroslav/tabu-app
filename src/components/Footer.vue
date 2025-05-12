<script lang="ts">
import { defineComponent } from 'vue'
import VersionDisplay from './VersionDisplay.vue'

export default defineComponent({
    name: 'Footer',
    components: {
        VersionDisplay
    }
})
</script>

<template>
    <footer class="footer">
        <div class="version-display-container">
            <VersionDisplay context="results" show-label />
        </div>
        <img src="/tabu_footer_logo.svg" alt="Tabu Logo" class="footer-logo" />
    </footer>
</template>

<style scoped>
.footer {
    margin-top: auto;
    position: relative;
    width: 100%;
}

.footer-logo {
    width: 100%;
    object-fit: cover;
    position: absolute;
    bottom: -75px;
    left: 0;
    z-index: -1;
}

@media (max-width: 769px) {
    .version-display-container {
        margin-bottom: 50px;
        margin-top: 20px;
    }
}

@media (min-width: 769px) {
    .version-display-container {
        margin-top: 200px;
    }

    .footer-logo {
        display: none;
    }
}
</style> 