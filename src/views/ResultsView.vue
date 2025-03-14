<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import Multiselect from 'vue-multiselect';
import router from '@/router'
import NavbarItem from '@/components/NavbarItem.vue'
import { submissionCheck } from '@/services/submission';
import { additionalPositionCheck } from '@/services/additional_position';
import { salaryCheck } from '@/services/salary';
import { listTechCheck } from '@/services/list_tech';
import { listCountrySalaryCheck } from '@/services/list_country_salary';
import { listContractTypeCheck } from '@/services/list_contract_type';
import { dataAmountFilterCheck } from '@/services/data_amount_filter';
import polygonUpturnedGreen from '@/assets/polygon_upturned_green.webp';
import polygonDownturnedRed from '@/assets/polygon_donwturned_red.webp';
import axios from 'axios';

type UserData = {
    name: string,
    unique_id: string
}

export default defineComponent({
    name: 'ResultsView',
    components: {
        NavbarItem,
        Multiselect
    },
    setup() {
        const userData = ref<UserData>({ name: '', unique_id: '' });
        const submissionData = ref({
            position_group: '',
            position: '',
            seniority: '',
            tech: '',
            contract_type: '',
            country_salary: '',
        });
        const additionalPositionData = ref({
            additional_position_group: '',
            additional_position: '',
        });

        const selectedPositions = ref<string[]>([]); // List of positions selected by the user for comparison
        const selectedPosition = ref<string>(''); // Selected value of the position dropdown
        const selectedSeniorities = ref<string[]>([]);
        const hasTechOptions = ref(false); // Boolean variable to check if techOptions is not null
        const techOptions = ref<{ tech: string; amount: number }[]>([]); // List of available technologies with amounts
        //const selectedTech = ref<string[]>([]); // List of technologies selected by the user for comparison
        const selectedTech = ref<string>(''); // Selected value of the technology dropdown
        const countrySalaryOptions = ref<{ country_salary: string; amount: number }[]>([]); // List of available countries with amounts
        const selectedCountrySalary = ref<string[]>([]); // List of countries selected by the user for comparison
        const contracTypeOptions = ref<{ contract_type: string; amount: number }[]>([]); // List of available contract types with amounts
        const selectedContractType = ref<string[]>([]); // List of contract types selected by the user for comparison
        const salaryData = ref({
            salary_net: 0,
            salary_gross: 0,
        });

        const dataAmount = ref(0); // Amount of salaries in the current filter
        const salaryAverage_net = ref(0);
        const salaryMedian_net = ref(0);
        const salaryAverage_gross = ref(0);
        const salaryMedian_gross = ref(0);

        const locale = ref('en-US');
        const currencyStyle = ref<'currency' | 'decimal' | 'percent'>('currency'); // Can't be a simple string because of the type check.
        const currencyType = ref('EUR');

        const logout = () => {
            localStorage.removeItem('userData')
            router.push('/login')
        }

        function formatSalary(amount: number | null | undefined): string {
            if (!amount) return "N/A";
            return amount.toLocaleString(
                locale.value,
                {
                    style: currencyStyle.value,
                    currency: currencyType.value,
                    minimumFractionDigits: 0
                }
            );
        }

        const formattedUserSalary_net = computed(() => {
            return formatSalary(salaryData.value.salary_net);
        });

        const formattedUserSalary_gross = computed(() => {
            return formatSalary(salaryData.value.salary_gross);
        });

        const formattedMarketSalaryAverage_net = computed(() => {
            return formatSalary(salaryAverage_net.value);
        });

        const formattedMarketSalaryAverage_gross = computed(() => {
            return formatSalary(salaryAverage_gross.value);
        });

        const formattedMarketSalaryMedian_net = computed(() => {
            return formatSalary(salaryMedian_net.value);
        });

        const formattedMarketSalaryMedian_gross = computed(() => {
            return formatSalary(salaryMedian_gross.value);
        });

        const diffUserToAverageDisplay = computed(() => {
            const diff_net = salaryData.value.salary_net - salaryAverage_net.value;
            const diff_gross = salaryData.value.salary_gross - salaryAverage_gross.value;

            const isPositive_net = diff_net >= 0;
            const isPositive_gross = diff_gross >= 0;

            const formattedDiff_net = formatSalary(Math.abs(diff_net));
            const formattedDiff_gross = formatSalary(Math.abs(diff_gross));

            const polygonSrc_net = isPositive_net
                ? polygonUpturnedGreen
                : polygonDownturnedRed;
            const polygonSrc_gross = isPositive_gross
                ? polygonUpturnedGreen
                : polygonDownturnedRed;

            const altText_net = isPositive_net ? 'Upward Polygon' : 'Downward Polygon';
            const altText_gross = isPositive_gross ? 'Upward Polygon' : 'Downward Polygon';

            const lowerHigher_net = isPositive_net ? 'higher' : 'lower';
            const lowerHigher_gross = isPositive_gross ? 'higher' : 'lower';

            return {
                isPositive_net,
                isPositive_gross,
                formattedDiff_net,
                formattedDiff_gross,
                polygonSrc_net,
                polygonSrc_gross,
                altText_net,
                altText_gross,
                lowerHigher_net,
                lowerHigher_gross
            };
        });

        const diffUserToMedianDisplay = computed(() => {
            const diff_net = salaryData.value.salary_net - salaryMedian_net.value;
            const diff_gross = salaryData.value.salary_gross - salaryMedian_gross.value;

            const isPositive_net = diff_net >= 0;
            const isPositive_gross = diff_gross >= 0;

            const formattedDiff_net = formatSalary(Math.abs(diff_net));
            const formattedDiff_gross = formatSalary(Math.abs(diff_gross));

            const polygonSrc_net = isPositive_net
                ? polygonUpturnedGreen
                : polygonDownturnedRed;
            const polygonSrc_gross = isPositive_gross
                ? polygonUpturnedGreen
                : polygonDownturnedRed;

            const altText_net = isPositive_net ? 'Upward Polygon' : 'Downward Polygon';
            const altText_gross = isPositive_gross ? 'Upward Polygon' : 'Downward Polygon';

            const lowerHigher_net = isPositive_net ? 'higher' : 'lower';
            const lowerHigher_gross = isPositive_gross ? 'higher' : 'lower';

            return {
                isPositive_net,
                isPositive_gross,
                formattedDiff_net,
                formattedDiff_gross,
                polygonSrc_net,
                polygonSrc_gross,
                altText_net,
                altText_gross,
                lowerHigher_net,
                lowerHigher_gross
            };
        });

        /*
        const togglePosition = (position: string) => {
            const index = selectedPositions.value.indexOf(position);
            if (index === -1) {
                selectedPositions.value.push(position); // Add if not already selected
            } else {
                selectedPositions.value.splice(index, 1); // Remove if already selected
            }
            updateDataAmount();
        };
        */

        const toggleSeniority = (seniority: string) => {
            const index = selectedSeniorities.value.indexOf(seniority);
            if (index === -1) {
                selectedSeniorities.value.push(seniority);
            } else {
                selectedSeniorities.value.splice(index, 1);
            }
            updateDataAmount();
        };
        /*
                const toggleTechnology = (technology: string) => {
                    const index = selectedTech.value.indexOf(technology);
                    if (index === -1) {
                        selectedTech.value.push(technology); // Add if not already selected
                    } else {
                        selectedTech.value.splice(index, 1); // Remove if already selected
                    }
                    updateDataAmount();
                };
        
                const toggleCountrySalary = (country_salary: string) => {
                    const index = selectedCountrySalary.value.indexOf(country_salary);
                    if (index === -1) {
                        selectedCountrySalary.value.push(country_salary); // Add if not already selected
                    } else {
                        selectedCountrySalary.value.splice(index, 1); // Remove if already selected
                    }
                    updateDataAmount();
                };
        
                const toggleContractType = (contrac_type: string) => {
                    const index = selectedContractType.value.indexOf(contrac_type);
                    if (index === -1) {
                        selectedContractType.value.push(contrac_type); // Add if not already selected
                    } else {
                        selectedContractType.value.splice(index, 1); // Remove if already selected
                    }
                    updateDataAmount();
                };
        */
        const updateDataAmount = async () => {
            try {
                const chosenDepartment = (() => {
                    if (selectedPosition.value === 'other_positions_in_department') {
                        return submissionData.value.position_group;
                    } else {
                        return null;
                    }
                })();

                const chosenPosition = (() => {
                    if (selectedPosition.value === 'my_position') {
                        return submissionData.value.position;
                    } else if (selectedPosition.value === 'additional_position') {
                        return additionalPositionData.value.additional_position;
                    } else {
                        return null;
                    }
                })();

                const chosenSeniority = selectedSeniorities.value.length
                    ? selectedSeniorities.value.join('|')
                    : "N/A";

                //Uključiti kad ima multiple select:
                //const chosenTech = selectedTech.value.length
                //    ? selectedTech.value.join('|')
                //    : null;

                const chosenTech = selectedTech.value || null;

                //Uključiti kad ima multiple select:
                //const chosenCountrySalary = selectedCountrySalary.value.length
                //    ? selectedCountrySalary.value.join('|');

                const chosenCountrySalary = submissionData.value.country_salary;

                //Uključiti kad ima multiple select:
                //const chosenContractType = selectedContractType.value.length
                //    ? selectedContractType.value.join('|');

                const chosenContractType = submissionData.value.contract_type;

                // console.log('Chosen Position group:', chosenDepartment);
                // console.log('Chosen Position:', chosenPosition);
                // console.log('Chosen Seniority:', chosenSeniority);
                // console.log('Chosen Country Salary:', chosenCountrySalary);
                // console.log('Chosen Contract Type:', chosenContractType);
                // console.log('Chosen Tech:', chosenTech);

                const api_response = await dataAmountFilterCheck(
                    chosenDepartment,
                    chosenPosition,
                    chosenSeniority,
                    chosenCountrySalary,
                    chosenContractType,
                    chosenTech
                );

                if (api_response.data.success) {
                    //console.log('Response data:', api_response.data);
                    dataAmount.value = api_response.data.response.data.data_amount;
                    salaryAverage_net.value = api_response.data.response.data.salary_net_avg;
                    salaryMedian_net.value = api_response.data.response.data.salary_net_median;
                } else {
                    //console.error('Error fetching data amount:', api_response.data.message);
                    dataAmount.value = 0;
                    salaryAverage_net.value = 0;
                    salaryMedian_net.value = 0;
                }
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(async () => {
            let localStorageString = localStorage.getItem('userData') ?? '' // Get user data from local storage
            if (localStorageString === '') {
                router.push('/login')
            } else {
                userData.value = JSON.parse(localStorageString) as UserData
                //console.log('User Data:', userData)
                try {
                    const submissionResponse = await submissionCheck(userData.value.unique_id);
                    if (submissionResponse.data.success && submissionResponse.data.response.exists) {
                        submissionData.value = submissionResponse.data.response;
                        //console.log('Submission Data:', submissionData.value);

                        if (submissionData.value.position) {
                            selectedPosition.value = 'my_position'
                        }

                        if (submissionData.value.seniority !== 'N/A') {
                            selectedSeniorities.value = [submissionData.value.seniority];
                        }

                        // Only check for other data if the submission exists.
                        const [
                            additionalPositionResponse,
                            salaryResponse,
                            listTechResponse,
                            listCountrySalaryResponse,
                            listContractTypeResponse,
                        ] = await Promise.all([
                            additionalPositionCheck(userData.value.unique_id),
                            salaryCheck(userData.value.unique_id),
                            listTechCheck(userData.value.unique_id),
                            listCountrySalaryCheck(userData.value.unique_id),
                            listContractTypeCheck(userData.value.unique_id),
                        ]);

                        if (additionalPositionResponse.data.success && additionalPositionResponse.data.response.exists) {
                            additionalPositionData.value = additionalPositionResponse.data.response;
                            //console.log('Additional Position Data:', additionalPositionData.value);
                        } else {
                            additionalPositionData.value = {
                                additional_position_group: '',
                                additional_position: ''
                            };
                        }

                        if (salaryResponse.data.success && salaryResponse.data.response.exists) {
                            salaryData.value = salaryResponse.data.response;
                            //console.log('Salary:', salaryData.value);
                        }

                        if (listTechResponse.data.success && listTechResponse.data.data) {
                            techOptions.value = listTechResponse.data.data;
                            hasTechOptions.value = techOptions.value.map(tech => tech.tech).every(tech => tech !== null);
                            //console.log('Technologies:', techOptions.value.length);
                            //console.log('Tech:', techOptions.value.map(tech => tech.tech));
                            //console.log('hasTechOptions:', hasTechOptions.value);
                        }

                        if (listCountrySalaryResponse.data.success && listCountrySalaryResponse.data.data) {
                            countrySalaryOptions.value = listCountrySalaryResponse.data.data;
                            //console.log('Country Salary:', listCountrySalaryResponse.data.data);
                        }

                        if (listContractTypeResponse.data.success && listContractTypeResponse.data.data) {
                            contracTypeOptions.value = listContractTypeResponse.data.data;
                            //console.log('Contract Type:', listContractTypeResponse.data.data);
                        }

                        updateDataAmount();
                    } else {
                        console.log('No submission data found');
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error:', error.response?.data.message ?? error.message)
                        //console.error('Axios error - data:', error.response?.data);
                        //console.error('Axios error - status:', error.response?.status);
                        //console.error('Axios error - headers:', error.response?.headers);
                    } else {
                        console.error('Error fetching submission data:', error)
                    }
                }
            }
        })

        return {
            userData,
            submissionData,
            selectedPosition,
            selectedPositions,
            selectedSeniorities,
            toggleSeniority,
            techOptions,
            hasTechOptions,
            selectedTech,
            countrySalaryOptions,
            selectedCountrySalary,
            contracTypeOptions,
            selectedContractType,
            dataAmount,
            salaryAverage_net,
            salaryMedian_net,
            additionalPositionData,
            salaryData,
            formattedUserSalary_net,
            formattedUserSalary_gross,
            formattedMarketSalaryAverage_net,
            formattedMarketSalaryAverage_gross,
            formattedMarketSalaryMedian_net,
            formattedMarketSalaryMedian_gross,
            diffUserToAverageDisplay,
            diffUserToMedianDisplay,
            logout,
            updateDataAmount
        }
    }
})
</script>

<template>
    <div>
        <NavbarItem />
        <div class="results">
            <h1>My salary comparison</h1>
            <!--<p style="color: red;">Hello {{ userData.name }}! Your unique_id is {{ userData.unique_id }}.</p>-->
            <!--<button @click="logout">Logout</button>-->
            <!----------------- Filters ----------------->
            <div class="overall-filter-section">
                <div class="filters">
                    <p class="filters-title">Customize the report by selecting filters:</p>

                    <div class="filter-row">
                        <label for="position" class="filter-label">Position:</label>
                        <select id="position" class="input-field" v-model="selectedPosition" @change="updateDataAmount">
                            <option value="my_position" selected>
                                {{ submissionData.position }}</option>
                            <option value="other_positions_in_department">Other positions in {{
                                submissionData.position_group }}</option>
                            <option v-if="additionalPositionData.additional_position" value="additional_position">
                                Additional position: {{ additionalPositionData.additional_position }}
                            </option>
                        </select>
                    </div>

                    <div class="filter-row seniority-row">
                        <label class="filter-label">Seniority:</label>
                        <div class="seniority-group">
                            <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Junior') }"
                                :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Junior')">
                                Junior
                            </button>

                            <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Middle') }"
                                :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Middle')">
                                Middle
                            </button>

                            <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Senior') }"
                                :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Senior')">
                                Senior
                            </button>
                        </div>
                    </div>

                    <div class="filter-row">
                        <label for="technology" class="filter-label">Technology:</label>
                        <!--<Multiselect v-model="selectedTech" :options="techOptions" label="tech" track-by="tech"
                            :multiple="true" :close-on-select="false" :clear-on-select="false"
                            placeholder="Pick technology..." @input="updateDataAmount()">
                        </Multiselect>-->
                        <select id="technology" class="input-field" :class="{ disabled: hasTechOptions === false }"
                            :disabled="hasTechOptions === false" v-model="selectedTech" @change="updateDataAmount">
                            <option v-if="hasTechOptions === false" value="no_technology">No technology
                            </option>
                            <option v-if="hasTechOptions === true" selected></option>
                            <option v-if="hasTechOptions === true" v-for="tech in techOptions" :key="tech.tech"
                                :value="tech.tech">{{ tech.tech }}
                                <!--({{ tech.amount }} salaries)-->
                            </option>
                        </select>
                    </div>

                    <div class="filter-row">
                        <label for="country" class="filter-label">Country:</label>
                        <select id="country" class="input-field" v-model="submissionData.country_salary"
                            @change="updateDataAmount">
                            <option v-for="country_salary in countrySalaryOptions" :key="country_salary.country_salary"
                                :value="country_salary.country_salary">{{
                                    country_salary.country_salary }}
                                <!--({{ country_salary.amount }} salaries)-->
                            </option>
                        </select>
                    </div>

                    <div class="filter-row">
                        <label for="contract" class="filter-label">Contract:</label>
                        <select id="contract" class="input-field" v-model="submissionData.contract_type"
                            @change="updateDataAmount">
                            <option v-for="contract_type in contracTypeOptions" :key="contract_type.contract_type"
                                :value="contract_type.contract_type">{{
                                    contract_type.contract_type }}
                                <!--({{ contract_type.amount }} salaries)-->
                            </option>
                        </select>
                    </div>
                </div>
                <!----------------- Amount of salaries ----------------->
                <div class="salaries-amount-container">
                    <p class="salaries-amount-number" id="amount-of-salaries">{{ dataAmount }}</p>
                    <p class="salaries-amount-label">salaries in this filter</p>
                    <p class="salaries-amount-note">Modify the filters to change the salaries you're compared to.</p>
                </div>
            </div>
            <!----------------- Data containers ----------------->
            <div class="overall-data-section">
                <div class="my-salary-container">
                    <p class="data-type-label">My salary</p>
                    <div class="salary-container-no-border">
                        <p class="salary-my">{{ formattedUserSalary_net }}</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                </div>
                <div class="average-salary-container">
                    <p class="data-type-label">Average</p>
                    <div class="salary-container-border">
                        <p class="salary-value">{{ formattedMarketSalaryAverage_net }}</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                    <div class="salary-message-overall" v-if="salaryAverage_net > 0">
                        <div class="salary-icon-container">
                            <img id="salary-message-average-icon" class="salary-icon"
                                :src="diffUserToAverageDisplay.polygonSrc_net"
                                :alt="diffUserToAverageDisplay.altText_net" />
                        </div>
                        <div class="salary-message-container">
                            <span class="salary-message-part-1">your salary is</span>
                            <span id="salary-message-average-value" class="salary-message-part-2" :class="{
                                'diff-positive': diffUserToAverageDisplay.isPositive_net,
                                'diff-negative': !diffUserToAverageDisplay.isPositive_net
                            }">
                                {{ diffUserToAverageDisplay.formattedDiff_net }}</span>
                            <span id="salary-message-average-lowerhigher" class="salary-message-part-3">
                                {{ diffUserToAverageDisplay.lowerHigher_net }}</span>
                            <span class="salary-message-part-4">than the average on your position</span>
                        </div>
                    </div>
                </div>
                <div class="median-salary-container">
                    <p class="data-type-label">Median</p>
                    <div class="salary-container-border">
                        <p class="salary-value">{{ formattedMarketSalaryMedian_net }}</p>
                        <p class="salary-type-label">net salary</p>
                    </div>
                    <div class="salary-message-overall" v-if="salaryMedian_net > 0">
                        <div class="salary-icon-container">
                            <img id="salary-message-average-icon" class="salary-icon"
                                :src="diffUserToMedianDisplay.polygonSrc_net"
                                :alt="diffUserToMedianDisplay.altText_net" />
                        </div>
                        <div class="salary-message-container">
                            <span class="salary-message-part-1">your salary is</span>
                            <span id="salary-message-median-value" class="salary-message-part-2" :class="{
                                'diff-positive': diffUserToAverageDisplay.isPositive_net,
                                'diff-negative': !diffUserToAverageDisplay.isPositive_net
                            }">
                                {{ diffUserToMedianDisplay.formattedDiff_net }}</span>
                            <span id="salary-message-median-lowerhigher" class="salary-message-part-3">
                                {{ diffUserToMedianDisplay.lowerHigher_net }}</span>
                            <span class="salary-message-part-4">than the median on your position</span>
                        </div>
                    </div>
                </div>
            </div>

            <!--
        <div id="user_details" v-if="userDetails">
          <h2>User Details</h2>
          <p>Name: {{ userDetails.name }}</p>
          <p>Email: {{ userDetails.email }}</p>
        </div>
        -->
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
    font-weight: 600;
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
    font-weight: 500;
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
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
}

.filter-label {
    display: block;
    margin-top: 10px;
    color: #6D6D6D;
}

.input-field.disabled {
    background-color: #f5F7EE;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
    cursor: not-allowed;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
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

.seniority-btn:nth-child(2) {
    margin: 0 10px;
}

.seniority-btn.active {
    color: black;
    border: none;
    box-shadow: inset 0 0 0 2px black;
}

.seniority-btn:disabled {
    background-color: #f5F7EE;
    cursor: not-allowed;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
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
    font-weight: 600;
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
    font-weight: 500;
    color: #333333;
    margin-top: 5px;
    text-align: right;
    /* Aligns right within the container */
}

.salary-message-overall {
    display: flex;
    margin-top: 5px;
}

.salary-icon-container {
    order: 1;
    margin-right: 5px;
}

.salary-message-container {
    order: 2;
    font-weight: 500;
}

.salary-message-overall span {
    margin-right: 4px;
    /* Adds space between elements */
}

.salary-message-part-2 {
    font-weight: 700;
}

.diff-positive {
    color: #15BE02;
}

.diff-negative {
    color: #FF0404;
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
        margin-top: 50px;
        /* Adjust this to ensure content starts below the inital view */
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
