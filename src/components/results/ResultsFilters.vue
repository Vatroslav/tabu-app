<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { TechOption, CountrySalaryOption, ContractTypeOption, PositionOption } from '@/types/results';

export interface DropdownOption {
    value: string;
    label: string;
}

export default defineComponent({
    name: 'ResultsFilters',
    props: {
        submissionData: {
            type: Object,
            required: true
        },
        additionalPositionData: {
            type: Object,
            required: true
        },
        selectedPosition: {
            type: String,
            required: true
        },
        selectedSeniorities: {
            type: Array,
            required: true
        },
        hasTechOptions: {
            type: Boolean,
            required: true
        },
        techOptions: {
            type: Array as () => TechOption[],
            required: true
        },
        selectedTech: {
            type: String,
            required: true
        },
        countrySalaryOptions: {
            type: Array as () => CountrySalaryOption[],
            required: true
        },
        contracTypeOptions: {
            type: Array as () => ContractTypeOption[],
            required: true
        }
    },
    emits: ['update:selectedPosition', 'update:selectedSeniorities', 'update:selectedTech', 'update:countrySalary', 'update:contractType'],
    setup(props, { emit }) {
        const positionOptions = computed<PositionOption[]>(() => {
            const options: PositionOption[] = [
                {
                    value: 'my_position',
                    label: props.submissionData.position
                },
                {
                    value: 'other_positions_in_department',
                    label: `Other positions in ${props.submissionData.position_group}`
                }
            ];

            if (props.additionalPositionData.additional_position) {
                options.push({
                    value: 'additional_position',
                    label: `Additional position: ${props.additionalPositionData.additional_position}`,
                    isAdditional: true
                });
            }

            return options;
        });

        const techDropdownOptions = computed<DropdownOption[]>(() => {
            if (!props.hasTechOptions) {
                return [{ value: 'no_technology', label: 'No technology' }];
            }

            return props.techOptions.map(tech => ({
                value: tech.tech,
                label: tech.tech
            }));
        });

        const countryDropdownOptions = computed<DropdownOption[]>(() => {
            return props.countrySalaryOptions.map(country => ({
                value: country.country_salary,
                label: country.country_salary
            }));
        });

        const contractDropdownOptions = computed<DropdownOption[]>(() => {
            return props.contracTypeOptions.map(contract => ({
                value: contract.contract_type,
                label: contract.contract_type
            }));
        });

        const toggleSeniority = (seniority: string) => {
            const index = props.selectedSeniorities.indexOf(seniority);
            if (index === -1) {
                emit('update:selectedSeniorities', [...props.selectedSeniorities, seniority]);
            } else {
                const newSeniorities = [...props.selectedSeniorities];
                newSeniorities.splice(index, 1);
                emit('update:selectedSeniorities', newSeniorities);
            }
        };

        return {
            toggleSeniority,
            positionOptions,
            techDropdownOptions,
            countryDropdownOptions,
            contractDropdownOptions
        }
    }
})
</script>

<template>
    <div class="filters">
        <p class="filters-title">Customize the report by selecting filters:</p>

        <div class="filter-row">
            <label for="position" class="filter-label">Position:</label>
            <select id="position" class="input-field" :value="selectedPosition" @change="$emit('update:selectedPosition', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in positionOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
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
            <select id="technology" class="input-field" :class="{ disabled: !hasTechOptions }"
                :disabled="!hasTechOptions" :value="selectedTech || 'no_technology'" @change="$emit('update:selectedTech', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in techDropdownOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="filter-row">
            <label for="country" class="filter-label">Country:</label>
            <select id="country" class="input-field" :value="submissionData.country_salary"
                @change="$emit('update:countrySalary', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in countryDropdownOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="filter-row">
            <label for="contract" class="filter-label">Contract:</label>
            <select id="contract" class="input-field" :value="submissionData.contract_type"
                @change="$emit('update:contractType', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in contractDropdownOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
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

@media (min-width: 768px) {
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
}

@media (max-width: 768px) {
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
}
</style> 