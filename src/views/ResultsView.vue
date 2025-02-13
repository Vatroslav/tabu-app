<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import router from '@/router'
import NavbarItem from '@/components/NavbarItem.vue'

type UserData = {
    name: string
}

export default defineComponent({
    name: 'ResultsView',
    components: {
        NavbarItem
    },
    setup() {
        const userData = ref<UserData>({ name: '' })

        const logout = () => {
            localStorage.removeItem('userData')
            router.push('/login')
        }

        onMounted(() => {
            let localStorageString = localStorage.getItem('userData') ?? ''
            if (localStorageString === '') {
                router.push('/login')
            } else {
                userData.value = JSON.parse(localStorageString) as UserData
            }
        })

        return { userData, logout }
    }
})
</script>

<template>
    <div>
        <NavbarItem />
        <div class="results">
            <h1>My salary comparison</h1>
            <p style="color: red;">Logged in as {{ userData.name }}.</p>
            <button @click="logout">Logout</button>
            <!----------------- Filters ----------------->
            <div class="overall-filter-section">
                <div class="filters">
                    <p class="filters-title">Customize the report by selecting filters:</p>

                    <div class="filter-row">
                        <label for="position" class="filter-label">Position:</label>
                        <select id="position" value="Sales Assistant" class="input-field">
                            <option value="my_position">Sales Assistant</option>
                            <option value="other_positions_in_department">Other positions in the department</option>
                            <option value="additional_position">Additional position: Backend</option>
                        </select>
                    </div>

                    <div class="filter-row seniority-row">
                        <label class="filter-label">Seniority:</label>
                        <div class="seniority-group">
                            <button class="seniority-btn">Junior</button>
                            <button class="seniority-btn active">Middle</button>
                            <button class="seniority-btn">Senior</button>
                        </div>
                    </div>

                    <div class="filter-row">
                        <label for="technology" class="filter-label">Technology:</label>
                        <select type="text" id="technology" value="No technology" class="input-field disabled" disabled>
                            <option value="no_technology">No technology</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>

                    <div class="filter-row">
                        <label for="country" class="filter-label">Country:</label>
                        <select id="country" class="input-field">
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Croatia" selected>Croatia</option>
                            <option value="Serbia">Serbia</option>
                        </select>
                    </div>

                    <div class="filter-row">
                        <label for="contract" class="filter-label">Contract:</label>
                        <select id="contract" class="input-field">
                            <option value="Permanent employment contract" selected>Permanent employment contract</option>
                            <option value="Fixed-term employment contract">Fixed-term employment contract</option>
                            <option value="Student contract">Student contract</option>
                            <option value="Sole proprietorship (obrt)">Sole proprietorship (obrt)</option>
                            <option value="I have my own company">I have my own company</option>
                            <option value="Contract for work">Contract for work</option>
                            <option value="Gaining initial work experience/internship">Gaining initial work experience/internship</option>
                            <option value="Copyright contract">Copyright contract</option>
                        </select>
                    </div>
                </div>
                <!----------------- Amount of salaries ----------------->
                <div class="salaries-amount-container">
                    <p class="salaries-amount-number" id="amount-of-salaries">176</p>
                    <p class="salaries-amount-label">salaries in this filter</p>
                    <p class="salaries-amount-note">Modify the filters to change the salaries you're compared to.</p>
                </div>
            </div>
            <!----------------- Data containers ----------------->
            <div class="overall-data-section">
                <div class="my-salary-container">
                    <p class="data-type-label">My salary</p>
                    <div class="salary-container-no-border">
                        <p class="salary-my">1,234 €</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                </div>
                <div class="average-salary-container">
                    <p class="data-type-label">Average</p>
                    <div class="salary-container-border">
                        <p class="salary-value">1,538 €</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                    <div class="salary-message-overall">
                        <div class="salary-icon-container">
                            <span id="salary-message-average-icon" class="salary-icon">▽</span>
                        </div>
                        <div class="salary-message-container">
                            <span class="salary-message-part-1">your salary is</span>
                            <span id="salary-message-average-value" class="salary-message-part-2">304 €</span>
                            <span id="salary-message-average-lowerhigher" class="salary-message-part-3">lower</span>
                            <span class="salary-message-part-4">than the average on your position</span>
                        </div>
                    </div>
                </div>
                <div class="median-salary-container">
                    <p class="data-type-label">Median</p>
                    <div class="salary-container-border">
                        <p class="salary-value">1,465 €</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                    <div class="salary-message-overall">
                        <div class="salary-icon-container">
                            <span id="salary-message-median-icon" class="salary-icon">△</span>
                        </div>
                        <div class="salary-message-container">
                            <span class="salary-message-part-1">your salary is</span>
                            <span id="salary-message-median-value" class="salary-message-part-2">231 €</span>
                            <span id="salary-message-median-lowerhigher" class="salary-message-part-3">higher</span>
                            <span class="salary-message-part-4">than the median on your position</span>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/submission">Check Submission</router-link>
        </div>
    </div>
</template>

<style scoped>
/* ----------------- General styles ----------------- */
.results {
    margin-top: 97px;
    /* Adjust this value to ensure content starts below the navbar */
    text-align: left;
    padding-left: 20px;
}

h1 {
    font-weight: bold;
    color: #333;
    position: relative;
    display: inline-block;
    margin-bottom: 50px;
}

h1::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background-color: #D9FF80;
}

/* ----------------- Filters and salaries amount container ----------------- */
.overall-filter-section {
    display: flex;
    flex-wrap: wrap;
}

/* ----------------- Filters ----------------- */

.filters {
    order: 1;
    margin-right: 120px;
}

.filter-row {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.filter-row label {
    padding: 8px;
    margin-top: 0px;
}

.filter-row .input-field {
    flex: 1;
    width: 100%;
    padding: 8px;
    border: none;
    background-color: white;
}

.filters-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.filter-label {
    display: block;
    margin-top: 10px;
    color: #333;
}

.input-field.disabled {
    background-color: #F5F7EE;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
}

.seniority-row {
    align-items: flex-start;
    /* Poravnava label s gumbima */
}

.seniority-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.seniority-btn {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
}

.seniority-btn.active {
    background-color: white;
    color: black;
    border: none;
    box-shadow: inset 0 0 0 2px black;
}

/* ----------------- Amount of salaries ----------------- */

.salaries-amount-container {
    order: 2;
}

.salaries-amount-number {
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
}

.salaries-amount-label {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 10px;
}

.salaries-amount-note {
    font-weight: 300;
    margin-top: 0;
}

/* ----------------- Data containers ----------------- */

.overall-data-section {
    display: flex;
    flex-wrap: wrap;
}

/* ----------------- My salary ----------------- */
.my-salary-container {
    order: 1;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    width: fit-content;
    /* Container width becomes text size */
}

.average-salary-container {
    order: 2;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    width: fit-content;
    /* Container width becomes text size */
}

.median-salary-container {
    order: 3;
    display: flex;
    flex-direction: column;
    width: fit-content;
    /* Container width becomes text size */
}

.salary-container-no-border {
    padding: 20px;
}

.salary-container-border {
    border-radius: 13px;
}

.data-type-label {
    font-weight: bold;
    color: #333333;
    margin-bottom: 40px;
    line-height: 1;
}

.salary-my {
    font-weight: 600;
    color: #FF9883;
    margin: 0;
    line-height: 1;
    text-align: center;
}

.salary-value {
    font-weight: 400;
    color: #333333;
    margin: 0;
    line-height: 1;
    text-align: center;
}

.salary-type-label {
    color: #333333;
    margin-top: 5px;
    text-align: right;
    /* Aligns right within the container */
}

.salary-message-overall {
    display: flex;
}

.salary-icon-container {
    order: 1;
}

.salary-message-container {
    order: 2;
}

.salary-message-overall span {
    margin-right: 4px;
    /* Adds space between elements */
}

.salary-message-part-2 {
    font-weight: bold;
}

/* ----------------- Media queries ----------------- */

@media (min-width: 768px) {

    h1 {
        font-size: 48px;
    }

    h1::after {
        height: 10px;
    }

    /* Filters */
    .overall-filter-section {
        margin-top: 50px;
        /* Adjust this value to make it all look good and not too empty */
    }

    .filters {
        min-width: 500px;
        max-width: 600px;
    }

    .filters-title {
        font-size: 18px;
    }

    .filter-label {
        font-size: 18px;
    }

    .filter-row label {
        width: 120px;
    }

    .filter-row .input-field {
        font-size: 18px;
    }

    .seniority-btn {
        font-size: 18px;
    }

    /* Amount of salaries */
    .salaries-amount-number {
        font-size: 48px;
    }

    .salaries-amount-label {
        font-size: 24px;
    }

    .salaries-amount-note {
        font-size: 14px;
    }

    /* Data containers */
    .overall-data-section {
        margin-top: 250px;
        /* Adjust this value to ensure content starts below the initial view */
    }

    .salary-container-border {
        border: 5px solid white;
        padding: 20px;
    }

    .data-type-label {
        font-size: 18px;
    }

    .salary-value,
    .salary-my {
        font-size: 72px;
    }

    .salary-type-label {
        font-size: 18px;
    }

    .salary-message-overall {
        max-width: 300px;
        font-size: 18px;
    }
}

@media (max-width: 768px) {

    h1 {
        font-size: 24px;
    }

    h1::after {
        height: 5px;
    }

    /* Filters */
    .filters {
        min-width: 300px;
        max-width: 400px;
    }

    .filters-title {
        font-size: 12px;
    }

    .filter-label {
        font-size: 12px;
    }

    .filter-row label {
        width: 80px;
    }

    .filter-row .input-field {
        font-size: 12px;
    }

    .seniority-btn {
        font-size: 12px;
    }

    /* Amount of salaries */
    .salaries-amount-number {
        font-size: 32px;
    }

    .salaries-amount-label {
        font-size: 18px;
    }

    .salaries-amount-note {
        font-size: 12px;
    }

    /* Data containers */
    .salary-container-border {
        border: 3px solid white;
        padding: 10px;
    }

    .data-type-label {
        font-size: 24px;
    }

    .salary-value,
    .salary-my {
        font-size: 48px;
    }

    .salary-type-label {
        font-size: 12px;
    }

    .salary-message-overall {
        max-width: 250px;
        font-size: 12px;
    }
}
</style>
